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

  const qtdCaboMc4 = qtdPainel * 2;
  const valCabo = qtdCaboMc4 * PRECOS.cabo6mm;
  const valMc4 = qtdCaboMc4 * PRECOS.mc4;
  materiais.push({nome: `Cabo Solar CC 6mm`, qtd: qtdCaboMc4, valor: PRECOS.cabo6mm, total: valCabo});
  materiais.push({nome: `Conector MC4 Par`, qtd: qtdCaboMc4, valor: PRECOS.mc4, total: valMc4});
  subtotalMaterial += valCabo + valMc4;

  const impostos = subtotalMaterial * 0.21;
  const instalacao = qtdPainel * 120;
  const projeto = 510;
  const fiacao = 320;
  const subtotalInstalacao = instalacao + projeto + fiacao;
  const totalGeral = subtotalMaterial + impostos + subtotalInstalacao;

  let html = `<h2>Relatório para: ${cliente}</h2>`;
  html += `<p><b>Consumo:</b> ${kwh} kWh/mês | <b>Potência:</b> ${kwpNecessario.toFixed(2)} kWp | <b>Painéis:</b> ${qtdPainel} un</p>`;

  html += `<h3>Detalhamento dos Materiais</h3><table>`;
  html += `<tr><th>Item</th><th>Qtd</th><th>Unit</th><th>Total</th></tr>`;
  materiais.forEach(item => {
    html += `<tr><td>${item.nome}</td><td style="text-align:center">${item.qtd}</td><td style="text-align:right">${formatarBRL(item.valor)}</td><td style="text-align:right">${formatarBRL(item.total)}</td></tr>`;
  });
  html += `</table>`;

  html += `<div class="total">Total Geral: ${formatarBRL(totalGeral)}</div>`;
  document.getElementById('resultado').innerHTML = html;
}
