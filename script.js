/* =========================================================
   ROTA DA APROVAÇÃO — LÓGICA DO SITE
   Todo o projeto funciona no navegador. Não há servidor,
   framework, cadastro ou envio de dados para a internet.
   ========================================================= */

/* ---------- 1. DADOS DE AGENDA E AVISOS ---------- */
const datas = [
  {dia:"30",mes:"AGO",titulo:"Organização de documentos",detalhe:"Separe documento, comprovantes e dados de inscrição",tipo:"Planejamento",cor:"coral"},
  {dia:"07",mes:"SET",titulo:"Revisão semanal",detalhe:"Revise os erros e atualize seu plano de estudos",tipo:"Estudo",cor:"lilas"},
  {dia:"15",mes:"SET",titulo:"Simulado de 20 questões",detalhe:"Treine com tempo controlado e sem consultar",tipo:"Prática",cor:"azul"},
  {dia:"30",mes:"SET",titulo:"Fechamento do mês",detalhe:"Compare acertos e escolha os próximos temas",tipo:"Análise",cor:"verde"}
];

const avisos = [
  {dia:"HOJE",mes:"PLANO",selo:"COMECE PEQUENO",cor:"verde",titulo:"Defina uma meta possível para hoje",texto:"Um bloco de 25 minutos bem feito é melhor do que um plano enorme que não começa.",link:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem",urgente:true},
  {dia:"01",mes:"PASSO",selo:"MATERIAL OFICIAL",cor:"azul",titulo:"Use os cadernos completos para simular a prova",texto:"O site traz uma seleção guiada. Para um simulado real, resolva o PDF original sem consultar as explicações.",link:"https://www.fuvest.br/acervo-vestibular-2025/"},
  {dia:"02",mes:"PASSO",selo:"REVISÃO ATIVA",cor:"lilas",titulo:"Explique o erro com suas palavras",texto:"Depois da resolução, registre qual ideia faltou. Isso transforma um erro isolado em conteúdo aprendido.",link:"https://www.comvest.unicamp.br/vestibulares-anteriores/1a-fase-2a-fase-comentadas/"}
];

/* ---------- 2. GUIAS DE ESTUDO ----------
   Cada guia tem conteúdo suficiente para orientar a revisão
   e uma ligação com as questões do mesmo tema ou matéria. */
const guias = [
  {
    id:"porcentagem",materia:"Matemática",icone:"%",cor:"azul",titulo:"Porcentagem, razão e proporcionalidade",tempo:"25 min",nivel:"Base",
    resumo:"Transforme porcentagens em frações ou números decimais e identifique sempre qual é o valor de referência.",
    pontos:["p% significa p/100","Aumento: valor × (1 + taxa)","Desconto: valor × (1 − taxa)","Grandezas proporcionais mantêm uma razão constante"],
    formula:"parte = total × taxa decimal",
    passos:["Sublinhe o total de referência.","Converta a porcentagem para decimal.","Escolha entre calcular a parte, o novo total ou a taxa.","Verifique se o resultado faz sentido em relação ao valor inicial."],
    exemplo:"25% de 80 = 0,25 × 80 = 20. Com desconto, o novo valor é 80 − 20 = 60.",
    temas:["Porcentagem","Proporcionalidade"]
  },
  {
    id:"algebra",materia:"Matemática",icone:"x",cor:"lilas",titulo:"Equações, módulos, PA e funções",tempo:"35 min",nivel:"Intermediário",
    resumo:"Traduza as condições para linguagem algébrica antes de calcular. Intervalos e padrões ficam mais simples quando representados.",
    pontos:["|x−a|≤r representa um intervalo","Em PA: aₙ=a₁+(n−1)r","Sₙ−Sₙ₋₁=aₙ","Produto negativo: fatores com sinais opostos"],
    formula:"aₙ = a₁ + (n − 1)r",
    passos:["Identifique a incógnita e as restrições.","Reescreva módulos ou somas em formas conhecidas.","Resolva a condição algébrica.","Teste limites e valores inteiros, se solicitado."],
    exemplo:"(x−2)(x−6)<0 é verdadeiro entre as raízes: 2<x<6. Os inteiros são 3, 4 e 5.",
    temas:["Álgebra","Progressão aritmética","Funções"]
  },
  {
    id:"fisica",materia:"Física",icone:"F",cor:"coral",titulo:"Energia, potência e segurança",tempo:"30 min",nivel:"Intermediário",
    resumo:"Antes de aplicar fórmula, defina o sistema e descubra qual grandeza é conservada ou transformada.",
    pontos:["Energia pode mudar de forma","Potência elétrica: P=U·i","Deformação aumenta o tempo da colisão","Impulso é variação da quantidade de movimento"],
    formula:"P = U · i  ⇒  i = P/U",
    passos:["Liste as grandezas fornecidas.","Defina sistema, unidade e fenômeno.","Aplique conservação ou relação física adequada.","Interprete o número no contexto de segurança."],
    exemplo:"Em 110 V, uma régua de 20 A suporta no máximo P=110×20=2200 W.",
    temas:["Energia","Eletricidade"]
  },
  {
    id:"quimica",materia:"Química",icone:"Q",cor:"amarelo",titulo:"Mol, radioatividade e química orgânica",tempo:"35 min",nivel:"Intermediário",
    resumo:"Questões de Química costumam exigir uma ponte entre o fenômeno descrito e uma representação: massa, mol, estrutura ou equação.",
    pontos:["n=m/M","Meia-vida reduz a amostra à metade","Compostos orgânicos têm carbono como elemento central","Balanceamento conserva átomos e carga"],
    formula:"massa restante = massa inicial · (1/2)ⁿ",
    passos:["Identifique o conceito central.","Converta unidades antes de operar.","Monte a proporção ou expressão.","Confira conservação de massa, átomos e carga."],
    exemplo:"Em cinco meias-vidas, uma amostra de 2 mg passa a 2/2⁵ = 0,0625 mg.",
    temas:["Estequiometria","Radioatividade","Química orgânica"]
  },
  {
    id:"biologia",materia:"Biologia",icone:"B",cor:"verde",titulo:"Genética, evolução e fisiologia",tempo:"35 min",nivel:"Intermediário",
    resumo:"Relacione estrutura e função. Em genética, pergunte qual molécula está sendo observada; em evolução, qual mecanismo altera populações.",
    pontos:["RT-PCR parte de RNA e revela genes expressos","Seleção natural atua sobre variação herdável","Vitamina A participa da visão","Isolamento geográfico não é obrigatório para especiação"],
    formula:"DNA → RNA → proteína (fluxo geral da informação)",
    passos:["Localize o nível biológico: molécula, célula, organismo ou população.","Separe causa de consequência.","Elimine alternativas absolutas ou incompatíveis.","Relacione o mecanismo ao resultado observado."],
    exemplo:"Se há RNA mensageiro de um gene, ele foi transcrito; por isso, a RT-PCR permite detectar expressão gênica.",
    temas:["Genética","Evolução","Fisiologia"]
  },
  {
    id:"interpretacao",materia:"Português",icone:"A",cor:"coral",titulo:"Interpretação e figuras de linguagem",tempo:"25 min",nivel:"Base",
    resumo:"A resposta correta deve ser sustentada pelo texto. Não escolha apenas uma alternativa verdadeira fora do contexto.",
    pontos:["Metáfora cria relação por semelhança","Concessão quebra uma expectativa","Tema não é o mesmo que objetivo","Palavras-chave ajudam, mas o sentido nasce do conjunto"],
    formula:"evidência textual + comando = alternativa correta",
    passos:["Leia primeiro o comando.","Marque palavras que revelam posição ou contraste.","Resuma a ideia central em uma frase.","Compare cada alternativa com uma evidência do texto."],
    exemplo:"“Formar novos quilombos” não é literal: representa união coletiva e resistência, portanto funciona como metáfora.",
    temas:["Interpretação","Figuras de linguagem"]
  },
  {
    id:"historia",materia:"História",icone:"H",cor:"lilas",titulo:"Colonização, identidade e resistência",tempo:"30 min",nivel:"Intermediário",
    resumo:"Evite tratar grupos históricos como blocos únicos. Pergunte quem age, em qual contexto e com quais interesses.",
    pontos:["Povos indígenas tiveram projetos políticos próprios","Identidades mudam no tempo e no espaço","Colonização produziu hierarquias duradouras","Fontes expressam perspectivas específicas"],
    formula:"sujeito histórico + contexto + interesse",
    passos:["Localize tempo e espaço.","Identifique o autor e o grupo mencionado.","Procure relações de poder e permanências.","Desconfie de generalizações como “todos”, “sempre” e “apenas”."],
    exemplo:"A participação indígena na Independência não foi homogênea: diferentes povos defenderam projetos e territórios próprios.",
    temas:["Colonização","Identidade","Independência"]
  },
  {
    id:"filosofia",materia:"Filosofia",icone:"Φ",cor:"azul",titulo:"Ética, felicidade e leitura conceitual",tempo:"25 min",nivel:"Intermediário",
    resumo:"Compare autores sem reduzir suas ideias a uma palavra. Defina o que cada filósofo entende pelos conceitos centrais.",
    pontos:["Aristóteles liga felicidade à atividade virtuosa","Epicuro valoriza prudência e tranquilidade","Prazer não significa necessariamente excesso","O contexto evita falsas equivalências"],
    formula:"conceito + definição do autor + consequência",
    passos:["Identifique os filósofos comparados.","Defina o conceito na teoria de cada um.","Procure aproximações e diferenças reais.","Rejeite caricaturas e afirmações absolutas."],
    exemplo:"Epicuro não recomenda prazeres ilimitados: a escolha prudente busca tranquilidade e evita sofrimentos futuros.",
    temas:["Filosofia antiga","Ética"]
  },
  {
    id:"geografia",materia:"Geografia",icone:"G",cor:"verde",titulo:"Cartografia, território e geologia",tempo:"30 min",nivel:"Intermediário",
    resumo:"Em cartografia, escala maior mostra área menor com mais detalhe. Em geologia, associe estrutura, recurso e uso econômico.",
    pontos:["Escala grande = mais detalhe e menos generalização","Fronteira estatal nem sempre coincide com território cultural","Escudos cristalinos concentram minerais metálicos","Território envolve poder e pertencimento"],
    formula:"escala = medida no mapa / medida real",
    passos:["Defina se o problema pede detalhe ou visão geral.","Separe limite político de território vivido.","Associe a estrutura geológica ao tipo de recurso.","Elimine relações causais que o texto não sustenta."],
    exemplo:"Um estudo de impacto local precisa de mapa em escala maior que um plano nacional, pois deve representar detalhes do terreno.",
    temas:["Cartografia","Território","Geologia"]
  }
];

/* ---------- 3. BANCO DE 21 QUESTÕES ----------
   Os enunciados abaixo são versões selecionadas/adaptadas dos
   cadernos enviados. O campo resolucao guarda o raciocínio em
   etapas e o índice resposta começa em zero (A=0, B=1...). */
const questoesIniciais = [
  {id:1,vestibular:"ENEM",ano:2024,numero:91,materia:"Física",tema:"Energia e colisões",nivel:"Médio",
    pergunta:"Carros modernos têm zonas deformáveis que amassam durante uma colisão. Considerando carro, ocupantes e obstáculo como um sistema isolado, por que essa deformação aumenta a segurança?",
    opcoes:["Aciona necessariamente os airbags.","Converte parte da energia cinética em deformação e energia interna.","Elimina a quantidade de movimento total.","Cria uma barreira rígida ao redor dos ocupantes.","Reduz sozinha a velocidade do centro de massa do sistema."],resposta:1,
    dica:"Pense no destino da energia associada ao movimento durante o amassamento.",
    resolucao:["A energia total do sistema isolado se conserva.","A colisão é inelástica: parte da energia cinética vira deformação, calor e som.","A zona deformável também aumenta o tempo da colisão, reduzindo a força média sobre os ocupantes."],
    explicacao:"A alternativa B descreve a transformação de energia que torna a colisão menos brusca para os passageiros.",fonte:"ENEM 2024 · 2º dia · Caderno 7 Azul · questão 91 (adaptada)"},
  {id:2,vestibular:"ENEM",ano:2024,numero:95,materia:"Biologia",tema:"Expressão gênica",nivel:"Médio",
    pergunta:"A RT-PCR usa transcriptase reversa para produzir DNA complementar a partir de RNA. Nesse contexto, a técnica é especialmente útil para detectar genes:",
    opcoes:["expressos.","plasmidiais.","bacterianos.","dominantes.","autossômicos."],resposta:0,
    dica:"A presença de RNA mensageiro revela que uma etapa do fluxo da informação genética já aconteceu.",
    resolucao:["Um gene expresso é transcrito em RNA.","A transcriptase reversa converte esse RNA em DNA complementar.","Detectar o DNA complementar indica que o RNA do gene estava presente na amostra."],
    explicacao:"A RT-PCR detecta transcritos e, portanto, permite investigar quais genes estão sendo expressos.",fonte:"ENEM 2024 · 2º dia · Caderno 7 Azul · questão 95"},
  {id:3,vestibular:"ENEM",ano:2024,numero:97,materia:"Química",tema:"Concentração e massa molar",nivel:"Difícil",
    pergunta:"Um soro de 2 L tem concentração de Na⁺ igual a 1,4 mg/mL e foi preparado com duas colheres pequenas de NaCl. Dados: M(NaCl)=58,5 g/mol e M(Na)=23 g/mol. Qual massa aproximada de NaCl havia em cada colher?",
    opcoes:["0,7 g","1,8 g","2,8 g","3,6 g","7,0 g"],resposta:3,
    dica:"Calcule primeiro a massa total de sódio e use a razão 58,5/23 para convertê-la em NaCl.",
    resolucao:["2 L = 2 000 mL; logo, há 1,4×2 000=2 800 mg=2,8 g de Na⁺.","A massa total de NaCl é 2,8×(58,5/23)≈7,12 g.","Como foram usadas duas colheres: 7,12/2≈3,56 g por colher."],
    explicacao:"Arredondando 3,56 g, obtém-se 3,6 g: alternativa D.",fonte:"ENEM 2024 · 2º dia · Caderno 7 Azul · questão 97"},

  {id:4,vestibular:"ENEM",ano:2025,numero:92,materia:"Química",tema:"Meia-vida",nivel:"Fácil",
    pergunta:"Uma amostra contém 2,00 mg de cobalto-60, cuja meia-vida é 5,3 anos. Após 26,5 anos, qual massa estará mais próxima da quantidade restante?",
    opcoes:["2,00 mg","1,00 mg","0,40 mg","0,13 mg","0,06 mg"],resposta:4,
    dica:"Descubra quantas meias-vidas cabem em 26,5 anos.",
    resolucao:["26,5/5,3=5 meias-vidas.","A massa é dividida por 2 cinco vezes: 2/2⁵.","2/32=0,0625 mg, aproximadamente 0,06 mg."],
    explicacao:"Depois de cinco meias-vidas resta 1/32 da massa inicial: alternativa E.",fonte:"ENEM 2025 · 2º dia · Caderno 8 Verde · questão 92"},
  {id:5,vestibular:"ENEM",ano:2025,numero:94,materia:"Biologia",tema:"Vitaminas",nivel:"Fácil",
    pergunta:"O arroz dourado é enriquecido com betacaroteno, precursor da vitamina A. Seu consumo ajuda a prevenir principalmente qual problema associado à falta dessa vitamina?",
    opcoes:["Hemofilia.","Escorbuto.","Raquitismo.","Cegueira noturna.","Anemia perniciosa."],resposta:3,
    dica:"A vitamina A participa da formação de pigmentos presentes na retina.",
    resolucao:["O betacaroteno pode ser convertido em vitamina A.","A vitamina A é necessária à formação de pigmentos visuais, como a rodopsina.","Sua deficiência prejudica especialmente a visão em baixa luminosidade."],
    explicacao:"A deficiência de vitamina A está relacionada à cegueira noturna: alternativa D.",fonte:"ENEM 2025 · 2º dia · Caderno 8 Verde · questão 94"},
  {id:6,vestibular:"ENEM",ano:2025,numero:100,materia:"Física",tema:"Potência elétrica",nivel:"Médio",
    pergunta:"Uma régua de 110 V suporta 20 A. Computador (250 W) e ar-condicionado (1 100 W) ficam ligados. Na ordem, tenta-se usar: impressora (660 W), cafeteira (900 W), luminária (5 W) e secador (750 W). Quantas atividades são realizadas antes de o fusível queimar?",
    opcoes:["4","3","2","1","0"],resposta:3,
    dica:"A potência máxima é U·i. Quando o fusível queima, as tentativas seguintes não podem acontecer.",
    resolucao:["Potência máxima: 110×20=2 200 W.","Carga fixa: 250+1 100=1 350 W.","Com a impressora: 2 010 W, funciona. Com a cafeteira: 2 250 W, ultrapassa o limite e o fusível queima.","Apenas a primeira atividade foi concluída."],
    explicacao:"Só a impressão ocorre sem queimar o fusível: alternativa D.",fonte:"ENEM 2025 · 2º dia · Caderno 8 Verde · questão 100 (adaptada)"},

  {id:7,vestibular:"Fuvest",ano:2024,numero:1,materia:"Português",tema:"Metáfora",nivel:"Fácil",
    pergunta:"No poema “Tempo de nos aquilombar”, de Conceição Evaristo, o verso “É tempo de formar novos quilombos” exemplifica:",
    opcoes:["Paradoxo, por simplesmente retomar o passado.","Metonímia, sem relação com o passado.","Metáfora, representando união coletiva como resistência social.","Antítese entre passado e futuro.","Hipérbole indicada apenas pelo plural."],resposta:2,
    dica:"Pergunte se “quilombos” deve ser entendido literalmente ou como imagem de organização e resistência.",
    resolucao:["O contexto convoca união, vigilância e luta por liberdade.","“Novos quilombos” amplia o sentido histórico de quilombo.","O termo passa a representar formas coletivas de resistência no presente."],
    explicacao:"Há uma transferência de sentido por semelhança: metáfora, alternativa C.",fonte:"Fuvest 2024 · Prova V · questão 01 (trecho selecionado)"},
  {id:8,vestibular:"Fuvest",ano:2024,numero:2,materia:"Português",tema:"Denúncia social",nivel:"Médio",
    pergunta:"Considerando o enfoque de denúncia social do poema “Tempo de nos aquilombar”, o eu lírico revela predominantemente:",
    opcoes:["Crítica apenas a problemas encerrados no passado.","Justificativas para a segregação atual.","Tensões sociais antigas examinadas à luz dos embates atuais.","A necessidade de contornar problemas do passado.","Peculiaridades de classes sem relacioná-las historicamente."],resposta:2,
    dica:"Observe a ligação entre a memória quilombola e o chamado para agir no presente.",
    resolucao:["O poema recupera a luta histórica por liberdade.","Verbos e expressões situam a convocação no presente.","Passado e atualidade se conectam pela permanência das tensões sociais."],
    explicacao:"O texto atualiza conflitos de longa duração: alternativa C.",fonte:"Fuvest 2024 · Prova V · questão 02 (adaptada)"},
  {id:9,vestibular:"Fuvest",ano:2024,numero:6,materia:"História",tema:"Brasil colonial",nivel:"Médio",
    pergunta:"Segundo texto de Evaldo Cabral de Mello, o açúcar estruturou latifúndio, escravidão e privilégios no Nordeste dos séculos XVI e XVII. A conclusão adequada é:",
    opcoes:["O trabalho escravizado distribuía-se de modo igual por todas as atividades.","A Coroa concedia principalmente pequenos lotes a donatários.","Os privilégios concentravam-se nos senhores de engenho, em prejuízo dos escravizados e livres pobres.","Relações horizontais recebiam estímulo oficial.","O feudalismo europeu foi reproduzido integralmente."],resposta:2,
    dica:"Concentre-se na expressão “reservando seus privilégios a uns poucos”.",
    resolucao:["A grande propriedade e a escravidão concentravam riqueza e poder.","Os poucos privilegiados eram, sobretudo, os proprietários de engenho.","A maioria — escravizados e livres pobres — permanecia subordinada."],
    explicacao:"O texto destaca a concentração de privilégios: alternativa C.",fonte:"Fuvest 2024 · Prova V · questão 06 (adaptada)"},

  {id:10,vestibular:"Fuvest",ano:2025,numero:4,materia:"História",tema:"Caminhos indígenas",nivel:"Médio",
    pergunta:"Ao discutir a ocupação do território colonial, Sérgio Buarque de Holanda destaca que trilhas e caminhos usados pelos colonizadores:",
    opcoes:["Foram criados apenas após a chegada portuguesa.","Ignoraram completamente o conhecimento local.","Aproveitaram rotas e técnicas indígenas já existentes.","Tinham como única finalidade separar aldeias.","Reproduziam estradas europeias pavimentadas."],resposta:2,
    dica:"A ocupação colonial não começou sobre um espaço vazio de conhecimento.",
    resolucao:["Povos indígenas conheciam rios, passagens e condições do território.","Colonizadores incorporaram esse saber prático em seus deslocamentos.","A expansão portuguesa, portanto, apropriou-se de caminhos anteriores."],
    explicacao:"A alternativa C reconhece o conhecimento territorial indígena apropriado pelos colonizadores.",fonte:"Fuvest 2025 · Prova V1 · questão 04 (adaptada)"},
  {id:11,vestibular:"Fuvest",ano:2025,numero:12,materia:"História",tema:"Capitalismo e colonialismo",nivel:"Difícil",
    pergunta:"Os conceitos de “extrativismo de dados” e “colonialismo de dados” podem ser entendidos como:",
    opcoes:["Mecanismos sem qualquer antecedente histórico.","Ideias incompatíveis: uma trata só da mente e outra só da vida material.","Lógicas opostas à extração de recursos naturais.","Formas análogas de compreender o capitalismo atual, remetendo a práticas históricas de apropriação.","Estratégias que eliminam desigualdades entre países."],resposta:3,
    dica:"Os dois conceitos usam experiências históricas de apropriação para interpretar a economia digital.",
    resolucao:["Dados são tratados como recursos capturados e transformados em valor.","“Extrativismo” e “colonialismo” remetem a práticas históricas de apropriação.","A analogia ilumina continuidades de poder e exploração no capitalismo contemporâneo."],
    explicacao:"Os conceitos compartilham a ideia de apropriação e objetivos econômicos: alternativa D.",fonte:"Fuvest 2025 · Prova V1 · questão 12 (adaptada)"},
  {id:12,vestibular:"Fuvest",ano:2025,numero:20,materia:"Química",tema:"Modelos atômicos",nivel:"Médio",
    pergunta:"Qual fenômeno não podia ser explicado pelo modelo atômico de Dalton, que considerava o átomo indivisível?",
    opcoes:["Conservação da massa.","Proporções definidas.","Formação de compostos.","Reorganização de átomos em reações comuns.","Radioatividade e transformação de elementos."],resposta:4,
    dica:"Procure o fenômeno que revela estrutura interna ou transformação do próprio átomo.",
    resolucao:["Dalton descrevia átomos como esferas indivisíveis e imutáveis.","Reações químicas comuns podiam ser vistas como rearranjos dessas esferas.","A radioatividade envolve alterações no núcleo e até transformação de um elemento em outro."],
    explicacao:"A radioatividade exige um modelo com estrutura subatômica: alternativa E.",fonte:"Fuvest 2025 · Prova V1 · questão 20 (adaptada)"},

  {id:13,vestibular:"Unesp",ano:2024,numero:38,materia:"Geografia",tema:"Território e fronteiras",nivel:"Médio",
    pergunta:"Um texto afirma que a América pré-colombiana permanece viva em povos separados por fronteiras nacionais modernas. Isso ocorre apesar de:",
    opcoes:["A independência ter incorporado integralmente valores nativos.","A miscigenação ter eliminado diferenças territoriais.","A conquista e os Estados nacionais terem imposto outra configuração territorial.","Interesses britânicos terem preservado os territórios originários.","Os povos indígenas terem sido completamente substituídos."],resposta:2,
    dica:"Diferencie território cultural de fronteira político-administrativa.",
    resolucao:["Povos e culturas existiam antes dos Estados atuais.","Conquista e formação nacional desenharam novas fronteiras.","Esses limites fragmentaram povos, mas não apagaram totalmente vínculos e identidades."],
    explicacao:"A permanência cultural existe apesar da configuração territorial imposta posteriormente: alternativa C.",fonte:"Unesp 2024 · 1ª fase · questão 38 (adaptada)"},
  {id:14,vestibular:"Unesp",ano:2024,numero:40,materia:"História",tema:"Identidade e diáspora",nivel:"Médio",
    pergunta:"V. S. Naipaul relata que a ideia de “Índia” construída por descendentes de indianos em Trinidad diferia da realidade encontrada no país. O caso mostra que identidades:",
    opcoes:["São cópias permanentes do lugar de origem.","Dependem apenas de características biológicas.","Desaparecem completamente em comunidades migrantes.","São reconstruídas na diáspora e mudam conforme o contexto social.","São definidas unicamente pelas fronteiras do Estado."],resposta:3,
    dica:"A memória de um lugar e a experiência concreta nesse lugar não são idênticas.",
    resolucao:["Comunidades migrantes preservam referências do lugar de origem.","Essas referências são reinterpretadas no novo contexto.","Por isso, a identidade diaspórica pode divergir da realidade social do país ancestral."],
    explicacao:"Identidades são históricas e contextuais: alternativa D.",fonte:"Unesp 2024 · 1ª fase · questão 40 (adaptada)"},
  {id:15,vestibular:"Unesp",ano:2024,numero:41,materia:"História",tema:"Totalitarismo",nivel:"Médio",
    pergunta:"Na análise de Hannah Arendt, os campos de concentração e extermínio nazistas produziram uma ação peculiar sobre as pessoas ao:",
    opcoes:["Priorizar medidas de higiene pública.","Transformá-las em coisas descartáveis, retirando singularidade e condição humana.","Garantir direitos civis mínimos.","Fortalecer nacionalismos plurais.","Substituir o extermínio pela escravização econômica."],resposta:1,
    dica:"Pense no significado de retirar nome, direitos, relações e individualidade.",
    resolucao:["O sistema totalitário destrói a condição jurídica e social da vítima.","Nos campos, pessoas são reduzidas a números e corpos administráveis.","Essa coisificação prepara a possibilidade de eliminação sem reconhecimento de humanidade."],
    explicacao:"A desumanização opera pela coisificação: alternativa B.",fonte:"Unesp 2024 · 1ª fase · questão 41 (adaptada)"},

  {id:16,vestibular:"Unicamp",ano:2024,numero:15,materia:"História",tema:"Independência do Brasil",nivel:"Médio",
    pergunta:"A participação indígena no processo de Independência do Brasil permite concluir que:",
    opcoes:["Os povos indígenas atuaram apenas para manter a ordem colonial.","Populações indígenas participaram com projetos políticos específicos.","A Independência teve significado idêntico para todos os povos.","A diversidade indígena impediu qualquer ação política."],resposta:1,
    dica:"Evite tratar diferentes povos como um bloco passivo e homogêneo.",
    resolucao:["A Independência envolveu disputas locais por território, autonomia e alianças.","Diferentes povos avaliaram riscos e oportunidades de modos distintos.","A participação indígena, portanto, expressou projetos próprios."],
    explicacao:"A alternativa B reconhece agência e diversidade política indígenas.",fonte:"Unicamp 2024 · 1ª fase · questão 15 (adaptada)"},
  {id:17,vestibular:"Unicamp",ano:2024,numero:52,materia:"Filosofia",tema:"Filosofia antiga",nivel:"Médio",
    pergunta:"Comparando Aristóteles e Epicuro sobre felicidade e prazer, é correto afirmar que:",
    opcoes:["Ambos identificam felicidade com prazer imediato.","Aristóteles rejeita toda forma de prazer e Epicuro defende excessos.","Eles apresentam visões distintas, mas nenhum reduz a felicidade ao prazer imediato.","Ambos defendem que riqueza é a condição suficiente da felicidade."],resposta:2,
    dica:"Para Epicuro, prazer significa sobretudo ausência de perturbação; para Aristóteles, felicidade envolve vida virtuosa.",
    resolucao:["Aristóteles associa felicidade à atividade racional conforme a virtude.","Epicuro valoriza prazeres estáveis, prudência e ausência de sofrimento.","Nenhum dos dois propõe busca impulsiva de prazer imediato."],
    explicacao:"As doutrinas diferem, mas ambas são mais complexas que o hedonismo imediato: alternativa C.",fonte:"Unicamp 2024 · 1ª fase · questão 52 (adaptada)"},
  {id:18,vestibular:"Unicamp",ano:2024,numero:54,materia:"Matemática",tema:"Áreas e proporcionalidade",nivel:"Fácil",
    pergunta:"Quatro pizzas individuais de diâmetro d custam o mesmo que uma pizza de 20 cm de diâmetro. Se o preço é proporcional à área, qual é d?",
    opcoes:["5 cm","8 cm","10 cm","12 cm"],resposta:2,
    dica:"Iguale quatro áreas pequenas à área da pizza maior. Use o raio, que é metade do diâmetro.",
    resolucao:["Área grande: π·10²=100π.","Cada pizza pequena tem raio d/2 e área πd²/4.","Quatro pequenas: 4·πd²/4=πd².","πd²=100π, então d=10 cm."],
    explicacao:"O diâmetro de cada pizza individual é 10 cm: alternativa C.",fonte:"Unicamp 2024 · 1ª fase · questão 54 (adaptada)"},

  {id:19,vestibular:"Unicamp",ano:2025,numero:1,materia:"Geografia",tema:"Escala cartográfica",nivel:"Fácil",
    pergunta:"Em comparação com um zoneamento ecológico-econômico nacional, mapas de um estudo de impacto ambiental local devem apresentar:",
    opcoes:["Escala menor e maior generalização.","Escala maior e menor generalização.","A mesma escala, apenas com novas cores.","Menos detalhes para facilitar a leitura."],resposta:1,
    dica:"Quanto menor a área representada com detalhe, maior é a escala cartográfica.",
    resolucao:["Um estudo local precisa mostrar elementos detalhados do terreno.","Escalas maiores representam áreas menores com mais detalhe.","Mais detalhe implica menor generalização das informações."],
    explicacao:"A combinação correta é escala maior e menor generalização: alternativa B.",fonte:"Unicamp 2025 · 1ª fase · questão 01 (adaptada)"},
  {id:20,vestibular:"Unicamp",ano:2025,numero:52,materia:"Matemática",tema:"Módulo e intervalos",nivel:"Fácil",
    pergunta:"Se |x−2|≤2 e |y−3|≤1, qual afirmação é necessariamente verdadeira?",
    opcoes:["x+y≤4","x+y≥8","x+y≤8","x+y=6"],resposta:2,
    dica:"Transforme cada desigualdade modular em um intervalo fechado.",
    resolucao:["|x−2|≤2 implica 0≤x≤4.","|y−3|≤1 implica 2≤y≤4.","A maior soma possível é 4+4=8.","Logo, x+y≤8."],
    explicacao:"A limitação superior da soma é 8: alternativa C.",fonte:"Unicamp 2025 · 1ª fase · questão 52 (adaptada)"},
  {id:21,vestibular:"Unicamp",ano:2025,numero:54,materia:"Matemática",tema:"Funções e inequações",nivel:"Médio",
    pergunta:"Considere f(x)=x−2 e g(x)=x²−4x. Quantos valores inteiros de x satisfazem g(f(x))<0?",
    opcoes:["2","3","4","5"],resposta:1,
    dica:"Faça a composição e fatore o polinômio. Um produto é negativo entre duas raízes distintas.",
    resolucao:["g(f(x))=(x−2)²−4(x−2).","Simplificando: x²−8x+12=(x−2)(x−6).","O produto é negativo quando 2<x<6.","Os inteiros são 3, 4 e 5: três valores."],
    explicacao:"Há três soluções inteiras: alternativa B.",fonte:"Unicamp 2025 · 1ª fase · questão 54 (adaptada)"}
];

/* A lista começa com o conteúdo demonstrativo e é substituída
   automaticamente pelos documentos publicados no Firestore. */
let questoes = questoesIniciais.map(q => window.RotaClassificador.classificarQuestao({
  ...q,
  complexidade: q.nivel === "Fácil" ? 2 : q.nivel === "Difícil" ? 5 : 3,
  recomendacao: q.recomendacao || `Revise o guia de ${q.materia} e resolva outra questão sobre ${q.tema}.`,
  ativo: true
}));

/* ---------- 4. ESTADO LOCAL ----------
   localStorage mantém respostas e favoritos após fechar a aba.
   Se o navegador bloquear o recurso, o site continua funcionando
   apenas durante a sessão graças ao bloco try/catch. */
const CHAVE_STORAGE = "rotaAprovacaoProgressoV2";
const estadoPadrao = {respostas:{},favoritos:[],sequencia:0,melhorSequencia:0};

function carregarEstado() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
    return salvo && salvo.respostas ? {...estadoPadrao,...salvo} : {...estadoPadrao};
  } catch (erro) {
    return {...estadoPadrao};
  }
}

let estado = carregarEstado();
let materiaAtual = "Todas";
let indiceQuestao = 0;
let dicasAbertas = new Set();
let ordemAleatoria = [];

function salvarEstado() {
  try { localStorage.setItem(CHAVE_STORAGE,JSON.stringify(estado)); } catch (erro) { /* Navegação privada pode bloquear o armazenamento. */ }
}

/* ---------- 5. NAVEGAÇÃO ENTRE PÁGINAS ---------- */
function abrirPagina(id) {
  document.querySelectorAll(".pagina").forEach(pagina=>pagina.classList.toggle("active",pagina.id===id));
  document.querySelectorAll("nav [data-page]").forEach(botao=>botao.classList.toggle("active",botao.dataset.page===id));
  document.getElementById("menu-principal").classList.remove("aberto");
  document.getElementById("menu-mobile").setAttribute("aria-expanded","false");
  document.getElementById("menu-mobile").textContent="☰";
  if(id==="desempenho") renderizarDesempenho();
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll("[data-page]").forEach(botao=>botao.addEventListener("click",()=>abrirPagina(botao.dataset.page)));
document.getElementById("menu-mobile").addEventListener("click",function(){
  const aberto=document.getElementById("menu-principal").classList.toggle("aberto");
  this.setAttribute("aria-expanded",String(aberto));
  this.textContent=aberto?"×":"☰";
});

/* ---------- 6. RENDERIZAÇÃO DE AGENDA, AVISOS E RESUMOS ---------- */
function htmlData(item) {
  return `<article class="data-card"><div class="bloco-data ${item.cor}"><strong>${item.dia}</strong><small>${item.mes}</small></div><div><span class="tipo">${item.tipo}</span><h3>${item.titulo}</h3><p>${item.detalhe}</p></div><span class="seta">›</span></article>`;
}

function htmlAviso(item) {
  return `<article class="aviso-largo ${item.urgente?"urgente":""}"><span class="data-larga">${item.dia}<small>${item.mes}</small></span><div><span class="selo ${item.cor}">${item.selo}</span><h3>${item.titulo}</h3><p>${item.texto}</p></div><a href="${item.link}" target="_blank" rel="noopener">Fonte útil ↗</a></article>`;
}

function htmlGuiaMini(guia) {
  return `<article class="guia-mini"><span class="guia-icone ${guia.cor}">${guia.icone}</span><div><span class="tipo">${guia.materia}</span><h3>${guia.titulo}</h3><p>${guia.tempo} · ${guia.nivel}</p></div><button class="botao-texto" data-abrir-guia="${guia.id}">Abrir →</button></article>`;
}

document.getElementById("datas-inicio").innerHTML=datas.slice(0,3).map(htmlData).join("");
document.getElementById("lista-datas").innerHTML=datas.map(htmlData).join("");
document.getElementById("lista-avisos").innerHTML=avisos.map(htmlAviso).join("");
document.getElementById("guias-inicio").innerHTML=guias.slice(0,3).map(htmlGuiaMini).join("");
document.getElementById("total-questoes-hero").textContent=questoes.length;
document.getElementById("total-guias-hero").textContent=guias.length;

/* ---------- 7. GUIAS DE ESTUDO ---------- */
const materiasGuias=["Todas",...new Set(guias.map(guia=>guia.materia))];
document.getElementById("filtro-guia-materia").innerHTML=materiasGuias.map(m=>`<option value="${m}">${m==="Todas"?"Todas as matérias":m}</option>`).join("");

function renderizarGuias() {
  const busca=document.getElementById("busca-guia").value.trim().toLowerCase();
  const materia=document.getElementById("filtro-guia-materia").value;
  const filtrados=guias.filter(g=>(materia==="Todas"||g.materia===materia)&&(!busca||`${g.materia} ${g.titulo} ${g.temas.join(" ")}`.toLowerCase().includes(busca)));
  document.getElementById("lista-guias").innerHTML=filtrados.length?filtrados.map(g=>{
    const quantidade=questoes.filter(q=>q.materia===g.materia||g.temas.some(t=>q.tema.includes(t))).length;
    return `<article class="guia-card"><div class="guia-card-topo"><span class="guia-icone ${g.cor}">${g.icone}</span><span class="tag">${g.nivel}</span></div><h3>${g.titulo}</h3><p>${g.resumo}</p><div class="guia-meta"><span>◷ ${g.tempo}</span><span>◎ ${quantidade} questões</span></div><button class="botao-primario" data-abrir-guia="${g.id}">Estudar agora</button></article>`;
  }).join(""):'<div class="vazio"><div>⌕</div><h2>Nenhum guia encontrado</h2><p>Tente outra matéria ou palavra.</p></div>';
}

function abrirGuia(id) {
  const g=guias.find(item=>item.id===id);
  if(!g)return;
  document.getElementById("conteudo-guia").innerHTML=`<article class="guia-conteudo"><span class="tag">${g.materia} · ${g.tempo}</span><h1>${g.titulo}</h1><p class="resumo-destaque">${g.resumo}</p><h2>O que você precisa saber</h2><ul>${g.pontos.map(p=>`<li>${p}</li>`).join("")}</ul><div class="formula">${g.formula}</div><h2>Estratégia de resolução</h2><ol class="passos-guia">${g.passos.map(p=>`<li>${p}</li>`).join("")}</ol><h2>Exemplo resolvido</h2><p>${g.exemplo}</p><button class="botao-primario" data-praticar-materia="${g.materia}">Praticar ${g.materia}</button></article>`;
  document.getElementById("modal-guia").showModal();
}

document.addEventListener("click",evento=>{
  const abrir=evento.target.closest("[data-abrir-guia]");
  if(abrir)abrirGuia(abrir.dataset.abrirGuia);
  const praticar=evento.target.closest("[data-praticar-materia]");
  if(praticar){
    materiaAtual=praticar.dataset.praticarMateria; indiceQuestao=0;
    document.getElementById("modal-guia").close();
    renderizarFiltros(); renderizarQuestao(); abrirPagina("questoes");
  }
});
document.getElementById("busca-guia").addEventListener("input",renderizarGuias);
document.getElementById("filtro-guia-materia").addEventListener("change",renderizarGuias);
document.getElementById("fechar-guia").addEventListener("click",()=>document.getElementById("modal-guia").close());
document.getElementById("modal-guia").addEventListener("click",evento=>{ if(evento.target===evento.currentTarget)evento.currentTarget.close(); });

/* ---------- 8. FILTROS DA ÁREA DE QUESTÕES ---------- */
let materias=[];

/* Recria matérias e vestibulares sempre que o Firestore muda.
   Dessa forma, um novo cadastro aparece nos filtros sem editar HTML. */
function atualizarCatalogos() {
  materias=["Todas",...new Set(questoes.map(q=>q.materia).filter(Boolean))];
  const vestibulares=[...new Set(questoes.map(q=>q.vestibular).filter(Boolean))];
  const areas=[...new Set(questoes.map(q=>q.area).filter(Boolean))];
  document.getElementById("filtro-vestibular").innerHTML='<option value="Todos">Todos os vestibulares</option>'+vestibulares.map(v=>`<option>${v}</option>`).join("");
  document.getElementById("filtro-area").innerHTML='<option value="Todas">Todas as áreas</option>'+areas.map(v=>`<option>${v}</option>`).join("");
  document.getElementById("total-questoes-hero").textContent=questoes.length;
}

function renderizarFiltros() {
  document.getElementById("filtros-materias").innerHTML=materias.map(m=>`<button class="${m===materiaAtual?"active":""}" data-materia="${m}">${m}</button>`).join("");
  document.querySelectorAll("[data-materia]").forEach(botao=>botao.addEventListener("click",()=>{
    materiaAtual=botao.dataset.materia; indiceQuestao=0; renderizarFiltros(); renderizarQuestao();
  }));
}

function questoesFiltradas() {
  const busca=document.getElementById("busca-questao").value.trim().toLowerCase();
  const vestibular=document.getElementById("filtro-vestibular").value;
  const area=document.getElementById("filtro-area").value;
  const nivel=document.getElementById("filtro-nivel").value;
  const complexidade=document.getElementById("filtro-complexidade").value;
  const modo=document.getElementById("filtro-modo").value;
  let lista=questoes.filter(q=>{
    const resposta=estado.respostas[q.id];
    const atendeModo=modo==="todas"||(modo==="erros"&&resposta&&!resposta.correta)||(modo==="favoritas"&&estado.favoritos.includes(q.id))||(modo==="naoRespondidas"&&!resposta);
    const texto=`${q.vestibular} ${q.ano} ${q.area||""} ${q.materia} ${q.tema} ${q.pergunta}`.toLowerCase();
    return (materiaAtual==="Todas"||q.materia===materiaAtual)&&(vestibular==="Todos"||q.vestibular===vestibular)&&(area==="Todas"||q.area===area)&&(nivel==="Todos"||q.nivel===nivel)&&(complexidade==="Todos"||Number(q.complexidade)===Number(complexidade))&&atendeModo&&(!busca||texto.includes(busca));
  });
  if(ordemAleatoria.length)lista.sort((a,b)=>ordemAleatoria.indexOf(a.id)-ordemAleatoria.indexOf(b.id));
  return lista;
}

/* ---------- 9. CARTÃO INTERATIVO DA QUESTÃO ---------- */
function renderizarQuestao() {
  const lista=questoesFiltradas();
  const card=document.getElementById("card-questao");
  if(!lista.length){
    document.getElementById("contador-questoes").textContent="0 de 0";
    document.getElementById("barra-questoes").style.width="0";
    card.innerHTML='<div class="vazio"><div>⌕</div><h2>Nenhuma questão neste filtro</h2><p>Troque os filtros ou responda novas questões primeiro.</p></div>';
    return;
  }
  if(indiceQuestao>=lista.length)indiceQuestao=0;
  if(indiceQuestao<0)indiceQuestao=lista.length-1;
  const q=lista[indiceQuestao];
  const registro=estado.respostas[q.id];
  const selecionada=registro?registro.selecionada:null;
  const revelada=Boolean(registro);
  const favorita=estado.favoritos.includes(q.id);
  const dicaAberta=dicasAbertas.has(q.id);

  const opcoes=q.opcoes.map((texto,i)=>{
    let classe="opcao";
    if(!revelada&&i===selecionada)classe+=" selecionada";
    if(revelada&&i===q.resposta)classe+=" correta";
    if(revelada&&i===selecionada&&i!==q.resposta)classe+=" errada";
    const simbolo=revelada&&i===q.resposta?'<span class="resultado">✓</span>':revelada&&i===selecionada?'<span class="resultado">×</span>':"";
    return `<button class="${classe}" data-alternativa="${i}" ${revelada?"disabled":""}><b>${String.fromCharCode(65+i)}</b><span>${texto}</span>${simbolo}</button>`;
  }).join("");

  card.innerHTML=`
    <div class="questao-topo"><span class="tag">${q.vestibular} ${q.ano} · Q${String(q.numero).padStart(2,"0")}</span><span class="tag">${q.area||"Área geral"}</span><span class="tag">${q.materia}</span><span class="tag nivel">${q.nivel}</span><span class="tag">Complexidade ${q.complexidade||3}/5</span><button class="favoritar ${favorita?"ativo":""}" id="favoritar" title="Favoritar questão" aria-label="Favoritar questão">${favorita?"★":"☆"}</button></div>
    <h2>${q.pergunta}</h2>
    <div class="opcoes">${opcoes}</div>
    ${dicaAberta?`<div class="caixa-dica"><h3>💡 Dica facilitadora</h3><p>${q.dica}</p></div>`:""}
    ${revelada?`<div class="resolucao"><h3>${registro.correta?"✓ Muito bem!":"↗ Vamos aprender com essa questão"}</h3><ol>${q.resolucao.map(p=>`<li>${p}</li>`).join("")}</ol><div class="resposta-final">${q.explicacao}</div><div class="recomendacao-questao"><strong>Próximo estudo recomendado</strong><p>${q.recomendacao||`Revise ${q.tema} e tente uma questão semelhante.`}</p></div></div>`:""}
    <div class="acoes-questao"><button class="botao-secundario" id="mostrar-dica">${dicaAberta?"Ocultar dica":"💡 Ver dica"}</button>${!revelada?'<button class="botao-primario" id="conferir" disabled>Conferir resposta</button>':""}<div class="navegacao"><button class="botao-secundario" id="anterior">← Anterior</button><button class="botao-secundario" id="proxima">Próxima →</button></div></div>
    <small class="fonte-questao">Fonte: ${q.fonte}. O texto pode ter sido condensado para estudo; consulte o PDF enviado para a versão integral.</small>`;

  document.getElementById("contador-questoes").textContent=`${indiceQuestao+1} de ${lista.length}`;
  document.getElementById("barra-questoes").style.width=`${((indiceQuestao+1)/lista.length)*100}%`;

  // Antes de revelar, um clique apenas seleciona a opção.
  card.querySelectorAll("[data-alternativa]").forEach(botao=>botao.addEventListener("click",()=>{
    card.querySelectorAll(".opcao").forEach(o=>{o.classList.remove("selecionada");delete o.dataset.escolhida;});
    botao.classList.add("selecionada");
    botao.dataset.escolhida="true";
    document.getElementById("conferir").disabled=false;
  }));

  const conferir=document.getElementById("conferir");
  if(conferir)conferir.addEventListener("click",()=>{
    const escolha=card.querySelector("[data-escolhida='true']");
    if(!escolha)return;
    const indice=Number(escolha.dataset.alternativa);
    const correta=indice===q.resposta;
    estado.respostas[q.id]={selecionada:indice,correta};
    if(correta){estado.sequencia+=1;estado.melhorSequencia=Math.max(estado.melhorSequencia,estado.sequencia);}
    else estado.sequencia=0;
    salvarEstado(); renderizarQuestao(); atualizarResumo();
  });

  document.getElementById("mostrar-dica").addEventListener("click",()=>{
    dicasAbertas.has(q.id)?dicasAbertas.delete(q.id):dicasAbertas.add(q.id);
    renderizarQuestao();
  });
  document.getElementById("favoritar").addEventListener("click",()=>{
    estado.favoritos=estado.favoritos.includes(q.id)?estado.favoritos.filter(id=>id!==q.id):[...estado.favoritos,q.id];
    salvarEstado(); renderizarQuestao(); atualizarResumo();
  });
  document.getElementById("anterior").addEventListener("click",()=>{indiceQuestao-=1;renderizarQuestao();});
  document.getElementById("proxima").addEventListener("click",()=>{indiceQuestao+=1;renderizarQuestao();});
}

["busca-questao","filtro-vestibular","filtro-area","filtro-nivel","filtro-complexidade","filtro-modo"].forEach(id=>{
  const evento=id==="busca-questao"?"input":"change";
  document.getElementById(id).addEventListener(evento,()=>{indiceQuestao=0;ordemAleatoria=[];renderizarQuestao();});
});

document.getElementById("embaralhar").addEventListener("click",()=>{
  ordemAleatoria=questoes.map(q=>q.id).sort(()=>Math.random()-.5);
  indiceQuestao=0; renderizarQuestao();
});

/* ---------- 10. RESUMO E DESEMPENHO ---------- */
function obterEstatisticas() {
  const registros=Object.values(estado.respostas);
  const respondidas=registros.length;
  const acertos=registros.filter(r=>r.correta).length;
  const percentual=respondidas?Math.round(acertos/respondidas*100):0;
  return {respondidas,acertos,percentual,erros:respondidas-acertos};
}

function atualizarResumo() {
  const s=obterEstatisticas();
  const conclusao=Math.round(s.respondidas/questoes.length*100);
  document.getElementById("percentual-hero").textContent=`${conclusao}%`;
  document.getElementById("anel-progresso").style.setProperty("--progresso",`${conclusao*3.6}deg`);
  document.getElementById("acertos-hero").textContent=s.acertos;
  document.getElementById("sequencia-hero").textContent=estado.sequencia;
  document.getElementById("favoritos-hero").textContent=estado.favoritos.length;
}

function renderizarDesempenho() {
  const s=obterEstatisticas();
  document.getElementById("cards-desempenho").innerHTML=[
    ["Questões respondidas",s.respondidas,`de ${questoes.length} disponíveis`],
    ["Taxa de acertos",`${s.percentual}%`,`${s.acertos} acertos e ${s.erros} erros`],
    ["Melhor sequência",estado.melhorSequencia,"acertos consecutivos"],
    ["Favoritas",estado.favoritos.length,"salvas para revisar"]
  ].map(([titulo,valor,detalhe])=>`<article class="metrica"><small>${titulo}</small><strong>${valor}</strong><small>${detalhe}</small></article>`).join("");

  const dados=materias.map(materia=>{
    if(materia==="Todas")return null;
    const qs=questoes.filter(q=>q.materia===materia&&estado.respostas[q.id]);
    const acertos=qs.filter(q=>estado.respostas[q.id].correta).length;
    const taxa=qs.length?Math.round(acertos/qs.length*100):0;
    return {materia,respondidas:qs.length,taxa};
  }).filter(Boolean);
  document.getElementById("desempenho-materias").innerHTML=dados.map(d=>`<div class="linha-materia"><strong>${d.materia}</strong><div class="barra-materia"><span style="width:${d.taxa}%"></span></div><small>${d.respondidas?`${d.taxa}%`:"—"}</small></div>`).join("");

  const praticadas=dados.filter(d=>d.respondidas);
  const pontoFraco=praticadas.sort((a,b)=>a.taxa-b.taxa)[0];
  document.getElementById("recomendacao-estudo").innerHTML=pontoFraco
    ?`<h2>Revise ${pontoFraco.materia}</h2><p>Sua taxa atual nessa matéria é ${pontoFraco.taxa}%. Abra “Revisar erros” na área de questões e compare seus raciocínios com as resoluções.</p>`
    :'<h2>Faça sua primeira questão</h2><p>Depois de responder, esta área identifica a matéria que merece mais atenção.</p>';
}

document.getElementById("limpar-progresso").addEventListener("click",()=>{
  if(confirm("Deseja apagar respostas, sequência e favoritas deste navegador?")){
    estado={...estadoPadrao,respostas:{},favoritos:[]}; salvarEstado();
    indiceQuestao=0; renderizarQuestao(); renderizarDesempenho(); atualizarResumo();
  }
});

/* ---------- 11. INTEGRAÇÃO COM FIREBASE ----------
   A versão Compat do SDK foi escolhida porque roda por tags <script>.
   Não exige npm, compilação ou Node.js no computador da escola. */
const bancoFirebase = window.ROTA_FIREBASE_ATIVO ? firebase.firestore() : null;
const autenticacaoFirebase = window.ROTA_FIREBASE_ATIVO ? firebase.auth() : null;
let questoesAdmin = [];

/* Garante valores válidos mesmo em documentos antigos ou incompletos. */
function normalizarQuestao(dados,id) {
  return {
    ...dados,
    id,
    vestibular:dados.vestibular||"Geral",
    ano:Number(dados.ano)||new Date().getFullYear(),
    numero:Number(dados.numero)||1,
    area:dados.area||window.RotaClassificador.AREAS[dados.materia]||"Conhecimentos Gerais",
    materia:dados.materia||"Geral",
    tema:dados.tema||"Conteúdo geral",
    nivel:dados.nivel||"Médio",
    complexidade:Number(dados.complexidade)||3,
    pergunta:dados.pergunta||"",
    opcoes:Array.isArray(dados.opcoes)?dados.opcoes:[],
    resposta:Number(dados.resposta)||0,
    dica:dados.dica||"Releia o comando e elimine as alternativas incompatíveis.",
    resolucao:Array.isArray(dados.resolucao)?dados.resolucao:["Compare as alternativas com o enunciado."],
    explicacao:dados.explicacao||"",
    recomendacao:dados.recomendacao||`Revise ${dados.tema||"o conteúdo"} antes de avançar.`,
    fonte:dados.fonte||"Banco próprio",
    ativo:dados.ativo!==false
  };
}

/* Carrega somente documentos publicados. A cláusula ativo==true
   também é exigida pelas regras de segurança para visitantes. */
async function carregarQuestoesPublicadas() {
  if(!bancoFirebase)return;
  try {
    const consulta=await bancoFirebase.collection("questoes").where("ativo","==",true).get();
    if(!consulta.empty) {
      questoes=consulta.docs.map(doc=>normalizarQuestao(doc.data(),doc.id))
        .sort((a,b)=>a.materia.localeCompare(b.materia)||b.ano-a.ano||a.numero-b.numero);
      materiaAtual="Todas"; indiceQuestao=0; ordemAleatoria=[];
      atualizarCatalogos(); renderizarFiltros(); renderizarQuestao(); atualizarResumo(); renderizarGuias();
    }
  } catch(erro) {
    console.warn("Não foi possível ler o Firestore. O conteúdo demonstrativo continuará disponível.",erro);
  }
}

/* ---------- 12. PAINEL ADMINISTRATIVO ---------- */
const avisoFirebase=document.getElementById("firebase-aviso");
const painelAdmin=document.getElementById("admin-painel");
const loginAdmin=document.getElementById("admin-login");
const formQuestao=document.getElementById("form-questao");

/* Monta cinco campos; os quatro primeiros são obrigatórios
   para aceitar provas com quatro ou cinco alternativas. */
document.getElementById("campos-alternativas").innerHTML=["A","B","C","D","E"].map((letra,i)=>
  `<label class="alternativa-admin"><b>${letra}</b><input id="campo-opcao-${i}" ${i<4?"required":""} placeholder="Texto da alternativa ${letra}"></label>`
).join("");

function limparFormularioQuestao() {
  formQuestao.reset();
  document.getElementById("questao-id").value="";
  document.getElementById("titulo-form-questao").textContent="Nova questão";
  document.getElementById("campo-ano").value=new Date().getFullYear();
  document.getElementById("campo-ativo").checked=true;
  document.getElementById("form-mensagem").textContent="";
}

/* Lê todos os controles e transforma o formulário em documento Firestore. */
function dadosDoFormulario() {
  const opcoes=[0,1,2,3,4].map(i=>document.getElementById(`campo-opcao-${i}`).value.trim()).filter(Boolean);
  const resposta=Number(document.getElementById("campo-resposta").value);
  if(resposta>=opcoes.length)throw new Error("Preencha a alternativa marcada como correta.");
  return window.RotaClassificador.classificarQuestao({
    vestibular:document.getElementById("campo-vestibular").value.trim(),
    ano:Number(document.getElementById("campo-ano").value),
    numero:Number(document.getElementById("campo-numero").value),
    materia:document.getElementById("campo-materia").value.trim(),
    tema:document.getElementById("campo-tema").value.trim(),
    nivel:document.getElementById("campo-nivel").value,
    complexidade:Number(document.getElementById("campo-complexidade").value),
    pergunta:document.getElementById("campo-pergunta").value.trim(),
    opcoes,
    resposta,
    dica:document.getElementById("campo-dica").value.trim(),
    resolucao:document.getElementById("campo-resolucao").value.split("\n").map(l=>l.trim()).filter(Boolean),
    explicacao:document.getElementById("campo-explicacao").value.trim(),
    recomendacao:document.getElementById("campo-recomendacao").value.trim(),
    fonte:document.getElementById("campo-fonte").value.trim(),
    ativo:document.getElementById("campo-ativo").checked,
    atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()
  });
}

function slugMateria(nome) {
  return nome.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

/* Lista também rascunhos, pois esta função só é chamada depois
   que as regras confirmam que o usuário é administrador. */
async function listarQuestoesAdmin() {
  const area=document.getElementById("lista-questoes-admin");
  area.innerHTML='<p class="carregando">Carregando banco...</p>';
  try {
    const consulta=await bancoFirebase.collection("questoes").get();
    questoesAdmin=consulta.docs.map(doc=>normalizarQuestao(doc.data(),doc.id))
      .sort((a,b)=>b.ano-a.ano||a.materia.localeCompare(b.materia)||a.numero-b.numero);
    renderizarListaAdmin();
  } catch(erro) {
    area.innerHTML='<p class="mensagem-erro">Não foi possível carregar. Confira as regras do Firestore.</p>';
  }
}

function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g,caractere=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[caractere]));
}

function renderizarListaAdmin() {
  const busca=document.getElementById("busca-admin").value.trim().toLowerCase();
  const filtradas=questoesAdmin.filter(q=>!busca||`${q.materia} ${q.tema} ${q.vestibular} ${q.pergunta}`.toLowerCase().includes(busca));
  document.getElementById("total-admin").textContent=questoesAdmin.length;
  document.getElementById("lista-questoes-admin").innerHTML=filtradas.length?filtradas.map(q=>`
    <article class="item-admin ${q.ativo?"":"rascunho"}">
      <div><span class="tag">${escaparHTML(q.materia)}</span><span class="tag nivel">${escaparHTML(q.nivel)}</span><small>${escaparHTML(q.vestibular)} ${q.ano} · Q${q.numero}</small></div>
      <h3>${escaparHTML(q.tema)}</h3><p>${escaparHTML(q.pergunta)}</p>
      <div class="acoes-admin"><button class="botao-texto" data-editar="${q.id}">Editar</button><button class="botao-texto perigo" data-excluir="${q.id}">Excluir</button></div>
    </article>`).join(""):'<p class="carregando">Nenhuma questão encontrada.</p>';
}

function preencherFormulario(q) {
  document.getElementById("questao-id").value=q.id;
  document.getElementById("titulo-form-questao").textContent="Editar questão";
  ["vestibular","ano","numero","materia","tema","nivel","complexidade","pergunta","dica","explicacao","recomendacao","fonte"].forEach(campo=>{
    const elemento=document.getElementById(`campo-${campo}`);
    if(elemento)elemento.value=q[campo]??"";
  });
  [0,1,2,3,4].forEach(i=>document.getElementById(`campo-opcao-${i}`).value=q.opcoes[i]||"");
  document.getElementById("campo-resposta").value=String(q.resposta);
  document.getElementById("campo-resolucao").value=q.resolucao.join("\n");
  document.getElementById("campo-ativo").checked=q.ativo;
  formQuestao.scrollIntoView({behavior:"smooth",block:"start"});
}

formQuestao.addEventListener("submit",async evento=>{
  evento.preventDefault();
  const mensagem=document.getElementById("form-mensagem");
  const botao=formQuestao.querySelector("[type='submit']");
  botao.disabled=true; mensagem.textContent="Salvando...";
  try {
    const dados=dadosDoFormulario();
    const id=document.getElementById("questao-id").value;
    if(id)await bancoFirebase.collection("questoes").doc(id).set(dados,{merge:true});
    else await bancoFirebase.collection("questoes").add({...dados,criadoEm:firebase.firestore.FieldValue.serverTimestamp()});
    await bancoFirebase.collection("materias").doc(slugMateria(dados.materia)).set({nome:dados.materia,area:dados.area,temas:[dados.tema],ativo:true,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
    mensagem.textContent="Questão salva com sucesso.";
    limparFormularioQuestao(); await listarQuestoesAdmin(); await carregarQuestoesPublicadas();
  } catch(erro) {
    mensagem.textContent=erro.message||"Não foi possível salvar a questão.";
  } finally { botao.disabled=false; }
});

document.getElementById("lista-questoes-admin").addEventListener("click",async evento=>{
  const editar=evento.target.closest("[data-editar]");
  if(editar)preencherFormulario(questoesAdmin.find(q=>q.id===editar.dataset.editar));
  const excluir=evento.target.closest("[data-excluir]");
  if(excluir&&confirm("Excluir esta questão definitivamente do banco?")) {
    await bancoFirebase.collection("questoes").doc(excluir.dataset.excluir).delete();
    await listarQuestoesAdmin(); await carregarQuestoesPublicadas();
  }
});

document.getElementById("nova-questao").addEventListener("click",limparFormularioQuestao);
document.getElementById("busca-admin").addEventListener("input",renderizarListaAdmin);

/* Importação inicial usa IDs fixos, portanto clicar novamente atualiza
   os mesmos documentos em vez de criar cópias duplicadas. */
document.getElementById("importar-iniciais").addEventListener("click",async()=>{
  if(!confirm("Importar ou atualizar as 21 questões demonstrativas no Firestore?"))return;
  const botao=document.getElementById("importar-iniciais"); botao.disabled=true; botao.textContent="Importando...";
  try {
    const lote=bancoFirebase.batch();
    questoesIniciais.forEach(q=>{
      const completo=window.RotaClassificador.classificarQuestao({...q,complexidade:q.nivel==="Fácil"?2:q.nivel==="Difícil"?5:3,recomendacao:`Revise ${q.tema} no guia de ${q.materia} e resolva uma questão semelhante.`,ativo:true,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()});
      lote.set(bancoFirebase.collection("questoes").doc(`inicial-${q.id}`),completo,{merge:true});
      lote.set(bancoFirebase.collection("materias").doc(slugMateria(q.materia)),{nome:q.materia,ativo:true,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
    });
    await lote.commit(); await listarQuestoesAdmin(); await carregarQuestoesPublicadas();
  } catch(erro) { alert("Não foi possível importar: "+erro.message); }
  finally { botao.disabled=false; botao.textContent="Importar 21 questões iniciais"; }
});


/* ---------- IMPORTADOR JSON EM MASSA ----------
   Aceita os JSONs gerados para ENEM/Fuvest/Unicamp/Unesp.
   Também converte o campo "enunciado" para "pergunta", que é o
   formato consumido pelo site, e processa no máximo 400 documentos
   por lote para evitar ultrapassar o limite do Firestore. */
let listaJsonImportacao=[];
let listaJsonOriginal=[];
let nomeJsonAtual="";
const arquivoJson=document.getElementById("arquivo-json");
const btnCarregarCompleto=document.getElementById("carregar-json-completo");
const btnValidarJson=document.getElementById("validar-json");
const btnImportarJson=document.getElementById("importar-json");
const statusJson=document.getElementById("json-status");
const progressoJson=document.getElementById("json-progresso");
const logJson=document.getElementById("json-log");
const aplicarClassificacao=document.getElementById("aplicar-classificacao");
const sobrescreverClassificacao=document.getElementById("sobrescrever-classificacao");
const resumoCategorias=document.getElementById("json-categorias");

function registrarJson(mensagem){
  logJson.textContent += mensagem+"\n";
  logJson.scrollTop=logJson.scrollHeight;
}
function alternativasEsperadas(q){ return String(q.vestibular||"").toUpperCase()==="UNICAMP"?4:5; }
function normalizarQuestaoImportada(q){
  const esperado=alternativasEsperadas(q);
  let opcoes=Array.isArray(q.opcoes)?q.opcoes.map(v=>String(v).trim()).filter(Boolean):[];
  // Na extração de alguns PDFs o comando da questão entrou antes das alternativas.
  // Quando há itens extras, as alternativas oficiais estão no final da lista.
  if(opcoes.length>esperado) opcoes=opcoes.slice(-esperado);
  let resposta=q.resposta;
  const letra=String(q.respostaLetra||"").toUpperCase();
  if("ABCDE".includes(letra)) resposta="ABCDE".indexOf(letra);
  if(q.anulada===true) resposta=null;
  const pergunta=String(q.pergunta||q.enunciado||"").trim();
  let normalizada={
    ...q,
    id:String(q.id||"").trim(),
    vestibular:String(q.vestibular||"").trim(),
    ano:Number(q.ano), numero:Number(q.numero),
    materia:String(q.materia||"Interdisciplinar").trim(),
    tema:String(q.tema||"A classificar").trim()||"A classificar",
    nivel:String(q.nivel||"Médio").trim()||"Médio",
    complexidade:Number(q.complexidade)||3,
    pergunta, opcoes, resposta,
    dica:String(q.dica||"Releia o comando e elimine as alternativas incompatíveis.").trim(),
    resolucao:Array.isArray(q.resolucao)?q.resolucao:[],
    explicacao:String(q.explicacao||"").trim(),
    recomendacao:String(q.recomendacao||"").trim(),
    ativo:q.ativo!==false
  };
  /* O classificador preserva campos específicos por padrão. Marque a opção
     de sobrescrita no painel apenas quando quiser recalcular tudo. */
  if(aplicarClassificacao.checked&&window.RotaClassificador){
    normalizada=window.RotaClassificador.classificarQuestao(normalizada,{sobrescrever:sobrescreverClassificacao.checked});
  }
  if(!normalizada.recomendacao)normalizada.recomendacao=`Revise ${normalizada.tema||normalizada.materia||"o conteúdo"} e resolva uma questão semelhante.`;
  return normalizada;
}
function errosQuestaoImportada(q){
  const erros=[]; const esperado=alternativasEsperadas(q);
  if(!q.id)erros.push("id");
  if(!q.vestibular)erros.push("vestibular");
  if(!Number.isInteger(q.ano))erros.push("ano");
  if(!Number.isInteger(q.numero))erros.push("numero");
  if(!q.pergunta)erros.push("pergunta/enunciado");
  if(!Array.isArray(q.opcoes)||q.opcoes.length!==esperado)erros.push(`opcoes (${q.opcoes?.length||0}/${esperado})`);
  if(q.anulada!==true && (!Number.isInteger(q.resposta)||q.resposta<0||q.resposta>=esperado))erros.push("resposta");
  return erros;
}
function mostrarResumoCategorias(){
  if(!listaJsonImportacao.length||!window.RotaClassificador){resumoCategorias.hidden=true;return;}
  const resumo=window.RotaClassificador.resumir(listaJsonImportacao);
  const linhas=Object.entries(resumo.materias).sort((a,b)=>b[1]-a[1]);
  resumoCategorias.innerHTML=`<strong>Prévia por categoria</strong><div class="grade-categorias">${linhas.map(([materia,total])=>`<span><b>${materia}</b><small>${total} questão${total===1?"":"ões"}</small></span>`).join("")}</div><small>Confiança automática: alta ${resumo.confiancas.alta||0}, média ${resumo.confiancas.média||0}, baixa ${resumo.confiancas.baixa||0}; preservadas ${resumo.confiancas.original||0}.</small>`;
  resumoCategorias.hidden=false;
}
function prepararListaJson(dados,nome){
  const bruta=Array.isArray(dados)?dados:(Array.isArray(dados.questoes)?dados.questoes:[]);
  listaJsonOriginal=bruta;
  nomeJsonAtual=nome;
  listaJsonImportacao=listaJsonOriginal.map(normalizarQuestaoImportada);
  statusJson.textContent=`${nome}: ${listaJsonImportacao.length} registros carregados.`;
  btnValidarJson.disabled=!listaJsonImportacao.length;
  btnImportarJson.disabled=!listaJsonImportacao.length;
  registrarJson(`Arquivo carregado: ${nome} (${listaJsonImportacao.length} registros).`);
  mostrarResumoCategorias();
}
/* Alterar uma opção recalcula a prévia sem precisar escolher o arquivo de novo. */
[aplicarClassificacao,sobrescreverClassificacao].forEach(controle=>controle.addEventListener("change",()=>{
  if(listaJsonOriginal.length)prepararListaJson(listaJsonOriginal,nomeJsonAtual);
}));
arquivoJson.addEventListener("change",async evento=>{
  const arquivo=evento.target.files[0]; if(!arquivo)return;
  try{ prepararListaJson(JSON.parse(await arquivo.text()),arquivo.name); }
  catch(erro){ listaJsonImportacao=[]; btnValidarJson.disabled=true; btnImportarJson.disabled=true; statusJson.textContent="JSON inválido."; registrarJson("ERRO: "+erro.message); }
});
btnCarregarCompleto.addEventListener("click",async()=>{
  btnCarregarCompleto.disabled=true; statusJson.textContent="Carregando banco completo...";
  try{
    const resposta=await fetch("banco-questoes/banco-questoes-completo.json",{cache:"no-store"});
    if(!resposta.ok)throw new Error(`HTTP ${resposta.status}`);
    prepararListaJson(await resposta.json(),"banco-questoes-completo.json");
  }catch(erro){ registrarJson("ERRO ao carregar banco completo: "+erro.message); statusJson.textContent="Não foi possível carregar o JSON. Publique a pasta banco-questoes junto com o site."; }
  finally{btnCarregarCompleto.disabled=false;}
});
btnValidarJson.addEventListener("click",()=>{
  let validas=0,invalidas=0; const exemplos=[];
  listaJsonImportacao.forEach(q=>{const erros=errosQuestaoImportada(q); if(erros.length){invalidas++;if(exemplos.length<15)exemplos.push(`${q.id||"(sem id)"}: ${erros.join(", ")}`);}else validas++;});
  statusJson.textContent=`Válidas: ${validas} | Inválidas: ${invalidas} | Total: ${listaJsonImportacao.length}`;
  registrarJson(`Validação: ${validas} válidas; ${invalidas} inválidas.`);
  if(exemplos.length)registrarJson("Exemplos que serão ignorados:\n"+exemplos.join("\n"));
});
btnImportarJson.addEventListener("click",async()=>{
  if(!bancoFirebase)return registrarJson("Firebase não está conectado.");
  const usuario=autenticacaoFirebase.currentUser; if(!usuario)return registrarJson("Entre como administrador antes de importar.");
  const permissao=await bancoFirebase.collection("admins").doc(usuario.uid).get();
  if(!permissao.exists||permissao.data().ativo!==true)return registrarJson("Usuário sem permissão em admins/{UID} com ativo=true.");
  const validas=listaJsonImportacao.filter(q=>errosQuestaoImportada(q).length===0);
  if(!validas.length)return registrarJson("Nenhuma questão válida para importar.");
  if(!confirm(`Importar/atualizar ${validas.length} questões no Firestore?`))return;
  btnImportarJson.disabled=true; progressoJson.value=0;
  let feitas=0;
  try{
    for(let i=0;i<validas.length;i+=400){
      const grupo=validas.slice(i,i+400); const lote=bancoFirebase.batch();
      grupo.forEach(q=>lote.set(bancoFirebase.collection("questoes").doc(q.id),{...q,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},{merge:true}));
      await lote.commit(); feitas+=grupo.length; progressoJson.value=Math.round(feitas/validas.length*100); registrarJson(`Lote concluído: ${feitas}/${validas.length}`);
    }
    /* Cria também o catálogo de matérias. Assim, toda categoria nova passa
       a existir no Firestore sem cadastro manual separado. */
    const catalogo=new Map();
    validas.forEach(q=>{
      if(!catalogo.has(q.materia))catalogo.set(q.materia,{area:q.area,temas:new Set()});
      if(q.tema)catalogo.get(q.materia).temas.add(q.tema);
    });
    const loteMaterias=bancoFirebase.batch();
    catalogo.forEach((dados,materia)=>loteMaterias.set(
      bancoFirebase.collection("materias").doc(slugMateria(materia)),
      {nome:materia,area:dados.area,temas:[...dados.temas].sort(),ativo:true,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},
      {merge:true}
    ));
    await loteMaterias.commit();
    registrarJson(`Catálogo atualizado: ${catalogo.size} matérias.`);
    statusJson.textContent=`Importação concluída: ${feitas} questões.`; registrarJson("IMPORTAÇÃO CONCLUÍDA.");
    await listarQuestoesAdmin(); await carregarQuestoesPublicadas();
  }catch(erro){registrarJson("ERRO na importação: "+(erro.message||erro)); statusJson.textContent="Falha na importação. Veja o log.";}
  finally{btnImportarJson.disabled=false;}
});

/* Login Google opcional, compatível com o mesmo admins/{UID}. */
document.getElementById("login-google").addEventListener("click",async()=>{
  document.getElementById("login-erro").textContent="";
  try{await autenticacaoFirebase.signInWithPopup(new firebase.auth.GoogleAuthProvider());}
  catch(falha){document.getElementById("login-erro").textContent="Não foi possível entrar com Google: "+(falha.message||falha);}
});

/* Login e verificação adicional do documento admins/{UID}. */
document.getElementById("form-login").addEventListener("submit",async evento=>{
  evento.preventDefault();
  const erro=document.getElementById("login-erro"); erro.textContent="";
  try {
    await autenticacaoFirebase.signInWithEmailAndPassword(document.getElementById("login-email").value,document.getElementById("login-senha").value);
  } catch(falha) { erro.textContent="Acesso não realizado. Confira e-mail, senha e configuração do Firebase."; }
});
document.getElementById("sair-admin").addEventListener("click",()=>autenticacaoFirebase.signOut());

async function configurarAdministracao() {
  if(!window.ROTA_FIREBASE_ATIVO) {
    avisoFirebase.innerHTML='<strong>Firebase ainda não configurado.</strong><p>O site está usando as questões demonstrativas. Siga o <a href="configuracao-firebase.html">passo a passo de configuração</a> para ativar o banco e o painel.</p>';
    loginAdmin.querySelectorAll("input,button").forEach(campo=>campo.disabled=true);
    return;
  }
  avisoFirebase.innerHTML='<strong>Firebase conectado.</strong><p>Os estudantes veem as questões publicadas; somente administradores autorizados podem alterar o banco.</p>';
  autenticacaoFirebase.onAuthStateChanged(async usuario=>{
    if(!usuario) { loginAdmin.hidden=false; painelAdmin.hidden=true; return; }
    try {
      const permissao=await bancoFirebase.collection("admins").doc(usuario.uid).get();
      if(!permissao.exists||permissao.data().ativo!==true) {
        document.getElementById("login-erro").textContent="Este usuário não está autorizado na coleção admins.";
        await autenticacaoFirebase.signOut(); return;
      }
      loginAdmin.hidden=true; painelAdmin.hidden=false;
      document.getElementById("admin-usuario").textContent=usuario.email;
      await listarQuestoesAdmin();
    } catch(erro) {
      document.getElementById("login-erro").textContent="Não foi possível verificar a permissão administrativa.";
      await autenticacaoFirebase.signOut();
    }
  });
  await carregarQuestoesPublicadas();
}

/* ---------- 13. INICIALIZAÇÃO ----------
   Estas chamadas desenham as áreas dinâmicas quando a página abre. */
renderizarGuias();
atualizarCatalogos();
renderizarFiltros();
renderizarQuestao();
atualizarResumo();
limparFormularioQuestao();
configurarAdministracao();
