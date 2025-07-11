import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./navbar/Navbar";
import Lista from "./lista/Lista";
import Form from "./form/Form";
import Dettaglio from "./lista/dettaglio/Dettaglio";

function App() {
	const [pagina, setPagina] = useState("home");
	const [deattaglioLibro, setDettaglioLibro] = useState(null);

	const [libri, setLibri] = useState([
		{
			titolo: "1984",
			autore: "George Orwell",
			annoPubblicazione: 1949,
			immagine: "https://m.media-amazon.com/images/I/61HkdyBpKOL.jpg",
			descrizione:
				"Un romanzo distopico che esplora la sorveglianza di massa e il totalitarismo in un futuro inquietante.",
		},
		{
			titolo: "Il piccolo principe",
			autore: "Antoine de Saint-Exupéry",
			annoPubblicazione: 1943,
			immagine:
				"https://m.media-amazon.com/images/I/71psYL+BsQL._UF1000,1000_QL80_.jpg",
			descrizione:
				"Un racconto poetico sull'amore, l'amicizia e il senso della vita, narrato da un bambino venuto da un altro pianeta.",
		},
		{
			titolo: "Orgoglio e pregiudizio",
			autore: "Jane Austen",
			annoPubblicazione: 1813,
			immagine:
				"https://m.media-amazon.com/images/I/71CgbSAOOVL._UF1000,1000_QL80_.jpg",
			descrizione:
				"Una storia romantica e ironica sull'amore e le convenzioni sociali nella campagna inglese del XIX secolo.",
		},
	]);

	useEffect(() => {
		console.log(pagina);
	}, [pagina]);

	useEffect(() => {
		console.log(libri);
	}, [libri]);

	function navigaForm() {
		setPagina("from");
	}

	function aggiungiLibro(libro) {
		setLibri((prev) => [...prev, libro]);
	}

	function selezionaLibro(libro, index) {
		setDettaglioLibro({
			index: index,
			titolo: libro.titolo,
			autore: libro.autore,
			annoPubblicazione: libro.annoPubblicazione,
			immagine: libro.immagine,
			descrizione: libro.descrizione,
		});
	}

	function rimuoviLibro(index) {
		setLibri((prevLibri) => prevLibri.filter((_, i) => i !== index));
		setDettaglioLibro(null);
	}

	return (
		<>
			<div className="container-fluid mx-0 px-0">
				<Navbar nav={setPagina} />
			</div>
			<div className="container mt-5">
				{pagina === "home" ? (
					<div className="row">
						<div className="col-md-6 d-felx felx-column">
							<div className="d-flex justify-content-end">
								<button className="btn btn-success p-2" onClick={navigaForm}>
									+ Aggiungi libro
								</button>
							</div>
							<hr />
							<Lista libri={libri} seleziona={selezionaLibro} />
						</div>
						<div className="col-md-6">
							{deattaglioLibro === null ? (
								<h3 className="mx-5">seleziona un libro!</h3>
							) : (
								<Dettaglio
									libro={deattaglioLibro}
									eliminaLibro={rimuoviLibro}
								/>
							)}
						</div>
					</div>
				) : (
					<div className="row">
						<div className="col-md-12 mb-5">
							<Form aggiungiLibro={aggiungiLibro} />
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
