import { useBookManagement } from './hooks/useBookManagement'

import Wrapper from './components/Wrapper/Wrapper'
import HeaderLibrary from './components/HeaderLibrary/HeaderLibrary'
import BookAlert from './components/BookAlert/BookAlert'
import BookList from './components/BookList/BookList'
import BookFilter from './components/BookFilter/BookFilter'

import { getBookStateClass } from './utils/utils'

import './App.css'

function App() {
	const {
		selectedBooksState,
		setSelectedBooksState,
		numberOfBooks,
		textForNumberOfBooks,
		handleModal,
		showModal,
		filteredBooks,
		updateBookState,
		isLoading
	} = useBookManagement()

// make skeleton while loading books 
	if (isLoading) {
		return (
			<Wrapper>
				<HeaderLibrary />
				<main className='main__body'>
					<div style={{ 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center', 
						height: '200px',
						fontSize: '1.2rem'
					}}>
						Ładowanie książek...
					</div>
				</main>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<HeaderLibrary />
			<main className='main__body'>
				<BookFilter
					numberOfBooks={numberOfBooks}
					selectedBooksState={selectedBooksState}
					textForNumberOfBooks={textForNumberOfBooks}
					setSelectedBooksState={setSelectedBooksState}
				/>
				<BookList
					books={filteredBooks}
					handleModal={handleModal}
					selectedBooksState={selectedBooksState}
					getBookStateClass={getBookStateClass}
					isAdmin={false}
				/>
			</main>
			{showModal && (
				<BookAlert
					bookTitle={showModal.book.title}
					bookAuthor={showModal.book.author}
					bookId={showModal.book.id}
					handleModal={handleModal}
					action={showModal.action}
					updateBookState={updateBookState}
				/>
			)}
		</Wrapper>
	)
}

export default App
