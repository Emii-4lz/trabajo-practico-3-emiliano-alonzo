const urlPersonajesGeneral = "https://thesimpsonsapi.com/api/characters";
const urlPersonajeIndividual = "https://thesimpsonsapi.com/api/characters/1";
let personajes = [];
const rowContainer = document.querySelector("#rowContainer");


fetch(urlPersonajesGeneral)
    .then(response => response.json())
    .then(data => console.log(data))


const obtenerPersonajes = async () => {

    try {
        const response = await fetch(urlPersonajesGeneral)
        const data = await response.json()

        return data
    } catch (error) {

        console.log(error)
    }
};

const cargarPersonajes = async () => {
    // obtener los personajes
    personajes = await obtenerPersonajes();

    // recorrer y agregar en el html
    // construir el html
    personajes.forEach((personaje) => {
        rowContainer.innerHTML += `<div>
        <img src=${personaje.image} alt=${personaje.name} />
        <button class="btn btn-primary btn-ver-detalle" data-id=${personaje.id}>ver detalle</button>
    </div>
  `;
    });
};

const filtrarPersonajes = () => {
    cargarPersonajes()
};


obtenerPersonajes();
cargarPersonajes();
filtrarPersonajes();
