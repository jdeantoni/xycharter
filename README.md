# ter-xycharter
TER 2020 équipe 13

## Pour lancer la demo :

sudo sh run.sh

option disponibles :

-k : kill les serveurs à la fin de l execution
-db : ne vide pas la base de donnees apres l execution (dont les tests)

## Pour debugger

- Ne pas kill les serveurs en n'utilisant pas l'option -k
- Lancer la commande `sudo pm2 logs`
- Kill les serveurs avec la commande `sudo pm2 kill`