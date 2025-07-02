//para o menu cabeçalho
document.addEventListener('DOMContentLoaded', () => {
  const menuCheckbox = document.getElementById('menu');            
  const menuContainer = document.querySelector('.container__menu'); 

 
  menuContainer.addEventListener('mouseleave', () => {
    menuCheckbox.checked = false;
  });
});