import { createContext, useState, useMemo } from 'react';

export const CheckoutContext = createContext({
  checkoutList: [],
  setCheckoutList: () => [{}],
})

export function CheckoutProvider({ children }) {
  const [checkoutList, setCheckoutList] = useState([])

  const setCheckoutListMemo = useMemo(
    () => ({ checkoutList, setCheckoutList }),
    [checkoutList]
  )

  return (
    <CheckoutContext.Provider value={setCheckoutListMemo}>
      {children}
    </CheckoutContext.Provider>
  );
}