import { RiShoppingCartLine, RiHeartFill, RiSearchLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';

import logo from '../../assets/ezlogo.png'

import styles from './styles.module.scss';

export function Header({ openMenuShop, itensOnCart, searchMovie, value, setProps }) {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link to="/"><img src={logo} alt="moviEZ logo" /></Link>

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
