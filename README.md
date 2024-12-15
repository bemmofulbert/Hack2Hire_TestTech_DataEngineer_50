# DataBeez_Hack2Hire1

## Profil Data Engineer 📉📊👨🏾‍💻

Ce projet est un script de scraping et son environnement permettant de collecter des données météo journalières du Sénégal, en se concentrant sur les villes de Dakar et Thiès, à partir d'OpenWeather. 

### Données collectées
- Nom de la ville
- Température
- Description météo
- Pression
- Humidité
- Timestamp

Les données sont ensuite chargées dans une base de données relationnelle PostgreSQL.

## Démarrage 🚀

Pour lancer le script, utilisez la commande suivante :

```bash
docker compose up
```


Cette commande permet de démarrer l'API qui fournit des données de la base de données ainsi que le script de scraping une (01) seule fois, ajoutant ainsi les données à la base de données.
Si vous voulez refaire un scraping executez la meme commande

## Consulter les donnees collectees 🗄️

Vous pouvez consulter les donnees collectees a l'adresse:

```bash
http://${BACKEND_NODE_IP}:${BACKEND_NODE_PORT}/weather # par defaut http://172.18.0.3:3000/weather
```

Voir .env pour les variables d'environnement

## data.json

Ce fichier contient les données collectees jusqu'a maintenant


<a href="https://lookerstudio.google.com/s/inen86cLqKg"><img src="https://i.ibb.co/hDddMV4/22.png" alt="22" border="0"></a>
<a href="https://lookerstudio.google.com/s/inen86cLqKg">voir looker studio</a>