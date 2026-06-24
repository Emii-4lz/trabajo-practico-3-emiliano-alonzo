const urlPersonajesGeneral = "https://thesimpsonsapi.com/api/characters";
const urlPersonajeIndividual = "https://thesimpsonsapi.com/api/characters/1";
let personajes = [];

const rowContainer = document.getElementById("rowContainer");
const buscadorInput = document.getElementById("buscadorPjs");
const buscador = document.getElementById("buscador");

const obtenerPersonajes = async () => {
    try {
        const response = await fetch(urlPersonajesGeneral)
        const data = await response.json()
        return data.results;
    } catch (error) {

        console.log(error)
    }
};

const cargarPersonajes = async (listado = null) => {
    if (!listado) {
        personajes = await obtenerPersonajes();
        listado = personajes;
    };

    if (listado && Array.isArray(listado)) {
        rowContainer.innerHTML = "";
        listado.forEach((personaje) => {
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

cargarPersonajes();


function filtrarPersonajes() {
    const texto = buscadorInput.value.trim().toLowerCase();

    if (texto === "") {

        cargarPersonajes(personajes);
        return;
    }

    const filtrados = personajes.filter((personaje) =>
        personaje.name.toLowerCase().includes(texto)
    );

    cargarPersonajes(filtrados);
}

buscadorInput.addEventListener("input", filtrarPersonajes);
if (buscador) {
    buscador.addEventListener("submit", (evento) => {
        evento.preventDefault();
        filtrarPersonajes();
    });
};