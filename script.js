const PRECOS = {
  painel: 569.00,
  micro: 989.00,
  string: 4800.00,
  estruturaTelha: 293.09,
  estruturaPerfil: 197.02,
  cabo6mm: 8.21,
  mc4: 8.80,
  geracaoPorKWp: 101
}

let dadosOrcamento = {};

function gerarOrcamento(){
  const kwh = parseFloat(document.getElementById('kwh').value);
  const tipo = document.getElementById('tipo').value;
  if(!kwh) return alert("Digite o consumo");

  const kwpNecessario = kwh / PRECOS.geracaoPorKWp;
  const qtdPainel = Math.ceil(kwpNecessario / 0.620);
  const qtdMicro = Math.ceil(qtdPainel / 4);

  let materiais = [];
  let subtotalMaterial = 0;

  const valPainel = qtdPainel * PRECOS.painel;
  materiais.push({nome: `Painel Solar RONMA 620W Bifacial`, qtd: qtdPainel, valor: PRECOS.painel, total: valPainel});
  subtotalMaterial += valPainel;

  if(tipo === 'micro'){
    const valMicro = qtdMicro * PRECOS.micro;
    materiais.push({nome: `Micro Inversor HOYMILES 2,25KW`, qtd: qtdMicro, valor: PRECOS.micro, total: valMicro});
    subtotalMaterial += valMicro;
  } else {
    materiais.push({nome: `Inversor SOLAR GROWATT 6KW`, qtd: 1, valor: PRECOS.string, total: PRECOS.string});
    subtotalMaterial += PRECOS.string;
  }

  const kits = Math.ceil(qtdPainel / 4);
  const valTelha = kits * PRECOS.estruturaTelha;
  const valPerfil = kits * PRECOS.estruturaPerfil;
  materiais.push({nome: `Kit Estrutura Telha Colonial 4 Placas`, qtd: kits, valor: PRECOS.estruturaTelha, total: valTelha});
  materiais.push({nome: `Kit Perfil Trilho 2.4m`, qtd: kits, valor: PRECOS.estruturaPerfil, total: valPerfil});
  subtotalMaterial += valTelha + valPerfil;

  const valCabo = qtdPainel * 2 * PRECOS.cabo6mm;
  const valMc4 = qtdPainel * 2 * PRECOS.mc4;
  materiais.push({nome: `Cabo Solar CC 6mm`, qtd: qtdPainel * 2, valor: PRECOS.cabo6mm, total: valCabo});
  materiais.push({nome: `Conector MC4`, qtd: qtdPainel * 2, valor: PRECOS.mc4, total: valMc4});
  subtotalMaterial += valCabo + valMc4;

  const impostos = subtotalMaterial * 0.21;
  const instalacao = qtdPainel * 120;
  const projeto = 510;
  const fiacao = 320;
  const subtotalInstalacao = instalacao + projeto + fiacao;
  const totalGeral = subtotalMaterial + impostos + subtotalInstalacao;

  dadosOrcamento = {kwh, kwpNecessario, qtdPainel, tipo, materiais, subtotalMaterial, impostos, subtotalInstalacao, totalGeral};
  mostrarResultado();
}

function mostrarResultado(){
  const d = dadosOrcamento;
  let html = `<div class="bg-white p-6 rounded-2xl shadow-md">`;
  html += `<h2 class="text-xl font-bold mb-4">Orçamento ${d.kwpNecessario.toFixed(2)} KWp - ${d.kwh} kWh/mês</h2>`;
  
  html += `<h3 class="font-bold mt-4">1. Materiais</h3><table class="w-full text-sm mt-2">`;
  d.materiais.forEach(m => {
    html += `<tr><td>${m.qtd}x ${m.nome}</td><td class="text-right">R$ ${m.total.toFixed(2)}</td></tr>`;
  });
  html += `<tr class="font-bold"><td>Subtotal Material</td><td class="text-right">R$ ${d.subtotalMaterial.toFixed(2)}</td></tr>`;
  html += `<tr><td>Impostos ~21%</td><td class="text-right">R$ ${d.impostos.toFixed(2)}</td></tr></table>`;

  html += `<h3 class="font-bold mt-4">2. Instalação</h3><table class="w-full text-sm mt-2">`;
  html += `<tr><td>Instalação R$120 x ${d.qtdPainel} paineis</td><td class="text-right">R$ ${(d.qtdPainel*120).toFixed(2)}</td></tr>`;
  html += `<tr><td>Projeto COPEL</td><td class="text-right">R$ 510.00</td></tr>`;
  html += `<tr><td>Fiação Cobre + Haste Aterramento</td><td class="text-right">R$ 320.00</td></tr>`;
  html += `<tr class="font-bold"><td>Subtotal Instalação</td><td class="text-right">R$ ${d.subtotalInstalacao.toFixed(2)}</td></tr></table>`;

  html += `<h3 class="font-bold text-lg mt-4 text-amber-600">TOTAL GERAL: R$ ${d.totalGeral.toFixed(2)}</h3>`;
  html += `</div>`;

  document.getElementById('resultado').innerHTML = html;
  document.getElementById('resultado').classList.remove('hidden');
  document.getElementById('btnPdf').classList.remove('hidden');
}

function gerarPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Painel 10 - Orçamento", 10, 10);
  doc.text(`Sistema: ${dadosOrcamento.kwpNecessario.toFixed(2)} KWp`, 10, 20);
  doc.text(`Geração: ${dadosOrcamento.kwh} kWh/mês`, 10, 30);
  doc.text(`Total: R$ ${dadosOrcamento.totalGeral.toFixed(2)}`, 10, 40);
  doc.save("orcamento-painel10.pdf");
}
