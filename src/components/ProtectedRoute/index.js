import {Route, Redirect} from 'react-router-dom'
import cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
