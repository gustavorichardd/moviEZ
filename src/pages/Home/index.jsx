import { useContext, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { MovieCard } from '../../components/MovieCard';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { api } from '../../service/api';
import { CheckoutListItem } from '../../components/CheckoutListItem';
import { CheckoutContext } from '../../contexts/CheckoutContext'

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWI4NjcyZmVlZWE3MmE3YjNiZjQ4YmQyMzU5OTE2MiIsInN1YiI6IjYxYzA4MWIzYTg0ZmY3MDA2OGY4ZTkwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Phro2w60K9mzcVpTx5JWZsLQ-9eWdxqL_l1SpknArto'


export function Home() {
  const [showMenuShop, setShowMenuShop] = useState(false)
  const [movies, setMovies] = useState([])
  const [moviesOnCheckout, setMoviesOnCheckout] = useState([])
  const [totalOnCheckout, setTotalOnCheckout] = useState(0)
  const [totalItensOnCart, setTotalItensOnCart] = useState(0)
  const [movieName, setMovieName] = useState('')

  const { checkoutList, setCheckoutList } = useContext(CheckoutContext)

  async function getPopularMovies() {
    const { data } = await api.get('/movie/popular', {
      headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN
      }
    })

    setMovies(data.results)
  }

  useEffect(() => {
    getPopularMovies()
  }, [])


  async function handleSearchForMovies() {
    if (movieName.trim() === '') {
      getPopularMovies()
      return null
    }

    const { data } = await api.get('/search/movie/', {
      params: {
        query: movieName
      },
      headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN
      }
    })



    setMovies(data.results)
  }

  function handleAddItemToCart(movie) {
    setTotalItensOnCart(totalItensOnCart + 1)

    const moviesOnCheckoutValidate = moviesOnCheckout;

    const alreadyOnList = moviesOnCheckoutValidate.find(movieOnList => movieOnList.id === movie.id)

    if (!alreadyOnList) {
      movie.quanty = 1
      setTotalOnCheckout(totalOnCheckout + movie.vote_average)
    } else {
      moviesOnCheckoutValidate.map((movieOnList, index) => {
        movieOnList.id === movie.id ? moviesOnCheckoutValidate.splice(index, 1) : null
      })
      movie.quanty += 1
      setTotalOnCheckout(totalOnCheckout + movie.vote_average)

      setMoviesOnCheckout([...moviesOnCheckout, movie])

      return null
    }

    setMoviesOnCheckout([...moviesOnCheckout, movie])
  }


  function handleShowMenuShop(e) {
    e.preventDefault()
    setShowMenuShop(!showMenuShop)
  }

  function handleClearCheckoutList() {
    setMoviesOnCheckout([])
    setTotalOnCheckout(0)
    setTotalItensOnCart(0)
  }

  function handleRemoveItemFromShopList(movie) {
    setTotalItensOnCart(totalItensOnCart - 1)
    const moviesOnCheckoutValidate = moviesOnCheckout;

    if (movie.quanty > 1) {
      moviesOnCheckoutValidate.map((movieOnList, index) => {
        movieOnList.id === movie.id ? moviesOnCheckoutValidate.splice(index, 1) : null
      })
      movie.quanty -= 1

      setTotalOnCheckout(totalOnCheckout - movie.vote_average)

      setMoviesOnCheckout([...moviesOnCheckout, movie])
      return null

    } else {

      moviesOnCheckoutValidate.map((movieOnList, index) => {
        movieOnList.id === movie.id ? moviesOnCheckoutValidate.splice(index, 1) : null
      })
      setTotalOnCheckout(totalOnCheckout - movie.vote_average)

    }
    setMoviesOnCheckout(moviesOnCheckoutValidate)

  }

  function handleToCheckout() {
    setCheckoutList(moviesOnCheckout)
  }

  return (
    <div className={styles.homeContainer}>
      <Header
        value={movieName}
        setProps={e => setMovieName(e.target.value)}

        searchMovie={handleSearchForMovies}
        openMenuShop={handleShowMenuShop}
        itensOnCart={totalItensOnCart}

      />
      <div className={styles.homeContent}>

        <nav className={showMenuShop ? styles.shoppingListMenuActive : styles.shoppingListMenuHidden}>
          <ul className={styles.shoppingListMenu}>
            <div className={styles.shoppingListMenuItens}>
              <div className={styles.shoppingListMenuItensHeader}>
                <strong>Meu Carrinho</strong>
                <a onClick={handleClearCheckoutList}>Esvaziar</a>
              </div>


              {moviesOnCheckout.map((movie, index) => {
                return <CheckoutListItem removeFromCart={() => handleRemoveItemFromShopList(movie)} movie={movie} key={index} />
              })}


            </div>

            <div className="checkoutOptions">
              <div className={styles.totalCheckOutList}>
                <p>Total</p>
                <strong>R$ {(totalOnCheckout * 10).toFixed(2)}</strong>

              </div>
              <Link to='/checkout'>
                <button
                  className={styles.moveToCheckout}
                  onClick={handleToCheckout}
                >
                  Finalizar Compra
                </button>
              </Link>
            </div>


          </ul>
        </nav>

        {movies.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} addToCart={() => handleAddItemToCart(movie)} />
        })}

      </div>
    </div>
  );
}