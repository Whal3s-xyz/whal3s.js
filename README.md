 <div align="center">
 <img align="center" width="230" src="https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/Whal3s_black.png" />
  <h2>Utility made easy</h2> 
<blockquote>Javascript library for Whal3s developer platform</blockquote>


</div>



## Contents

- [Demo (coming soon)](https://demo.whal3s.xyz)
- [Description](#description)
- [Documentation](#documentation)
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Usage](#usage)
  - [Initialize Whal3s](#Initialize-Whal3s)
  - [NFT Validation Utility](#NFT-Validation-Utility)
- [Customization](#Customization)
- [ToDo](#ToDo)
- [Tests](#tests)
- [License](#license)

## Description

Developer platform to easily create, deliver & manage any kind of token utility.  
This library is used to quickly and efficiently integrate the Whal3s developer platform into your existing tech stack. It is written in TypeScript, but thanks to UMD build it also offers support for vanilla JS or frameworks like React or Angular.

## Documentation
See the [`whal3s.js` API docs](https://docs.whal3s.xyz/reference/whal3s-js-get-started) for Guides, Examples and API endpoint definitions.

## Requirements
To use this library, you need an account on [app.whal3s.xyz](https://app.whal3s.xyz), as well as a utility ID.
You can get this by creating a utility via the platform.

## Installation
Install the **whal3s.js** package with [NPM](https://www.npmjs.org/):

    npm install @whal3s/whal3s.js

## Usage


### Initialize Whal3s
```javascript
 const whal3s = new Whal3s();
```
### NFT Validation Utility
To use your NFT validation utility, you need to initialize the utility with your utility ID. 
You can get your utility ID from the platform or the API.

But be careful. Whal3s utilities are working in steps. [Read the documentation carefully](https://docs.whal3s.xyz/reference/steps).

  
```javascript
 const utility = await whal3s.createValidationUtility(_id)
```

#### Connect wallet
```javascript
await utility.connectWallet()
```
#### Sign message
```javascript
await utility.sign()
```
#### Select NFT
```javascript
utility.tokenId = tokenId
```
#### Reservations
```javascript
await utility.reserveEngagement()
```

#### Claiming
```javascript
await utility.storeEngagement({JSON_METADATA})
```



### Customization

Whal3s is developed in partnership with Blocknatives' web3-onboard.
You can customize the wallet connection modal by passing initOptions to the Whal3s constructor.

```javascript
const whal3s = new Whal3s({
  accountCenter: {
      //...
  }
})
```

Find all available options [here](https://onboard.blocknative.com/docs/modules/core#initialization).


```javascript

## ToDo
- [x] Wallet connection
- [x] NFT Ownership Validation Utility aka token gating
- [x] Demo page
- [ ] Write tests
- [x] Customize wallet-connect-functionallity
- [x] GitHub hooks
- [x] Deploy to npm



## Tests

The whal3s.js project comes with a demo to test and
[Unit Tests](https://en.wikipedia.org/wiki/Unit_testing).    
There are two different ways to run the tests:

- Start demo by using `npm run serve`
- run `npm test` in the Terminal in the root path of the repository package.

The first one let you test the user experience in the browser, the second one tests unit tests.
## License

The JavaScript Templates script is released under the  
[MIT license](https://opensource.org/licenses/MIT).
