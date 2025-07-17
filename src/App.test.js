import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import App from "./App";

// testare aggiunta componenti
test("Aggiunta nuovo libro", () => {
	render(<App />);

	const libro = screen.getAllByRole(".list-group-item");

	// recupero inputs del form obbligatori
	const titolo = screen.getByLabelText(/titolo/i);
	const autore = screen.getByLabelText(/autore/i);
	const annoPubblicazione = screen.getByLabelText(/annoPubblicazione/i);

	// recupero il bottone submit
	const submit = screen.getByRole("button", { name: /Aggiungi/i });

	// compilo il form
	userEvent.type(titolo, "il signore degli anelli");
	userEvent.type(autore, "Unknow");
	userEvent.type(annoPubblicazione, "1234");

	// al submit
	userEvent.click(submit);

	expect(libro).toBeInTheDocument();
});
