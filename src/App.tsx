import { BookOpen } from 'lucide-react'
import './App.css'
import Wrapper from './components/Wrapper/Wrapper'
import Book from './components/Book/Book'
import { useState } from 'react'
import HeaderLibrary from './components/HeaderLibrary/HeaderLibrary'
import BookAlert from './components/BookAlert/BookAlert'

export interface BooksProps {
	id: number
	title: string
	author: string
	state: 'Dostępna' | 'Wypożyczona' | 'Zarezerwowana' | 'Do odbioru'
}

export type ModalAction = 'borrow' | 'reserve' | null

interface ModalStateProps {
	book: BooksProps
	action: ModalAction
}
function App() {
	const [selectedBooksState, setSelectedBooksState] = useState<BooksProps['state'] | 'Wszystkie'>('Wszystkie')
	const [showModal, setShowModal] = useState<ModalStateProps | null>(null)
	const books: BooksProps[] = [
		{
			id: 1,
			title: 'Pan Tadeusz',
			author: 'Adam Mickiewicz',
			state: 'Dostępna',
		},
		{
			id: 2,
			title: 'Wiedźmin: Ostatnie Życzenie',
			author: 'Andrzej Sapkowski',
			state: 'Wypożyczona',
		},
		{
			id: 3,
			title: 'Solaris',
			author: 'Stanisław Lem',
			state: 'Zarezerwowana',
		},
		{
			id: 4,
			title: 'Lalka',
			author: 'Bolesław Prus',
			state: 'Do odbioru',
		},
	]
	const getBookStateClass = (state: string) => {
		switch (state) {
			case 'Dostępna':
				return 'available'
			case 'Wypożyczona':
				return 'rented'
			case 'Zarezerwowana':
				return 'reserved'
			case 'Do odbioru':
				return 'for-collection'
			default:
				return ''
		}
	}
	const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedBooksState(event.target.value as BooksProps['state'] | 'Wszystkie')
	}

	const handleModal = (book: BooksProps | null, action: ModalAction) => {
		if (book && action) {
			setShowModal({ book, action })
		} else {
			setShowModal(null)
		}
	}

	const numberOfBooks = books.filter(
		book => selectedBooksState === 'Wszystkie' || book.state === selectedBooksState
	).length
	const textForNumbersOfBooks =
		numberOfBooks === 1 ? 'książka' : numberOfBooks >= 2 ? 'książki' : numberOfBooks >= 5 ? 'książek' : 'książka'

	return (
		<Wrapper>
			<HeaderLibrary />
			<main className='main__body'>
				<header>
					<div>
						<p>
							<BookOpen />
							Wszystkie książki
						</p>
						<div>
							<p>
								{numberOfBooks} {textForNumbersOfBooks}
							</p>
							<select name='' id='' value={selectedBooksState} onChange={handleStateChange}>
								<option value='Wszystkie'>Wszystkie</option>
								<option value='Dostępna'>Dostępne</option>
								<option value='Wypożyczona'>Wypożyczone</option>
								<option value='Zarezerwowana'>Zarezerwowana</option>
								<option value='Do odbioru'>Do odbioru</option>
							</select>
						</div>
					</div>
				</header>

				<section>
					{books.length === 0 ? (
						<p>Brak książek w bibliotece</p>
					) : (
						books
							.filter(book => selectedBooksState === 'Wszystkie' || book.state === selectedBooksState)
							.map(book => <Book book={book} getBookStateClass={getBookStateClass} handleModal={handleModal} />)
					)}
				</section>
			</main>
			{showModal && <BookAlert bookTitle={showModal.book.title} bookAuthor={showModal.book.author} handleModal={handleModal} action={showModal.action} />}
		</Wrapper>
	)
}

export default App
