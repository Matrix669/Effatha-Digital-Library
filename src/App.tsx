import { useBookManagement } from './hooks/useBookManagement'

import Wrapper from './components/Wrapper/Wrapper'
import HeaderLibrary from './components/HeaderLibrary/HeaderLibrary'
import BookAlert from './components/BookAlert/BookAlert'
import BookList from './components/BookList/BookList'

import { getBookStateClass } from './utils/utils'

import './App.css'
import BookFilter from './components/BookFilter/BookFilter'

function App() {
	const {
		selectedBooksState,
		setSelectedBooksState,
		numberOfBooks,
		textForNumberOfBooks,
		handleModal,
		showModal,
		filteredBooks,
		updateBookState
	} = useBookManagement()

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
