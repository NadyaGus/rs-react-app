import { Component } from 'react';

interface CardProps {
  image: string;
  title: string;
  description: string;
}

class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h2>{this.props.title}</h2>
        <img src={this.props.image} alt={this.props.title} />
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export { Card };
