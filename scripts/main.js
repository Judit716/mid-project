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

