// 1) Função que renderiza só a lista de clientes
function mostrarClientesRegistrados() {
  const tbody = document.getElementById('listaClientes');
  tbody.innerHTML = '';

  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  clientes.forEach((cliente, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-nome">${cliente.nome}</td>
      <td class="col-endereco">${cliente.endereco}</td>
      <td class="col-telefone">${cliente.telefone}</td>
      <td class="col-cidade">${cliente.cidade}</td>
      <td class="col-status"><span class="status-tag ativo">Ativo</span></td>
      <td class="col-acoes">
        <button onclick="editarCliente(${index})" class="btn-editar">Editar</button>
        <button onclick="excluirCliente(${index})" class="btn-excluir">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  aplicarFiltro();
}

// 2) Toggle de colunas (igual ao customers.js)
function toggleColuna(col) {
  document
    .querySelectorAll(`th[data-col="${col}"], td.col-${col}`)
    .forEach(el => el.classList.toggle('hidden-coluna'));
  const emoji = document.getElementById(`emoji-${col}`);
  if (emoji) emoji.textContent = emoji.textContent === '🙊' ? '🙈' : '🙊';
}

// 3) Filtro de linhas (igual ao customers.js)
function aplicarFiltro() {
  const selectFiltro = document.getElementById('colunaFiltro');
  const inputFiltro  = document.getElementById('textoFiltro');
  if (!selectFiltro || !inputFiltro) return;

  const col = selectFiltro.value;
  const txt = inputFiltro.value.trim().toLowerCase();
  document.querySelectorAll('#listaClientes tr').forEach(tr => {
    const td = tr.querySelector(`td.col-${col}`);
    tr.style.display = td && td.textContent.toLowerCase().includes(txt)
      ? ''
      : 'none';
  });
}

// 4) Ações de editar/excluir (pode reaproveitar do customers.js)
//    Se preferir só listar, comente essas funções ou remova os botões no HTML.
function editarCliente(index) {
  localStorage.setItem('indexEditando', index);
  window.location.href = 'customers.html'; // leva pra página de cadastro/edit
}
function excluirCliente(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  if (confirm('Deseja excluir este cliente?')) {
    clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    mostrarClientesRegistrados();
  }
}

// 5) Registra os listeners e dispara a renderização
window.addEventListener('DOMContentLoaded', () => {
  // listeners de filtro
  const selectFiltro = document.getElementById('colunaFiltro');
  const inputFiltro  = document.getElementById('textoFiltro');
  if (selectFiltro && inputFiltro) {
    selectFiltro.addEventListener('change', aplicarFiltro);
    inputFiltro.addEventListener('input', aplicarFiltro);
  }

  // mostra a tabela
  mostrarClientesRegistrados();
});
