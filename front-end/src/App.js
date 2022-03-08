import './app.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { RequireAuth } from './components/RequireAuth'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomeScreen } from './screens/HomeScreen'
import { ProductScreen } from './screens/ProductScreen'
import { CartScreen } from './screens/CartScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { ShippingScreen } from './screens/ShippingScreen'
import { PaymentScreen } from './screens/PaymentScreen'
import { PlaceOrderScreen } from './screens/PlaceOrderScreen'
import { OrderScreen } from './screens/OrderScreen'
import { UserListScreen } from './screens/UserListScreen'
import { UserEditScreen } from './screens/UserEditScreen'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='my-2'>
        <Container>
          <Routes>
            <Route path='/' index element={<HomeScreen />} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/sign-in' element={<LoginScreen />} />
            <Route path='/sign-up' element={<RegisterScreen />} />
            <Route
              path='/profile'
              element={
                <RequireAuth>
                  <ProfileScreen />
                </RequireAuth>
              }
            />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route
              path='/payment'
              element={
                <RequireAuth>
                  <PaymentScreen />
                </RequireAuth>
              }
            />
            <Route
              path='/placeorder'
              element={
                <RequireAuth>
                  <PlaceOrderScreen />
                </RequireAuth>
              }
            />
            <Route path='/orders/:orderId' element={<OrderScreen />} />
            <Route
              path='/admin/userlist'
              element={
                <RequireAuth>
                  <UserListScreen />
                </RequireAuth>
              }
            />
            <Route
              path='/admin/users/:userId/edit'
              element={
                <RequireAuth>
                  <UserEditScreen />
                </RequireAuth>
              }
            />

            <Route
              path='/cart'
              element={
                <RequireAuth>
                  <CartScreen />
                </RequireAuth>
              }
            >
              <Route path=':productId' element={<CartScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
