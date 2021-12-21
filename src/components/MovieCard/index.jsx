import styles from './styles.module.scss';
import { RiHeartFill, RiStarFill } from 'react-icons/ri'

import { useEffect, useState } from 'react';
import { genreList } from '../../utils/genreList';

const monName = ["Janeiro", "Fevereiro", "Março", "abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]



export function MovieCard({ movie, addToCart }) {
  const [genre, setGenre] = useState('')

  function convertDataToPTBR(data) {
    const oldData = data.split('-')
    const date = new Date(oldData[0], oldData[1], oldData[2])
    return date.getDate() + " de " + monName[date.getMonth()] + ", " + date.getFullYear()
  }

  async function getGenreById() {
    const genreFilter = genreList.find((genre) => genre.id === movie.genre_ids[0])
    setGenre(genreFilter.name)
  }

  useEffect(() => {
    getGenreById()
  }, [])


  return (
    <div className={styles.movieCardContainer}>
      <RiHeartFill size={36} color='#e3be28' className={styles.favoriteIcon} />

      <div className={styles.movieCardImage}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.original_title} />
        <p>{convertDataToPTBR(movie.release_date)}</p>
      </div>

      <div className={styles.movieCardDescription}>
        <strong>{movie.original_title}</strong>

        <div className={styles.movieCardDescriptionDetail}>
          <div className={styles.movieCardDescriptionDetailScore}>
            <RiStarFill size={16} color='#e3be28' />
            <strong>{movie.vote_average}</strong>
          </div>
          <p>{genre}</p>
        </div>

        <div className={styles.movieCardValue}>
          <p><strong>R$</strong> {(movie.vote_average * 10).toFixed(2)}</p>
        </div>

      </div>
      <button className={styles.addCartButton}
        onClick={addToCart}>
        <strong>Adicionar</strong>
      </button>
    </div>
  )
} 