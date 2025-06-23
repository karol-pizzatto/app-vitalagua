function alternarModo() {
  document.body.classList.toggle('dark-mode');
  const modoAtual = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('modo-tema', modoAtual);
}

window.onload = () => {
  const modoSalvo = localStorage.getItem('modo-tema');
  if (modoSalvo === 'dark') {
    document.body.classList.add('dark-mode');
  }
};
