import PropTypes from 'prop-types'
import { Star, StarHalf, StarFill } from 'react-bootstrap-icons'
export const Rating = ({ value, text, color }) => {
  return (
    <div className='d-flex align-items-center' style={{ fontSize: '12px' }}>
      <span className='d-flex align-items-center'>
        {value >= 1 ? (
          <StarFill size={12} className='me-1' color={color} />
        ) : value >= 0.5 ? (
          <StarHalf size={12} className='me-1' color={color} />
        ) : (
          <Star size={12} className='me-1' color={color} />
        )}
      </span>
      <span className='d-flex align-items-center'>
        {value >= 2 ? (
          <StarFill size={12} className='me-1' color={color} />
        ) : value >= 1.5 ? (
          <StarHalf size={12} className='me-1' color={color} />
        ) : (
          <Star size={12} className='me-1' color={color} />
        )}
      </span>
      <span className='d-flex align-items-center'>
        {value >= 3 ? (
          <StarFill size={12} className='me-1' color={color} />
        ) : value >= 2.5 ? (
          <StarHalf size={12} className='me-1' color={color} />
        ) : (
          <Star size={12} className='me-1' color={color} />
        )}
      </span>
      <span className='d-flex align-items-center'>
        {value >= 4 ? (
          <StarFill size={12} className='me-1' color={color} />
        ) : value >= 3.5 ? (
          <StarHalf size={12} className='me-1' color={color} />
        ) : (
          <Star size={12} className='me-1' color={color} />
        )}
      </span>
      <span className='d-flex align-items-center'>
        {value >= 5 ? (
          <StarFill size={12} className='me-1' color={color} />
        ) : value >= 4.5 ? (
          <StarHalf size={12} className='me-1' color={color} />
        ) : (
          <Star size={12} className='me-1' color={color} />
        )}
      </span>

      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}
