let indexEditando = null;

// Ao abrir a página, lê o índice pendente (ou null)
window.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('indexEditando');  //estava index no lugar de stored
    if (stored !== null) {                               //estava index no lugar de stored
      indexEditando = Number(stored);
      localStorage.removeItem('indexEditando');
      preencherFormulario(indexEditando);
    }
  const btnSalvar = document.querySelector('.botao-salvar');
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarCliente);
    }  
});

// Preenche o form com dados de um cliente existente
function preencherFormulario(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const cliente = clientes[index];
  if (!cliente) return;

  document.getElementById('nomeCliente').value        = cliente.nome;
  document.getElementById('cepCliente').value         = cliente.cep;
  document.getElementById('enderecoCliente').value    = cliente.endereco;
  document.getElementById('numCliente').value         = cliente.numero;
  document.getElementById('bairroCliente').value      = cliente.bairro;
  document.getElementById('cidadeCliente').value      = cliente.cidade;
  document.getElementById('complementoCliente').value = cliente.complemento;
  document.getElementById('telefoneCliente').value    = cliente.telefone;
  document.getElementById('documentoCliente').value   = cliente.documento;
}

// Limpa visual de erros
function clearFieldErrors() {
  document.querySelectorAll('.field').forEach(field => {
    field.classList.remove('has-error');
    const span = field.querySelector('.error-message');
      if (span) span.style.display = 'none';
    });
}

// Validação retorna { campo: mensagem, ... }
function validarFormularioCliente(cliente) {
  const errors = {};
    if (!cliente.nome.trim())                 errors.nome      = "Nome é obrigatório.";
    if (!/^\d{8}$/.test(cliente.cep))          errors.cep       = "CEP inválido. Deve conter 8 dígitos.";
    if (cliente.numero && isNaN(cliente.numero)) errors.numero   = "Número deve conter apenas dígitos.";
    if (cliente.telefone && !/^\d{8,15}$/.test(cliente.telefone))
                                                errors.telefone = "Telefone inválido. 8–15 dígitos.";
    if (cliente.documento && !/^(\d{11}|\d{14})$/.test(cliente.documento))
                                                errors.documento = "Documento deve ter 11 ou 14 dígitos.";
  return errors;
}

// Salvar ou editar cliente
function salvarCliente() {
  const novoCliente = {
    nome:        document.getElementById('nomeCliente').value,
    cep:         document.getElementById('cepCliente').value,
    endereco:    document.getElementById('enderecoCliente').value,
    numero:      document.getElementById('numCliente').value,
    bairro:      document.getElementById('bairroCliente').value,
    cidade:      document.getElementById('cidadeCliente').value,
    complemento: document.getElementById('complementoCliente').value,
    telefone:    document.getElementById('telefoneCliente').value,
    documento:   document.getElementById('documentoCliente').value
  };

  clearFieldErrors();
  const fieldErrors = validarFormularioCliente(novoCliente);
    if (Object.keys(fieldErrors).length > 0) {
      for (let [campo, msg] of Object.entries(fieldErrors)) {
        const fieldDiv = document.getElementById(`field-${campo}`);
        const span     = fieldDiv.querySelector('.error-message');
        fieldDiv.classList.add('has-error');
        span.textContent = msg;
        span.style.display = 'block';
      }
    return;
  }

let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  if (indexEditando !== null) {
    clientes[indexEditando] = novoCliente;
    indexEditando = null;
      } else {
        clientes.push(novoCliente);
      }
  localStorage.setItem('clientes', JSON.stringify(clientes));

  const msg = document.getElementById('mensagemSucesso');
    msg.textContent = 'Salvo!';
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 3000);

  limparFormulario();
  clearFieldErrors();
}
//para o menu cabeçalho
document.addEventListener('DOMContentLoaded', () => {
  const menuCheckbox = document.getElementById('menu');            
  const menuContainer = document.querySelector('.container__menu'); 

 
  menuContainer.addEventListener('mouseleave', () => {
    menuCheckbox.checked = false;
  });
});

  // redireciona para a lista, se quiser:
  //window.location.href = 'registered.html';


