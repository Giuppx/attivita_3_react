import { useState, useEffect } from "react";

function Modale({ libro, setModale, salva }) {
	const [form, setForm] = useState({ ...libro });
	const [errors, setErrors] = useState({});
	const [btnDisabled, setBtnDisabled] = useState(true);

	useEffect(() => {
		setForm({ ...libro });
		validateInput({ ...libro });
	}, [libro]);

	const validateInput = (data) => {
		const errors = {};

		if (!data.titolo) {
			errors.titolo = "Questo campo è obbligatorio.";
		}

		if (!data.autore) {
			errors.autore = "Questo campo è obbligatorio.";
		} else if (
			!data.autore.match(/^[A-Za-zÀ-ú']{2,30}(?: [A-Za-zÀ-ú']{2,30})?$/)
		) {
			errors.autore =
				"Formato non valido. Inserire solo lettere (es. Mario Rossi)";
		}

		if (!data.annoPubblicazione) {
			errors.annoPubblicazione = "Questo campo è obbligatorio.";
		} else if (!/^\d{4}$/.test(data.annoPubblicazione)) {
			errors.annoPubblicazione =
				"Inserisci un anno valido di 4 cifre (es. 2022)";
		}

		setErrors(errors);
		setBtnDisabled(Object.keys(errors).length > 0);
	};

	const handleChange = (e) => {
		const updated = { ...form, [e.target.name]: e.target.value };
		setForm(updated);
		validateInput(updated);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			console.log("id", libro.id, "form", form);
			salva(libro.id, { ...form });
		}
	};

	return (
		<div className="modal show d-block" tabIndex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Modifica libro</h5>
						<button
							type="button"
							className="btn-close"
							onClick={() => {
								setModale(false);
							}}
							aria-label="Chiudi"></button>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="modal-body">
							<div className="mb-3">
								<label className="form-label">Titolo</label>
								<input
									className={`form-control ${
										errors.titolo ? "is-invalid" : ""
									}`}
									name="titolo"
									value={form.titolo}
									onChange={handleChange}
								/>
								{errors.titolo && (
									<div className="invalid-feedback">{errors.titolo}</div>
								)}
							</div>

							<div className="mb-3">
								<label className="form-label">Autore</label>
								<input
									className={`form-control ${
										errors.autore ? "is-invalid" : ""
									}`}
									name="autore"
									value={form.autore}
									onChange={handleChange}
								/>
								{errors.autore && (
									<div className="invalid-feedback">{errors.autore}</div>
								)}
							</div>

							<div className="mb-3">
								<label className="form-label">Anno Pubblicazione</label>
								<input
									className={`form-control ${
										errors.annoPubblicazione ? "is-invalid" : ""
									}`}
									name="annoPubblicazione"
									value={form.annoPubblicazione}
									onChange={handleChange}
								/>
								{errors.annoPubblicazione && (
									<div className="invalid-feedback">
										{errors.annoPubblicazione}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label className="form-label">URL Immagine</label>
								<input
									className={`form-control ${
										errors.immagine ? "is-invalid" : ""
									}`}
									name="immagine"
									value={form.immagine}
									onChange={handleChange}
								/>
								{errors.immagine && (
									<div className="invalid-feedback">{errors.immagine}</div>
								)}
							</div>

							<div className="mb-3">
								<label className="form-label">Descrizione</label>
								<textarea
									className="form-control"
									name="descrizione"
									value={form.descrizione}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="modal-footer">
							<button
								type="submit"
								className="btn btn-success"
								disabled={btnDisabled}>
								Salva modifiche
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Modale;
