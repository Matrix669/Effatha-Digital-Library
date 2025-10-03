import { Calendar, CircleCheck, Clock, Trash2 } from 'lucide-react'
import type { BookProps } from '../../types/types'
import { useBookManagement } from '../../hooks/useBookManagement'
import LibraryButton from '../LibraryButton/LibraryButton'

export default function Book({ book, getBookStateClass, isAdmin = false }: BookProps) {
	const { removeBook, returnBook, cancelReservation, confirmPickup, handleModal } = useBookManagement()

	const handleRemove = () => {
		if (window.confirm('Czy na pewno chcesz usunąć książkę?')) {
			removeBook(book.id)
		}
	}

	const handleReturn = () => {
		returnBook(book.id)
	}

	const handleCancelReservation = () => {
		cancelReservation(book.id)
	}

	const handleConfirmPickup = () => {
		confirmPickup(book.id)
	}

	return (
		<div key={book.id} className='book'>
			<div className='book__left'>
				<div className='book__titleBox'>
					<h2>{book.title}</h2>
					<span className={`book-state book--${getBookStateClass(book.state)}`}>{book.state}</span>
				</div>
				<p>{book.author}</p>
				{(book.state === 'Wypożyczona' || book.state === 'Zarezerwowana' || book.state === 'Do odbioru') && (
					<div className='book__downInfo'>
						{book.state === 'Do odbioru' && (
							<span>
								<strong>Wypożyczający: </strong>
								Anna Kowalska
							</span>
						)}
						{book.state === 'Zarezerwowana' && (
							<>
								<span>
									<strong>Zarezerwowana przez: </strong>
									Jan Nowak
								</span>
								<span>
									<Calendar />
									<strong> Data: </strong> 20.01.2024
								</span>
							</>
						)}
						{book.state === 'Wypożyczona' && (
							<>
								<span>
									<strong>Wypożyczający: </strong>
									Anna Kowalska
								</span>
								<span>
									<Calendar />
									<strong> Wypożyczona: </strong> 15.01.2024
								</span>
								<span>
									<Clock />
									<strong> Zwrot do: </strong> 20.02.2024
								</span>
							</>
						)}
					</div>
				)}
			</div>
			{isAdmin ? (
				<div className='admin-buttons'>
					<LibraryButton className='btn-remove' onClick={handleRemove}>
						<Trash2 /> Usuń
					</LibraryButton>
					{book.state === 'Wypożyczona' && (
						<LibraryButton className='btn-return' onClick={handleReturn}>
							Zwróć książkę
						</LibraryButton>
					)}
					{book.state === 'Zarezerwowana' && (
						<LibraryButton className='btn-cancel' onClick={handleCancelReservation}>
							Anuluj rezerwację
						</LibraryButton>
					)}
					{book.state === 'Do odbioru' && (
						<LibraryButton className='btn-confirm' onClick={handleConfirmPickup}>
							<CircleCheck /> Potwierdź odbiór
						</LibraryButton>
					)}
				</div>
			) : (
				book.state !== 'Do odbioru' && (
					<LibraryButton
						className={`link-book link-${book.state === 'Dostępna' ? 'rent' : 'reserved'}`}
						onClick={() => handleModal(book, `${book.state === 'Dostępna' ? 'borrow' : 'reserve'}`)}
					>
						{book.state === 'Dostępna' ? 'Wypożycz' : 'Zarezerwuj'}
					</LibraryButton>
				)
			)}
		</div>
	)
}
