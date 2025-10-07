import { useState } from 'react'
import './LoginForm.css'
import { MoveLeft } from 'lucide-react'
import LibraryButton from '../LibraryButton/LibraryButton'
import { supabase } from '../../supabase-client'
import { Link, useNavigate } from 'react-router-dom'
import type { AuthResponse } from '@supabase/supabase-js'

export default function LoginForm() {
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)

		if (!password) {
			setError('Proszę podać hasło')
		}
		
		try {
			const { data, error }: AuthResponse = await supabase.auth.signInWithPassword({
				email: import.meta.env.VITE_SUPABASE_EMAIL,
				password,
			})

			if (error) {
				setError(error.message)
				return
			}

			
			if (data.user) {
				navigate('/adminPanel')
			}
		} catch (err) {
			setError('Wystąpił błąd podczas logowania')
			console.error('Błąd z logowaniem: ', err)
		}
	}
	return (
		<div className='loginForm__container'>
			<div className='loginForm__box'>
				<Link to={'/'}>
					<MoveLeft /> Powrót
				</Link>
				<h1>Logowanie Administratora</h1>
				<form onSubmit={handleAdminLogin} className='loginForm__form'>
					<label htmlFor='pass'>Hasło</label>
					<input
						type='password'
						name=''
						id='pass'
						placeholder='Wprowadź hasło administratora'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<LibraryButton type='submit'>Zaloguj się</LibraryButton>
					{error && <p className='loginForm-errorText'>{error}</p>}
				</form>
			</div>
		</div>
	)
}
