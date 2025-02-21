# Kerberos

Active Directory est une solution de Microsoft utilisée pour la gestion d’un système d’information, articulée sur les points suivants :

- Un système d’annuaire de ressources (LDAP)
- Un système d’authentification (Kerberos)
- Un système de résolution de noms (DNS)
- Une politique logicielle homogène
- Nous allons nous intéresser dans cet article à la partie authentification au sein d’un Active Directory, donc à la partie Kerberos.

Kerberos est un protocole qui permet à des utilisateurs de s’authentifier sur le réseau, et d’accéder à des services de manière authentifiée.

# Fonctionnement

Le besoin auquel répond Kerberos est celui d’un utilisateur qui souhaite utiliser un service exposé quelque part sur le réseau, sans pour autant que l’utilisateur ait besoin d’envoyer son mot de passe, et sans que le serveur ait besoin de connaitre les mots de passe de tout le monde. C’est une authentification centralisée.

Pour répondre à cette problématique, il faut au minimum trois entités

- Un client, qui peut être un ordinateur, un service, une personne, …
- Une machine proposant un service
- Un Key Distribution Center ou centre de distribution de clés (KDC) qui est le contrôleur de domaine (DC) en environnement Active Directory

![Schéma Kerberos](https://github.com/Theocyg/Blog/raw/main/assets/Blog/assets/Kerberos)

L’idée est que lorsque le client veut accéder au service, aucun mot de passe ne sera envoyé sur le réseau, évitant ainsi des fuites de ceux-ci qui pourraient compromettre le réseau, et l’authentification est centralisée, c’est au niveau du KDC que ça se passe.

Pour cela, le processus est un peu lourd, et se découpe en trois étapes :

- Authentication Service (AS) : Le client doit s’authentifier auprès du KDC
- Ticket-Granting Ticket (TGT) : Il doit ensuite demander un ticket permettant d’accéder au service choisi (par exemple CIFS)
- Accès au service (AP) : Il communique enfin avec le service en lui fournissant le ticket
  C’est un peu comme dans certaines soirées. Vous avez votre pièce d’identité que vous avez fait faire et qui prouve que vous êtes bien vous (TGT). Si vous voulez consommer quelque chose, vous devez vous présenter à la caisse avec cette pièce d’identité (TGT) pour demander un ticket de consommation (ticket de service). La caisse vous donne alors un ticket de consommation tamponné, non falsifiable. Une fois en possession de ce ticket, vous pouvez aller au bar et demander votre consommation en présentant le ticket. Le bar peut vérifier que ce ticket vient bien de la caisse grace au tampon, et vous sert un petit Ricard si vous y avez le droit.

Très sommairement, le processus ressemble à ça :
