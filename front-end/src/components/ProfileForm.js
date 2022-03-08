import { FormControl } from './forms/FormControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/actions/authActions'
import { updateProfileSchema } from '../validations/auth.validation'

export const ProfileForm = ({
  user: { email, name, phone, birthday, gender },
}) => {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isDirty },
  } = useForm({
    mode: 'all',
    reValidateMode: 'all',
    defaultValues: {
      email,
      name,
      phone,
      gender,
      birthday: new Date(birthday).toISOString().split('T')[0],
    },
    resolver: yupResolver(updateProfileSchema),
  })

  const onSubmit = data => {
    // get data change
    const userBody = {}
    for (const key of Object.keys(dirtyFields)) {
      userBody[key] = data[key]
    }
    dispatch(updateUser(userBody))
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label='Full name'
        name='name'
        control={control}
        placeholder='Enter full name'
      />

      <FormControl
        label='Email'
        name='email'
        type='email'
        control={control}
        placeholder='Enter email'
      />
      <FormControl
        label='Phone'
        name='phone'
        control={control}
        placeholder='Enter phone number'
      />
      <FormControl
        label='Date of birth'
        name='birthday'
        type='date'
        control={control}
      />
      <FormControl
        type='radio'
        defaultChecked={gender}
        label='Gender'
        name='gender'
        control={control}
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ]}
      />
      <Button disabled={!isDirty} type='submit' variant='dark'>
        Update
      </Button>
    </Form>
  )
}
