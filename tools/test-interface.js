const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const ler = arquivo => fs.readFileSync(path.join(raiz, arquivo), "utf8");
const html = ler("index.html");
const script = ler("script.js");
const css = ler("style.css");
const regras = ler("firestore.rules");
const falhas = [];
const ok = (condicao, mensagem) => { if (!condicao) falhas.push(mensagem); };

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(resultado => resultado[1]);
const duplicados = ids.filter((id, indice) => ids.indexOf(id) !== indice);
ok(duplicados.length === 0, `IDs duplicados: ${[...new Set(duplicados)].join(", ")}`);

const obrigatorios = [
  "conta", "conta-desconectada", "conta-conectada", "form-login-aluno",
  "form-cadastro-aluno", "historico-conta", "filtro-visual", "modal-imagem",
  "campo-imagemPagina", "campo-requerImagem", "admin-painel"
];
obrigatorios.forEach(id => ok(ids.includes(id), `Elemento obrigatório ausente: #${id}`));

const referencias = [...script.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map(resultado => resultado[1]);
const dinamicos = new Set(["campo-opcao-${i}", "conferir", "mostrar-dica", "favoritar", "anterior", "proxima"]);
const referenciasAusentes = [...new Set(referencias.filter(id => !ids.includes(id) && !dinamicos.has(id)))];
ok(referenciasAusentes.length === 0, `IDs referenciados no JS e ausentes no HTML: ${referenciasAusentes.join(", ")}`);

ok(script.includes("createUserWithEmailAndPassword"), "Cadastro de estudante não encontrado");
ok(script.includes("sendPasswordResetEmail"), "Recuperação de senha não encontrada");
ok(script.includes('collection("usuarios")'), "Sincronização em usuarios/{uid} não encontrada");
ok(script.includes("respondidaEm:new Date().toISOString()"), "Data do histórico não é registrada");
ok(script.includes("htmlImagemQuestao(q)"), "Renderização das imagens não está conectada ao cartão");
ok(regras.includes("match /usuarios/{usuarioId}"), "Regras do histórico do estudante ausentes");
ok(css.includes(".auth-shell") && css.includes(".questao-imagem") && css.includes(".modal-imagem"), "Estilos da conta ou imagem ausentes");

const contexto = { globalThis: {} };
contexto.globalThis = contexto;
vm.runInNewContext(ler("classificador.js"), contexto, { filename: "classificador.js" });
const classificador = contexto.RotaClassificador;
ok(Boolean(classificador), "Classificador não pôde ser carregado");
ok(classificador.detectarImagemNecessaria({ pergunta:"Disponível em: exemplo.", imagemPagina:"imagens/teste.webp" }, "") === true, "Enunciado curto com imagem não foi detectado");

const banco = JSON.parse(ler("banco-questoes/banco-questoes-completo.json"));
ok(banco.length === 874, `Total inesperado de questões: ${banco.length}`);
const invalidas = banco.filter(q => !q.id || !q.pergunta || !Array.isArray(q.opcoes) || q.opcoes.length < 4 || !q.materia || !q.area);
ok(invalidas.length === 0, `${invalidas.length} questões inválidas`);
const comImagem = banco.filter(q => q.imagemPagina || q.imagem);
const imagensAusentes = comImagem.filter(q => !fs.existsSync(path.join(raiz, q.imagemPagina || q.imagem)));
ok(imagensAusentes.length === 0, `${imagensAusentes.length} referências de imagem ausentes`);
const visuais = banco.filter(q => q.requerImagem);
ok(visuais.length === 313, `Total inesperado de questões visuais: ${visuais.length}`);

const chaves = ["{", "}"];
const saldoChaves = texto => [...texto].reduce((saldo, caractere) => saldo + (caractere === chaves[0] ? 1 : caractere === chaves[1] ? -1 : 0), 0);
ok(saldoChaves(css) === 0, "Chaves CSS desbalanceadas");

const resultado = {
  html: { ids: ids.length, referenciasJS: referencias.length },
  banco: { questoes: banco.length, comImagem: comImagem.length, visuais: visuais.length, imagensAusentes: imagensAusentes.length },
  recursos: { cadastro: true, recuperacaoSenha: true, sincronizacao: true, historico: true, imagens: true },
  falhas
};
console.log(JSON.stringify(resultado, null, 2));
if (falhas.length) process.exitCode = 1;
