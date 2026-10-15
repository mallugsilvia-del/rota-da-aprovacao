#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
require(path.join(raiz, "classificador.js"));
const classificador = globalThis.RotaClassificador;

const arquivos = [
  "enem-2024-d1.json", "enem-2024-d2.json",
  "enem-2025-d1.json", "enem-2025-d2.json",
  "fuvest-2024-f1.json", "fuvest-2025-f1.json",
  "unicamp-2024-f1.json", "unicamp-2025-f1.json",
  "unesp-2024-f1.json", "unesp-2025-f1.json"
];

function limparTexto(valor) {
  return String(valor || "")
    .replace(/\r/g, "")
    .replace(/\*[A-Z0-9]+\*/g, "")
    .replace(/(?:ENEM\s*20\d{2}){3,}/gi, "")
    .replace(/^.*(?:CADERNO|1[º°]\s*DIA|2[º°]\s*DIA).*ENEM.*$/gmi, "")
    .replace(/^\s*[•·].*(?:CADERNO|DIA|FASE).*$/gmi, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function textoAntesDasAlternativas(texto) {
  const limpo = limparTexto(texto);
  const marcador = /\n\s*A(?:\s+|\t)/.exec(limpo);
  return limparTexto(marcador ? limpo.slice(0, marcador.index) : limpo);
}

function revisarQuestao(original) {
  const esperadas = String(original.vestibular || "").toUpperCase() === "UNICAMP" ? 4 : 5;
  const estavaSemPergunta = !String(original.pergunta || original.enunciado || "").trim();
  let opcoes = Array.isArray(original.opcoes) ? original.opcoes.map(limparTexto).filter(Boolean) : [];
  if (opcoes.length > esperadas) opcoes = opcoes.slice(-esperadas);
  const alternativasEmImagem = original.alternativasEmImagem === true || opcoes.length < esperadas;
  if (alternativasEmImagem) {
    opcoes = Array.from({length:esperadas}, (_,indice) =>
      `Alternativa ${String.fromCharCode(65 + indice)} — consulte a figura da página original.`
    );
  }

  let pergunta = limparTexto(original.pergunta || original.enunciado);
  if (!pergunta) pergunta = textoAntesDasAlternativas(original.textoExtraido);

  const base = {
    ...original,
    pergunta,
    enunciado: pergunta,
    textoExtraido: limparTexto(original.textoExtraido),
    opcoes,
    resposta: original.anulada === true ? null : Number(original.resposta),
    ativo: original.ativo !== false
  };
  const revisada = classificador.classificarQuestao(base, {sobrescrever:true});
  if (estavaSemPergunta || alternativasEmImagem) revisada.requerImagem = true;
  revisada.alternativasEmImagem = alternativasEmImagem;
  revisada.extracaoRevisada = true;
  revisada.versaoBanco = 3;
  return revisada;
}

const consolidadas = [];
const relatorio = [];

for (const nome of arquivos) {
  const destino = path.join(raiz, "banco-questoes", nome);
  const lista = JSON.parse(fs.readFileSync(destino, "utf8")).map(revisarQuestao);
  fs.writeFileSync(destino, `${JSON.stringify(lista, null, 2)}\n`, "utf8");
  consolidadas.push(...lista);
  relatorio.push(`${nome}: ${lista.length}`);
}

const completo = path.join(raiz, "banco-questoes", "banco-questoes-completo.json");
fs.writeFileSync(completo, `${JSON.stringify(consolidadas, null, 2)}\n`, "utf8");

const resumo = classificador.resumir(consolidadas);
const faltandoImagem = consolidadas.filter(q => q.imagemPagina && !fs.existsSync(path.join(raiz, q.imagemPagina)));
const invalidas = consolidadas.filter(q => {
  const esperado = q.vestibular === "UNICAMP" ? 4 : 5;
  return !q.id || !q.pergunta || q.opcoes.length !== esperado || (q.anulada !== true && (!Number.isInteger(q.resposta) || q.resposta < 0 || q.resposta >= esperado));
});

relatorio.push("");
relatorio.push(`Total: ${consolidadas.length}`);
relatorio.push(`Questões visuais: ${resumo.imagens.necessarias}`);
relatorio.push(`Imagens ausentes: ${faltandoImagem.length}`);
relatorio.push(`Registros inválidos: ${invalidas.length}`);
relatorio.push("");
relatorio.push("Distribuição por matéria:");
Object.entries(resumo.materias).sort((a,b)=>b[1]-a[1]).forEach(([materia,total])=>relatorio.push(`- ${materia}: ${total}`));
relatorio.push("");
relatorio.push("Confiança da classificação:");
Object.entries(resumo.confiancas).forEach(([nivel,total])=>relatorio.push(`- ${nivel}: ${total}`));

fs.writeFileSync(path.join(raiz, "RELATORIO_REVISAO_CATEGORIAS.txt"), `${relatorio.join("\n")}\n`, "utf8");
console.log(relatorio.join("\n"));
if (invalidas.length) {
  console.log("\nPrimeiros registros inválidos:");
  invalidas.slice(0, 20).forEach(q => console.log(q.id, q.vestibular, q.numero, q.opcoes.length));
}
