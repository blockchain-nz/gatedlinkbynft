import React from 'react';

import GatedLink from './GatedLink'

import './GatedLinks.css'

export default class GatedLinks extends React.Component {

  render() {
      const nolinks = this.props.links.length === 0
      var noEligibleLinks = true
      return (
	    <div>
	      <h1>
	      GatedLinks based the NFS owned in this address 
	      </h1>
		<div>
	          {
                   nolinks
		     ? <p>You do not have Gated Links protected by your NFTs in this eth account. Try change account which own different NFTs</p> 
		     : <div className='GatedLinks-wrapper'>
		     {
                       this.props.links.map((link, index) => {
		         if (link.eligible === true) {
		           noEligibleLinks = false
		           return (
		              <div key={index} className='GatedLinks-info-box'>
		              <GatedLink link={link} />
		              </div>
		           )
		         } else {
		           return null
		         }
		       })
                     }
	             </div>
		  }
		</div>
	      {noEligibleLinks ? <p style={{textAlign:'center'}}><b>There is no Gated Links</b></p> : null}
	    </div>
      );
  }
}
