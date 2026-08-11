const PRECOS = {
  painel: 569.00,
  micro: 1250.00,
  string: 3800.00,
  estruturaTelha: 293.09,
  estruturaPerfil: 197.02,
  cabo6mm: 8.21,
  mc4: 8.80,
  geracaoPorKWp: 101
}

function formatarBRL(valor){
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function gerarOrcamento(){
  const cliente = document.getElementById('cliente').value || "Cliente";
  const kwh = parseFloat(document.getElementById('kwh').value);
  const tipo = document.getElementById('tipo').value;
  if(!kwh) return alert("Digite o consumo");

  const kwpNecessario = kwh / PRECOS.geracaoPorKWp;
  const qtdPainel = Math.ceil(kwpNecessario / 0.620);
  const qtdMicro = Math.ceil(qtdPainel / 4);
  const kits = Math.ceil(qtdPainel / 4);
  const qtdCaboMc4 = qtdPainel * 2;

  let materiais = [];
  let subtotalMaterial = 0;

  // 1. PAINÉIS
  const valPainel = qtdPainel * PRECOS.painel;
  materiais.push({nome: `Painel Solar RONMA 620W Bifacial`, qtd: qtdPainel, valor: PRECOS.painel, total: valPainel});
  subtotalMaterial += valPainel;

  // 2. INVERSOR
  if(tipo === 'micro'){
    const valMicro = qtdMicro * PRECOS.micro;
    materiais.push({nome: `Micro Inversor HOYMILES 2,25KW`, qtd: qtdMicro, valor: PRECOS.micro, total: valMicro});
    subtotalMaterial += valMicro;
  } else {
    materiais.push({nome: `Inversor SOLAR GROWATT 6KW`, qtd: 1, valor: PRECOS.string, total: PRECOS.string});
    subtotalMaterial += PRECOS.string;
  }

  // 3. ESTRUTURA
  const valTelha = kits * PRECOS.estruturaTelha;
  const valPerfil = kits * PRECOS.estruturaPerfil;
  materiais.push({nome: `Kit Estrutura Telha Colonial 4 Placas`, qtd: kits, valor: PRECOS.estruturaTelha, total: valTelha});
  materiais.push({nome: `Kit Perfil Trilho 2.4m`, qtd: kits, valor: PRECOS.estruturaPerfil, total: valPerfil});
  subtotalMaterial += valTelha + valPerfil;

  // 4. CABOS E CONECTORES
  const valCabo = qtdCaboMc4 * PRECOS.cabo6mm;
  const valMc4 = qtdCaboMc4 * PRECOS.mc4;
  materiais.push({nome: `Cabo Solar CC 6mm`, qtd: qtdCaboMc4, valor: PRECOS.cabo6mm, total: valCabo});
  materiais.push({nome: `Conector MC4 Par`, qtd: qtdCaboMc4, valor: PRECOS.mc4, total: valMc4});
  subtotalMaterial += valCabo + valMc4;

  // 5. SERVIÇOS
  const instalacao = qtdPainel * 120;
  const projeto = 510;
  const fiacao = 320;
  const subtotalServico = instalacao + projeto + fiacao; // Soma dos serviços
  const totalGeral = subtotalMaterial + subtotalServico; // Total final

  // MONTA RELATÓRIO 1 PÁGINA
  let html = `<h2>ORÇAMENTO FOTOVOLTAICO</h2>`;
  html += `<p><b>Cliente:</b> ${cliente}</p>`;
  html += `<p><b>Consumo:</b> ${kwh} kWh/mês | <b>Potência:</b> ${kwpNecessario.toFixed(2)} kWp | <b>Painéis:</b> ${qtdPainel} un | <b>Sistema:</b> ${tipo === 'micro' ? 'Micro Inversor' : 'String Inversor'}</p><hr>`;

  // TABELA 1: PRODUTOS / MATERIAIS
  html += `<h3>1. MATERIAIS / PRODUTOS</h3>`;
  html += `<table>`;
  html += `<tr><th>Descrição</th><th style="text-align:center">Qtd</th><th style="text-align:right">Valor Unit.</th><th style="text-align:right">Valor Total</th></tr>`;
  materiais.forEach(item => {
    html += `<tr><td>${item.nome}</td><td style="text-align:center">${item.qtd}</td><td style="text-align:right">${formatarBRL(item.valor)}</td><td style="text-align:right">${formatarBRL(item.total)}</td></tr>`;
  });
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="3" style="text-align:right">SUBTOTAL MATERIAIS:</td><td style="text-align:right">${formatarBRL(subtotalMaterial)}</td></tr>`;
  html += `</table><br>`;

  // TABELA 2: SERVIÇOS
  html += `<h3>2. SERVIÇOS</h3>`;
  html += `<table>`;
  html += `<tr><th>Descrição</th><th style="text-align:center">Qtd</th><th style="text-align:right">Valor Unit.</th><th style="text-align:right">Valor Total</th></tr>`;
  html += `<tr><td>Instalação do Sistema</td><td style="text-align:center">${qtdPainel} painéis</td><td style="text-align:right">${formatarBRL(120)}</td><td style="text-align:right">${formatarBRL(instalacao)}</td></tr>`;
  html += `<tr><td>Projeto Elétrico e ART</td><td style="text-align:center">1</td><td style="text-align:right">${formatarBRL(projeto)}</td><td style="text-align:right">${formatarBRL(projeto)}</td></tr>`;
  html += `<tr><td>Fiação AC + Quadro de Proteção</td><td style="text-align:center">1</td><td style="text-align:right">${formatarBRL(fiacao)}</td><td style="text-align:right">${formatarBRL(fiacao)}</td></tr>`;
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="3" style="text-align:right">SUBTOTAL SERVIÇOS:</td><td style="text-align:right">${formatarBRL(subtotalServico)}</td></tr>`;
  html += `</table><br>`;

  // TOTAL GERAL
  html += `<div style="background:#0056b3; color:white; padding:15px; border-radius:8px; text-align:right; font-size:20px">`;
  html += `<b>VALOR TOTAL DO INVESTIMENTO: ${formatarBRL(totalGeral)}</b>`;
  html += `</div>`;

  html += `<p style="font-size:12px; color:#666; margin-top:20px">Validade da proposta: 30 dias. Áureo Solar</p>`;

  document.getElementById('resultado').innerHTML = html;
}
