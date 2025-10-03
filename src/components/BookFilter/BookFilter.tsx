import { BookOpen } from 'lucide-react'
import type { BooksProps } from '../../types/types'

interface BookFilterProps {
	numberOfBooks: number
	textForNumberOfBooks: string
	selectedBooksState: BooksProps['state'] | 'Wszystkie'
	setSelectedBooksState: (state: BooksProps['state'] | 'Wszystkie') => void
}
export default function BookFilter({
	numberOfBooks,
	textForNumberOfBooks,
	selectedBooksState,
	setSelectedBooksState,
}: BookFilterProps) {
	const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedBooksState(event.target.value as BooksProps['state'] | 'Wszystkie')
	}
	return (
		<header>
			<div>
				<p>
					<BookOpen />
					Wszystkie książki
				</p>
				<div>
					<p>
						{numberOfBooks} {textForNumberOfBooks}
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
	)
}
