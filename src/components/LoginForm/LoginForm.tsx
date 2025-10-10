import { useState, type FormEvent } from 'react'
import './LoginForm.css'
import LibraryButton from '../LibraryButton/LibraryButton'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { MoveLeft } from 'lucide-react'

interface LoginFormProps {
	type: 'user' | 'admin'
}

export default function LoginForm({ type }: LoginFormProps) {
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const { signInAsAdmin, signInAsUser } = useAuth()

	

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)

		if (!password) {
			setError('Proszę podać hasło')
			return
		}

		const success = type === 'admin' 
			? await signInAsAdmin(password)
			: await signInAsUser(password)

		if (success) {
			navigate(type === 'admin' ? '/adminPanel' : '/')
		} else {
			setError(type === 'admin' 
				? 'Nieprawidłowe hasło administratora' 
				: 'Nieprawidłowe hasło'
			)
		}
	}

	const isAdmin = type === 'admin'

	return (
		<div className='loginForm__container'>
			<div className='loginForm__box'>
				{isAdmin && (
					<Link to={'/'}>
						<MoveLeft /> Powrót
				</Link>
				)}
				<h1>
					{isAdmin 
						? 'Logowanie Administratora' 
						: 'Logowanie do Effathowej Biblioteki Cyfrowej'
					}
				</h1>
				{!isAdmin && (
					<p>Aby korzystać z biblioteki, podaj hasło dostępu</p>
				)}
				<form onSubmit={handleLogin} className='loginForm__form'>
					<label htmlFor='pass'>Hasło</label>
					<input
						type='password'
						name=''
						id='pass'
						placeholder={isAdmin 
							? 'Wprowadź hasło administratora' 
							: 'Wprowadź hasło'
						}
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
