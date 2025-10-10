import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import type { UserRole } from '../../types/auth'

interface ProtectedRouteProps {
	children: React.ReactNode
	requiredRole: UserRole
	redirectTo?: string
}

export default function ProtectedRoute({ children, requiredRole, redirectTo }: ProtectedRouteProps) {
	const { userRole, loading } = useAuth()

	if (loading) {
		return (
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center', 
				height: '100vh',
				fontSize: '1.5rem'
			}}>
				Ładowanie...
			</div>
		)
	}

	// Sprawdź czy użytkownik ma odpowiedni poziom dostępu
	const hasAccess = () => {
		if (requiredRole === 'admin') {
			return userRole === 'admin'
		}
		if (requiredRole === 'user') {
			return userRole === 'user' || userRole === 'admin'
		}
		return false
	}

	if (!hasAccess()) {
		const defaultRedirect = requiredRole === 'admin' ? '/login' : '/user-login'
		return <Navigate to={redirectTo || defaultRedirect} replace />
	}

	return <>{children}</>
}
