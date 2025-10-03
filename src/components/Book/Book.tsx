import { Calendar, CircleCheck, Clock, Trash2 } from 'lucide-react'
import type { BookProps } from '../../types/types'
import { useBookManagement } from '../../hooks/useBookManagement'
import LibraryButton from '../LibraryButton/LibraryButton'

export default function Book({ book, getBookStateClass, isAdmin = false, handleModal }: BookProps) {
	const { removeBook, returnBook, cancelReservation, confirmPickup } = useBookManagement()

	const handleRemove = () => {
		removeBook(book.id)
	}

	const handleReturn = () => {
		returnBook(book.id)
	}

	const handleCancelReservation = () => {
		cancelReservation(book.id)
	}

	const handleConfirmPickup = () => {
		confirmPickup({ id: book.id, bookBorrower: book.borrower || book.reserved_by })
	}

	// const handleChangeFromReservationToReturn = () => {

	//  }

	const niceBorrowDate = book.borrow_date && new Date(book.borrow_date).toLocaleDateString()
	const niceReturnDate = book.return_date && new Date(book.return_date).toLocaleDateString()

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
								{book.borrower}
							</span>
						)}
						{book.state === 'Zarezerwowana' && (
							<>
								<span>
									<strong>Zarezerwowana przez: </strong>
									{book.reserved_by}
								</span>
								{niceBorrowDate && (
									<span>
										<Calendar />
										<strong> Data: </strong> {niceBorrowDate}
									</span>
								)}
							</>
						)}
						{book.state === 'Wypożyczona' && (
							<>
								{book.borrower && (
									<span>
										<strong>Wypożyczający: </strong>
										{book.borrower}
									</span>
								)}

								{niceBorrowDate && (
									<span>
										<Calendar />
										<strong> Wypożyczona: </strong> {niceBorrowDate}
									</span>
								)}
								{niceReturnDate && (
									<span>
										<Clock />
										<strong> Zwrot do: </strong> {niceReturnDate}
									</span>
								)}
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
						<>
							<LibraryButton className='btn-cancel' onClick={handleCancelReservation}>
								Anuluj rezerwację
							</LibraryButton>
							<LibraryButton className='btn-return' onClick={handleConfirmPickup}>
								Wypożycz książkę
							</LibraryButton>
						</>
					)}
					{book.state === 'Do odbioru' && (
						<LibraryButton className='btn-confirm' onClick={handleConfirmPickup}>
							<CircleCheck /> Potwierdź odbiór
						</LibraryButton>
					)}
				</div>
			) : (
				book.state !== 'Do odbioru' &&
				book.state !== 'Zarezerwowana' && (
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
