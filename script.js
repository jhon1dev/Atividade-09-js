const adicionarBtn = document.querySelector('.btn-adicionar');
var tabela = document.getElementById('tabela');

adicionarBtn.addEventListener("click", adicionarTarefas);

function adicionarTarefas() {
    let opcoes = document.getElementById('option').value;
    let valor = document.getElementById('valor').value;
    let data = document.getElementById('data');

    if ((valor > 0 || parseFloat(valor)) && opcoes != "" && data.checkValidity()) {
            var coluna = tabela.insertRow(-1); // Adiciona uma nova linha no final da tabela
            var celula1 = coluna.insertCell(0); // Adiciona uma nova célula na primeira coluna da nova linha
            var celula2 = coluna.insertCell(1); 
            var celula3 = coluna.insertCell(2); 
            celula1.innerHTML = opcoes;
            celula2.innerHTML = formatarData(data);
            celula3.innerHTML = valor;
    }
}

function formatarData(data){
    const partesData = data.value.split('-');
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2]; 
    return `${dia}/${mes}/${ano}`; // Retorna a data formatada no formato "dd/mm/yyyy"
}
