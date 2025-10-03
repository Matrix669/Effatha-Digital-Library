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
	}
	getBookStateClass: (state: 'Dostępna' | 'Wypożyczona' | 'Zarezerwowana' | 'Do odbioru') => string
	handleModal: (book: BooksProps | null, action: ModalAction) => void
	isAdmin?: boolean
}

export interface BookAlertProps {
	bookTitle: string
	bookAuthor: string
	action: ModalAction
	handleModal: (book: null, action: null) => void
}

export interface BookListProps {
	books: BooksProps[]
	selectedBooksState: BooksProps['state'] | 'Wszystkie'
	getBookStateClass: (state: 'Dostępna' | 'Wypożyczona' | 'Zarezerwowana' | 'Do odbioru') => string
	handleModal: (book: BooksProps | null, action: ModalAction) => void
	isAdmin?: boolean
}
