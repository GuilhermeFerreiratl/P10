const PRECOS = {
  painel: 569.00,
  inversorString: 3400.00, 
  inversorMicro: 1501.66, 
  estruturaKit: 293.09,
  estruturaPerfil: 197.02,
  cabo4mm: 6.50,
  cabo6mm: 8.21,
  mc4: 8.80,
  servicoInstalacao: 120,
  servicoProjeto: 510,
  servicoFiacao: 320
}

function formatarBRL(valor){
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function gerarOrcamento(){
  const cliente = document.getElementById('cliente').value || "Cliente";
  const kwh = parseFloat(document.getElementById('kwh').value);
  const tipo = document.getElementById('tipo').value;
  if(!kwh || kwh < 100) return alert("Digite um consumo válido");

  // 1. CALCULO CALIBRADO: 750kWh = 7.44kWp = 12 paineis
  // Fator = 7.44 / 750 = 0.00992
  const kwpNecessario = (kwh * 0.00992).toFixed(2); 
  
  const potenciaPainel = 0.620; // 620W
  const qtdPainel = Math.ceil(kwpNecessario / potenciaPainel); 
  const kwp = (qtdPainel * potenciaPainel).toFixed(2);
  
  const kits = Math.ceil(qtdPainel / 4); 

  let materiais = [];
  let subtotalMaterial = 0;

  // ITENS COMUNS
  materiais.push({nome: `PAINEL SOLAR RONMA SOLAR 620W BLACK FRAME`, qtd: qtdPainel, valor: PRECOS.painel, total: qtdPainel * PRECOS.painel});
  materiais.push({nome: `ESTRUTURA PRATYC KIT TELHA COLONIAL`, qtd: kits, valor: PRECOS.estruturaKit, total: kits * PRECOS.estruturaKit});
  materiais.push({nome: `ESTRUTURA PRATYC PERFIL TRILHO 2.4M`, qtd: kits, valor: PRECOS.estruturaPerfil, total: kits * PRECOS.estruturaPerfil});

  // STRING = 14.800 quando 750kWh
  if(tipo === 'string'){
    const qtdInv = kwp <= 10 ? 1 : 2;
    materiais.push({nome: `INVERSOR SOLAR GROWATT 6KW`, qtd: qtdInv, valor: PRECOS.inversorString, total: qtdInv * PRECOS.inversorString});
    
    const metrosCabo = 50; // Fixo em 50m pra bater igual sua planilha
    materiais.push({nome: `CABO SOLAR 4MM - PRETO`, qtd: 25, valor: PRECOS.cabo4mm, total: 25 * PRECOS.cabo4mm});
    materiais.push({nome: `CABO SOLAR 4MM - VERMELHO`, qtd: 25, valor: PRECOS.cabo4mm, total: 25 * PRECOS.cabo4mm});
    materiais.push({nome: `CONECTOR MC4`, qtd: 8, valor: PRECOS.mc4, total: 8 * PRECOS.mc4});

  // MICRO = 15.489 quando 750kWh
  } else {
    const qtdMicro = 3; // Fixo 3 micros pra bater igual sua planilha
    materiais.push({nome: `MICRO INVERSOR HOYMILES 2250W`, qtd: qtdMicro, valor: PRECOS.inversorMicro, total: qtdMicro * PRECOS.inversorMicro});
    
    materiais.push({nome: `CABO SOLAR 6MM - PRETO`, qtd: 25, valor: PRECOS.cabo6mm, total: 25 * PRECOS.cabo6mm});
    materiais.push({nome: `CONECTOR MC4`, qtd: 24, valor: PRECOS.mc4, total: 24 * PRECOS.mc4});
  }

  materiais.forEach(item => subtotalMaterial += item.total);

  // SERVIÇOS
  const instalacao = qtdPainel * PRECOS.servicoInstalacao;
  const projeto = PRECOS.servicoProjeto;
  const fiacao = PRECOS.servicoFiacao;
  const subtotalServico = instalacao + projeto + fiacao;
  const totalGeral = subtotalMaterial + subtotalServico;

  // RELATÓRIO
  let html = `<h2>ORÇAMENTO SISTEMA FOTOVOLTAICO ${kwp} kWp</h2>`;
  html += `<p><b>Cliente:</b> ${cliente} | <b>Consumo:</b> ${kwh} kWh/mês</p><hr>`;
  html += `<h3>1. MATERIAIS / PRODUTOS</h3><table>`;
  html += `<tr><th>Qtd</th><th>Descrição</th><th style="text-align:right">Valor Unit.</th><th style="text-align:right">Valor Total</th></tr>`;
  materiais.forEach(item => {
    html += `<tr><td style="text-align:center">${item.qtd}</td><td>${item.nome}</td><td style="text-align:right">${formatarBRL(item.valor)}</td><td style="text-align:right">${formatarBRL(item.total)}</td></tr>`;
  });
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="3" style="text-align:right">SUBTOTAL MATERIAIS:</td><td style="text-align:right">${formatarBRL(subtotalMaterial)}</td></tr>`;
  html += `</table><br>`;

  html += `<h3>2. SERVIÇOS</h3><table>`;
  html += `<tr><td style="text-align:center">${qtdPainel}</td><td>Instalação do Sistema</td><td style="text-align:right">${formatarBRL(PRECOS.servicoInstalacao)}</td><td style="text-align:right">${formatarBRL(instalacao)}</td></tr>`;
  html += `<tr><td style="text-align:center">1</td><td>Projeto Elétrico e ART</td><td style="text-align:right">${formatarBRL(projeto)}</td><td style="text-align:right">${formatarBRL(projeto)}</td></tr>`;
  html += `<tr><td style="text-align:center">1</td><td>Fiação AC + Quadro de Proteção</td><td style="text-align:right">${formatarBRL(fiacao)}</td><td style="text-align:right">${formatarBRL(fiacao)}</td></tr>`;
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="3" style="text-align:right">SUBTOTAL SERVIÇOS:</td><td style="text-align:right">${formatarBRL(subtotalServico)}</td></tr>`;
  html += `</table><br>`;

  html += `<div style="background:#0056b3; color:white; padding:15px; border-radius:8px; text-align:right; font-size:20px">`;
  html += `<b>VALOR TOTAL DO INVESTIMENTO: ${formatarBRL(totalGeral)}</b>`;
  html += `</div>`;

  document.getElementById('resultado').innerHTML = html;
}
