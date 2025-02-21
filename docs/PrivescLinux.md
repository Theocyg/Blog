# Manuel Enumeration

## Informations Système

- `id` : Affiche les informations sur l'utilisateur actuel.
- `cat /etc/passwd` : Affiche les informations sur les utilisateurs du système.
- `hostname` : Affiche le nom d'hôte du système.
- `cat /etc/issue`, `cat /etc/os-release` : Affiche des informations sur la version du système d'exploitation.
- `uname -a` : Affiche toutes les informations sur le système.

## Processus et Réseau

- `ps aux` : Affiche tous les processus en cours d'exécution.
- `ss -anp` : Affiche les connexions réseau actives et les ports en écoute.
- `netstat` : Affiche les connexions réseau, les tables de routage, les statistiques d'interface, etc.
- `cat /etc/iptables/rules.v4` : Affiche les règles iptables pour IPv4.

## Tâches Planifiées

- `ls -lah /etc/cron*`, `crontab -l`, `grep “CRON” /var/log/syslog` : Affiche les tâches cron planifiées.
- `cat /etc/cron.hourly/*`, `/etc/cron.daily/*`, `/etc/cron.weekly/*`, `/etc/cron.monthly/*` : Affiche les scripts cron planifiés à différents intervalles.

## Applications et Modules

- `dpkg -l` : Liste toutes les applications installées par dpkg.
- `find / -writable -type d 2>/dev/null` : Trouve les répertoires/fichiers accessibles en écriture.
- `cat /etc/fstab` : Liste tous les systèmes de fichiers montés au démarrage.
- `mount` : Liste tous les systèmes de fichiers actuellement montés.
- `lsblk` : Affiche les disques disponibles.
- `lsmod` : Affiche les modules du noyau chargés.
- `modinfo <nom_du_module>` : Affiche des informations sur un module du noyau spécifique (utilisez `lsmod` pour lister les modules).

## Sécurité

- `find / -perm -u=s -type f 2>/dev/null` : Recherche les fichiers avec le bit SUID défini.
