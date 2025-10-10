import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BookState, type BooksProps, type ModalAction, type ModalStateProps } from '../types/types'
import { supabase } from '../supabase-client'

interface SupabaseBook {
	id: string
	title: string
	author: string
	state: BooksProps['state']
	borrower?: string | null // Opcjonalne: dla "Wypożyczona" lub "Do odbioru"
	reserved_by?: string | null // Opcjonalne: dla "Zarezerwowana"
	borrow_date?: string | null // ISO date, np. "2024-01-15"
	return_date?: string | null // ISO date
	created_at?: string
}

const fetchBooks = async (): Promise<SupabaseBook[]> => {
	const { data, error } = await supabase.from('books').select('*').order('created_at')
	if (error) {
		console.error('Błąd pobierania książek: ', error.message)
		throw new Error(error.message)
	}

	return data.map((book: SupabaseBook) => ({
		id: book.id,
		title: book.title,
		author: book.author,
		state: book.state as BooksProps['state'],
		borrower: book.borrower,
		reserved_by: book.reserved_by,
		borrow_date: book.borrow_date,
		return_date: book.return_date,
	}))
}

const updateBookState = async ({
	id,
	newState,
	borrowerName,
	reservedByName,
}: {
	id: string
	newState: BooksProps['state']
	borrowerName?: string
	reservedByName?: string
}) => {
	const updateData: Partial<SupabaseBook> = { state: newState }

	if (newState === BookState.Wypożyczona && borrowerName) {
		updateData.borrower = borrowerName
		updateData.borrow_date = new Date().toISOString()
		updateData.return_date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days for now
		updateData.reserved_by = null
	} else if (newState === BookState.Zarezerwowana && reservedByName) {
		updateData.reserved_by = reservedByName
		updateData.borrow_date = new Date().toISOString()
		updateData.return_date = null
	} else if (newState === BookState.Dostępna) {
		updateData.borrower = null
		updateData.reserved_by = null
		updateData.borrow_date = null
		updateData.return_date = null
	} else if (newState === BookState.DoOdbioru) {
		updateData.borrower = borrowerName
		updateData.reserved_by = null
		updateData.borrow_date = null
		updateData.return_date = null
	}

	const { error } = await supabase.from('books').update(updateData).eq('id', id)

	if (error) {
		console.error('Błąd aktualizacji książki:', error.message)
		throw new Error(error.message)
	}
}

const removeBook = async (id: string) => {
	const { error } = await supabase.from('books').delete().eq('id', id)
	if (error) throw new Error(error.message)
}

const confirmPickup = async (data: { id: string; bookBorrower?: string | null }) => {
	const borrowDateSupaBase = new Date().toISOString()
	const returnDateSupaBase = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
	const { error } = await supabase
		.from('books')
		.update({
			state: 'Wypożyczona',
			borrow_date: borrowDateSupaBase,
			return_date: returnDateSupaBase,
			borrower: data.bookBorrower,
			reserved_by: null,
		})
		.eq('id', data.id)
	if (error) throw new Error(error.message)
}

const cancelReservation = async (id: string) => {
	// Pobierz aktualny stan książki i borrower
	const { data, error: fetchError } = await supabase
	  .from('books')
	  .select('state, borrower, borrow_date, return_date')
	  .eq('id', id)
	  .single();
  
	if (fetchError) {
	  console.error('Błąd pobierania książki:', fetchError.message);
	  throw new Error(fetchError.message);
	}
  
	const updateData: Partial<SupabaseBook> = {
	  reserved_by: null,
	};
  
	if (data.state === BookState.Zarezerwowana && data.borrower) {
	  // Jeśli książka jest zarezerwowana i ma borrower, wróć do Wypożyczona
	  updateData.state = BookState.Wypożyczona;
	  // Zachowaj istniejące borrow_date i return_date, jeśli istnieją
	  // Jeśli nie istnieją, ustaw nowe (opcjonalne, w zależności od wymagań)
	  if (!data.borrow_date || !data.return_date) {
		updateData.borrow_date = new Date().toISOString();
		updateData.return_date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
	  }
	} else {
	  // Dla DoOdbioru lub Zarezerwowana bez borrower, ustaw Dostępna
	  updateData.state = BookState.Dostępna;
	  updateData.borrower = null;
	  updateData.borrow_date = null;
	  updateData.return_date = null;
	}
  
	const { error } = await supabase.from('books').update(updateData).eq('id', id);
  
	if (error) {
	  console.error('Błąd anulowania rezerwacji:', error.message);
	  throw new Error(error.message);
	}
  };

const returnBook = async (id: string) => {
	const { error } = await supabase
		.from('books')
		.update({ state: 'Dostępna', borrower: null, borrow_date: null, return_date: null })
		.eq('id', id)
	if (error) throw new Error(error.message)
}
export const useBookManagement = () => {
	const queryClient = useQueryClient()
	const [selectedBooksState, setSelectedBooksState] = useState<BooksProps['state'] | 'Wszystkie'>('Wszystkie')
	const [showModal, setShowModal] = useState<ModalStateProps | null>(null)

	// Pobieranie książek
	const {
		data: books = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ['books'],
		queryFn: fetchBooks,
	})

	// Mutacje
	const addBook = async (newBook: { title: string; author: string; state: BooksProps['state'] }) => {
		const { error } = await supabase.from('books').insert([
			{
				title: newBook.title,
				author: newBook.author,
				state: newBook.state,
			},
		])
		if (error) throw new Error(error.message)
		return newBook
	}
	const addBookMutation = useMutation({
		mutationFn: addBook,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
		},
	})
	const updateBookStateMutation = useMutation({
		mutationFn: updateBookState,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] }) // Odśwież dane po zmianie
		},
	})

	const removeBookMutation = useMutation({
		mutationFn: removeBook,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
		},
	})

	const confirmPickupMutation = useMutation({
		mutationFn: confirmPickup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
		},
	})

	const cancelReservationMutation = useMutation({
		mutationFn: cancelReservation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
		},
	})

	const returnBookMutation = useMutation({
		mutationFn: returnBook,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] })
		},
	})

	const handleModal = (book: BooksProps | null, action: ModalAction) => {
		if (book && action) {
			setShowModal({ book, action })
		} else {
			setShowModal(null)
		}
	}

	// Memoizacja filtrowania
	const filteredBooks = useMemo(
		() => books.filter(book => selectedBooksState === 'Wszystkie' || book.state === selectedBooksState),
		[books, selectedBooksState]
	)

	const numberOfBooks = filteredBooks.length
	const textForNumberOfBooks = useMemo(
		() => (numberOfBooks === 1 ? 'książka' : numberOfBooks >= 2 && numberOfBooks < 5 ? 'książki' : 'książek'),
		[numberOfBooks]
	)

	return {
		books,
		selectedBooksState,
		setSelectedBooksState,
		showModal,
		handleModal,
		filteredBooks,
		numberOfBooks,
		textForNumberOfBooks,
		isLoading,
		error,
		addBook: addBookMutation.mutate,
		updateBookState: updateBookStateMutation.mutate,
		removeBook: removeBookMutation.mutate,
		confirmPickup: confirmPickupMutation.mutate,
		cancelReservation: cancelReservationMutation.mutate,
		returnBook: returnBookMutation.mutate,
	}
}
