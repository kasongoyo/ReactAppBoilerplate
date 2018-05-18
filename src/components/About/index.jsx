import React from 'react';

import styles from './styles.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export default function Home() {
  return (
    <div className={cx('wrapper')} >
      <h1 style={{ textAlign: 'center' }}>About Page</h1>
    </div>
  );
}