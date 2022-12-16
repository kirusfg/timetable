import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/store/auth/authSlice'

interface ProtectedRouteProps {
	children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	let user = useAppSelector(selectUser)
	let location = useLocation()

	if (!user) {
		// Redirect them to the /auth/login page, but save the current location
		// they were trying to go to when they were redirected. This allows us
		// to send them along to that page after they login, which is a nicer
		// user experience than dropping them off on the home page.
		return <Navigate to='/auth/login' state={{ from: location }} replace />
	}

	return children
}

export default ProtectedRoute
