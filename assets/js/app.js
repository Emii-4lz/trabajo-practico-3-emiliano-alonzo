const urlPersonajesGeneral = "https://thesimpsonsapi.com/api/characters";
const urlPersonajeIndividual = "https://thesimpsonsapi.com/api/characters/1";
personajes = [];
const rowContainer = document.getElementById("rowContainer");


fetch(urlPersonajesGeneral)
    .then(response => response.json())
    .then(data => console.log(data))


const obtenerPersonajes = async () => {

    try {
        const response = await fetch(urlPersonajesGeneral)
        const data = await response.json()
        return data.results;
    } catch (error) {

        console.log(error)
    }
};

const cargarPersonajes = async () => {
    const personajes = await obtenerPersonajes()
    if (personajes && Array.isArray(personajes)) {
        rowContainer.innerHTML = "";
        personajes.forEach((personaje) => {
            rowContainer.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <img src="https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}" alt="${personaje.name}"/>
                        <h3>${personaje.name}</h3>
                        <p>${personaje.occupation}</p>
                        <p>${personaje.status}</p>
                        <button class="btn btn-primary btn-ver-detalle" data-id="${personaje.id}">ver detalle</button>
                    </div>
                `;
        });
    } else {
        console.error("No se pudieron cargar los personajes o la API no devolvió un array.");
    };
}





const filtrarPersonajes = () => {
    cargarPersonajes()
};


obtenerPersonajes();
cargarPersonajes();                                               
