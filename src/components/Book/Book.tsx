import { Calendar, Clock } from 'lucide-react'
import type { BooksProps, ModalAction } from '../../App'

interface BookProps {
	book: {
        id: number
		title: string
		author: string
		state: 'Dostępna' | 'Wypożyczona' | 'Zarezerwowana' | 'Do odbioru'
	},
    getBookStateClass: (state: 'Dostępna' | 'Wypożyczona' | 'Zarezerwowana' | 'Do odbioru') => string;
	handleModal: (book: BooksProps | null, action: ModalAction) => void
}
export default function Book({ book, getBookStateClass, handleModal }: BookProps) {
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
			{book.state !== 'Do odbioru' && (
				<button className={`link-book link-${book.state === 'Dostępna' ? 'rent' : 'reserved'}`} onClick={() => handleModal(book, `${book.state === 'Dostępna' ? 'borrow' : 'reserve'}`)}>
					{book.state === 'Dostępna' ? 'Wypożycz' : 'Zarezerwuj'}
				</button>
			)}
		</div>
	)
}
