import './LoginForm.css'
import { MoveLeft } from 'lucide-react'

export default function LoginForm() {

	return (
		<div className='loginForm__container'>
			<div className='loginForm__box'>
				<a href='/'>
					<MoveLeft /> Powrót
				</a>
				<h1>Logowanie Administratora</h1>
				<form className='loginForm__form'>
					<label htmlFor='pass'>Hasło</label>
					<input type='password' name='' id='pass' placeholder='Wprowadź hasło administratora' />
					<button>Zaloguj się</button>
				</form>
			</div>
		</div>
	)
}
