function Lista(props) {
	return (
		<div className="list-group">
			{props.libri.length > 0 ? (
				props.libri.map((libro, index) => (
					<a
						href="#"
						className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
						key={index}
						onClick={() => {
							props.seleziona(libro, index);
							console.log(libro);
						}}>
						<img
							src={libro.immagine}
							alt={libro.titolo}
							style={{ width: "60px", marginRight: "10px", height: "80px" }}
						/>
						{libro.titolo}
					</a>
				))
			) : (
				<p className="text-muted">Nessun libro disponibile!</p>
			)}
		</div>
	);
}

export default Lista;
