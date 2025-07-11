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
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submit = (e) => {
		e.preventDefault();
		const { titolo, autore, annoPubblicazione, immagine, descrizione } =
			this.state;

		const errors = {};

		// validazione

		if (!titolo) {
			errors.titolo = "Questo campo è obbligatorio.";
		}
		if (!autore) {
			errors.autore = "Questo campo è obbligatorio.";
		}
		if (!annoPubblicazione) {
			errors.annoPubblicazione = "Questo campo è obbligatorio.";
		}

		this.setState({ errors });

		if (!errors.titolo && !errors.autore && !errors.annoPubblicazione) {
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
			};
			this.props.aggiungiLibro(libro);
			alert("libro aggiunto con sucesso");
		} else {
			alert("errore, impossibile aggiungere il libro");

			return;
		}

		this.reset();
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
							className={`form-control from-control-sm ${
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
							className={`form-control from-control-sm ${
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
							className="form-control from-control-sm"
							id="immagine"
							name="immagine"
							value={this.state.immagine}
							onChange={this.handleChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="descrizione" className="form-label">
							Descrizione
						</label>
						<textarea
							className="form-control from-control-sm"
							id="descrizione"
							name="descrizione"
							rows="3"
							value={this.state.descrizione}
							onChange={this.handleChange}
						/>
					</div>

					<button type="submit" className="btn btn-success mx-2">
						Aggiungi Libro
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
