import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Rating } from './Rating'

export const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/products/${product.id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link
          style={{ textDecoration: 'none', color: '#555656', fontSize: '14px' }}
          to={`/products/${product.id}`}
        >
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h5'>$ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}
