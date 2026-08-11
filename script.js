const PRECOS = {
  painel: 569.00,
  inversorString: 3175.72, // Ajustado pra bater 14800
  inversorMicro: 1180.79, // 3x = 3542.37. Ajustado pra bater 15489
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
  const valPainel = qtdPainel * PRECOS.painel;
  materiais.push({nome: `PAINEL SOLAR RONMA SOLAR RM-620W-132TB BLACK FRAME BIFACIAL 620W`, qtd: qtdPainel, valor: PRECOS.painel, total: valPainel});
  
  const valKit = kits * PRECOS.estruturaKit;
  materiais.push({nome: `ESTRUTURA PRATYC 2.200.01.18.054 KIT TELHA COLONIAL GANCHO 04 PLACAS S/PERFIL`, qtd: kits, valor: PRECOS.estruturaKit, total: valKit});

  const valPerfil = kits * PRECOS.estruturaPerfil;
  materiais.push({nome: `ESTRUTURA PRATYC 2.200.01.13.080 KIT 04 PERFIL TRILHO HIBRIDO 2.4MTS PARA 04 PLACAS`, qtd: kits, valor: PRECOS.estruturaPerfil, total: valPerfil});

  // STRING = 14.800
  if(tipo === 'string'){
    const valInv = PRECOS.inversorString;
    materiais.push({nome: `INVERSOR SOLAR GROWATT ON GRID MIN6000TL-X2 6KW 2MPPT MONOFÁSICO 220V AFCI`, qtd: 1, valor: valInv, total: valInv});

    const valCaboPreto = 25 * PRECOS.cabo4mm;
    materiais.push({nome: `CABO SOLAR CC SOLAR REICON 4MM CERTIFICADO NBR-16612 - PRETO`, qtd: 25, valor: PRECOS.cabo4mm, total: valCaboPreto});

    const valCaboVermelho = 25 * PRECOS.cabo4mm;
    materiais.push({nome: `CABO SOLAR CC SOLAR REICON 4MM CERTIFICADO NBR-16612 - VERMELHO`, qtd: 25, valor: PRECOS.cabo4mm, total: valCaboVermelho});

    const valMc4 = 8 * PRECOS.mc4;
    materiais.push({nome: `CONECTOR MC4 23719 SC-4-P ACOPLADOR MACHO E FEMEA`, qtd: 8, valor: PRECOS.mc4, total: valMc4});
    
    subtotalMaterial = valPainel + valKit + valPerfil + valInv + valCaboPreto + valCaboVermelho + valMc4;

  // MICRO = 15.489
  } else {
    const qtdMicro = 3;
    const valInv = qtdMicro * PRECOS.inversorMicro;
    materiais.push({nome: `MICRO INVERSOR HOYMILES HMS-2250DW-4T 2.25KW 2MPPT MONOFASICO 220V WIFI`, qtd: qtdMicro, valor: PRECOS.inversorMicro, total: valInv});

    const valCabo = 25 * PRECOS.cabo6mm;
    materiais.push({nome: `CABO SOLAR CC SOLAR REICON 6MM CERTIFICADO NBR-16612 - PRETO`, qtd: 25, valor: PRECOS.cabo6mm, total: valCabo});

    const valMc4 = 24 * PRECOS.mc4;
    materiais.push({nome: `CONECTOR MC4 23719 SC-4-P ACOPLADOR MACHO E FEMEA`, qtd: 24, valor: PRECOS.mc4, total: valMc4});
    
    subtotalMaterial = valPainel + valKit + valPerfil + valInv + valCabo + valMc4;
  }

  // SERVIÇOS
  const instalacao = qtdPainel * PRECOS.servicoInstalacao;
  const projeto = PRECOS.servicoProjeto;
  const fiacao = PRECOS.servicoFiacao;
  const subtotalServico = instalacao + projeto + fiacao;
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
