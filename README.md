## Groupomania : Réseau social d'entreprise V1
### React / NodeJs / MySQL / Sequelize
_____________________________

Démarrer le server : `npm start`

Démarrer le front : `cd client` + `npm start`

_____________________________

### Back config :

* Mettez vos informations de **Base de données** dans `/config/db.js`
* Créez le fichier `.env` dans `/config/` avec les données suivantes :
   - PORT=3001 `votre port localhost`
   - CLIENT_URL=http://localhost:3000 `votre URL client`
   - USER=root `votre identifiant`
   - PASSWORD= `votre mot de passe`
   - TOKEN_SECRET=1321345643035356457979243 `votre clé secrète aléatoire`
_________________________

### Front config : 

* Dans le dossier `.env` vérifiez que les lignes suivantes sont bien présentes :
   - REACT_APP_API_URL=http://localhost:3000/ `l'url de votre serveur`
_____________________________
