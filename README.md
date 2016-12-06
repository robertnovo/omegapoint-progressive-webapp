![Travis build](https://travis-ci.org/robertnovo/progressive-webapp.svg?branch=master)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


# Op progressive web app: photo feed
DEMO: [https://op-web-progressiv-app.herokuapp.com/](https://op-web-progressiv-app.herokuapp.com/)

När man commitar till repot, så deployar applikation automatiskt till heroku genom travis-ci


### Köra lokalt

1. ```npm install```
2. öppna ny terminal i samma mapp och kör: ```node server.js```
3. kör ```npm start``` från annat fönster

Nu ska servern vara igång, samtidigt som din app som går att nås på localhost:3000 i browsern.

### Verifiera progressive-iteten!
[https://github.com/GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse)

```lighthouse https://op-web-progressiv-app.herokuapp.com/```

Målet är att få grönt på så många punkter vi hinner med!
