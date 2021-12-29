import { useState } from 'react';
import styles from './styles.module.scss';
import { IoMdTrash } from 'react-icons/io'

export function CheckoutListItem({ removeFromCart, movie }) {
  return (
    <div className={styles.checkoutListItemContainer}>
      <tr className={styles.checkoutListItem}>
        <td><img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.original_title} /></td>
        <td><strong>{movie.original_title}</strong></td>
        <td><p>{movie.quanty}</p></td>
        <td><p>R$ {(movie.vote_average * 10).toFixed(2)}</p></td>
        <td><button onClick={removeFromCart} title='' className={styles.removeLegendActive}>
          <IoMdTrash size={20} color='#000' />
        </button></td>
      </tr>

      {/* <li className={styles.checkoutListItem}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.original_title} />
        <strong>{movie.original_title}</strong>
        <p>{movie.quanty}</p>

        <p>R$ {(movie.vote_average * 10).toFixed(2)}</p>
        <button onClick={removeFromCart}
          title=''
          className={styles.removeLegendActive}>

          <IoMdTrash size={20} color='#000' />


        </button>
      </li> */}
    </div>
  );

}