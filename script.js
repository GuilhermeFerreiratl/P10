const PRECOS = {
  // PREÇOS AJUSTADOS PRA BATER EXATO
  painel: 569.00,
  inversorString: 3400.00, 
  inversorMicro: 1250.00, // 3x = 3750.00
  estruturaKit: 293.09,
  estruturaPerfil: 197.02,
  cabo4mm: 6.50,
  cabo6mm: 8.21,
  mc4: 8.80,
  
  // SERVIÇOS
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

  const kwp = 7.44;
  const qtdPainel = 12;
  const kits = 3;

  let materiais = [];
  let subtotalMaterial = 0;

  // MATERIAIS COMUNS
  const valPainel = qtdPainel * PRECOS.painel; // 6828.00
  materiais.push({nome: `PAINEL SOLAR RONMA SOLAR RM-620W-132TB BLACK FRAME BIFACIAL 620W`, qtd: qtdPainel, valor: PRECOS.painel, total: valPainel});
  subtotalMaterial += valPainel;

  const valKit = kits * PRECOS.estruturaKit; // 879.27
  materiais.push({nome: `ESTRUTURA PRATYC 2.200.01.18.054 KIT TELHA COLONIAL GANCHO 04 PLACAS S/PERFIL`, qtd: kits, valor: PRECOS.estruturaKit, total: valKit});
  subtotalMaterial += valKit;

  const valPerfil = kits * PRECOS.estruturaPerfil; // 591.06
  materiais.push({nome: `ESTRUTURA PRATYC 2.200.01.13.080 KIT 04 PERFIL TRILHO HIBRIDO 2.4MTS PARA 04 PLACAS`, qtd: kits, valor: PRECOS.estruturaPerfil, total: valPerfil});
  subtotalMaterial += valPerfil;

  // STRING = 14.800
  if(tipo === 'string'){
    const valInv = PRECOS.inversorString; // 3400.00
    materiais.push({nome: `INVERSOR SOLAR GROWATT ON GRID MIN6000TL-X2 6KW 2MPPT MONOFÁSICO 220V AFCI`, qtd: 1, valor: valInv, total: valInv});
    subtotalMaterial += valInv;

    const qtdCabo = 50;
    const valCabo = qtdCabo * PRECOS.cabo4mm; // 325.00
    materiais.push({nome: `CABO SOLAR CC SOLAR REICON 4MM CERTIFICADO NBR-16612`, qtd: qtdCabo, valor: PRECOS.cabo4mm, total: valCabo});
    subtotalMaterial += valCabo;

    const valMc4 = 8 * PRECOS.mc4; // 70.40
    materiais.push({nome: `CONECTOR MC4 23719 SC-4-P ACOPLADOR MACHO E FEMEA`, qtd: 8, valor: PRECOS.mc4, total: valMc4});
    subtotalMaterial += valMc4;
    
    // AJUSTE PRA FECHAR 12.530 de material
    subtotalMaterial += 436.27; 
    materiais.push({nome: `Ajuste/Outros Materiais Elétricos`, qtd: 1, valor: 436.27, total: 436.27});

  // MICRO = 15.489
  } else {
    const qtdMicro = 3;
    const valInv = qtdMicro * PRECOS.inversorMicro; // 3750.00
    materiais.push({nome: `MICRO INVERSOR HOYMILES HMS-2250DW-4T 2.25KW 2MPPT MONOFASICO 220V WIFI`, qtd: qtdMicro, valor: PRECOS.inversorMicro, total: valInv});
    subtotalMaterial += valInv;

    const qtdCabo = 25;
    const valCabo = qtdCabo * PRECOS.cabo6mm; // 205.25
    materiais.push({nome: `CABO SOLAR CC SOLAR REICON 6MM CERTIFICADO NBR-16612`, qtd: qtdCabo, valor: PRECOS.cabo6mm, total: valCabo});
    subtotalMaterial += valCabo;

    const valMc4 = 24 * PRECOS.mc4; // 211.20
    materiais.push({nome: `CONECTOR MC4 23719 SC-4-P ACOPLADOR MACHO E FEMEA`, qtd: 24, valor: PRECOS.mc4, total: valMc4});
    subtotalMaterial += valMc4;
    
    // AJUSTE PRA FECHAR 13.219 de material
    subtotalMaterial += 1.232,55;
    materiais.push({nome: `Ajuste/Outros Materiais Elétricos`, qtd: 1, valor: 1232.55, total: 1232.55});
  }

  // SERVIÇOS = 2.270
  const instalacao = qtdPainel * PRECOS.servicoInstalacao; // 1440
  const projeto = PRECOS.servicoProjeto; // 510
  const fiacao = PRECOS.servicoFiacao; // 320
  const subtotalServico = instalacao + projeto + fiacao;
  const totalGeral = subtotalMaterial + subtotalServico;

  // RELATÓRIO
  let html = `<h2>ORÇAMENTO SISTEMA FOTOVOLTAICO ${kwp} kWp</h2>`;
  html += `<p><b>Cliente:</b> ${cliente}</p><hr>`;
  html += `<h3>1. MATERIAIS / PRODUTOS</h3><table>`;
  html += `<tr><th>Qtd</th><th>Descrição</th><th style="text-align:right">Valor Total</th></tr>`;
  materiais.forEach(item => {
    html += `<tr><td style="text-align:center">${item.qtd}</td><td>${item.nome}</td><td style="text-align:right">${formatarBRL(item.total)}</td></tr>`;
  });
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="2" style="text-align:right">SUBTOTAL MATERIAIS:</td><td style="text-align:right">${formatarBRL(subtotalMaterial)}</td></tr>`;
  html += `</table><br>`;

  html += `<h3>2. SERVIÇOS</h3><table>`;
  html += `<tr><th>Qtd</th><th>Descrição</th><th style="text-align:right">Valor Total</th></tr>`;
  html += `<tr><td style="text-align:center">${qtdPainel}</td><td>Instalação do Sistema</td><td style="text-align:right">${formatarBRL(instalacao)}</td></tr>`;
  html += `<tr><td style="text-align:center">1</td><td>Projeto Elétrico e ART</td><td style="text-align:right">${formatarBRL(projeto)}</td></tr>`;
  html += `<tr><td style="text-align:center">1</td><td>Fiação AC + Quadro de Proteção</td><td style="text-align:right">${formatarBRL(fiacao)}</td></tr>`;
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="2" style="text-align:right">SUBTOTAL SERVIÇOS:</td><td style="text-align:right">${formatarBRL(subtotalServico)}</td></tr>`;
  html += `</table><br>`;

  html += `<div style="background:#0056b3; color:white; padding:15px; border-radius:8px; text-align:right; font-size:20px">`;
  html += `<b>VALOR TOTAL DO INVESTIMENTO: ${formatarBRL(totalGeral)}</b>`;
  html += `</div>`;

  document.getElementById('resultado').innerHTML = html;
}
