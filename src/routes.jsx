import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import { CheckoutProvider } from './contexts/CheckoutContext'

import { Home } from './pages/Home'
import { Checkout } from './pages/Checkout';

export function Router() {
  return (
    <CheckoutProvider >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </CheckoutProvider>
  )
};