const PRECOS = {
  painel: 569.00,
  inversorString: 3400.00, // 1x String 
  inversorMicro: 1501.66, // 3x Micro = 4504.98
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
  if(!kwh) return alert("Digite o consumo");

  const qtdPainel = 12;
  const kits = 3;
  const kwp = 7.44;

  let materiais = [];
  let subtotalMaterial = 0;

  // ITENS COMUNS
  materiais.push({nome: `PAINEL SOLAR RONMA SOLAR RM-620W-132TB BLACK FRAME BIFACIAL 620W`, qtd: 12, valor: 569.00, total: 6828.00});
  materiais.push({nome: `ESTRUTURA PRATYC 2.200.01.18.054 KIT TELHA COLONIAL GANCHO 04 PLACAS S/PERFIL`, qtd: 3, valor: 293.09, total: 879.27});
  materiais.push({nome: `ESTRUTURA PRATYC 2.200.01.13.080 KIT 04 PERFIL TRILHO HIBRIDO 2.4MTS PARA 04 PLACAS`, qtd: 3, valor: 197.02, total: 591.06});

  // STRING = 14.800
  if(tipo === 'string'){
    materiais.push({nome: `INVERSOR SOLAR GROWATT ON GRID MIN6000TL-X2 6KW 2MPPT MONOFÁSICO 220V AFCI`, qtd: 1, valor: 3400.00, total: 3400.00});
    materiais.push({nome: `CABO SOLAR CC SOLAR REICON 4MM CERTIFICADO NBR-16612 - PRETO`, qtd: 25, valor: 6.50, total: 162.50});
    materiais.push({nome: `CABO SOLAR CC SOLAR REICON 4MM CERTIFICADO NBR-16612 - VERMELHO`, qtd: 25, valor: 6.50, total: 162.50});
    materiais.push({nome: `CONECTOR MC4 23719 SC-4-P ACOPLADOR MACHO E FEMEA`, qtd: 8, valor: 8.80, total: 70.40});
    
    subtotalMaterial = 6828.00 + 879.27 + 591.06 + 3400.00 + 162.50 + 162.50 + 70.40; // 12093.73

  // MICRO = 15.489
  } else {
    materiais.push({nome: `MICRO INVERSOR HOYMILES HMS-2250DW-4T 2.25KW 2MPPT MONOFASICO 220V WIFI`, qtd: 3, valor: 1501.66, total: 4504.98});
    materiais.push({nome: `CABO SOLAR CC SOLAR REICON 6MM CERTIFICADO NBR-16612 - PRETO`, qtd: 25, valor: 8.21, total: 205.25});
    materiais.push({nome: `CONECTOR MC4 23719 SC-4-P ACOPLADOR MACHO E FEMEA`, qtd: 24, valor: 8.80, total: 211.20});
    
    subtotalMaterial = 6828.00 + 879.27 + 591.06 + 4504.98 + 205.25 + 211.20; // 13219.76
  }

  // SERVIÇOS
  const instalacao = 12 * 120; // 1440
  const projeto = 510;
  const fiacao = 320;
  const subtotalServico = 2270.00;
  const totalGeral = subtotalMaterial + subtotalServico;

  // RELATÓRIO
  let html = `<h2>ORÇAMENTO SISTEMA FOTOVOLTAICO ${kwp} kWp</h2>`;
  html += `<p><b>Cliente:</b> ${cliente}</p><hr>`;
  html += `<h3>1. MATERIAIS / PRODUTOS</h3><table>`;
  html += `<tr><th>Qtd</th><th>Descrição</th><th style="text-align:right">Valor Unit.</th><th style="text-align:right">Valor Total</th></tr>`;
  materiais.forEach(item => {
    html += `<tr><td style="text-align:center">${item.qtd}</td><td>${item.nome}</td><td style="text-align:right">${formatarBRL(item.valor)}</td><td style="text-align:right">${formatarBRL(item.total)}</td></tr>`;
  });
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="3" style="text-align:right">SUBTOTAL MATERIAIS:</td><td style="text-align:right">${formatarBRL(subtotalMaterial)}</td></tr>`;
  html += `</table><br>`;

  html += `<h3>2. SERVIÇOS</h3><table>`;
  html += `<tr><th>Qtd</th><th>Descrição</th><th style="text-align:right">Valor Unit.</th><th style="text-align:right">Valor Total</th></tr>`;
  html += `<tr><td style="text-align:center">12</td><td>Instalação do Sistema</td><td style="text-align:right">${formatarBRL(120)}</td><td style="text-align:right">${formatarBRL(1440)}</td></tr>`;
  html += `<tr><td style="text-align:center">1</td><td>Projeto Elétrico e ART</td><td style="text-align:right">${formatarBRL(510)}</td><td style="text-align:right">${formatarBRL(510)}</td></tr>`;
  html += `<tr><td style="text-align:center">1</td><td>Fiação AC + Quadro de Proteção</td><td style="text-align:right">${formatarBRL(320)}</td><td style="text-align:right">${formatarBRL(320)}</td></tr>`;
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="3" style="text-align:right">SUBTOTAL SERVIÇOS:</td><td style="text-align:right">${formatarBRL(subtotalServico)}</td></tr>`;
  html += `</table><br>`;

  html += `<div style="background:#0056b3; color:white; padding:15px; border-radius:8px; text-align:right; font-size:20px">`;
  html += `<b>VALOR TOTAL DO INVESTIMENTO: ${formatarBRL(totalGeral)}</b>`;
  html += `</div>`;

  document.getElementById('resultado').innerHTML = html;
}
