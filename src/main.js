//guardando elementos del html
const main= document.getElementById("main");
const tittle= document.getElementById("tittle");
const btnAtras=document.getElementById("btnAtras");
const btnSgte=document.getElementById("btnSiguiente");



//cambiando el título prueba 
tittle.textContent="Personajes de la serie Rick and Murphy"
/* main.innerHTML += estilosTarjeta(dato.name,dato.id,dato.species,dato.gender,dato.status,dato.origin.name) */

/* diseño de tarjeto con los datos sacados  de la api */
const estilosTarjeta= (image,name,id,especie,gender,status,origen)=>{ 
  return `<article class="tarjeta">
          <div class="contenedorImg">
            <img src="${image}" alt="img-perfil" />
          </div>
          <div class="contenedorInfo">
            <h2 class="tarjetaTittle">${name}</h2>
            
            <h2>#${id}</h2>
           
            <h2>especie</h2>
            <p>${especie}</p>
            
            <h2>genero</h2>
            <p>${gender}</p>
           
            <h2>estado</h2>
            <p>${status}</p>
           
            <h2>Origen</h2>
            <p>${origen}</p>
            
          </div>
        </article>`; 
}
// Función para comprobar y reemplazar valores desconocidos
const verificarDato = (valor, mensajeAlternativo = "Es un misterio...") => {
  return valor === "unknown" || valor === "" ? mensajeAlternativo : valor;
};

const getApi = async () => {
  const urlApi = "https://rickandmortyapi.com/api/character";
  try {
    const recibo = await fetch(urlApi);
    if (recibo.status===200) {
      const data = await recibo.json();
      main.innerHTML=""
      data.results.forEach(dato => {
        
         // Aplica la verificación a cada dato necesario
         const name = verificarDato(dato.name);
         const species = verificarDato(dato.species);
         const gender = verificarDato(dato.gender);
         const status = verificarDato(dato.status);
         const origin = verificarDato(dato.origin.name);
         
        console.log(data.results[0]);
       
        
        main.innerHTML += estilosTarjeta(dato.image,name,dato.id,species,gender,status,origin)
        
        
      });
      
    } else if(recibo.status===404){
      console.log("No se encontró la API");
      
    }else if(recibo.status===401){
      console.log("No tienes permisos");
    }
    else{
      console.log("Error desconocido");
    }
   
  } catch (error) {
    console.log(error);
  }
};
getApi()
