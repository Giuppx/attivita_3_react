import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import Navbar from "./navbar/Navbar";
import Lista from "./lista/Lista";
import Form from "./form/Form";
import Dettaglio from "./lista/dettaglio/Dettaglio";

function App() {
	const [pagina, setPagina] = useState("home");
	const [deattaglioLibro, setDettaglioLibro] = useState(null);

	// libri
	const [libri, setLibri] = useState([]);

	useEffect(() => {
		axios
			.get("https://6864ea425b5d8d03397ed017.mockapi.io/arpav/dipendenti/libri")
			.then((response) => setLibri(response.data))
			.catch((err) => console.log(err));
	}, []);

	function aggiungiLibro(libro) {
		axios
			.post(
				"https://6864ea425b5d8d03397ed017.mockapi.io/arpav/dipendenti/libri/",
				libro
			)
			.then((response) => {
				{
					/** aggiorno la vista */
				}
				setLibri((prevLibri) => [...prevLibri, response.data]);
				{
					/** avviso l' utente */
				}
				alert("libro aggiunto con successo");
			})
			.catch((err) => alert("errore  libro non aggiunto"));
	}

	useEffect(() => {
		console.log(pagina);
	}, [pagina]);

	useEffect(() => {
		console.log(libri);
	}, [libri]);

	function navigaForm() {
		setPagina("from");
	}

	function selezionaLibro(libro, index) {
		setDettaglioLibro({
			id: libro.id,
			index: index,
			titolo: libro.titolo,
			autore: libro.autore,
			annoPubblicazione: libro.annoPubblicazione,
			immagine: libro.immagine,
			descrizione: libro.descrizione,
		});
	}

	function rimuoviLibro(index, id) {
		console.log("index: ", index, "id: ", id);
		axios
			.delete(
				"https://6864ea425b5d8d03397ed017.mockapi.io/arpav/dipendenti/libri/" +
					id
			)
			.then((response) => {
				alert("libro rimosso");
				setLibri((prevLibri) => prevLibri.filter((_, i) => i !== index));
				setDettaglioLibro(null);
			})
			.catch((err) => alert("impossibile rimuovere il libro"));
	}

	// modale
	const [libroDaModificare, setLibroDaModificare] = useState(null);
	const [showModale, setShowModale] = useState(false);

	const handleDoppioClick = (id) => {
		axios
			.get(
				`https://6864ea425b5d8d03397ed017.mockapi.io/arpav/dipendenti/libri/${id}`
			)
			.then((res) => {
				setLibroDaModificare(res.data);
				setShowModale(true);
			})
			.catch(() => alert("Errore nel recupero del libro"));
	};

	const salvaModifiche = (id, libroModificato) => {
		axios
			.put(
				`https://6864ea425b5d8d03397ed017.mockapi.io/arpav/dipendenti/libri/${id}`,
				libroModificato
			)
			.then((res) => {
				setLibri((prev) =>
					prev.map((libro) => (libro.id === id ? res.data : libro))
				);
				setDettaglioLibro(res.data);
				alert("Modifiche salvate");
			})
			.catch(() => alert("Errore durante il salvataggio"));
	};

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
							<Lista
								libri={libri}
								seleziona={selezionaLibro}
								doppioClick={handleDoppioClick}
								salvaModifiche={salvaModifiche}
								libroDaModificare={libroDaModificare}
								mostraModale={showModale}
								setModale={setShowModale}
							/>
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
