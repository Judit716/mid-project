document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    console.log('menuToggle:', menuToggle);
    console.log('navLinks:', navLinks);
  
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      console.log('Toggle menu');
    });
  });
  
// Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');  // Obtén el 'id' del proyecto

// Verifica si tienes el id correctamente
console.log(projectId);

// Cargar los datos del proyecto desde la API
fetch(`http://localhost:5000/projects/${projectId}`)
  .then(response => response.json())  // Convierte la respuesta a JSON
  .then(project => {
    // Aquí podrás acceder a los datos del proyecto y mostrarlos
    const projectDetailsContainer = document.getElementById('project-details');

    projectDetailsContainer.innerHTML = `
      <h2>${project.name}</h2>
      <img src="${project.image}" alt="${project.name}" />
      <p><strong>Description:</strong> ${project.description}</p>
      <p><strong>Content:</strong> ${project.content}</p>
      <p><strong>Completed on:</strong> ${project.completed_on}</p>
    `;
  })
  .catch(error => {
    console.error('Error fetching project:', error);
  });



 let attempts = 0; // Contador de intentos fallidos
const correctName = "nacho"; // Nombre correcto

const input = document.getElementById("profesor-input");
const button = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-message");
const container = document.querySelector(".container");
const secreto = document.getElementById("secreto");

button.addEventListener("click", () => {
  const userInput = input.value.trim().toLowerCase();
  

  if (userInput === correctName) {
    
    secreto.style.display = "block"; 
    confetti(); 
  } else {
    
    attempts++;
    if (attempts === 1) {
     
      errorMessage.textContent = "¿En serio? Aún no te sabes su nombre?";
      darkenScreen();
    } else if (attempts === 2) {
      
      errorMessage.textContent = "¿En serio???";
    } else if (attempts >= 3) {
      
      errorMessage.textContent = "¡Game Over!";
      triggerExplosion();
    }
  }

  input.value = ""; // Limpiar el input después de cada intento
});

// Función para oscurecer la pantalla
function darkenScreen() {
  const overlay = document.createElement("div");
  overlay.classList.add("dark-overlay");
  container.appendChild(overlay);
}

// Función para mostrar la explosión
function triggerExplosion() {
  container.classList.add("explosion");
}

// Confeti cuando se acierta
function confetti() {
  confettiLib(); // Llama a una librería externa para animar confeti
}

