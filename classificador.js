/* =========================================================
   CLASSIFICADOR AUTOMÁTICO DE QUESTÕES

   Este arquivo não usa IA, servidor ou Node.js. As regras são
   executadas no navegador antes do envio para o Firestore.

   Como ampliar as regras:
   1. Acrescente termos em REGRAS_MATERIAS para reconhecer matérias.
   2. Acrescente termos em REGRAS_TEMAS para reconhecer conteúdos.
   3. Termos no grupo "fortes" valem 4 pontos; "medios", 2 pontos;
      e "leves", 1 ponto. A matéria com maior pontuação vence.
   ========================================================= */
(function (global) {
  "use strict";

  const AREAS = {
    "Português": "Linguagens",
    "Literatura": "Linguagens",
    "Inglês": "Linguagens",
    "Espanhol": "Linguagens",
    "Artes": "Linguagens",
    "Educação Física": "Linguagens",
    "História": "Ciências Humanas",
    "Geografia": "Ciências Humanas",
    "Filosofia": "Ciências Humanas",
    "Sociologia": "Ciências Humanas",
    "Biologia": "Ciências da Natureza",
    "Física": "Ciências da Natureza",
    "Química": "Ciências da Natureza",
    "Matemática": "Matemática"
  };

  /* Os termos devem ser escritos sem preocupação com maiúsculas ou acentos. */
  const REGRAS_MATERIAS = [
    {materia:"Matemática", fortes:["equacao", "funcao", "probabilidade", "porcentagem", "teorema", "geometria", "matriz", "logaritmo", "progressao aritmetica", "progressao geometrica", "trigonometr"], medios:["grafico", "razao", "proporcao", "media aritmetica", "mediana", "volume", "area do", "perimetro", "coordenadas", "polinomio", "conjunto de numeros"], leves:["calcule", "valor de x", "numeros reais", "medida", "angulo", "triangulo", "circunferencia"]},
    {materia:"Física", fortes:["velocidade", "aceleracao", "forca resultante", "energia cinetica", "energia potencial", "circuito eletrico", "corrente eletrica", "resistencia eletrica", "campo eletrico", "campo magnetico", "ondas eletromagneticas", "lente convergente", "espelho concavo"], medios:["movimento", "potencia", "tensao", "voltagem", "frequencia", "comprimento de onda", "calor especifico", "temperatura", "pressao", "densidade", "impulso", "newton", "joule", "watt"], leves:["massa", "tempo", "distancia", "energia", "carga", "luz", "som"]},
    {materia:"Química", fortes:["reacao quimica", "equacao quimica", "estequiometr", "molaridade", "eletrolise", "oxidacao", "reducao", "hidrocarboneto", "funcao organica", "tabela periodica", "ligacao covalente", "ligacao ionica", "ph da", "meia-vida"], medios:["mols", "mol de", "massa molar", "atomo", "molecula", "solucao", "soluto", "solvente", "acido", "base", "sal", "catalisador", "radioativ", "isotopo", "entalpia"], leves:["elemento", "composto", "substancia", "concentracao", "combustao"]},
    {materia:"Biologia", fortes:["dna", "rna", "gene", "genetica", "hereditariedade", "selecao natural", "cadeia alimentar", "teia alimentar", "ecossistema", "fotossintese", "mitose", "meiose", "sistema nervoso", "sistema imunologico"], medios:["celula", "organismo", "especie", "populacao", "evolucao", "ecologia", "biodiversidade", "enzima", "proteina", "virus", "bacteria", "vacina", "hormonio", "tecido", "metabolismo"], leves:["animal", "vegetal", "planta", "doenca", "saude", "ambiente"]},
    {materia:"História", fortes:["brasil colonial", "brasil imperio", "primeira republica", "era vargas", "ditadura militar", "revolucao francesa", "revolucao industrial", "primeira guerra", "segunda guerra", "guerra fria", "escravidao"], medios:["seculo", "colonizacao", "independencia", "republica", "monarquia", "imperio", "revolucao", "guerra", "movimento operario", "absolutismo", "feudalismo"], leves:["historico", "sociedade da epoca", "periodo", "governo", "memoria"]},
    {materia:"Geografia", fortes:["cartografia", "escala cartografica", "coordenadas geograficas", "geopolitica", "globalizacao", "urbanizacao", "migracao", "estrutura geologica", "placas tectonicas", "clima", "relevo", "bacia hidrografica"], medios:["territorio", "paisagem", "regiao", "espaco geografico", "populacao", "demografia", "agricultura", "industria", "cidade", "mapa", "latitude", "longitude", "desmatamento"], leves:["ambiental", "economia mundial", "fronteira", "continente", "rural", "urbano"]},
    {materia:"Filosofia", fortes:["aristoteles", "platao", "socrates", "kant", "nietzsche", "descartes", "hobbes", "rousseau", "epicuro", "filosof"], medios:["etica", "moral", "epistemologia", "metafisica", "razao", "virtude", "conhecimento", "verdade", "contrato social"], leves:["pensamento", "liberdade", "justica", "felicidade"]},
    {materia:"Sociologia", fortes:["sociologia", "durkheim", "max weber", "karl marx", "fato social", "classe social", "movimento social", "industria cultural"], medios:["desigualdade social", "estratificacao", "cidadania", "trabalho", "capitalismo", "cultura", "identidade", "genero", "racismo"], leves:["sociedade", "coletivo", "direitos", "poder"]},
    {materia:"Literatura", fortes:["romantismo", "realismo", "naturalismo", "modernismo", "parnasianismo", "simbolismo", "barroco", "arcadismo", "obra literaria", "narrador", "eu lirico"], medios:["poema", "poesia", "romance", "conto", "personagem", "verso", "estrofe", "autor", "literatura"], leves:["texto literario", "linguagem poetica", "ficcao"]},
    {materia:"Português", fortes:["figura de linguagem", "genero textual", "variacao linguistica", "funcao da linguagem", "oracao subordinada", "concordancia", "regencia", "coesao textual"], medios:["texto", "argumentacao", "interpretacao", "sentido", "linguagem", "pronome", "verbo", "adjetivo", "substantivo", "conectivo"], leves:["autor", "leitor", "trecho", "expressao", "palavra"]},
    {materia:"Artes", fortes:["obra de arte", "artes visuais", "pintura", "escultura", "fotografia", "teatro", "danca", "musica"], medios:["artista", "estetica", "performance", "cinema", "imagem"], leves:["cena", "visual", "artistico"]},
    {materia:"Educação Física", fortes:["educacao fisica", "pratica corporal", "atividade fisica", "exercicio fisico", "esporte"], medios:["jogo", "danca", "corpo", "atleta"], leves:["movimento corporal", "saude"]},
    /* Idiomas usam palavras mais distintivas. Termos curtos como "in", "que" e
       "para" gerariam falsos positivos em textos e endereços em português. */
    {materia:"Inglês", fortes:["english", "according to the text", "the author", "song lyrics"], medios:["however", "although", "because", "people", "should", "would", "between", "instead of"], leves:[]},
    {materia:"Espanhol", fortes:["espanol", "segun el texto", "el autor", "la autora"], medios:["aunque", "sin embargo", "usted", "tambien", "porque", "pero", "donde", "puede"], leves:[]}
  ];

  const REGRAS_TEMAS = {
    "Matemática": [
      ["Probabilidade e estatística", ["probabilidade", "media aritmetica", "mediana", "desvio padrao", "frequencia", "amostra"]],
      ["Geometria", ["triangulo", "circunferencia", "perimetro", "volume", "area do", "teorema de pitagoras", "poligono"]],
      ["Funções e gráficos", ["funcao", "grafico", "dominio", "imagem da funcao", "taxa de variacao"]],
      ["Porcentagem e proporcionalidade", ["porcentagem", "percentual", "proporcao", "regra de tres", "razao"]],
      ["Álgebra", ["equacao", "inequacao", "polinomio", "matriz", "sistema linear"]]
    ],
    "Física": [
      ["Mecânica", ["velocidade", "aceleracao", "forca", "movimento", "impulso", "energia cinetica"]],
      ["Eletricidade e magnetismo", ["corrente eletrica", "circuito", "resistencia", "tensao", "campo eletrico", "campo magnetico"]],
      ["Ondas e óptica", ["onda", "frequencia", "som", "lente", "espelho", "refracao", "luz"]],
      ["Termologia", ["temperatura", "calor", "dilatacao", "termico"]]
    ],
    "Química": [
      ["Química orgânica", ["hidrocarboneto", "funcao organica", "carbono", "alcool", "ester", "polimero"]],
      ["Estequiometria", ["estequiometr", "mol de", "massa molar", "rendimento da reacao"]],
      ["Eletroquímica", ["eletrolise", "oxidacao", "reducao", "pilha", "eletrodo"]],
      ["Soluções e pH", ["solucao", "soluto", "solvente", "molaridade", "ph", "concentracao"]],
      ["Radioatividade", ["radioativ", "meia-vida", "isotopo"]]
    ],
    "Biologia": [
      ["Genética e biologia molecular", ["dna", "rna", "gene", "genetica", "hereditariedade", "cromossomo"]],
      ["Ecologia", ["ecologia", "ecossistema", "cadeia alimentar", "populacao", "biodiversidade"]],
      ["Evolução", ["evolucao", "selecao natural", "adaptacao", "especiacao"]],
      ["Fisiologia", ["sistema nervoso", "hormonio", "orgao", "tecido", "fisiolog"]],
      ["Citologia", ["celula", "mitose", "meiose", "membrana", "organelas"]]
    ],
    "Português": [["Interpretação de texto", ["texto", "argumentacao", "sentido", "objetiva", "ideia", "finalidade"]], ["Gramática", ["verbo", "pronome", "concordancia", "regencia", "oracao"]], ["Figuras de linguagem", ["metafora", "ironia", "figura de linguagem", "metonimia"]]],
    "Literatura": [["Escolas literárias", ["romantismo", "realismo", "modernismo", "barroco", "arcadismo"]], ["Análise literária", ["narrador", "personagem", "eu lirico", "poema", "romance"]]],
    "História": [["História do Brasil", ["brasil", "colonial", "imperio", "republica", "vargas", "ditadura"]], ["História Geral", ["revolucao francesa", "guerra mundial", "guerra fria", "feudalismo", "absolutismo"]]],
    "Geografia": [["Geopolítica", ["geopolitica", "globalizacao", "fronteira", "conflito", "bloco economico"]], ["Meio ambiente", ["desmatamento", "mudanca climatica", "aquecimento global", "ambiental"]], ["Geografia urbana e população", ["urbanizacao", "cidade", "demografia", "migracao", "populacao"]], ["Cartografia", ["mapa", "escala", "latitude", "longitude", "cartografia"]]],
    "Filosofia": [["Ética e política", ["etica", "moral", "virtude", "justica", "contrato social"]], ["Teoria do conhecimento", ["conhecimento", "verdade", "razao", "experiencia", "epistemologia"]]],
    "Sociologia": [["Cultura e identidade", ["cultura", "identidade", "industria cultural"]], ["Trabalho e desigualdade", ["trabalho", "classe social", "desigualdade", "capitalismo"]], ["Cidadania e movimentos sociais", ["cidadania", "direitos", "movimento social"]]],
    "Inglês": [["Interpretação em inglês", ["the", "that", "with", "from"]]],
    "Espanhol": [["Interpretação em espanhol", ["que", "para", "una", "los"]]],
    "Artes": [["Linguagens artísticas", ["arte", "pintura", "escultura", "teatro", "danca", "musica", "cinema"]]],
    "Educação Física": [["Práticas corporais", ["esporte", "atividade fisica", "jogo", "corpo"]]]
  };

  const GENERICOS = ["", "a classificar", "conhecimentos gerais", "interdisciplinar", "geral", "nao informado"];

  function normalizar(texto) {
    return String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function textoDaQuestao(q) {
    return normalizar([q.pergunta, q.enunciado, q.textoExtraido, ...(q.opcoes || [])].join(" "))
      .replace(/enem\d{4}/g, " ").replace(/\s+/g, " ");
  }

  function areaEnem(q) {
    if (normalizar(q.vestibular) !== "enem") return "";
    const numero = Number(q.numero);
    const dia = Number(q.dia);
    if (dia === 1 || (numero >= 1 && numero <= 90)) return numero <= 45 ? "Linguagens" : "Ciências Humanas";
    if (dia === 2 || numero >= 91) return numero <= 135 ? "Ciências da Natureza" : "Matemática";
    return "";
  }

  function pontuarMateria(texto, regra) {
    const grupos = [[regra.fortes, 4], [regra.medios, 2], [regra.leves, 1]];
    return grupos.reduce((total, [termos, peso]) => total + termos.reduce((soma, termo) => soma + (texto.includes(normalizar(termo)) ? peso : 0), 0), 0);
  }

  function materiaAutomatica(q, texto, areaObrigatoria) {
    /* A língua registrada no caderno é uma evidência mais forte que palavras soltas. */
    if (["Inglês", "Espanhol"].includes(q.lingua)) return {materia:q.lingua, pontos:99, segunda:0};
    const candidatas = REGRAS_MATERIAS
      .filter(regra => !areaObrigatoria || AREAS[regra.materia] === areaObrigatoria)
      .map(regra => ({materia:regra.materia, pontos:pontuarMateria(texto, regra)}))
      .sort((a, b) => b.pontos - a.pontos);
    if (candidatas[0] && candidatas[0].pontos > 0) return {...candidatas[0], segunda:candidatas[1]?.pontos || 0};
    /* Fallbacks evitam exigir classificação manual quando o texto é curto. */
    const fallback = {"Linguagens":"Português", "Ciências Humanas":"História", "Ciências da Natureza":"Biologia", "Matemática":"Matemática"};
    return {materia:fallback[areaObrigatoria] || "Português", pontos:0, segunda:0};
  }

  function temaAutomatico(materia, texto) {
    const regras = REGRAS_TEMAS[materia] || [];
    let melhor = {tema:"Fundamentos e interpretação", pontos:0};
    regras.forEach(([tema, termos]) => {
      const pontos = termos.reduce((soma, termo) => soma + (texto.includes(normalizar(termo)) ? 1 : 0), 0);
      if (pontos > melhor.pontos) melhor = {tema, pontos};
    });
    return melhor.tema;
  }

  function calcularComplexidade(q, texto) {
    let pontos = 1;
    const tamanho = normalizar(q.pergunta || q.enunciado).length;
    if (tamanho > 350) pontos++;
    if (tamanho > 850) pontos++;
    if (/(calcule|determine|analise|compare|justifique|infere-se|conclui-se)/.test(texto)) pontos++;
    if (/(grafico|tabela|figura|imagem|equacao|sistema|experimento)/.test(texto)) pontos++;
    return Math.max(1, Math.min(5, pontos));
  }

  function nivelDaComplexidade(complexidade) {
    return complexidade <= 2 ? "Fácil" : complexidade <= 4 ? "Médio" : "Difícil";
  }

  function classificarQuestao(q, opcoes) {
    const config = {sobrescrever:false, ...(opcoes || {})};
    const texto = textoDaQuestao(q);
    const areaDaProva = areaEnem(q);
    const materiaAtual = String(q.materia || "").trim();
    const materiaGenerica = GENERICOS.includes(normalizar(materiaAtual));
    const resultadoMateria = materiaAutomatica(q, texto, areaDaProva);
    const materia = config.sobrescrever || materiaGenerica ? resultadoMateria.materia : materiaAtual;
    const area = areaDaProva || AREAS[materia] || String(q.area || "Conhecimentos Gerais");
    const temaAtual = String(q.tema || "").trim();
    const tema = config.sobrescrever || GENERICOS.includes(normalizar(temaAtual)) ? temaAutomatico(materia, texto) : temaAtual;
    const complexidadeAtual = Number(q.complexidade);
    const complexidade = config.sobrescrever || !(complexidadeAtual >= 1 && complexidadeAtual <= 5) ? calcularComplexidade(q, texto) : complexidadeAtual;
    const nivelAtual = String(q.nivel || "").trim();
    const nivel = config.sobrescrever || GENERICOS.includes(normalizar(nivelAtual)) ? nivelDaComplexidade(complexidade) : nivelAtual;
    const diferenca = resultadoMateria.pontos - resultadoMateria.segunda;
    const confianca = resultadoMateria.pontos >= 8 && diferenca >= 3 ? "alta" : resultadoMateria.pontos >= 3 && diferenca >= 1 ? "média" : "baixa";

    return {
      ...q,
      area,
      materia,
      tema,
      nivel,
      complexidade,
      categorias:[area, materia, tema],
      classificacaoAutomatica:true,
      confiancaClassificacao: materiaGenerica || config.sobrescrever ? confianca : "original",
      versaoClassificador:1
    };
  }

  function resumir(lista) {
    const materias = {};
    const areas = {};
    const confiancas = {};
    lista.forEach(q => {
      materias[q.materia] = (materias[q.materia] || 0) + 1;
      areas[q.area] = (areas[q.area] || 0) + 1;
      confiancas[q.confiancaClassificacao] = (confiancas[q.confiancaClassificacao] || 0) + 1;
    });
    return {materias, areas, confiancas};
  }

  global.RotaClassificador = {AREAS, REGRAS_MATERIAS, classificarQuestao, resumir};
})(typeof window !== "undefined" ? window : globalThis);
