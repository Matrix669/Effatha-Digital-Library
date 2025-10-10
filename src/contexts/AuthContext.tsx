import { useEffect, useState } from 'react'
import { supabase } from '../supabase-client'
import type { User } from '@supabase/supabase-js'
import type { UserRole } from '../types/auth'
import { AuthContext } from './authContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [userRole, setUserRole] = useState<UserRole>('guest')
	const [wasAdmin, setWasAdmin] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Sprawdź localStorage przy starcie
		const savedRole = localStorage.getItem('userRole') as UserRole | null
		const savedWasAdmin = localStorage.getItem('wasAdmin') === 'true'
		
		if (savedRole && savedRole !== 'guest') {
			setUserRole(savedRole)
			setWasAdmin(savedWasAdmin)
			setLoading(false)
			return
		}

		// Sprawdź aktualną sesję Supabase
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null)
			if (session?.user) {
				setUserRole('admin')
				setWasAdmin(true)
				localStorage.setItem('userRole', 'admin')
				localStorage.setItem('wasAdmin', 'true')
			} else {
				setUserRole('guest')
				setWasAdmin(false)
			}
			setLoading(false)
		})

		// Nasłuchuj zmian w uwierzytelnieniu Supabase
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null)
			if (session?.user) {
				setUserRole('admin')
				setWasAdmin(true)
				localStorage.setItem('userRole', 'admin')
				localStorage.setItem('wasAdmin', 'true')
			}
			setLoading(false)
		})

		return () => subscription.unsubscribe()
	}, [])

	// Logowanie jako zwykły użytkownik (bez Supabase, tylko hasło)
	const signInAsUser = async (password: string): Promise<boolean> => {
		const userPassword = import.meta.env.VITE_USER_PASSWORD
		if (password === userPassword) {
			setUserRole('user')
			localStorage.setItem('userRole', 'user')
			return true
		}
		return false
	}

	// Logowanie jako admin (przez Supabase)
	const signInAsAdmin = async (password: string): Promise<boolean> => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: import.meta.env.VITE_SUPABASE_EMAIL,
				password,
			})

			if (error || !data.user) {
				return false
			}

			setUser(data.user)
			setUserRole('admin')
			setWasAdmin(true)
			localStorage.setItem('userRole', 'admin')
			localStorage.setItem('wasAdmin', 'true')
			return true
		} catch {
			return false
		}
	}

	const signOut = async () => {
		const currentWasAdmin = wasAdmin
		
		if (userRole === 'admin') {
			setUserRole('user')
			localStorage.setItem('userRole', 'user')
			await supabase.auth.signOut()
			setUser(null)
		} else if (userRole === 'user' && currentWasAdmin) {
			// Były admin (teraz user) wylogowuje się całkowicie
			setUserRole('guest')
			setWasAdmin(false)
			localStorage.removeItem('userRole')
			localStorage.removeItem('wasAdmin')
		} else {
			// Zwykły user wylogowuje się
			setUserRole('guest')
			localStorage.removeItem('userRole')
		}
	}

	return (
		<AuthContext.Provider value={{ user, userRole, wasAdmin, loading, signInAsUser, signInAsAdmin, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

