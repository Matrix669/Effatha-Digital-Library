import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { BooksProps, ModalAction, ModalStateProps } from '../types/types'
import { books as initialBooks } from '../data' // Używane tylko lokalnie, przed podłączeniem Supabase
import { supabase } from '../supabase-client'

// Typy dla Supabase (przykładowe, dostosuj do swojej tabeli)
interface SupabaseBook {
	id: string
	title: string
	author: string
	state: BooksProps['state']
	borrower?: string // Opcjonalne: dla "Wypożyczona" lub "Do odbioru"
	reserved_by?: string // Opcjonalne: dla "Zarezerwowana"
	borrow_date?: string // ISO date, np. "2024-01-15"
	return_date?: string // ISO date
	created_at?: string
}

// Funkcje API do Supabase (przygotowane, ale nieaktywne, dopóki nie podłączysz klienta)
const fetchBooks = async (): Promise<SupabaseBook[]> => {
	// Przykład dla Supabase:
	const { data, error } = await supabase.from('books').select('*')
	if (error) {
		console.error('Błąd pobierania książek: ', error.message)
		throw new Error(error.message)
	}

	return data.map((book: SupabaseBook) => ({
		id: book.id,
		title: book.title,
		author: book.author,
		state: book.state as BooksProps['state'],
	}))
	// return initialBooks // Tymczasowo zwraca statyczne dane
}

const updateBookState = async ({ id, newState }: { id: string; newState: BooksProps['state'] }) => {
	// Przykład dla Supabase:
	const { error } = await supabase.from('books').update({ state: newState }).eq('id', id)
	if (error) throw new Error(error.message)
	// return { id, newState } // Tymczasowo symulacja
}

const removeBook = async (id: string) => {
	// Przykład dla Supabase:
	const { error } = await supabase.from('books').delete().eq('id', id)
	if (error) throw new Error(error.message)
	// return id // Tymczasowo symulacja
}

const confirmPickup = async (id: string) => {
	// Przykład dla Supabase:
	const { error } = await supabase.from('books').update({ state: 'Wypożyczona' }).eq('id', id)
	if (error) throw new Error(error.message)
	// return id // Tymczasowo
}

const cancelReservation = async (id: string) => {
	// Przykład dla Supabase:
	const { error } = await supabase.from('books').update({ state: 'Dostępna', reserved_by: null }).eq('id', id)
	if (error) throw new Error(error.message)
	// return id // Tymczasowo
}

const returnBook = async (id: string) => {
	// Przykład dla Supabase:
	const { error } = await supabase
		.from('books')
		.update({ state: 'Dostępna', borrower: null, borrow_date: null, return_date: null })
		.eq('id', id)
	if (error) throw new Error(error.message)
	// return id // Tymczasowo
}

export const useBookManagement = () => {
	const queryClient = useQueryClient()
	const [selectedBooksState, setSelectedBooksState] = useState<BooksProps['state'] | 'Wszystkie'>('Wszystkie')
	const [showModal, setShowModal] = useState<ModalStateProps | null>(null)

	// Pobieranie książek
	const {
		data: books = initialBooks,
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
