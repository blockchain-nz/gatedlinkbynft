import React from 'react';
import './App.css';
import * as Web3 from 'web3';
import GatedLinks from './GatedLinks';

// TODO: For other providers
//var web3 = typeof window.ethereum !== 'undefined'
//? window.ethereum
//: new Web3.providers.HttpProvider('https://mainnet.infura.io');
var web3 = new Web3(window.ethereum || new Web3.providers.HttpProvider('https://mainnet.infura.io'))

export default class App extends React.Component {
  state = {
    accountAddress: null,
    networkId: null,
    links: null
  }

  static miniabi = [{
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    }]

  onChangeNetwork(chainId) {
    console.log('on change network')
    this.setState({
      networkId: chainId
    })
    this.filterLinksByNft(this.state.accountAddress)
  }

  handleAccountsChanged(accounts) {
    console.log('handle accounts changed')
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== this.state.accountAddress) {
      console.log('Change account to : ' + accounts[0])
      this.setState({
        accountAddress:  accounts[0]
      })
      this.filterLinksByNft(accounts[0])
    }
  }

  filterLinksByNft(account) {
    console.log('filter links by nft')
    if (this.state.links === null) {
	console.log('Links is empty')
        return
    }
    var filterLinks = JSON.parse(JSON.stringify(this.state.links))
    const forLoop = async _ => {
    for (let link of filterLinks) {
      if ('0x'+link.tokens[0].network !== this.state.networkId) {
          link.eligible = false
	  continue
      }
      const contract = new web3.eth.Contract(App.miniabi, link.tokens[0].address);
      var balance = await contract.methods.balanceOf(account).call()
      console.log('Users address ' + account + ' has ' + balance + ' of NFT')
      console.log('GatedLink ' + link.url + ' need NFT ' + link.tokens[0].address + " minimal balance threshold is " + link.tokens[0].minbal)

      if (balance >= link.tokens[0].minbal) {
        link.eligible = true
      } else {
        link.eligible = false
      }
    }

    console.log('set state after filterLinks')
    this.setState({
      links: filterLinks
    })
    }  
    forLoop()
  }

  connectWallet() {
    console.log('connnect wallet')
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
	this.handleAccountsChanged(accounts)
      })
      window.ethereum.request({ method: 'eth_chainId' }).then(chainid => {
        this.onChangeNetwork(chainid)
      })
    } else {
      const errorMessage = 'You need an Ethereum wallet. Unlock your wallet, get MetaMask.io etc.'
      alert(errorMessage)
      throw new Error(errorMessage)
    }
  }

  getGatedLinks() {
    fetch("/links_user")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
	  links: data //JSON.stringify(data)
        })
      })
  }

  componentDidMount() {
    console.log('Component Did Mount')
    this.getGatedLinks();
  }

  constructor(props) {
    super(props)

    this.connectWallet = this.connectWallet.bind(this);
    this.getGatedLinks = this.getGatedLinks.bind(this);
    this.filterLinksByNft = this.filterLinksByNft.bind(this);

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

	<div>{!this.state.links ? "Loading..." : (<GatedLinks links={this.state.links} address={this.state.accountAddress}></GatedLinks>)}</div>
      </div>
    )
  }
}
