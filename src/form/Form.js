import React from "react";

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titolo: "",
			autore: "",
			annoPubblicazione: "",
			immagine: "",
			descrizione: "",
			errors: {},
			btn_disabled: true,
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => {
			const { titolo, autore, annoPubblicazione } = this.state;

			const isValid = titolo && autore && annoPubblicazione;

			this.setState({ btn_disabled: !isValid });
		});
	};

	inputValidation = () => {
		const errors = {};
		const { titolo, autore, annoPubblicazione, immagine, descrizione } =
			this.state;

		// input titolo
		if (!titolo) {
			errors.titolo = "Questo campo è obbligatorio.";
		}

		// input autore
		if (!autore) {
			errors.autore = "Questo campo è obbligatorio.";
		} else if (!autore.match(/^[A-Za-zÀ-ú']{2,30}(?: [A-Za-zÀ-ú']{2,30})?$/)) {
			errors.autore =
				"Formato non valido. Inserire solo lettere (es. Mario Rossi)";
		}

		// input annoPubblicazione
		if (!annoPubblicazione) {
			errors.annoPubblicazione = "Questo campo è obbligatorio.";
		} else if (!/^\d{4}$/.test(annoPubblicazione)) {
			errors.annoPubblicazione =
				"Inserisci un anno valido di 4 cifre (es. 2022)";
		}

		// input immagine
		if (
			immagine &&
			!immagine.match(/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg)$/)
		) {
			errors.immagine =
				"url non valido. formati accetati: jpg,jpeg,png,gif,bmp,webp,svg";
		}

		// l' input descrizione  è opzionale

		// aggiungo le chiavi errore allo state
		this.setState({ errors });

		// se ci sono errori ritorno false
		return Object.keys(errors).length > 0 ? false : true;
	};

	submit = (e) => {
		e.preventDefault();

		// controllo se fare il submit
		if (this.inputValidation()) {
			// creo l' oggetto libro valorizato con i valori presi dagli input
			// le chiavi 'immagine' e 'descrizione' presentano delle fallback nel caso siano vuoti
			const libro = {
				titolo: this.state.titolo,
				autore: this.state.autore,
				annoPubblicazione: this.state.annoPubblicazione,
				immagine: this.state.immagine
					? this.state.immagine
					: "https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4=",
				descrizione: this.state.descrizione
					? this.state.descrizione
					: "nessuna descrizione!",
				preferiti: false,
			};

			// aggiungo il libro all' elenco
			this.props.aggiungiLibro(libro);

			// reseto il form
			this.reset();
		} else {
			// avviso l' utente dell' operazione non riuscita
			alert("errore, impossibile aggiungere il libro");
			return;
		}
	};

	reset = () => {
		this.setState({
			titolo: "",
			autore: "",
			annoPubblicazione: "",
			immagine: "",
			descrizione: "",
			errors: {},
		});

		this.state.btn_disabled = true;
	};

	render() {
		return (
			<>
				<form className="p-4 rounded bg-light" onSubmit={this.submit}>
					<h3 className="my-5 text-center">Aggiungi libro</h3>

					<div className="mb-3">
						<label htmlFor="titolo" className="form-label">
							Titolo
						</label>
						<input
							type="text"
							className={`form-control ${
								this.state.errors.titolo ? "is-invalid" : ""
							}`}
							id="titolo"
							name="titolo"
							value={this.state.titolo}
							onChange={this.handleChange}
						/>
						{this.state.errors.titolo && (
							<div className="invalid-feedback">{this.state.errors.titolo}</div>
						)}
					</div>

					<div className="mb-3">
						<label htmlFor="autore" className="form-label">
							Autore
						</label>
						<input
							type="text"
							className={`form-control ${
								this.state.errors.autore ? "is-invalid" : ""
							}`}
							id="autore"
							name="autore"
							value={this.state.autore}
							onChange={this.handleChange}
						/>
						{this.state.errors.autore && (
							<div className="invalid-feedback">{this.state.errors.autore}</div>
						)}
					</div>

					<div className="mb-3">
						<label htmlFor="annoPubblicazione" className="form-label">
							Anno di pubblicazione
						</label>
						<input
							type="text"
							className={`form-control ${
								this.state.errors.annoPubblicazione ? "is-invalid" : ""
							}`}
							id="annoPubblicazione"
							name="annoPubblicazione"
							value={this.state.annoPubblicazione}
							onChange={this.handleChange}
						/>
						{this.state.errors.annoPubblicazione && (
							<div className="invalid-feedback">
								{this.state.errors.annoPubblicazione}
							</div>
						)}
					</div>

					<div className="mb-3">
						<label htmlFor="immagine" className="form-label">
							URL Immagine
						</label>
						<input
							type="text"
							className={`form-control ${
								this.state.errors.immagine ? "is-invalid" : ""
							}`}
							id="immagine"
							name="immagine"
							value={this.state.immagine}
							onChange={this.handleChange}
						/>
						{this.state.errors.immagine && (
							<div className="invalid-feedback">
								{this.state.errors.immagine}
							</div>
						)}
					</div>

					<div className="mb-3">
						<label htmlFor="descrizione" className="form-label">
							Descrizione
						</label>
						<textarea
							className="form-control"
							id="descrizione"
							name="descrizione"
							rows="3"
							value={this.state.descrizione}
							onChange={this.handleChange}
						/>
					</div>

					<button
						type="submit"
						className="btn btn-success mx-2"
						disabled={this.state.btn_disabled}>
						Aggiungi
					</button>
					<button type="reset" className="btn btn-danger" onClick={this.reset}>
						Reset
					</button>
				</form>
			</>
		);
	}
}

export default Form;
