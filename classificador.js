/* =========================================================
   CLASSIFICADOR AUTOMÁTICO DE QUESTÕES — VERSÃO 4

   Combina mapas revisados por prova/ano/número, área oficial do
   ENEM, termos específicos e detecção de questões visuais.
   Funciona no navegador e no script de revisão dos JSONs.
   ========================================================= */
(function (global) {
  "use strict";

  const AREAS = {
    "Português":"Linguagens", "Literatura":"Linguagens",
    "Inglês":"Linguagens", "Espanhol":"Linguagens",
    "Artes":"Linguagens", "Educação Física":"Linguagens",
    "História":"Ciências Humanas", "Geografia":"Ciências Humanas",
    "Filosofia":"Ciências Humanas", "Sociologia":"Ciências Humanas",
    "Biologia":"Ciências da Natureza", "Física":"Ciências da Natureza",
    "Química":"Ciências da Natureza", "Matemática":"Matemática"
  };

  const REGRAS_MATERIAS = [
    {materia:"Matemática",
      fortes:["analise combinatoria","arranjo","permutacao","probabilidade","funcao quadratica","funcao exponencial","logaritmo","matriz","determinante","progressao aritmetica","progressao geometrica","teorema de pitagoras","trigonometria","seno","cosseno","equacao","inequacao","polinomio","geometria","porcentagem","juros compostos","media aritmetica","mediana","desvio padrao"],
      medios:["calcule","determine o valor","quantas maneiras","quantos valores","razao","proporcao","area do","perimetro","volume","coordenadas","plano cartesiano","grafico da funcao","numero real","angulo","triangulo","circunferencia","prisma","cilindro"],
      leves:["valor de x","medida","escala numerica","parcelas","taxa percentual"]},
    {materia:"Física",
      fortes:["velocidade","aceleracao","forca resultante","leis de newton","energia cinetica","energia potencial","quantidade de movimento","circuito eletrico","corrente eletrica","resistencia eletrica","tensao eletrica","campo eletrico","campo magnetico","inducao eletromagnetica","comprimento de onda","efeito doppler","lente convergente","lente divergente","espelho concavo","espelho convexo","refracao","distancia focal","calor especifico","dilatacao termica","empuxo","pressao hidrostatica","maquina termica","processo adiabatico","expansao adiabatica","transformacao isovolumetrica","pressao x volume"],
      medios:["movimento uniforme","potencia","frequencia","onda","acustica","temperatura","termometro","newton","joule","watt","volt","ampere","ohm","m/s","km/h","gravidade","satelite","fluido"],
      leves:["trajetoria","deslocamento","energia mecanica","raio luminoso"]},
    {materia:"Química",
      fortes:["reacao quimica","equacao quimica","estequiometria","massa molar","molaridade","eletrolise","oxidacao","reducao quimica","agente redutor","hidrocarboneto","funcao organica","tabela periodica","ligacao covalente","ligacao ionica","geometria molecular","acido de bronsted","base de bronsted","ph","poh","meia-vida","entalpia","equilibrio quimico","adsorcao","carvao ativado","grupo funcional","sulfonamida","eletronegatividade"],
      medios:["mol de","atomo","molecula","solucao","soluto","solvente","acido forte","acido fraco","base forte","base fraca","sal inorganico","catalisador","radioatividade","isotopo","combustao","substancia quimica","eletron","proton","composto organico","concentracao","ion","farmaco","solubilidade","reagente","polimero","combustivel"],
      leves:["elemento quimico","material organico","formula molecular","mistura","metal","gas"]},
    {materia:"Biologia",
      fortes:["dna","rna","gene","genetica","hereditariedade","cromossomo","selecao natural","cadeia alimentar","teia alimentar","ecossistema","fotossintese","mitose","meiose","sistema nervoso","sistema imunologico","cladograma","taxonomia","metabolismo celular","membrana plasmatica","respiracao celular","virus","bacteria","vacina","anticorpo","enzima","hormonio","fisiologia","especie","biodiversidade"],
      medios:["celula","organismo","evolucao","ecologia","proteina","tecido","orgao","sistema digestorio","sistema circulatorio","reproducao","mamifero","anfibio","reptil","invertebrado","vegetal","botanica","xilema","floema"],
      leves:["ser vivo","doenca infecciosa","parasita","nutriente biologico"]},
    {materia:"História",
      fortes:["brasil colonia","brasil colonial","brasil imperio","primeiro reinado","segundo reinado","primeira republica","republica velha","era vargas","estado novo","ditadura militar","regime militar","revolucao francesa","revolucao industrial","primeira guerra mundial","segunda guerra mundial","guerra fria","nazismo","fascismo","holocausto","escravidao","abolicionismo","feudalismo","idade media","antigo regime","colonizacao","independencia do brasil","revolucao de 1930","constituicao de 1988"],
      medios:["seculo xv","seculo xvi","seculo xvii","seculo xviii","seculo xix","seculo xx","monarquia","imperio","republica","revolucao","guerra","movimento operario","coroa portuguesa","metropole","senhor de engenho","trafico negreiro","patrimonio historico","processo historico"],
      leves:["no periodo","na epoca","governo de","memoria historica","regime politico"]},
    {materia:"Geografia",
      fortes:["cartografia","escala cartografica","coordenadas geograficas","projecao cartografica","geopolitica","globalizacao","urbanizacao","migracao","demografia","estrutura geologica","placas tectonicas","massa de ar","climatologia","bacia hidrografica","relevo","latitude","longitude","agronegocio","reforma agraria","segregacao urbana","rede urbana","transicao demografica"],
      medios:["territorio","espaco geografico","paisagem","regiao","populacao","agricultura","industria","metropole","mapa","desmatamento","mudancas climaticas","aquecimento global","fronteira","continente","zona rural","zona urbana","fluxo migratorio","uso do solo"],
      leves:["ambiental","economia mundial","cidade","campo e cidade","recursos naturais"]},
    {materia:"Filosofia",
      fortes:["aristoteles","platao","socrates","kant","nietzsche","descartes","hobbes","rousseau","epicuro","hegel","locke","spinoza","filosofia","epistemologia","metafisica","imperativo categorico","contrato social","estado de natureza","mito da caverna"],
      medios:["etica","moral","virtude","razao","conhecimento","verdade","liberdade","justica","felicidade","existencia","pensamento filosofico"],
      leves:["reflexao sobre","concepcao de ser humano"]},
    {materia:"Sociologia",
      fortes:["sociologia","durkheim","max weber","karl marx","fato social","classe social","estratificacao social","movimento social","industria cultural","divisao social do trabalho","mais-valia","acao social","desigualdade social","mobilidade social"],
      medios:["cidadania","capitalismo","identidade social","racismo","genero","direitos sociais","direitos humanos","trabalho assalariado","participacao politica","instituicao social","relacoes sociais","inclusao social","exclusao social","movimentos sociais"],
      leves:["sociedade","cultura","identidade","direitos","trabalho","poder","coletividade","grupo social","povos tradicionais"]},
    {materia:"Literatura",
      fortes:["romantismo","realismo","naturalismo","modernismo","parnasianismo","simbolismo","barroco","arcadismo","quinhentismo","obra literaria","escola literaria","narrador","eu lirico","foco narrativo","machado de assis","clarice lispector","carlos drummond","guimaraes rosa","jose de alencar","manuel bandeira"],
      medios:["poema","poesia","romance","conto","personagem","verso","estrofe","literatura","prosa","cronica literaria"],
      leves:["texto literario","linguagem poetica","ficcao","lirico"]},
    {materia:"Português",
      fortes:["figura de linguagem","genero textual","variacao linguistica","preconceito linguistico","funcao da linguagem","oracao subordinada","concordancia verbal","concordancia nominal","regencia","coesao textual","coerencia textual","efeito de sentido","recurso persuasivo","marca linguistica","norma-padrao","lingua portuguesa","identidade linguistica","finalidade do texto","texto objetiva","argumentacao apresentada"],
      medios:["interpretacao de texto","sentido da expressao","uso do pronome","uso do verbo","conectivo","pontuacao","intertextualidade","metafora","ironia","metonimia","hiperbole","linguagem verbal","linguagem nao verbal","autor usa","texto defende","ideia central"],
      leves:["leitor","trecho","palavra destacada","expressao destacada","estrategia argumentativa"]},
    {materia:"Artes",
      fortes:["obra de arte","artes visuais","producao artistica","linguagem artistica","movimento artistico","pintura","escultura","instalacao artistica","performance artistica","arquitetura","museu de arte","historia da arte","arte plumaria","estetica","artista plastico","fotografia artistica","cinema","teatro"],
      medios:["artista","coreografia","danca","musica","cenografia","grafite","mural","patrimonio artistico","composicao visual","expressao artistica"],
      leves:["visual","cena teatral","manifestacao artistica"]},
    {materia:"Educação Física",
      fortes:["educacao fisica","pratica corporal","atividade fisica","exercicio fisico","cultura corporal","modalidade esportiva","treinamento esportivo","sedentarismo","aptidao fisica"],
      medios:["esporte","atleta","jogo esportivo","danca corporal","corpo em movimento","olimpiadas","paralimpiadas"],
      leves:["movimento corporal","condicionamento fisico"]},
    {materia:"Inglês",fortes:["according to the text","the author","english language","song lyrics","instead of","the expression"],medios:["however","although","should","would","between","people","because"],leves:[]},
    {materia:"Espanhol",fortes:["segun el texto","el autor","la autora","lengua espanola","sin embargo","la expresion"],medios:["aunque","usted","tambien","donde","puede","nosotros"],leves:[]}
  ];

  const REGRAS_TEMAS = {
    "Matemática":[
      ["Análise combinatória",["analise combinatoria","combinacao","arranjo","permutacao","principio multiplicativo","quantas maneiras","anagrama"]],
      ["Probabilidade",["probabilidade","espaco amostral","evento aleatorio","chance de","sorteio"]],
      ["Estatística",["media aritmetica","mediana","moda","desvio padrao","variancia","histograma","amostra"]],
      ["Geometria plana",["triangulo","circunferencia","perimetro","area do","pitagoras","poligono","quadrilatero"]],
      ["Geometria espacial",["volume","prisma","piramide","cilindro","cone","esfera","poliedro"]],
      ["Geometria analítica",["plano cartesiano","reta no plano","distancia entre pontos","coeficiente angular","coordenadas"]],
      ["Trigonometria",["seno","cosseno","tangente","trigonometria"]],
      ["Funções",["funcao","dominio","taxa de variacao","funcao afim","funcao quadratica","exponencial","logaritmo"]],
      ["Sequências, PA e PG",["progressao aritmetica","progressao geometrica","termo geral","razao da pa","razao da pg"]],
      ["Matemática financeira",["juros","montante","capital aplicado","financiamento","parcelas"]],
      ["Porcentagem e proporcionalidade",["porcentagem","percentual","proporcao","regra de tres"]],
      ["Álgebra",["equacao","inequacao","polinomio","matriz","sistema linear"]]],
    "Física":[
      ["Óptica",["optica","lente","espelho","refracao","reflexao da luz","raio luminoso","distancia focal"]],
      ["Ondulatória e acústica",["onda","frequencia","comprimento de onda","som","eco","ressonancia","doppler"]],
      ["Cinemática",["velocidade","aceleracao","movimento uniforme","trajetoria","deslocamento"]],
      ["Dinâmica",["forca resultante","leis de newton","atrito","plano inclinado","impulso"]],
      ["Trabalho, energia e potência",["energia cinetica","energia potencial","trabalho realizado","conservacao da energia","potencia"]],
      ["Gravitação",["gravitacao","forca gravitacional","orbita","satelite"]],
      ["Hidrostática",["empuxo","pressao hidrostatica","arquimedes","pascal","fluido"]],
      ["Eletricidade",["corrente eletrica","circuito","resistencia eletrica","tensao eletrica","efeito joule"]],
      ["Eletromagnetismo",["campo magnetico","inducao eletromagnetica","fluxo magnetico","transformador"]],
      ["Termologia",["temperatura","calor","dilatacao","calor especifico","mudanca de estado"]]],
    "Química":[
      ["Química orgânica",["hidrocarboneto","funcao organica","grupo funcional","alcool","ester","polimero","sulfonamida"]],
      ["Estequiometria",["estequiometria","mol de","massa molar","rendimento da reacao"]],
      ["Eletroquímica",["eletrolise","oxidacao","reducao","pilha","eletrodo"]],
      ["Soluções, ácidos e bases",["solucao","soluto","solvente","molaridade","ph","bronsted","concentracao"]],
      ["Radioatividade",["radioatividade","meia-vida","isotopo","decaimento nuclear"]],
      ["Termoquímica",["entalpia","exotermica","endotermica","lei de hess","calor de combustao"]],
      ["Cinética química",["velocidade da reacao","energia de ativacao","catalisador","cinetica quimica"]],
      ["Equilíbrio químico",["equilibrio quimico","le chatelier","constante de equilibrio"]],
      ["Atomística e tabela periódica",["modelo atomico","tabela periodica","numero atomico","configuracao eletronica","proton","eletron"]],
      ["Ligações e estrutura molecular",["ligacao ionica","ligacao covalente","ligacao metalica","geometria molecular","polaridade"]],
      ["Química ambiental e materiais",["adsorcao","carvao ativado","chuva acida","poluente","tratamento de agua","quimica verde"]]],
    "Biologia":[
      ["Genética e biologia molecular",["dna","rna","gene","genetica","hereditariedade","cromossomo"]],
      ["Ecologia",["ecologia","ecossistema","cadeia alimentar","populacao","biodiversidade"]],
      ["Evolução",["evolucao","selecao natural","adaptacao","especiacao"]],
      ["Fisiologia humana",["sistema nervoso","hormonio","sistema digestorio","sistema circulatorio","fisiologia"]],
      ["Citologia",["celula","mitose","meiose","membrana","organela"]],
      ["Botânica",["vegetal","fotossintese","xilema","floema","germinacao"]],
      ["Zoologia",["invertebrado","vertebrado","mamifero","anfibio","reptil","cladograma"]],
      ["Microbiologia e imunologia",["virus","bacteria","fungo","vacina","anticorpo","sistema imunologico"]]],
    "Português":[
      ["Interpretação de texto",["ideia central","finalidade do texto","texto objetiva","argumentacao apresentada","texto defende"]],
      ["Gêneros textuais",["genero textual","noticia","artigo de opiniao","cronica","charge","tirinha","anuncio","cartaz"]],
      ["Gramática",["verbo","pronome","concordancia","regencia","oracao","pontuacao"]],
      ["Coesão e coerência",["coesao","coerencia","conectivo","referencia pronominal"]],
      ["Variação linguística",["variacao linguistica","norma-padrao","preconceito linguistico","registro formal","identidade linguistica"]],
      ["Figuras e recursos de linguagem",["metafora","ironia","metonimia","antitese","eufemismo","intertextualidade","efeito de sentido"]]],
    "Literatura":[
      ["Modernismo",["modernismo","semana de arte moderna","modernista"]],
      ["Realismo e Naturalismo",["realismo","naturalismo","machado de assis","aluisio azevedo"]],
      ["Romantismo",["romantismo","jose de alencar","goncalves dias"]],
      ["Barroco e Arcadismo",["barroco","arcadismo","gregorio de matos"]],
      ["Análise literária",["narrador","personagem","eu lirico","poema","romance","conto","foco narrativo"]]],
    "História":[
      ["Segunda Guerra Mundial",["segunda guerra mundial","nazismo","holocausto","hitler","eixo","aliados"]],
      ["Primeira Guerra Mundial",["primeira guerra mundial","trincheira","tratado de versalhes"]],
      ["Guerra Fria",["guerra fria","uniao sovietica","muro de berlim","corrida armamentista"]],
      ["Revolução Francesa",["revolucao francesa","jacobino","girondino","antigo regime","bastilha"]],
      ["Brasil Colônia",["brasil colonia","brasil colonial","engenho","capitania hereditaria","mineracao colonial"]],
      ["Brasil Império",["brasil imperio","primeiro reinado","segundo reinado","dom pedro","abolicionismo"]],
      ["Primeira República",["republica velha","primeira republica","cafe com leite","coronelismo"]],
      ["Era Vargas",["era vargas","getulio vargas","estado novo","revolucao de 1930"]],
      ["Ditadura Militar no Brasil",["ditadura militar","ato institucional","ai-5","regime militar","redemocratizacao"]],
      ["Idade Média",["idade media","feudalismo","senhor feudal","cruzadas"]],
      ["Antiguidade",["grecia antiga","roma antiga","civilizacao egipcia","mesopotamia"]]],
    "Geografia":[
      ["Geopolítica e globalização",["geopolitica","globalizacao","fronteira","bloco economico"]],
      ["Climatologia",["clima","massa de ar","precipitacao","el nino"]],
      ["Meio ambiente",["desmatamento","mudancas climaticas","aquecimento global","sustentabilidade"]],
      ["Geografia urbana",["urbanizacao","metropole","segregacao urbana","rede urbana"]],
      ["Demografia e migrações",["demografia","migracao","populacao","natalidade","refugiado"]],
      ["Cartografia",["mapa","escala cartografica","latitude","longitude","cartografia","projecao"]],
      ["Geologia e relevo",["placa tectonica","relevo","estrutura geologica","vulcanismo","terremoto"]],
      ["Geografia agrária",["agricultura","agrario","latifundio","reforma agraria","agronegocio"]]],
    "Filosofia":[
      ["Ética e filosofia política",["etica","moral","virtude","justica","contrato social","estado de natureza"]],
      ["Teoria do conhecimento",["conhecimento","verdade","razao","experiencia","epistemologia"]],
      ["Filosofia antiga",["socrates","platao","aristoteles","epicuro"]],
      ["Filosofia moderna e contemporânea",["descartes","kant","nietzsche","hegel","spinoza"]]],
    "Sociologia":[
      ["Cultura e identidade",["identidade social","industria cultural","relacoes sociais"]],
      ["Trabalho e desigualdade",["trabalho","classe social","desigualdade","capitalismo","mais-valia"]],
      ["Cidadania e movimentos sociais",["cidadania","direitos sociais","movimento social","participacao politica"]],
      ["Teorias sociológicas",["durkheim","max weber","karl marx","fato social","acao social"]]],
    "Inglês":[["Interpretação de texto em inglês",["according to","the author","instead of","the expression"]]],
    "Espanhol":[["Interpretação de texto em espanhol",["segun el texto","el autor","sin embargo","la expresion"]]],
    "Artes":[
      ["Artes visuais",["pintura","escultura","fotografia","grafite","mural","artes visuais"]],
      ["Música",["musica","cancao","composicao musical"]],
      ["Teatro, dança e performance",["teatro","danca","performance","coreografia","cenografia"]],
      ["Cinema e audiovisual",["cinema","filme","audiovisual"]]],
    "Educação Física":[
      ["Esportes",["esporte","modalidade esportiva","atleta","olimpiadas","paralimpiadas"]],
      ["Saúde e atividade física",["atividade fisica","exercicio fisico","sedentarismo","aptidao fisica"]],
      ["Práticas corporais",["pratica corporal","cultura corporal","movimento corporal"]]]
  };

  const TEMAS_PADRAO = {
    "Português":"Interpretação de texto", "Literatura":"Análise literária",
    "Inglês":"Interpretação de texto em inglês", "Espanhol":"Interpretação de texto em espanhol",
    "Artes":"Leitura de linguagens artísticas", "Educação Física":"Práticas corporais",
    "História":"Processos históricos", "Geografia":"Espaço geográfico e sociedade",
    "Filosofia":"Problemas filosóficos", "Sociologia":"Sociedade e relações sociais",
    "Biologia":"Fundamentos de Biologia", "Física":"Fundamentos de Física",
    "Química":"Fundamentos de Química", "Matemática":"Resolução de problemas"
  };
  const GENERICOS = ["","a classificar","conhecimentos gerais","interdisciplinar","geral","nao informado","conteudo geral"];

  const faixa=(inicio,fim)=>Array.from({length:fim-inicio+1},(_,indice)=>inicio+indice);
  function mapaPorGrupos(grupos) {
    const mapa={};
    Object.entries(grupos).forEach(([materia,numeros])=>numeros.forEach(numero=>{mapa[numero]=materia;}));
    return mapa;
  }

  /* Mapas editoriais construídos a partir da estrutura de cada caderno e
     revisados pelo enunciado. Eles evitam que palavras incidentais — por
     exemplo “arte” numa questão de gramática — definam a disciplina. */
  const MAPAS_REVISAO = {
    "enem-2024":mapaPorGrupos({
      "Português":[6,...faixa(10,15),17,...faixa(20,24),33,34,37,39,41,45],
      "Literatura":[19,28,29,31,32,35,38,42],
      "Artes":[8,16,25,27,30,36,40,43],
      "Educação Física":[7,9,18,26,44],
      "Geografia":[46,48,53,60,68,70,71,79,81,83,84,86,88,89],
      "História":[49,50,51,59,64,73,75,77,80,85],
      "Filosofia":[55,58,61,62,76,78,82,87],
      "Sociologia":[47,52,54,56,57,63,65,66,67,69,72,74,90],
      "Física":[91,96,99,...faixa(100,103),106,117,119,121,122,125,127,...faixa(128,132)],
      "Química":[92,93,94,97,105,114,116,118,123,133,135],
      "Biologia":[95,98,...faixa(104,113),115,120,124,126,134]
    }),
    "enem-2025":mapaPorGrupos({
      "Português":[...faixa(6,10),12,13,...faixa(20,24),26,27,...faixa(29,33),36,37,39,40,41,42,44,45],
      "Literatura":[14,16,17,18,28,34,35,38],
      "Artes":[15,25,43],
      "Educação Física":[11,19],
      "Geografia":[48,51,52,56,58,62,69,72,74,78,79,81,89],
      "História":[47,54,59,63,65,68,70,75,80,84,85,88,90],
      "Filosofia":[49,50,53,57,60,64,71,73,77,87],
      "Sociologia":[46,55,61,66,67,76,82,83,86],
      "Física":[96,100,101,105,109,...faixa(113,115),119,120,122,128,129,130,131,133,135],
      "Química":[91,92,97,106,108,112,116,118,121,...faixa(124,127),134],
      "Biologia":[93,94,95,98,99,...faixa(102,104),107,110,111,117,123,132]
    }),
    "fuvest-2024":mapaPorGrupos({
      "Português":[1,89],
      "Literatura":[2,15,16,...faixa(36,39),67,68,82,83],
      "Artes":[3],
      "Inglês":[4,5,11,12,53,54,88],
      "História":[6,7,22,44,45,46,52,...faixa(74,77),79,86,87],
      "Geografia":[43,47,61,62,65,66,70,78,80],
      "Filosofia":[23],
      "Sociologia":[8,9,10,81,90],
      "Biologia":[14,...faixa(17,20),32,40,64,69],
      "Química":[21,25,29,30,41,56],
      "Física":[24,26,27,28,42,50,51,55,57,58,...faixa(71,73)],
      "Matemática":[13,31,33,34,35,48,49,59,60,63,84,85]
    }),
    "fuvest-2025":mapaPorGrupos({
      "Português":[3,11,66],
      "Literatura":[5,...faixa(34,38),42,43,82,83,84],
      "Artes":[86],
      "Inglês":[15,40,41,61],
      "História":[1,4,8,13,14,39,79,85,87,90],
      "Geografia":[2,17,25,26,27,49,50,51,53,54,81,88],
      "Filosofia":[6,7,44],
      "Sociologia":[9,10,12,80,89],
      "Biologia":[29,30,31,46,47,55,67,71],
      "Química":[20,21,24,56,57,58,60,63,64,65,72,73],
      "Física":[18,19,22,23,28,32,33,59,62,74],
      "Matemática":[16,45,48,52,68,69,70,75,76,77,78]
    }),
    "unesp-2024":mapaPorGrupos({
      "Português":[1,2,3,4,5,6,8,9,10,11,12,16,17,18,20],
      "Literatura":[7,13,14,15,19],
      "Inglês":faixa(21,30),
      "História":[31,32,34,35,37,39,40,42,47],
      "Geografia":[38,43,45,46,48,49,50,51,53,54],
      "Filosofia":[41,52,55,56,60],
      "Sociologia":[33,36,44,58,59],
      "Artes":[57],
      "Biologia":faixa(61,68),
      "Química":faixa(69,75),
      "Física":faixa(76,82),
      "Matemática":faixa(83,90)
    }),
    "unesp-2025":mapaPorGrupos({
      "Português":[4,5,6,7,8,11,12,13,14,17,20],
      "Literatura":[1,2,3,9,10,16,18,19],
      "Artes":[15],
      "Inglês":faixa(21,30),
      "História":[31,32,33,34,35,36,37,39,40,42,43,44],
      "Geografia":[38,45,46,47,48,50,51,52,53,54,56],
      "Filosofia":[55,58,59,60],
      "Sociologia":[41,49,57],
      "Biologia":faixa(61,68),
      "Química":faixa(69,75),
      "Física":faixa(76,82),
      "Matemática":faixa(83,90)
    }),
    "unicamp-2025":mapaPorGrupos({
      "Artes":[35,36,39],
      "Português":[37,40,41,43,45],
      "Literatura":[38,42,44,46]
    })
  };

  function normalizar(texto) {
    return String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/enem\s*20\d{2}/g, " ").replace(/\s+/g, " ").trim();
  }
  function textoDaQuestao(q) {
    const principal=String(q.pergunta||q.enunciado||"").trim();
    return normalizar([principal||q.textoExtraido,...(q.opcoes||[])].join(" "));
  }
  function comandoDaQuestao(q) {
    return normalizar(q.pergunta||q.enunciado||q.textoExtraido||"").slice(-650);
  }
  function areaEnem(q) {
    if (normalizar(q.vestibular)!=="enem") return "";
    const numero=Number(q.numero), dia=Number(q.dia);
    if (dia===1||(numero>=1&&numero<=90)) return numero<=45?"Linguagens":"Ciências Humanas";
    if (dia===2||numero>=91) return numero<=135?"Ciências da Natureza":"Matemática";
    return "";
  }
  function restricaoDaProva(q) {
    const vestibular=normalizar(q.vestibular),ano=Number(q.ano),n=Number(q.numero);
    const revisada=MAPAS_REVISAO[`${vestibular}-${ano}`]?.[n];
    if(revisada)return {fixa:revisada,revisada:true};
    if(vestibular==="enem"&&n>=136&&n<=180)return {fixa:"Matemática",revisada:true};
    if(vestibular==="unicamp"){
      if(ano===2024){
        if(n<=6)return {fixa:"Português"}; if(n<=12)return {fixa:"Literatura"};
        if(n<=19)return {fixa:"História"}; if(n<=26)return {fixa:"Química"};
        if(n<=33)return {fixa:"Geografia"}; if(n<=40)return {fixa:"Física"};
        if(n<=47)return {fixa:"Biologia"}; if(n<=50)return {fixa:"Sociologia"};
        if(n<=53)return {fixa:"Filosofia"}; if(n<=65)return {fixa:"Matemática"};
        return {fixa:"Inglês"};
      }
      if(ano===2025){
        if(n<=7)return {fixa:"Geografia"}; if(n<=14)return {fixa:"Física"};
        if(n<=21)return {fixa:"Inglês"}; if(n<=24)return {fixa:"Filosofia"};
        if(n<=31)return {fixa:"História"}; if(n<=34)return {fixa:"Sociologia"};
        if(n<=46)return {permitidas:["Português","Literatura","Artes"]};
        if(n<=58)return {fixa:"Matemática"}; if(n<=65)return {fixa:"Química"};
        return {fixa:"Biologia"};
      }
    }
    if(vestibular==="unesp"){
      if(n<=20)return {permitidas:["Português","Literatura","Artes"]};
      if(n<=30)return {fixa:"Inglês"};
      if(n<=60)return {permitidas:["História","Geografia","Filosofia","Sociologia","Artes"]};
      return {permitidas:["Biologia","Física","Química","Matemática"]};
    }
    return null;
  }
  function ocorrencias(texto,termo) {
    const alvo=normalizar(termo);
    if(!alvo)return 0;
    if(/^[a-z0-9]+$/.test(alvo)){
      const seguro=alvo.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
      const encontrados=texto.match(new RegExp(`(^|[^a-z0-9])${seguro}(?=$|[^a-z0-9])`,"g"));
      return Math.min(2,encontrados?.length||0);
    }
    return !texto.includes(alvo)?0:Math.min(2,texto.split(alvo).length-1);
  }
  function pontuarMateria(texto,comando,regra) {
    let pontos=0;
    [[regra.fortes,7],[regra.medios,3],[regra.leves,1]].forEach(([termos,peso])=>termos.forEach(termo=>{
      pontos+=ocorrencias(texto,termo)*peso;
      if(ocorrencias(comando,termo))pontos+=Math.max(2,Math.round(peso*.75));
    }));
    return pontos;
  }
  function aplicarRegrasEspeciais(q,texto,comando,pontos) {
    const original=String(q.pergunta||q.enunciado||q.textoExtraido||"");
    if(/(efeito de sentido|finalidade do texto|texto objetiva|recurso persuasivo|marca linguistica|variacao linguistica|identidade linguistica|funcao da linguagem)/.test(comando))pontos["Português"]+=16;
    if(/(narrador|eu lirico|foco narrativo|escola literaria|romantismo|realismo|modernismo)/.test(comando))pontos["Literatura"]+=15;
    if(/(obra de arte|producao artistica|linguagem artistica|leitura comparativa das .*escultur|composicao visual|arte plumaria)/.test(texto))pontos["Artes"]+=17;
    if(/(atividade fisica|pratica corporal|cultura corporal|modalidade esportiva|sedentarismo)/.test(texto))pontos["Educação Física"]+=17;
    if(/(processo historico|contexto historico|brasil colonia|brasil imperio|primeira republica|era vargas|ditadura militar|idade media|idade moderna|seculo xix|seculo xx)/.test(texto))pontos["História"]+=10;
    if(/(espaco geografico|territorio|cartografia|urbanizacao|migracao|clima|relevo|geopolitica|demografia)/.test(texto))pontos["Geografia"]+=10;
    if(/(socrates|platao|aristoteles|descartes|kant|nietzsche|epistemologia|metafisica)/.test(texto))pontos["Filosofia"]+=18;
    if(/(durkheim|max weber|karl marx|fato social|classe social|movimento social|desigualdade social)/.test(texto))pontos["Sociologia"]+=18;
    if(["dna","rna","gene","celula","fotossintese","ecossistema","cladograma","especie","selecao natural","mitose","meiose"].some(t=>ocorrencias(texto,t)))pontos["Biologia"]+=12;
    if(/(adsorcao|carvao ativado|bronsted|molaridade|mol de|massa molar|oxidacao|eletrolise|grupo funcional|ligacao quimica)/.test(texto))pontos["Química"]+=14;
    if(/\d\s*(?:m\/s|km\/h|hz|w|v|a|n|j)\b|\d\s*Ω/i.test(original))pontos["Física"]+=8;
    if(/\b(?:H2O|CO2|O2|NaCl|HCl|NaOH|CH4|NH3|H2SO4)\b/.test(original))pontos["Química"]+=10;
    if(/[=<>±√]|\bf\s*\(\s*x\s*\)|\bg\s*\(\s*x\s*\)/.test(original)&&/(calcule|determine|valor|funcao|equacao|grafico)/.test(texto))pontos["Matemática"]+=11;
    const ingles=(normalizar(original).match(/\b(the|of|and|to|in|is|are|with|for|that|this|from|into|between|without|should|would|could|won't|worth)\b/g)||[]).length;
    if(ingles>=3||/(won't|be worth|according to|the author|the expression)/i.test(original))pontos["Inglês"]+=18;
  }
  function materiaAutomatica(q,texto,comando,areaObrigatoria) {
    if(["Inglês","Espanhol"].includes(q.lingua))return {materia:q.lingua,pontos:100,segunda:0};
    const restricao=restricaoDaProva(q);
    if(restricao?.fixa)return {materia:restricao.fixa,pontos:100,segunda:0,revisada:restricao.revisada===true};
    const placar=Object.fromEntries(REGRAS_MATERIAS.map(r=>[r.materia,pontuarMateria(texto,comando,r)]));
    aplicarRegrasEspeciais(q,texto,comando,placar);
    const candidatas=REGRAS_MATERIAS.filter(r=>(!areaObrigatoria||AREAS[r.materia]===areaObrigatoria)&&(!restricao?.permitidas||restricao.permitidas.includes(r.materia)))
      .map(r=>({materia:r.materia,pontos:placar[r.materia]||0}))
      .sort((a,b)=>b.pontos-a.pontos||a.materia.localeCompare(b.materia));
    if(candidatas[0]&&candidatas[0].pontos>0)return {...candidatas[0],segunda:candidatas[1]?.pontos||0};
    const fallback={"Linguagens":"Português","Ciências Humanas":"História","Ciências da Natureza":"Biologia","Matemática":"Matemática"};
    return {materia:fallback[areaObrigatoria]||"Português",pontos:0,segunda:0};
  }
  function temaAutomatico(materia,texto,comando) {
    let melhor={tema:TEMAS_PADRAO[materia]||`Fundamentos de ${materia}`,pontos:0};
    (REGRAS_TEMAS[materia]||[]).forEach(([tema,termos])=>{
      const pontos=termos.reduce((s,t)=>s+ocorrencias(texto,t)+(ocorrencias(comando,t)?2:0),0);
      if(pontos>melhor.pontos)melhor={tema,pontos};
    });
    return melhor.tema;
  }
  function calcularComplexidade(q,texto) {
    let pontos=1; const tamanho=normalizar(q.pergunta||q.enunciado||q.textoExtraido).length;
    if(tamanho>260)pontos++; if(tamanho>750)pontos++; if(tamanho>1450)pontos++;
    if(/(calcule|determine|analise|compare|justifique|infere-se|conclui-se)/.test(texto))pontos++;
    if(/(grafico|tabela|figura|mapa|equacao|sistema|experimento|texto i|texto ii)/.test(texto))pontos++;
    return Math.max(1,Math.min(5,pontos));
  }
  function nivelDaComplexidade(c){return c<=2?"Fácil":c===3?"Médio":"Difícil";}
  function detectarImagemNecessaria(q,texto) {
    if(q.requerImagem===true||q.alternativasEmImagem===true)return true;
    if(!q.imagemPagina&&!q.imagem)return false;
    const enunciado=normalizar(q.pergunta||q.enunciado||"");
    if(!enunciado||enunciado.length<45||/^(disponivel em|fonte:|adaptado de|acesso em)/.test(enunciado))return true;
    return /(na figura|a figura|figura a seguir|imagem a seguir|observe a imagem|fotografia|escultura|pintura|charge|tirinha|cartaz|infografico|mapa|grafico|diagrama|esquema|cladograma|estrutura quimica|representacao|texto ii|quadro a seguir|tabela a seguir)/.test(texto);
  }
  function classificarQuestao(q,opcoes) {
    const config={sobrescrever:false,...(opcoes||{})};
    const texto=textoDaQuestao(q),comando=comandoDaQuestao(q),areaDaProva=areaEnem(q);
    const materiaAtual=String(q.materia||"").trim(),materiaGenerica=GENERICOS.includes(normalizar(materiaAtual));
    const resultado=materiaAutomatica(q,texto,comando,areaDaProva);
    const materia=config.sobrescrever||materiaGenerica?resultado.materia:materiaAtual;
    const area=areaDaProva||AREAS[materia]||String(q.area||"Conhecimentos Gerais");
    const temaAtual=String(q.tema||q.conteudo||"").trim();
    const tema=config.sobrescrever||GENERICOS.includes(normalizar(temaAtual))?temaAutomatico(materia,texto,comando):temaAtual;
    const complexidadeAtual=Number(q.complexidade);
    const complexidade=config.sobrescrever||!(complexidadeAtual>=1&&complexidadeAtual<=5)?calcularComplexidade(q,texto):complexidadeAtual;
    const nivelAtual=String(q.nivel||q.dificuldade||"").trim();
    const nivel=config.sobrescrever||GENERICOS.includes(normalizar(nivelAtual))?nivelDaComplexidade(complexidade):nivelAtual;
    const diferenca=resultado.pontos-resultado.segunda;
    const confianca=resultado.revisada?"revisada":resultado.pontos>=16&&diferenca>=6?"alta":resultado.pontos>=6&&diferenca>=2?"média":"baixa";
    return {...q,area,materia,tema,conteudo:tema,nivel,dificuldade:nivel,complexidade,
      categorias:[area,materia,tema],requerImagem:detectarImagemNecessaria(q,texto),
      classificacaoAutomatica:true,confiancaClassificacao:materiaGenerica||config.sobrescrever?confianca:"original",
      versaoClassificador:4};
  }
  function resumir(lista) {
    const materias={},areas={},confiancas={},imagens={necessarias:0,disponiveis:0};
    lista.forEach(q=>{materias[q.materia]=(materias[q.materia]||0)+1;areas[q.area]=(areas[q.area]||0)+1;
      confiancas[q.confiancaClassificacao]=(confiancas[q.confiancaClassificacao]||0)+1;
      if(q.imagemPagina||q.imagem)imagens.disponiveis++;if(q.requerImagem)imagens.necessarias++;});
    return {materias,areas,confiancas,imagens};
  }
  function analisarQuestao(q) {
    const texto=textoDaQuestao(q),comando=comandoDaQuestao(q),area=areaEnem(q);
    const placar=Object.fromEntries(REGRAS_MATERIAS.map(r=>[r.materia,pontuarMateria(texto,comando,r)]));
    aplicarRegrasEspeciais(q,texto,comando,placar);
    return Object.entries(placar).filter(([materia])=>!area||AREAS[materia]===area)
      .sort((a,b)=>b[1]-a[1]);
  }
  global.RotaClassificador={AREAS,REGRAS_MATERIAS,classificarQuestao,resumir,detectarImagemNecessaria,analisarQuestao};
})(typeof window!=="undefined"?window:globalThis);
