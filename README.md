## Eth Wallet Info: view total gas spent by wallet and view NFTs
Simple web application that allows the user to view the total gas used by a wallet, (à la fees.wtf), and view the NFTs owned by a wallet and their details via modal popup.  Allows for Metamask connection, or entering any wallet address via a text form.  

** The NFT listing max is currently set at 20.  This data is pulled from Rarible, and the Rarible API has been pretty janky lately.  Max of 20 seems to produce fairly quick results, higher requests currently error out.  

### Packages used: 
* ReactJS, using functional components and hooks
* Redux used for state, Redux-saga used extensively for handling and monitoring all dispatched actions
* Ethers.js used for misc Eth calcs/address validation
* React Testing Library used for extensive testing throughout components.  Tests written for Redux/Sagas.  
* Uses Etherscan API for gas use, and Rarible API for NFT data.
