//Ainda aprendendo java e usando ia 

// Variáveis que guardam o estado da calculadora
let expressao = '';   // ex: "7 + 3 * "
let atual     = '0';  // número que aparece no display
let novoNum   = true; // true = próximo dígito começa um número novo

// Atualiza o que aparece na tela
function atualizar() {
  document.getElementById('resultado').textContent = atual;
  document.getElementById('expressao').textContent = expressao;
}

// Chamada quando o usuário aperta um número
function digito(n) {
  if (novoNum) {
    atual   = n;      // começa um número novo
    novoNum = false;
  } else {
    if (atual === '0') atual = n;  // troca o zero inicial
    else atual += n;               // junta o dígito no número atual
  }
  atualizar();
}

// Adiciona ponto decimal
function ponto() {
  if (novoNum) {
    atual   = '0.';
    novoNum = false;
    atualizar();
    return;
  }
  if (atual.includes('.')) return; // já tem ponto, ignora
  atual += '.';
  atualizar();
}

// Chamada quando o usuário aperta +, -, * ou /
function operador(op) {
  expressao += atual + ' ' + op + ' ';
  novoNum    = true;
  atualizar();
}

// Calcula o resultado final
function calcular() {
  try {
    const exprCompleta = expressao + atual;
    const resultado    = Function('"use strict"; return (' + exprCompleta + ')')();

    atual     = parseFloat(resultado.toFixed(10)).toString();
    expressao = exprCompleta + ' =';
    novoNum   = true;
    atualizar();

  } catch (e) {
    atual     = 'Erro';
    expressao = '';
    novoNum   = true;
    atualizar();
  }
}

// Limpa tudo
function limpar() {
  expressao = '';
  atual     = '0';
  novoNum   = true;
  atualizar();
}

// Inverte o sinal do número (positivo ↔ negativo)
function inverterSinal() {
  if (atual === '0') return;
  if (atual.startsWith('-')) {
    atual = atual.slice(1);     // remove o '-'
  } else {
    atual = '-' + atual;        // adiciona o '-'
  }
  atualizar();
}

// Divide o número por 100 (porcentagem)
function porcentagem() {
  atual = String(parseFloat(atual) / 100);
  atualizar();
}

// Suporte ao teclado
document.addEventListener('keydown', function(e) {
  if (e.key >= '0' && e.key <= '9') digito(e.key);
  else if (e.key === '.')            ponto();
  else if (e.key === '+')            operador('+');
  else if (e.key === '-')            operador('-');
  else if (e.key === '*')            operador('*');
  else if (e.key === '/') { e.preventDefault(); operador('/'); }
  else if (e.key === 'Enter' || e.key === '=') calcular();
  else if (e.key === 'Escape')       limpar();
  else if (e.key === 'Backspace') {
    if (atual.length > 1) atual = atual.slice(0, -1);
    else atual = '0';
    atualizar();
  }
});
