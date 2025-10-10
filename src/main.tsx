import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import LoginForm from './components/LoginForm/LoginForm.tsx'
import AdminPanel from './components/AdminPanel/AdminPanel.tsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

import './index.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute requiredRole="user">
				<App />
			</ProtectedRoute>
		),
	},
	{
		path: '/user-login',
		element: <LoginForm type="user" />,
	},
	{
		path: '/login',
		element: <LoginForm type="admin" />,
	},
	{
		path: '/adminPanel',
		element: (
			<ProtectedRoute requiredRole="admin">
				<AdminPanel />
			</ProtectedRoute>
		),
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
)
