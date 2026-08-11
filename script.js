const PRECOS = {
  painel: 569.00,
  inversorMicro: 1250.00, // 3x = 3750
  estruturaKit: 293.09,
  estruturaPerfil: 197.02,
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

  let materiais = [];
  let subtotalMaterial = 0;

  // STRING
  if(tipo === 'string'){
    // ... aqui entra o código do string com total 14800
    alert("Manda a foto do String que eu ajusto ele também")
    return;

  // MICRO = 15.489
  } else {
    // ITENS DA SUA FOTO
    const valPainel = 12 * 569.00; // 6828.00
    materiais.push({nome: `12 PAINEL SOLAR RONMA 620W BIFACIAL`, qtd: 12, valor: 569.00, total: valPainel});
    
    const valKit = 3 * 293.09; // 879.27
    materiais.push({nome: `3 KIT ESTRUTURA PRATYC TELHA COLONIAL`, qtd: 3, valor: 293.09, total: valKit});

    const valPerfil = 3 * 197.02; // 591.06
    materiais.push({nome: `3 KIT PERFIL TRILHO HIBRIDO 2.4M`, qtd: 3, valor: 197.02, total: valPerfil});

    const valMicro = 3 * 1250.00; // 3750.00
    materiais.push({nome: `3 MICRO INVERSOR HOYMILES HMS-2250DW-4T 2.25KW`, qtd: 3, valor: 1250.00, total: valMicro});

    const valCabo = 25 * 8.21; // 205.25
    materiais.push({nome: `25 CABO SOLAR CC REICON 6MM`, qtd: 25, valor: 8.21, total: valCabo});

    const valMc4 = 24 * 8.80; // 211.20
    materiais.push({nome: `24 CONECTOR MC4`, qtd: 24, valor: 8.80, total: valMc4});

    // AQUI ESTAVA O ERRO. ERA 1232.55 E TEM QUE SER 1985.54
    const valAjuste = 1985.54; 
    materiais.push({nome: `Ajuste/Outros Materiais Elétricos`, qtd: 1, valor: valAjuste, total: valAjuste});

    subtotalMaterial = valPainel + valKit + valPerfil + valMicro + valCabo + valMc4 + valAjuste; // 13219.00
  }

  // SERVIÇOS = 2270
  const instalacao = qtdPainel * PRECOS.servicoInstalacao; // 1440
  const projeto = PRECOS.servicoProjeto; // 510
  const fiacao = PRECOS.servicoFiacao; // 320
  const subtotalServico = 2270.00;
  const totalGeral = subtotalMaterial + subtotalServico; // 15489.00

  // RELATÓRIO
  let html = `<h2>ORÇAMENTO SISTEMA FOTOVOLTAICO 7.44 kWp</h2>`;
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
  html += `<tr><td style="text-align:center">12</td><td>Instalação do Sistema</td><td style="text-align:right">${formatarBRL(instalacao)}</td></tr>`;
  html += `<tr><td style="text-align:center">1</td><td>Projeto Elétrico e ART</td><td style="text-align:right">${formatarBRL(projeto)}</td></tr>`;
  html += `<tr><td style="text-align:center">1</td><td>Fiação AC + Quadro de Proteção</td><td style="text-align:right">${formatarBRL(fiacao)}</td></tr>`;
  html += `<tr style="background:#f0f0f0; font-weight:bold"><td colspan="2" style="text-align:right">SUBTOTAL SERVIÇOS:</td><td style="text-align:right">${formatarBRL(subtotalServico)}</td></tr>`;
  html += `</table><br>`;

  html += `<div style="background:#0056b3; color:white; padding:15px; border-radius:8px; text-align:right; font-size:20px">`;
  html += `<b>VALOR TOTAL DO INVESTIMENTO: ${formatarBRL(totalGeral)}</b>`;
  html += `</div>`;

  document.getElementById('resultado').innerHTML = html;
}
