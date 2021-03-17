# Aragon Network deployment scripts <img align="right" src=".github/assets/aragon.svg" height="80px" /> [![Travis branch](https://img.shields.io/travis/aragon/aragon-court/development.svg?style=for-the-badge)](https://travis-ci.com/aragon/aragon-court/)

> See the [output folder](./data/output) for information on deployed contracts on live networks

## Rinkeby Deployment

To deploy HNY and DAI make sure everything is set in order to use `truffle-hdwallet-provider` and run:
```
npm run deploy:hny -- -n rinkeby
npm run deploy:dai -- -n rinkeby
```

Deploy the token faucet:
```
npm run deploy:faucet -- -n rinkeby
```

Mint tokens for sender address:
```
npm run mint -- --to <sender address> --token HNYT
npm run mint -- --to <sender address> --token DAI 
```
- Now open the tokens in etherscan and `approve()` each to allow the faucet to transfer them.  
- Then execute `deposit()` on the faucet contract to give it funds.  
- Then any addresses can claim from the faucet using `withdraw()`

Deploy the court:
```
npm run deploy:court -- -n rinkeby
```


## Local deployment

To deploy a new Aragon Court instance locally simply run a ganache instance and run the following deployment script:

```
npx ganache-cli -i 15 --gasLimit 8000000 --port 8545
npm run deploy:court:rpc
```

