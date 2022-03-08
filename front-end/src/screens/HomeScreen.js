import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { productsSelector } from '../redux/selectors'
import { getProducts } from '../redux/actions'

import { Product } from '../components/Product'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'

export const HomeScreen = () => {
  const dispatch = useDispatch()
  const {
    loading,
    error,
    data: { products },
  } = useSelector(productsSelector)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}
