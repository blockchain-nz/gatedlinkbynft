import React, { Component } from 'react';

import GatedLink from './GatedLink'

import './GatedLinks.css'

export default class GatedLinks extends React.Component {
  render() {
      return (
	    <div>
	      <h1>
	      Gated List which you can access
	      </h1>
	      <div className='GatedLinks-wrapper'>
	      	{this.props.links.map((link, index) => {
		  return (
		    <div key={index} className='GatedLinks-info-box'>
		  	<GatedLink link={link} />
		    </div>
		  )
	        })}
	      </div>
	    </div>
      );
  }
}
