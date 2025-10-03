import type { UseMutateFunction } from '@tanstack/react-query'

export enum BookState {
	Wszystkie = 'Wszystkie',
	Dostępna = 'Dostępna',
	Wypożyczona = 'Wypożyczona',
	Zarezerwowana = 'Zarezerwowana',
	DoOdbioru = 'Do odbioru',
}

export interface BooksProps {
	id: string
	title: string
	author: string
	state: Exclude<BookState, BookState.Wszystkie>
	borrower?: string | null
	reserved_by?: string | null
	borrow_date?: string | null
	return_date?: string | null
}

export type ModalAction = 'borrow' | 'reserve' | null

export interface ModalStateProps {
	book: BooksProps
	action: ModalAction
}

export interface BookProps {
	book: {
		id: string
		title: string
		author: string
		state: Exclude<BookState, BookState.Wszystkie>
		borrower?: string | null
		reserved_by?: string | null
		borrow_date?: string | null
		return_date?: string | null
	}
	getBookStateClass: (state: 'Dostępna' | 'Wypożyczona' | 'Zarezerwowana' | 'Do odbioru') => string
	handleModal: (book: BooksProps | null, action: ModalAction) => void
	isAdmin?: boolean
}

export interface BookAlertProps {
	bookTitle: string
	bookAuthor: string
	bookId: string
	action: ModalAction
	handleModal: (book: null, action: null) => void
	updateBookState: UseMutateFunction<
		void,
		Error,
		{ id: string; newState: BooksProps['state']; userName?: string },
		unknown
	>
}

export interface BookListProps {
	books: BooksProps[]
	selectedBooksState: BooksProps['state'] | 'Wszystkie'
	getBookStateClass: (state: 'Dostępna' | 'Wypożyczona' | 'Zarezerwowana' | 'Do odbioru') => string
	handleModal: (book: BooksProps | null, action: ModalAction) => void
	isAdmin?: boolean
}
