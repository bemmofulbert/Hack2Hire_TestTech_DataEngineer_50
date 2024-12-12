# DataBeez_Hack2Hire1

## Profil Data Engineer 📉📊👨🏾‍💻

Ce projet est un script de scraping permettant de collecter des données météo journalières du Sénégal, en se concentrant sur les villes de Dakar et Thiès, à partir d'OpenWeather. 

### Données collectées
- Nom de la ville
- Température
- Description météo
- Pression
- Humidité
- Timestamp

Les données sont ensuite chargées dans une base de données relationnelle PostgreSQL.

## Démarrage 🚀

Pour lancer le script, utilisez les commandes suivantes :

Lancer le backend (api):
```bash
cd backend
npm i
npm start
```

lancer le script le script de scraping:
```bash
cd ..
npm i
npm start
```

Ces commandes permettront de démarrer l'API qui fournit des données de la base de données ainsi que le script de scraping, ajoutant ainsi les données à la base de données.

## dump.json 🗄️

Ce fichier est un export de notre base de données
