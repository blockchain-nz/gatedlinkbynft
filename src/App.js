import React from 'react';
import './App.css';
import * as Web3 from 'web3';

let web3Provider = typeof window.ethereum !== 'undefined'
? window.ethereum
: new Web3.providers.HttpProvider('https://mainnet.infura.io');

export default class App extends React.Component {
  state = {
    accountAddress: null,
    networkId: null
  }
  
  onChangeNetwork(chainId) {
    // TODO: Set network name based on chainId mapping
    this.setState({
      networkId: chainId
    })
  }

  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== this.state.accountAddress) {
      this.setState({
        accountAddress:  accounts[0]
      })
    }
  }

  connectWallet() {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }) 
    } else {
      const errorMessage = 'You need an Ethereum wallet. Unlock your wallet, get MetaMask.io etc.'
      alert(errorMessage)
      throw new Error(errorMessage)
    }
    this.onChangeNetwork(1);
  }

  constructor(props) {
    super(props)

    this.connectWallet = this.connectWallet.bind(this);

    window.ethereum.on('chainChanged', chainId => {
      this.onChangeNetwork(chainId);
    })
    window.ethereum.on('accountsChanged', accounts => {
      this.handleAccountsChanged(accounts);
    })
  }

  render() {
    return (
      <div>
        <header className="App-heder">
          <span onClick={this.connectWallet}>Click here to Link Wallet</span>
        </header>
        <h2>{this.state.accountAddress}</h2>
        <h2>{this.state.networkId}</h2>
      </div>
    )
  }
}
