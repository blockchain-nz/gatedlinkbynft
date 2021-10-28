import React from 'react';
import './App.css';
import * as Web3 from 'web3';
import GatedLinks from './GatedLinks';

// TODO: For other providers
let web3Provider = typeof window.ethereum !== 'undefined'
? window.ethereum
: new Web3.providers.HttpProvider('https://mainnet.infura.io');

export default class App extends React.Component {
  state = {
    accountAddress: null,
    networkId: null,
    links: null,
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
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
	this.handleAccountsChanged(accounts);
      })
    } else {
      const errorMessage = 'You need an Ethereum wallet. Unlock your wallet, get MetaMask.io etc.'
      alert(errorMessage)
      throw new Error(errorMessage)
    }
    this.onChangeNetwork(1);
  }

  getGatedLinks() {
    fetch("/links_user")
      .then((res) => res.json())
      .then((data) => this.setState({
	      links: data //JSON.stringify(data)
      }))
  }

  componentDidMount() {
    this.getGatedLinks();
  }

  constructor(props) {
    super(props)

    this.connectWallet = this.connectWallet.bind(this);
    this.getGatedLinks = this.getGatedLinks.bind(this);

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
          <input type="button" onClick={this.connectWallet} value='Click here to Link Wallet' />
	</header>
        <h1>
          <p>Your account address: {!this.state.accountAddress ? "Please connect wallet" : this.state.accountAddress}</p>
          <p>Network ID: {this.state.networkId}</p>
        </h1>

	<p>{!this.state.links ? "Loading..." : (<GatedLinks links={this.state.links}></GatedLinks>)}</p>
      </div>
    )
  }
}
