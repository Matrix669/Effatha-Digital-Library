import { useState } from 'react'
import { BookState, type BookAlertProps } from '../../types/types'
import { Info, X } from 'lucide-react'
import './BookAlert.css'

export default function BookAlert({
	bookTitle,
	bookAuthor,
	bookId,
	action,
	handleModal,
	updateBookState,
}: BookAlertProps) {
	const [userBookName, setUserBookName] = useState<string>('')
	const [userReservedByName, setUserReservedByName] = useState<string>('')
	const [formError, setFormError] = useState<string>('')

	const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFormError('')

		if (action === 'borrow' && !userBookName.trim()) {
			setFormError('Wprowadź imię osoby wypożyczającej!')
			return
		}
		if (action === 'reserve' && !userReservedByName.trim()) {
			setFormError('Wprowadź imię osoby rezerwującej!')
			return
		}

		try {
			const newState = action === 'borrow' ? BookState.DoOdbioru : BookState.Zarezerwowana
			if (action === 'borrow') {
				await updateBookState({ id: bookId, newState, borrowerName: userBookName.trim() })
			} else {
				await updateBookState({
					id: bookId,
					newState,
					reservedByName: userReservedByName.trim(),
				})
			}
			setUserBookName('')
			setUserReservedByName('')
			handleModal(null, null)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setFormError(`Błąd: ${err.message}`)
			} else {
				setFormError(`Nieoczekiwany błąd: ${err}`)
			}
		}
	}

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
				<form onSubmit={handleForm}>
					<div className='bookAlert__form-inputBox'>
						<label htmlFor='name'>Twoje imię</label>
						<input
							type='text'
							placeholder={`Wprowadz ${action === 'borrow' ? 'imię osoby wypożyczającej' : 'imię osoby rezerwującej'}`}
							value={action === 'borrow' ? userBookName : userReservedByName}
							onChange={e => {
								if (action === 'borrow') {
									setUserBookName(e.target.value)
								} else {
									setUserReservedByName(e.target.value)
								}
							}}
						/>
					</div>
					<div className='bookAlert__form-btnsBox'>
						<button onClick={() => handleModal(null, null)}>Anuluj</button>
						<button type='submit' disabled={action === 'borrow' ? !userBookName.trim() : !userReservedByName.trim()}>
							Potwierdź
						</button>
					</div>
					{formError && <p className='alert-error'>{formError}</p>}
				</form>
			</div>
		</div>
	)
}
