# Googol

Aplicação em Ionic 3 do Googol.


**Atenção:** Esse projeto foi baseado no [quickstart provido pelo Auth0](https://github.com/auth0-samples/auth0-ionic3-samples/tree/master/01-Login) 


## Dependências:

Instalar **Ionic e Cordova** globalmente:

```
$ npm install -g ionic cordova
```

> **Lembrete:** Talvez você precise usar `sudo` para executar esse comando.

Para rodar a aplicação você vai precisar de um emulador ou para IOS ou para Android.  
Para **iOS**, você deve instalar o [Xcode](https://developer.apple.com/xcode/)  
Para **Android**, instale o [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) e o emulador a sua escolha como:  
    [Android Studio](https://developer.android.com/studio/index.html) ou  
    [Genymotion](https://www.genymotion.com/)   


## Adicionando Custom URL Scheme Plugin

```bash
$ ionic cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=com.auth0.ionic --variable ANDROID_SCHEME=com.auth0.ionic --variable ANDROID_HOST=team-schedule.auth0.com --variable ANDROID_PATHPREFIX=/cordova/com.auth0.ionic/callback
```


## Rodando o App

```bash
# Add platform (e.g., ios or android)
$ ionic cordova platform add {platform}
# Run on desired platform (e.g., ios or android)
$ ionic cordova run {platform} --livereload
```


## Lembre-se:

![](http://i.imgur.com/OUkLi.gif)

