import { Info, X } from 'lucide-react'
import './BookAlert.css'
import type { BookAlertProps } from '../../types/types'


export default function BookAlert({ bookTitle, bookAuthor, action, handleModal }: BookAlertProps) {
	const getModalContent = () => {
		if (action === 'borrow') {
			return {
				title: 'Wypożycz',
				supTitle: 'wypożyczyć',
				isInfoAboutPickup: true,
			}
		} else if (action === 'reserve') {
			return {
				title: 'Zarezerwuj',
				supTitle: 'zarezerwować',
				isInfoAboutPickup: false,
			}
		}
		return { title: '', supTitle: '', isInfoAboutPickup: '' }
	}
	const { title, supTitle, isInfoAboutPickup } = getModalContent()
	return (
		<div className='bookAlert'>
			<div className='bookAlert__container'>
				<header>
					<div>
						<p className='bookAlert-title'>{title} książkę</p>
						<p>Wprowadź swoję imię, aby {supTitle} książkę</p>
					</div>
					<button onClick={() => handleModal(null, null)}>
						<X />
					</button>
				</header>
				<main>
					<div className='bookAlert-infoText'>
						<p>
							<strong>Książka:</strong> {bookTitle}
						</p>
						<p>
							<strong>Autor:</strong> {bookAuthor}
						</p>
					</div>
					{isInfoAboutPickup && (
						<div className='bookAlert-infoAboutPickup'>
							<Info />
							<p>
								Po potwierdzeniu książka będzie gotowa do odbioru u Nikki Zakrzewskiej na następnym spotkaniu otwartym
								wspólnoty.
							</p>
						</div>
					)}
				</main>
				<form>
					<div className='bookAlert__form-inputBox'>
						<label htmlFor='name'>Twoje imię</label>
						<input type='text' placeholder='Wprowadź swoję imię' />
					</div>
					<div className='bookAlert__form-btnsBox'>
						<button onClick={() => handleModal(null, null)}>Anuluj</button>
						<button onClick={() => handleModal(null, null)}>Potwierdź</button>
					</div>
				</form>
			</div>
		</div>
	)
}
