![Travis build](https://travis-ci.org/robertnovo/progressive-webapp.svg?branch=master)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Att förbereda inför Kompetensdagen

* Svara på kallelsen senast onsdag kväll (7 december) om du vill ha mat.
* Klona [github repot](http://github.com/robertnovo/progressive-webapp/)
* Testa att du kan starta appen (både med server och klient) lokalt.
  Om du lyckas så ska du få upp en sida med julbilder.
* Skicka ditt användarnamn för github till robert så han kan ge dig commit rättigheter.



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

Om vi får tid över kan vi även kolla på Googles PageSpeed test för att se vad den tycker vi behöver fixa i appen.
[https://developers.google.com/speed/pagespeed/insights/](https://developers.google.com/speed/pagespeed/insights/)
