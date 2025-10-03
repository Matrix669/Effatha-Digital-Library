import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import LoginForm from './components/LoginForm/LoginForm.tsx'
import AdminPanel from './components/AdminPanel/AdminPanel.tsx'

import './index.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <LoginForm />,
	},
	{
		path: '/adminPanel',
		element: <AdminPanel />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
)
