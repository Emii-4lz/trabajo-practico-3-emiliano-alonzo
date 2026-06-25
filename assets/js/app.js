const urlPersonajesGeneral = "https://thesimpsonsapi.com/api/characters";
const urlPersonajeIndividual = "https://thesimpsonsapi.com/api/characters/1";
let personajes = [];

const rowContainer = document.getElementById("rowContainer");
const buscadorInput = document.getElementById("buscadorPjs");
const buscador = document.getElementById("buscador");
const botonBuscar = document.getElementById("botonBuscar")


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
                        <button class="btn btn-primary" id="btn-ver-personaje" data-id="${personaje.id}">ver detalle</button>
                    </div>
                `;
        });
    } else {
        console.error("No se pudieron cargar los personajes o la API no devolvió un array.");
    };
}

obtenerPersonajes()
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

//const urlPersonajeIndividual = "https://thesimpsonsapi.com/api/characters${personaje.id}"

async function obtenerPersonajeIndividual(id) {
    try {
        const response = await fetch(`${urlPersonajesGeneral}/${id}`);

        const personaje = await response.json();

        mostrarModal(personaje);
    } catch (error) {
        console.log(error);
    }
}

function mostrarModal(personaje) {
    document.getElementById("modalNombre").textContent = personaje.name;
    document.getElementById("modalImg").src = `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`;
    document.getElementById("modalEdad").textContent = personaje.age ?? "Desconocida";
    document.getElementById("modalFNacimiento").textContent = personaje.birthdate ?? "Desconocida";
    document.getElementById("modalGenero").textContent =
        personaje.gender ?? "Desconocido";
    document.getElementById("modalOcupacion").textContent = personaje.occupation;
    document.getElementById("modalEstado").textContent = personaje.status;
    document.getElementById("modalFrase").textContent =
        personaje.phrases[0] ?? "Sin frases";


    const modal = new bootstrap.Modal(document.getElementById("modalDetalle"));
    modal.show();
};

rowContainer.addEventListener("click", (event) => {
    if (event.target.id === "btn-ver-personaje") {
        const id = event.target.dataset.id;
        obtenerPersonajeIndividual(id);
    };
});
