import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from '../redux/selectors'

export const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useSelector(authSelector)

  const location = useLocation()

  if (!isLoggedIn)
    return <Navigate to='/sign-in' state={{ path: location.pathname }} />

  return children
}
