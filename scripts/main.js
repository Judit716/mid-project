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
  