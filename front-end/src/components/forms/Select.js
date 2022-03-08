import React from 'react'
import { Form } from 'react-bootstrap'

export const Select = React.forwardRef(
  ({ label, name, error, defaultOption, options, ...rest }, ref) => {
    return (
      <Form.Group className='mb-3' controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Select ref={ref} {...rest} isInvalid={error}>
          {defaultOption && <option>{defaultOption}</option>}
          {options.map(option => (
            <option
              disabled={option.disabled || false}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </Form.Select>
        {error && (
          <Form.Control.Feedback type='invalid'>
            {error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    )
  }
)
