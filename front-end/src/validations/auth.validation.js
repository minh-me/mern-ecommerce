import * as Yup from 'yup'

export const updateProfileSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  phone: Yup.string().required().label('Phone'),
  gender: Yup.mixed()
    .oneOf(['male', 'female', 'other'])
    .required()
    .label('Gender'),
  email: Yup.string().required().email().label('Email'),
  birthday: Yup.string().required().label('Birthday'),
})
