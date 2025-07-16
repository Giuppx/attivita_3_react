function Dettaglio(props) {
	return (
		<>
			<div className="mx-5">
				<img
					class="mb-2"
					src={props.libro.immagine}
					alt={props.libro.titolo}
					style={{ width: "300px", marginRight: "10px", height: "380px" }}
				/>
				<h2>{props.libro.titolo}</h2>
				<p>di {props.libro.autore}</p>
				<hr />
				<p> {props.libro.descrizione}</p>
				<button
					className="btn btn-danger"
					onClick={() => {
						props.eliminaLibro(props.libro.index, props.libro.id);
					}}>
					Elimina
				</button>
			</div>
		</>
	);
}

export default Dettaglio;
