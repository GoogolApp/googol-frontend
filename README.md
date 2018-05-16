# Googol

E aí Peixe! Este é um pequeno tutorial de como desenvolver o front do googol-app. Antes de mais nada, tenha em sua máquina:
  - NodeJS
  - Yarn
  - Ionic v3

### Instalando

Intalando as dependências e rodando o server.

```sh
$ yarn install
$ ionic serve
```

### Build (rodando no dispositivo)

Ler mais em : https://ionicframework.com/docs/intro/deploying/

#### IOS
Requer que você tenha o xcode instalado:
```sh
$ ionic cordova build ios --prod
```
Depois abrir o projeto xcode na pasta /platforms/ios/ e rodar no dispositivo

#### Android
Requer que você tenha o Android Studio instalado e o dispositivo em Debug:
```sh
$ ionic cordova run android --device
```