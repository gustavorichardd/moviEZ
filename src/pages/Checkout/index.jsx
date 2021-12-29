import { useEffect, useContext } from 'react';
import { CheckoutContext } from '../../contexts/CheckoutContext'
import { CheckoutListItem } from '../../components/CheckoutListItem';

import styles from './styles.module.scss';

export function Checkout() {

  const { checkoutList, setCheckoutList } = useContext(CheckoutContext)

  useEffect(() => {

  }, [])


  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.userProfile}>
        <strong>Finalizar compra</strong>

        <input type="text" placeholder='Nome Completo' />

        <div className={styles.idAndPhone}>
          <input type="text" placeholder='CPF' />
          <input type="text" placeholder='Celular' />
        </div>
        <input type="text" placeholder='E-mail' />

        <div className={styles.adress}>
          <input type="text" placeholder='CEP' />
          <input type="text" placeholder='Endereço' />
        </div>


        <div className={styles.adressDetail}>
          <input type="text" placeholder='Cidade' />
          <input type="text" placeholder='Estado' />
        </div>
      </div>
      <div className={styles.itensReview}>
        <table>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Qtd</th>
            <th>Preço</th>
          </tr>
          {checkoutList.map((movie, index) => {
            return <CheckoutListItem removeFromCart={() => handleRemoveItemFromShopList(movie)} movie={movie} key={index} />
          })}
        </table>
      </div>
    </div>
  );
}