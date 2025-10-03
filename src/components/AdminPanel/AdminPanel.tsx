import { BookOpen, LogOut, Plus } from 'lucide-react'
import Wrapper from '../Wrapper/Wrapper'
import './AdminPanel.css'
import BookList from '../BookList/BookList'
import { getBookStateClass } from '../../utils/utils'
import { useBookManagement } from '../../hooks/useBookManagement'
import LibraryButton from '../LibraryButton/LibraryButton'
import { useState } from 'react'
import { BookState } from '../../types/types'

export default function AdminPanel() {
	const { handleModal, selectedBooksState, numberOfBooks, filteredBooks, isLoading, error, addBook } =
		useBookManagement()
	const [showModalAddBook, setShowModalAddBook] = useState(false)
	const [title, setTitle] = useState<string>('')
	const [author, setAuthor] = useState<string>('')
	const [formError, setFormError] = useState<string>('')
	const [success, setSuccess] = useState<string>('')

	const handleModalAddBook = () => {
		setShowModalAddBook(prev => !prev)
		setFormError('')
		setSuccess('')
		setTitle('')
		setAuthor('')
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFormError('')
		setSuccess('')

		const trimmedTitle = title.trim()
		const trimmedAuthor = author.trim()

		if (!trimmedTitle || !trimmedAuthor) {
			setFormError('Wypełnij wszystkie pola!')
			return
		}

		try {
			await addBook({ title: trimmedTitle, author: trimmedAuthor, state: BookState.Dostępna })
			setSuccess('Książka dodana pomyślnie!')
			setTitle('')
			setAuthor('')
			setShowModalAddBook(false)
			setTimeout(() => setSuccess(''), 3000)
		} catch (err: any) {
			const errorMessage = `Błąd podczas dodawania książki: ${err.message}`
			setFormError(errorMessage)
		}
	}

	if (isLoading) return <div className='loading'>Ładowanie książek...</div>
	if (error) return <div className='error'>Błąd: {(error as Error).message}</div>

	return (
		<Wrapper>
			<header className='adminPanel-header'>
				<div>
					<h1>Panel Administratora</h1>
					<p>
						<BookOpen /> Książek: {numberOfBooks}
					</p>
				</div>
				<div className='adminPanel-header__boxBtn'>
					<LibraryButton className='adminPanel-header-addButton' onClick={handleModalAddBook}>
						<Plus /> Dodaj książkę
					</LibraryButton>
					<LibraryButton className='adminPanel-header-logoutButton'>
						<LogOut /> Wyloguj
					</LibraryButton>
				</div>
			</header>
			{showModalAddBook && (
				<div className='adminPanel-addNewBook' role='dialog' aria-labelledby='modal-title'>
					<h2 id='modal-title'>Dodaj nową książkę</h2>

					<form onSubmit={handleSubmit} className='adminPanel-addNewBook-boxInputs'>
						<div>
							<label htmlFor='title'>Tytuł</label>
							<input
								id='title'
								type='text'
								placeholder='Wprowadź tytuł książki'
								value={title}
								onChange={e => setTitle(e.target.value)}
								aria-required='true'
							/>
						</div>
						<div>
							<label htmlFor='author'>Autor</label>
							<input
								id='author'
								type='text'
								placeholder='Wprowadź autora książki'
								value={author}
								onChange={e => setAuthor(e.target.value)}
								aria-required='true'
							/>
						</div>
						<div className='adminPanel-addNewBook-boxBtn'>
							<LibraryButton disabled={!title.trim() || !author.trim()} type='submit'>
								Dodaj książkę
							</LibraryButton>
							<LibraryButton type='button' onClick={handleModalAddBook}>
								Anuluj
							</LibraryButton>
						</div>
					</form>
				</div>
			)}
			{formError && (
				<div className='error' role='alert'>
					{formError}
				</div>
			)}
			{success && (
				<div className='success' role='alert'>
					{success}
				</div>
			)}
			<main className='main__body'>
				<header>
					<p>Lista wszystkich książek</p>
				</header>
				<BookList
					books={filteredBooks}
					getBookStateClass={getBookStateClass}
					handleModal={handleModal}
					selectedBooksState={selectedBooksState}
					isAdmin={true}
				/>
			</main>
		</Wrapper>
	)
}
