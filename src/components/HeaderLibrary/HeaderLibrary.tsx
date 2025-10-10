import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LibraryButton from "../LibraryButton/LibraryButton";
import { useAuth } from "../../hooks/useAuth";

export default function HeaderLibrary() {
	const navigate = useNavigate()
	const { signOut, userRole } = useAuth()

	const handleAdminPanel = () => {
		if (userRole === 'admin') {
			navigate('/adminPanel')
		} else {
			navigate('/login')
		}
	}
	const handleLogout = async () => {
        await signOut()
        
        // Jeśli wylogowujesz się z panelu admina, idź na stronę główną
        if (location.pathname === '/adminPanel') {
            navigate('/')
        }
        // W innych przypadkach ProtectedRoute sam przekieruje gdzie trzeba
    }
	return (
		<header className='header__title'>
			<div>
				<h1>Effathowa Biblioteka Cyfrowa</h1>
				<p>Przeglądaj i wypożyczaj książki</p>
			</div>
			<div style={{ display: 'flex', gap: '1rem' }}>
				<LibraryButton onClick={handleAdminPanel}>
					<Settings /> Panel Administratora
				</LibraryButton>
				<LibraryButton onClick={handleLogout}>
					<LogOut /> Wyloguj
				</LibraryButton>
			</div>
		</header>
	)
}
