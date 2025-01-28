import { Component } from 'react';
import { CardProps } from '../../types/cardTypes';

class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h2>{this.props.title_english}</h2>
        <img
          src={this.props.images.webp.image_url}
          alt={this.props.title_english}
        />
        <p>{this.props.synopsis}</p>
      </div>
    );
  }
}

export { Card };
