import styles from './LibraryButton.module.css'
interface LibraryButtonProps {
	children: React.ReactNode
	className?: string
	onClick?: () => void
    disabled?: boolean
    type?: 'submit' | 'button' | 'reset'
}

export default function LibraryButton({ children, className, onClick, disabled, type }: LibraryButtonProps) {
	return (
		<button className={`${styles.libraryButton} ${className ? className : ''}`} onClick={onClick} disabled={disabled} type={type}>
			{children}
		</button>
	)
}
