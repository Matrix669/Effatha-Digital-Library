import { Settings } from "lucide-react";

export default function HeaderLibrary() {
	return (
		<header className='header__title'>
			<div>
				<h1>Effathowa Biblioteka Cyfrowa</h1>
				<p>Przeglądaj i wypożyczaj ksiązki</p>
			</div>
			<a href='/login'>
				<Settings /> Panel Administratora
			</a>
		</header>
	)
}
