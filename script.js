const adicionarBtn = document.querySelector(".btn-adicionar");
const calcularBtn = document.querySelector(".btn-calcular");
var tabela = document.getElementById("tabela");

adicionarBtn.addEventListener("click", adicionarTarefas);
calcularBtn.addEventListener("click", mostrarResumo);

function adicionarTarefas() {
  let opcoes = document.getElementById("option").value; // pega as categorias.
  let valor = document.getElementById("valor").value.replace(",", "."); // pega o valor, e repõem onde tiver vírgulas com um ponto.
  let dataInput = document.getElementById("data");
  var dataObj = new Date();
  const dataAtual = dataObj.getDate();

  if (
    valor > 0 &&
    parseFloat(valor) &&
    opcoes != "" &&
    dataInput.checkValidity() &&
    new Date(dataInput.value) <= new Date()
  ) {
    var coluna = tabela.insertRow(-1); // Adiciona uma nova linha no final da tabela
    var celula1 = coluna.insertCell(0); // Adiciona uma nova célula na primeira coluna da nova linha
    var celula2 = coluna.insertCell(1);
    var celula3 = coluna.insertCell(2);
    celula1.innerHTML = opcoes;
    celula2.innerHTML = formatarData(dataInput);
    celula3.innerHTML = valor;
  }
}

function formatarData(data) {
  const partesData = data.value.split("-");
  const ano = partesData[0];
  const mes = partesData[1];
  const dia = partesData[2];
  return `${dia}/${mes}/${ano}`; // Retorna a data formatada no formato "dd/mm/yyyy"
}

function mostrarResumo() {
  let estaVazia = tabelaEstaVazia();
  if (estaVazia == false) {
    let valorTotal = 0;
    let valorPorMes = {};
    let categoriaMaisFrequente = "";
    let totalGastoCategoriaMaisFrequente = 0;
    let frequenciaCategoria = {};

    for (let i = 1; i < tabela.rows.length; i++) {
      // Percorre todas as linhas da tabela.
      let categoria = tabela.rows[i].cells[0].innerText;
      let valor = parseFloat(
        tabela.rows[i].cells[2].innerText.replace("R$", "")
      );
      let data = tabela.rows[i].cells[1].innerText;
      let mes = data.split("/")[1];

      valorTotal += valor;

      if (valorPorMes[mes] == undefined) {
        // Calcula o valor por mês.
        valorPorMes[mes] = 0;
      }
      valorPorMes[mes] += valor;

      if (frequenciaCategoria[categoria] == undefined) {
        // Calcula a frequência das categorias.
        frequenciaCategoria[categoria] = 0;
      }
      frequenciaCategoria[categoria] += 1;
    }

    let frequenciaMaxima = 0;
    for (let categoria in frequenciaCategoria) {
      // Calcula a categoria mais frequente.
      if (frequenciaCategoria[categoria] > frequenciaMaxima) {
        categoriaMaisFrequente = categoria;
        frequenciaMaxima = frequenciaCategoria[categoria];
      }
    }

    for (let i = 1; i < tabela.rows.length; i++) {
      // Calcula o total gasto com a categoria mais frequente.
      let categoria = tabela.rows[i].cells[0].innerText;
      let valor = parseFloat(
        tabela.rows[i].cells[2].innerText.replace("R$", "")
      );
      if (categoria == categoriaMaisFrequente) {
        totalGastoCategoriaMaisFrequente += valor;
      }
    }

    let valorTotalFormatado = "R$" + valorTotal.toFixed(2); // Mascara para o valor total em R$.

    let valorPorMesFormatado = "";
    for (let mes in valorPorMes) {
      let valorPorMesMesFormatado =
        "Total no mês " + mes + ": R$" + valorPorMes[mes].toFixed(2) + "<br>";
      valorPorMesFormatado += valorPorMesMesFormatado;
    }

    let totalGastoCategoriaMaisFrequenteFormatado = // Formata o total gasto com a categoria mais frequente na tabela.
      "Total de gastos em " +
      categoriaMaisFrequente +
      ": R$" +
      totalGastoCategoriaMaisFrequente.toFixed(2);

    let resumoTexto = document.createElement("p"); // Monta o resumo.
    resumoTexto.innerHTML =
      "<br>" +
      "Valor total: " +
      valorTotalFormatado +
      "<br>" +
      valorPorMesFormatado +
      "<br>" +
      totalGastoCategoriaMaisFrequenteFormatado;
    const resumo = document.querySelector(".resumo");
    resumo.appendChild(resumoTexto);
  }
}

function tabelaEstaVazia() {
  if (tabela.rows.length > 1) {
    return false;
  } else {
    return true;
  }
}
