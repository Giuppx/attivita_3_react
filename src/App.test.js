import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

// mok chiamata con axios
jest.mock("axios");

// mok alert
beforeEach(() => {
	jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe("Componente App", () => {
	// test rendering iniziale
	test("rendering home page with button aggiungi libro", async () => {
		// mok lista libri
		axios.get.mockResolvedValueOnce({ data: [] });
		// renderizza la home page
		render(<App />);

		// il bottone è presente nella home page?
		const addButton = await screen.findByText("+ Aggiungi libro");
		expect(addButton).toBeInTheDocument();
	});

	// test aggiunta di un libro
	test("add book", async () => {
		const nuovoLibro = {
			id: "1",
			titolo: "LibroTest",
			autore: "AutoreTest",
			annoPubblicazione: "2024",
			immagine: "https://test.img",
			descrizione: "DescrizioneTest",
		};

		axios.get.mockResolvedValue({
			data: [],
		});

		render(<App />);

		// Vai nella pagina form (clic su + Aggiungi libro)
		fireEvent.click(screen.getByText("+ Aggiungi libro"));

		// Riempimento campi del form
		fireEvent.change(screen.getByLabelText(/Titolo/i), {
			target: { value: "LibroTest" },
		});
		fireEvent.change(screen.getByLabelText(/Autore/i), {
			target: { value: "AutoreTest" },
		});
		fireEvent.change(screen.getByLabelText(/Anno di pubblicazione/i), {
			target: { value: "2024" },
		});
		fireEvent.change(screen.getByLabelText(/URL Immagine/i), {
			target: { value: "https://test.img" },
		});
		fireEvent.change(screen.getByLabelText(/Descrizione/i), {
			target: { value: "DescrizioneTest" },
		});

		// Clic sul bottone Aggiungi (submit form)
		fireEvent.click(screen.getByText("Aggiungi"));

		// MOCK: dopo aggiunta, la get ritorna la lista con il libro nuovo
		axios.get.mockResolvedValueOnce({ data: [nuovoLibro] });

		// torna alla home
		fireEvent.click(screen.getByText("Home"));

		// attendo il rendering del componente List
		const { container } = render(<App />);
		const lista = await container.querySelector(".list-group");
		// la lista è renderizzata?
		expect(lista).toBeInTheDocument();

		//cerco il libro
		const libroRenderizzato = await screen.findByText(nuovoLibro.titolo);
		expect(libroRenderizzato).toBeInTheDocument();
	});
});
