import { Component } from 'react';
import { CardProps } from '../../types/cardTypes';
import styles from './card.module.css';

const MAX_SYNOPSIS_LENGTH = 750;

class Card extends Component<CardProps> {
  handleSynopsis(str: string) {
    if (!str) {
      return 'No synopsis yet...';
    }
    if (str.length > MAX_SYNOPSIS_LENGTH) {
      return str.slice(0, MAX_SYNOPSIS_LENGTH) + '...';
    }

    return str;
  }

  render() {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>
          {this.props.title_english ?? this.props.title_japanese ?? 'No title'}
        </h2>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={this.props.images.webp.image_url}
              alt={this.props.title_english}
            />
          </div>
          <p className={styles.synopsis}>
            {this.handleSynopsis(this.props.synopsis)}
          </p>
        </div>
      </div>
    );
  }
}

export { Card };
