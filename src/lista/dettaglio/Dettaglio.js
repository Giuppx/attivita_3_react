function Dettaglio(props) {
	return (
		<>
			<div className="mx-5">
				<img
					src={props.libro.immagine}
					alt={props.libro.titolo}
					style={{ width: "300px", marginRight: "10px", height: "380px" }}
				/>
				<h3>Titolo: {props.libro.titolo}</h3>
				<p> {props.libro.descrizione}</p>
				<button
					className="btn btn-danger"
					onClick={() => {
						props.eliminaLibro(props.libro.index);
					}}>
					Elimina
				</button>
			</div>
		</>
	);
}

export default Dettaglio;
