Cet article vise à clarifier rapidement et simplement les concepts du deep web et du dark web. Beaucoup de gens me demandent si je suis déjà allé sur ces trucs sans vraiment comprendre ce que c'est ni quelles sont les différences. Cet article n'a pas pour but de faire une étude approfondie, mais plutôt de donner une idée claire et rapide de ce que signifient ces termes. Je propose donc quelques lignes pour expliquer en 5 minutes ce qu'impliquent ces termes.

## Deep Web

Le _deep web_, ou web profond, est la partie "cachée" d'Internet, à opposer au web visible. Comme les deux s'opposent, expliquer l'un permet de comprendre l'autre.

### Web Visible

Le web visible, c'est celui que l'utilisateur lambda connaît et parcourt. Ce sont toutes les pages web référencées par les moteurs de recherche comme Yahoo, Google, Qwant, Bing, etc. Un moteur de recherche effectue par définition une recherche dans une base de données qu'il a créée en référençant des pages. Pour cela, il tente de **trouver** toutes les pages web possibles et essaie de **comprendre** leur contenu afin de les proposer à l'utilisateur lors d'une recherche par mots-clés.

Pendant longtemps, les moteurs de recherche ne comprenaient que les pages écrites en HTML (trouvables), donc ce n'étaient qu'elles qui étaient indexées. Mais avec le temps, ces moteurs parviennent à comprendre d'autres types de fichiers comme les PDF, les documents Word, etc. Donc actuellement, quand vous faites une recherche sur un moteur de recherche classique, vous avez accès à ces types de pages.

### Web Profond

Cependant, il existe une multitude de pages ou documents que les moteurs de recherche classiques ne peuvent pas référencer, soit parce qu'ils n'ont tout simplement **pas accès** à la page, soit parce qu'ils ne **peuvent pas la comprendre**.

On trouve dans le lot les pages avec des liens dynamiques (qui changent en fonction de chaque utilisateur), celles protégées par un mot de passe ou un captcha, les pages sur lesquelles aucun lien ne pointe, les documents non compris par les moteurs de recherche, ou encore les noms de domaines dont la résolution DNS n'est pas standard, avec par exemple une racine qui n'est pas enregistrée chez l’[ICANN](https://www.icann.org/fr). J'entends par là que les racines de nom de domaine connues par l'ICANN sont les .com, .fr, .co, .gouv, etc., mais qu'il en existe des non standards, seulement accessibles via des serveurs DNS non standards. Un exemple connu est la racine .onion dont la résolution n'est possible que via le réseau [TOR](https://www.torproject.org/).

Vous voyez, il existe de nombreux, **très** nombreux cas pour lesquels les moteurs de recherche tels que nous les connaissons sont incapables d'indexer une ressource. Toutes ces ressources classiquement inaccessibles forment ce qu'on appelle le _deep web_.

## Dark Web

Le dark web n’est pas qualifié de « sombre » (dark) parce qu’il est intrinsèquement mauvais ; il est appelé ainsi parce qu’il offre de la confidentialité, qui peut être utilisée à bon ou à mauvais escient. Une grande confusion existe entre le _dark web_ et le _deep web_. **Non**, le _dark web_ **n'est pas** le _deep web_. Le _dark web_ est une partie du _deep web_. Le _dark web_ repose sur les _darknets_, et un darknet n'est rien d'autre qu'un réseau P2P (_peer-to-peer_, ami-à-ami) dans lequel les utilisateurs sont considérés comme des personnes de confiance, et les échanges sont anonymes, donc les IP ne sont pas publiquement partagées. Un exemple connu de _dark web_ est [Freenet](https://freenetproject.org/), qui n'est finalement rien de plus qu'un **réseau anonyme** et **distribué** fondé sur l'internet.

### Technologies Clés

- **Tor (The Onion Router)** : Utilise un système de routage en oignon pour masquer l'adresse IP de l'utilisateur. Chaque nœud du réseau ne connaît que l'adresse précédente et suivante, rendant la traçabilité difficile.
- **I2P (Invisible Internet Project)** : Un réseau anonyme qui permet des communications sécurisées et anonymes.
- **Freenet** : Un réseau décentralisé qui permet de publier et de stocker des informations de manière anonyme.

### Utilisations Légitimes du Dark Web

Le dark web n'est pas seulement utilisé pour des activités illégales. Il offre également des avantages pour :

- **Journalistes** : Pour communiquer avec des sources de manière sécurisée.
- **Activistes** : Pour organiser des mouvements dans des régimes oppressifs.
- **Citoyens** : Pour protéger leur vie privée contre la surveillance. confidentialité bien plus élevé.

### Risques et Sécurité

Naviguer sur le dark web comporte des risques :

- **Malware** : Les sites peuvent contenir des logiciels malveillants.
- **Escroqueries** : Les transactions peuvent être frauduleuses.
- **Surveillance** : Bien que l'anonymat soit un objectif, il n'est pas garanti.

'espère que ces explications vous ont aidé à mieux comprendre les différences entre deep web et dark web. Il est crucial de ne pas confondre **anonymat** et **illégalité**. Bien que les activités illégales cherchent souvent à rester anonymes, l'inverse n'est pas toujours vrai. Nous avons parfaitement le droit de vouloir rester anonymes pour protéger notre vie privée et éviter la surveillance. Après tout, l'anonymat, c'est la protection de la vie privée.

Peut-être qu'un prochain article pourrait vous guider sur la manière d'accéder à ces réseaux dans les meilleures conditions ?
