import type { BookListProps } from '../../types/types'
import Book from '../Book/Book'

export default function BookList({
	books,
	selectedBooksState,
	handleModal,
	getBookStateClass,
	isAdmin,
}: BookListProps) {
	return (
		<section>
			{books.length === 0 ? (
				<p className='info-about-empty-library'>Brak książek w bibliotece</p>
			) : (
				books
					.filter(book => selectedBooksState === 'Wszystkie' || book.state === selectedBooksState)
					.map(book => (
						<Book key={book.id} book={book} getBookStateClass={getBookStateClass} handleModal={handleModal} isAdmin={isAdmin} />
					))
			)}
		</section>
	)
}
