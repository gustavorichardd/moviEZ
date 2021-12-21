import { useState } from 'react';
import { RiShoppingCartLine, RiHeartFill, RiSearchLine, RiMenuFill } from 'react-icons/ri'

import logo from '../../assets/ezlogo2.png'

import styles from './styles.module.scss';

export function Header({ openMenuShop, itensOnCart, searchMovie, value, setProps }) {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src={logo} alt="moviEZ logo" />

        <div className={styles.searchInput}>
          <input
            value={value}
            onChange={setProps}
          />
          <RiSearchLine size={30} onClick={searchMovie} />
        </div>

        <div className={styles.menuItens}>

          <a href="">
            <RiHeartFill size={30} color='#fff' />
          </a>
          <a href="" onClick={openMenuShop}>
            <RiShoppingCartLine size={30} color='#fff' />
            <p>{itensOnCart}</p>
          </a>

        </div>
      </div>


    </header>
  );
}
