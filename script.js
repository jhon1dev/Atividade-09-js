var tabela = document.getElementById('tabela');
const adicionarBtn = document.querySelector('.btn-adicionar');

adicionarBtn.addEventListener("click", adicionarTarefas);

function adicionarTarefas() {
    let opcoes = document.getElementById('option').value;
    let valor = document.getElementById('valor').value;
    let data = document.getElementById('data');

    if (opcoes != "" && valor > 0 && data.checkValidity()) {
    }
}