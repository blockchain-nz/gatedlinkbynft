import React from 'react';

import GatedLink from './GatedLink'

import './GatedLinks.css'

export default class GatedLinks extends React.Component {

  render() {
      return (
	    <div>
	      <h1>
	      GatedLinks based the NFS owned in this address 
	      </h1>
	      <div className='GatedLinks-wrapper'>
	      	{this.props.links.map((link, index) => {
		  if (link.eligible === true) {
		  return (
		    <div key={index} className='GatedLinks-info-box'>
		  	<GatedLink link={link} />
		    </div>
		  )
		  } else {
		    return null
		  }
		})}
	      </div>
	    </div>
      );
  }
}
