# Pylons vue frontend
This repository contains a frontend client for the pylons blockchain. User of this client will be able to play the game "NFTArena" built on pylons blockchain.

## Setup frontend for cc-node
With the following setup you can run this frontend as a client of the crowd-control server.
1. Clone this repo `git clone git@github.com:HackAtomVI/pylons-vue-frontend.git`
2. Use the "main"-branch `git checkout origin/main`
3. In this folder run `npm i`
4. In this folder run `npm run serve`
5. The website will be available in your browser at `localhost:8080`

## Setup frontend for own node
With the following setup you can run this frontend as a client for your local pylons-node.
### Setup chain
1. Clone the pylons repo `git clone git@github.com:Pylons-tech/pylons.git`
2. Checkout the branch containing the battle transaction `git checkout origin/hackatom-cc`
3. Start the blockchain `starport chain serve`

### Setup frontend
4. Clone this repo `git clone git@github.com:HackAtomVI/pylons-vue-frontend.git`
5. Use the "localBlockchain"-branch `git checkout origin/localBlockchain`
6. In this folder run `npm i`
7. In this folder run `npm run serve`
8. The website will be available in your browser at `localhost:8080`

## App UI Template

[Vue.js](https://vuejs.org/)-based web app template for your Cosmos SDK blockchain. Use the template to quickly bootstrap your app. To learn more, check out the components in `@starport/vue` and the [Starport documentation](https://docs.starport.network/).

## Run for Production

npm run build
serve -S dist
