import React, { Component } from 'react';

export default class GatedLink extends React.Component {
  render() {
      return (
	      <div>
	      {this.props.link.title}
	      <a href={this.props.link.url} target='_blank'>
	          <img src={this.props.link.img} width='100%' />
	      </a>
	      </div>
      );
  }
}
