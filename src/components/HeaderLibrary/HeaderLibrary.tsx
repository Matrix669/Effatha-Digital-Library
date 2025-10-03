import { Settings } from "lucide-react";
import { supabase } from "../../supabase-client";
import { useNavigate } from "react-router-dom";
import LibraryButton from "../LibraryButton/LibraryButton";

export default function HeaderLibrary() {
	const navigate = useNavigate()

	function isAdminLogged() {
		const checkUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser()
			if (!user) {
				navigate('/login')
			}else {
				navigate('/adminPanel')
			}
		}
		checkUser()
	}
	return (
		<header className='header__title'>
			<div>
				<h1>Effathowa Biblioteka Cyfrowa</h1>
				<p>Przeglądaj i wypożyczaj ksiązki</p>
			</div>
			<LibraryButton onClick={isAdminLogged}>
				<Settings /> Panel Administratora
			</LibraryButton>
		</header>
	)
}
