import React from 'react';
import styles from './Thumb.module.css';

const Thumb = ({ name }) => {
  return <div className={styles.thumb}>{name.substring(0, 1)}</div>;
};

export default Thumb;
