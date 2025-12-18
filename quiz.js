const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

const answers = {};
let telaAtual = 0;
let enviando = false;
let pontuacaoTotal = 0;

// Pontuação para perguntas de experiência
const pontuacaoRespostas = {
    "Nunca fiz e não tenho vontade": 1,
    "Nunca fiz mas tenho curiosidade": 2,
    "Já fiz e não gostei": 2,
    "Já fiz e repetiria com prazer": 4,
    "Não me sinto confortável com encenações ou fetiches de exposição.": 1,
    "A ideia de agir como uma profissional e seduzi-lo me desperta muita curiosidade.": 2,
    "Tentamos o personagem, mas a cena pareceu forçada e não nos conectou.": 2,
    "Encarnar essa fantasia e ser o objeto de desejo dele (ou de outros) é meu ápice.": 4,
    "Prefiro ser conduzida ou manter a igualdade no sexo.": 1,
    "A ideia de ter ele totalmente sob o meu controle me instiga.": 2,
    "Tentei assumir o comando, mas achei a dinâmica cansativa.": 2,
    "Eu nasci para dominar e amo ver a entrega total dele a mim.": 4,
    "Acho que quebraria o clima.": 1,
    "A ideia de vê-lo como meu \"capacho\" me dá muito tesão": 2,
    "Tentamos, mas nos sentimos ridículos e sem tesão.": 2,
    "Pisar no orgulho dele é o meu combustível favorito.": 3,
    "É o ápice da minha dominação e da entrega dele.": 4,
    "Fora de questão: prefiro um sexo livre de acessórios e restrições.": 1,
    "Instigante: sinto um frio na barriga com a ideia de ser dominada.": 2,
    "Excitante: sinto um frio na barriga com a ideia em dominar": 2,
    "Frustrante: a teoria foi muito melhor do que a prática real.": 2,
    "Animalesco: nossa conexão atinge o ápice através desse jogo bruto.": 4,
    "Aterrorizante: a dor real aniquila qualquer desejo em mim.": 1,
    "Obscuro: a ideia de testar meus limites físicos me fascina.": 2,
    "Traumático: a experiência ultrapassou o prazer e foi negativa.": 1,
    "Transcendental: a dor é o portal para o meu prazer mais profundo.": 4,
    "Não tenho interesse em inverter os papéis tradicionais.": 1,
    "Sinto muita sede de explorar esse lado ativo com ele.": 2,
    "A logística e a sensação não foram o que eu esperava.": 2,
    "Viciante, amamos a liberdade dessa troca de posições": 4,
    "Inviável: sinto vergonha ou invasão; minha intimidade é só para ele.": 1,
    "Provocante: adoro ser desejada por outros, sabendo que ele sente orgulho e tesão nisso.": 3,
    "Inseguro: já tentei me expor, mas o ciúme dele ou o meu desconforto estragaram o clima.": 2,
    "Poder Absoluto: ser o \"troféu\" cobiçado e ver a excitação dele com o desejo alheio é meu ápice.": 4,
    "Prefiro o sexo tradicional, olho no olho e pele na pele.": 1,
    "A ideia de ser observada por ele sem poder tocá-lo de imediato me excita.": 2,
    "Tentamos esse jogo de distância, mas a conexão esfriou em vez de esquentar.": 2,
    "O jogo de ser a \"presa\" sob o olhar atento dele é o que mais nos incendeia.": 4,
    "Inconcebível: a falta de vínculo me trava totalmente.": 1,
    "Instigante: o mistério de um estranho me fascina.": 2,
    "Vazio: tentei, mas a falta de conexão esfriou tudo.": 2,
    "Libertador: o anonimato é o que mais me incendeia.": 4,
    "Fora de questão: meu desejo exige exclusividade total entre nós dois.": 1,
    "Pura adrenalina: ser o centro das atenções de dois homens seria o meu ápice.": 3,
    "Página virada: a experiência de dividir meu corpo com dois trouxe desconforto.": 2,
    "Nosso combustível: nada nos incendeia mais do que ele me vendo ser possuída por outro.": 4,
    "Fora de questão: meu desejo exige exclusividade total dele.": 1,
    "Pura adrenalina: ver ele obedecer meus comandos com outra seria um ápice.": 3,
    "Página virada: ver a cena ao vivo trouxe sentimentos que preferi evitar.": 2,
    "Nada me dá mais poder do que orquestrar o prazer dele.": 4,
    "Jamais: a ideia de ver meu homem com outra mulher me repele.": 1,
    "Tentador: um convite desses me deixaria muito balançada.": 2,
    "Frustrante: a experiência real ficou longe do que imaginei.": 2,
    "Essencial: adoramos o ambiente e a adrenalina da troca.": 4,
    "Fora de cogitação: abomino a ideia de sexo em grupo.": 1,
    "Tentador: a adrenalina da bagunça organizada me atrai.": 2,
    "Decepcionante: na prática, não foi tão prazeroso quanto na fantasia.": 2,
    "Nosso ápice: adoramos a liberdade sem regras das festas tradicionais.": 4,
    "Meu desejo é alimentado exclusivamente pela nossa exclusividade.": 1,
    "O aval dele é o gatilho que faltava para minha ousadia.": 2,
    "Já me imaginei algumas vezes vivendo isso.": 3,
    "Ser uma Hotwife com a aprovação dele seria meu ápice.": 4,
    "Acho que não": 1,
    "Seria o verdadeiro Grand Finale": 3,
    "Já tentamos e não fluiu": 2,
    "Faz parte de nosso ritual secreto": 4,
    "Não curtiria": 1,
    "Prefiro manter nossa privacidade visual.": 1,
    "Um sonho ousado: ver o rosto dele enquanto me perco com outro seria único.": 3,
    "Página virada: a experiência visual ao vivo trouxe mais peso do que prazer.": 2,
    "É o nosso ápice: ele é o meu espectador favorito no meu momento mais sórdido.": 4
};

const telas = [
    // TELA 0 - Boas-vindas
    { tipo: "boasvindas" },
    
    // 1-5: MENU SUSPENSO
    { tipo: "pergunta", texto: "Qual é o seu signo?", campo: "q1_signo", menu: ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"] },
    { tipo: "pergunta", texto: "Qual sua faixa etária?", campo: "q2_idade", menu: ["18-24","25-34","35-44","45-54","55-64","65+"] },
    { tipo: "pergunta", texto: "Qual é a sua orientação sexual?", campo: "q3_orientacao", menu: ["Heterossexual","Bissexual","Homossexual","Liberal"] },
    { tipo: "pergunta", texto: "Você está:", campo: "q4_status", menu: ["Solteira","Namorando","Noiva","Casada","União Estável","Relacionamento Aberto","Divorciada","Viúva","É complicado"] },
    { tipo: "pergunta", texto: "Quantos parceiros sexuais você já teve?", campo: "q5_parceiros", menu: ["0-1","2-5","6-10","11-20","21-30","31-50","51+"] },
    
    // 6: ESCOLHA ÚNICA (radio)
    { tipo: "pergunta", texto: "Quem prefere que tome a iniciativa na hora H?", campo: "q6_iniciativa", radio: ["Eu","Outra pessoa","Depende do momento"] },
    
    // 7: MÚLTIPLA ESCOLHA (checkbox)
    { tipo: "pergunta", texto: "Seu gatilho principal é:", campo: "q7_gatilho", checkbox: [
        "Sensorial: (Toque, temperatura, cheiro)",
        "Visual: (Estética, roupas, espelhos)",
        "Verbal: (Dirty talk, gemidos, histórias)",
        "Psicológico: (Poder, submissão, tabu)"
    ]},
    
    // 8: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Posição preferida?", campo: "q8_posicao", checkbox: ["Cavalgada","Cavalgada de costas","Papai Mamãe","De quatro","De pé","69","De lado"] },
    
    // 9: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Qual o tamanho ideal para você?", campo: "q9_tamanho", checkbox: ["12 a 15cm","15 a 18cm","19 a 21cm","22cm ou mais"] },
    
    // 10: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Quantos orgasmos você tem na semana?", campo: "q10_orgasmos", radio: ["Nenhum","1","2–3","4–6","6-8","+9"] },
    
    // 11: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Qual o seu gatilho principal para o orgasmo?", campo: "q11_gatilhoOrgasmo", checkbox: ["Estímulo oral","Estimulação clitóris","Estimulação anal","Penetração","Brinquedos","Vários ao mesmo tempo"] },
    
    // 12: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Quando a imaginação bate sozinha, a que você recorre?", campo: "q12_sozinha", checkbox: ["Contos eróticos","Vídeo pornô","Vibrador","Brinquedos variados","Banho frio"] },
    
    // 13: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Experiências com pessoas do mesmo sexo?", campo: "q13_mesmoSexo", checkbox: ["Apenas com homens","Sinto uma ponta de curiosidade","Já fiquei, mas prefiro homens","Gosto e me envolvo com as duas"] },
    
    // 14: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Experiências com pessoas trans?", campo: "q14_trans", radio: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    
    // 15: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Sobre o Jogo de Personagens (Roleplay):", descricao: "Interpretar papéis em um jogo de sedução", campo: "q15_roleplay", checkbox: [
        "A \"Profissional\": Garota de programa e cliente (foco em sedução e poder)",
        "A \"Autoridade\": Professora e aluno ou Chefe e funcionário (foco em hierarquia)",
        "O \"Cuidado\": Enfermeira/Médico e paciente (foco em vulnerabilidade)",
        "Os \"Estranhos\": Duas pessoas que se conhecem em um bar (foco no mistério)"
    ]},
    
    // 16: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Sobre encenar fetiches como ser uma \"garota de programa\" sendo observada ou contratada por ele:", campo: "q16_fetiche", radio: [
        "Não me sinto confortável com encenações ou fetiches de exposição.",
        "A ideia de agir como uma profissional e seduzi-lo me desperta muita curiosidade.",
        "Tentamos o personagem, mas a cena pareceu forçada e não nos conectou.",
        "Encarnar essa fantasia e ser o objeto de desejo dele (ou de outros) é meu ápice."
    ], pontuavel: true },
    
    // 17: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "No jogo do prazer, como você se posiciona?", campo: "q17_posicionamento", radio: [
        "Totalmente Passiva: (Prefiro ser guiada e me entregar)",
        "Totalmente Ativa: (Gosto de ter o controle e ditar o ritmo)",
        "Versátil (Switch): (Gosto de alternar entre mandar e obedecer)",
        "Protagonista: (Gosto de ser o centro das atenções/exibida)",
        "Espectadora: (Meu maior tesão é observar a cena acontecer)"
    ]},
    
    // 18: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Prática de Femdom (Dominação Feminina):", campo: "q18_femdom", radio: [
        "Prefiro ser conduzida ou manter a igualdade no sexo.",
        "A ideia de ter ele totalmente sob o meu controle me instiga.",
        "Tentei assumir o comando, mas achei a dinâmica cansativa.",
        "Eu nasci para dominar e amo ver a entrega total dele a mim."
    ], pontuavel: true },
    
    // 19: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Humilhação erótica do parceiro:", descricao: "Humilhar, provocar, maltratar, pisar, xingar o parceiro, chamando de \"escravo\", \"corninho\", \"manso\", \"capacho\", como parte do jogo de poder.", campo: "q19_humilhacao", radio: [
        "Acho que quebraria o clima.",
        "A ideia de vê-lo como meu \"capacho\" me dá muito tesão",
        "Tentamos, mas nos sentimos ridículos e sem tesão.",
        "Pisar no orgulho dele é o meu combustível favorito.",
        "É o ápice da minha dominação e da entrega dele."
    ], pontuavel: true },
    
    // 20: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Prática de Sadomasoquismo Moderado", descricao: "Ser imobilizada ou imobilizar o outro com algemas, cordas, amarras, uso de chicotes, castigar ou ser castigada.", campo: "q20_sadoModerado", radio: [
        "Fora de questão: prefiro um sexo livre de acessórios e restrições.",
        "Instigante: sinto um frio na barriga com a ideia de ser dominada.",
        "Excitante: sinto um frio na barriga com a ideia em dominar",
        "Frustrante: a teoria foi muito melhor do que a prática real.",
        "Animalesco: nossa conexão atinge o ápice através desse jogo bruto."
    ], pontuavel: true },
    
    // 21: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Práticas de Sadomasoquismo (BDSM de alta intensidade):", campo: "q21_bdsmIntenso", radio: [
        "Aterrorizante: a dor real aniquila qualquer desejo em mim.",
        "Obscuro: a ideia de testar meus limites físicos me fascina.",
        "Traumático: a experiência ultrapassou o prazer e foi negativa.",
        "Transcendental: a dor é o portal para o meu prazer mais profundo."
    ], pontuavel: true },
    
    // 22: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Prática de Pegging:", descricao: "Penetração com uso de acessórios no parceiro.", campo: "q22_pegging", radio: [
        "Não tenho interesse em inverter os papéis tradicionais.",
        "Sinto muita sede de explorar esse lado ativo com ele.",
        "A logística e a sensação não foram o que eu esperava.",
        "Viciante, amamos a liberdade dessa troca de posições"
    ], pontuavel: true },
    
    // 23: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Rompendo os tabus modernos, a \"chuva dourada\" para você seria:", campo: "q23_golden", checkbox: [
        "Me dá mais nojo do que tesão",
        "Sinto curiosidade, mas ainda sem saber se ia rolar na prática",
        "Vejo como parte de humilhação erótica",
        "Vejo como um ato de dominação/submissão bem intenso",
        "Enxergo como uma forma extrema de intimidade e confiança",
        "Me excita mais a ideia do que a prática em si"
    ]},
    
    // 24: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Exibicionismo e o \"Olhar do Outro\":", descricao: "Sobre o prazer de ser observada por estranhos em público (com um traje provocante) enquanto seu parceiro assiste à reação das pessoas.", campo: "q24_exibicionismo", radio: [
        "Inviável: sinto vergonha ou invasão; minha intimidade é só para ele.",
        "Provocante: adoro ser desejada por outros, sabendo que ele sente orgulho e tesão nisso.",
        "Inseguro: já tentei me expor, mas o ciúme dele ou o meu desconforto estragaram o clima.",
        "Poder Absoluto: ser o \"troféu\" cobiçado e ver a excitação dele com o desejo alheio é meu ápice."
    ], pontuavel: true },
    
    // 25: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Voyeurismo e Distância (O Jogo do Observador):", descricao: "Sobre o fetiche de ser vigiada por ele à distância, ou ele ver você em situações de \"risco planejado\" (como sair sozinha ou ser abordada).", campo: "q25_voyeurismo", radio: [
        "Prefiro o sexo tradicional, olho no olho e pele na pele.",
        "A ideia de ser observada por ele sem poder tocá-lo de imediato me excita.",
        "Tentamos esse jogo de distância, mas a conexão esfriou em vez de esquentar.",
        "O jogo de ser a \"presa\" sob o olhar atento dele é o que mais nos incendeia."
    ], pontuavel: true },
    
    // 26: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Sexo com total desconhecido(a)?", campo: "q26_desconhecido", radio: [
        "Inconcebível: a falta de vínculo me trava totalmente.",
        "Instigante: o mistério de um estranho me fascina.",
        "Vazio: tentei, mas a falta de conexão esfriou tudo.",
        "Libertador: o anonimato é o que mais me incendeia."
    ], pontuavel: true },
    
    // 27: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Toparia um Menage Masculino (2H x 1M)?", campo: "q27_menageMasc", radio: [
        "Fora de questão: meu desejo exige exclusividade total entre nós dois.",
        "Pura adrenalina: ser o centro das atenções de dois homens seria o meu ápice.",
        "Página virada: a experiência de dividir meu corpo com dois trouxe desconforto.",
        "Nosso combustível: nada nos incendeia mais do que ele me vendo ser possuída por outro."
    ], pontuavel: true },
    
    // 28: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "No cenário do Menage Masculino, qual dessas cenas mais te chama atenção?", campo: "q28_cenaMenageMasc", radio: [
        "Eles focados em você: os dois disputando cada centímetro do seu corpo.",
        "O parceiro no comando: ele ditando como o outro homem deve te dar prazer.",
        "Interação total: você entre os dois, explorando ambos ao mesmo tempo.",
        "Foco no parceiro: você e o convidado focados em dar prazer ao seu homem.",
        "Submissão e entrega: você totalmente entregue aos desejos e ritmos dos dois."
    ]},
    
    // 29: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Toparia um Menage Feminino (2M x 1H)?", campo: "q29_menageFem", radio: [
        "Fora de questão: meu desejo exige exclusividade total dele.",
        "Pura adrenalina: ver ele obedecer meus comandos com outra seria um ápice.",
        "Página virada: ver a cena ao vivo trouxe sentimentos que preferi evitar.",
        "Nada me dá mais poder do que orquestrar o prazer dele."
    ], pontuavel: true },
    
    // 30: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "No cenário do Menage Feminino, qual dessas cenas mais te chama atenção?", campo: "q30_cenaMenageFem", checkbox: [
        "Beijar e tocar a mulher enquanto o parceiro assiste",
        "As duas com ele ao mesmo tempo",
        "Você e ela se divertindo mais entre vocês do que com ele",
        "Ele focado em te estimular enquanto você brinca com ela",
        "Revezar: hora você com ele, hora ela com ele, hora só vocês duas"
    ]},
    
    // 31: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "E o ciúmes nessa história com outra mulher?", campo: "q31_ciumes", radio: [
        "Eu travaria, não consigo nem imaginar dividir ele",
        "Teria ciúmes, mas acho que a excitação falaria mais alto",
        "Se tiver regra clara, confiança e combinado, eu relaxo",
        "Me excita justamente ver ele com outra na minha frente",
        "Eu seria mais ciumenta com ela do que com ele"
    ]},
    
    // 32: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Se convidada, como você reage à ideia de Swing?", campo: "q32_swing", radio: [
        "Jamais: a ideia de ver meu homem com outra mulher me repele.",
        "Tentador: um convite desses me deixaria muito balançada.",
        "Frustrante: a experiência real ficou longe do que imaginei.",
        "Essencial: adoramos o ambiente e a adrenalina da troca."
    ], pontuavel: true },
    
    // 33: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Experiência com sexo grupal (+4 pessoas)?", campo: "q33_grupal", radio: [
        "Fora de cogitação: abomino a ideia de sexo em grupo.",
        "Tentador: a adrenalina da bagunça organizada me atrai.",
        "Decepcionante: na prática, não foi tão prazeroso quanto na fantasia.",
        "Nosso ápice: adoramos a liberdade sem regras das festas tradicionais."
    ], pontuavel: true },
    
    // 34: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Já se imaginou ficando com outro, sabendo que ele aprova?", campo: "q34_hotwifeIdeia", radio: [
        "Meu desejo é alimentado exclusivamente pela nossa exclusividade.",
        "O aval dele é o gatilho que faltava para minha ousadia.",
        "Já me imaginei algumas vezes vivendo isso.",
        "Ser uma Hotwife com a aprovação dele seria meu ápice."
    ], pontuavel: true },
    
    // 35: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "E se, após essa aventura, o seu retorno para casa fosse marcado por uma confissão de cada detalhe sórdido para ele para tirar o fôlego de tesão?", campo: "q35_confissao", radio: [
        "Acho que não",
        "Seria o verdadeiro Grand Finale",
        "Já tentamos e não fluiu",
        "Faz parte de nosso ritual secreto"
    ], pontuavel: true },
    
    // 36: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "E agora, se além dele só ficar sabendo, ele visse você perder totalmente o controle e se entregar ao outro com uma intensidade que ele nunca viu?", campo: "q36_eleAssistindo", radio: [
        "Não curtiria",
        "Prefiro manter nossa privacidade visual.",
        "Um sonho ousado: ver o rosto dele enquanto me perco com outro seria único.",
        "Página virada: a experiência visual ao vivo trouxe mais peso do que prazer.",
        "É o nosso ápice: ele é o meu espectador favorito no meu momento mais sórdido."
    ], pontuavel: true }
];

// RESULTADOS
const resultados = {
    1: {
        titulo: "O Iniciante",
        subtitulo: "Conexão Sensorial / Descoberta",
        descricao: "O foco é sair do \"automático\" e despertar a pele. Não é sobre performance, é sobre presença. O tesão vem da quebra da rotina e da exploração lenta de toques que foram esquecidos no dia a dia.",
        brinquedos: [
            { nome: "Vibrador bullet", desc: "Pequeno e direto, para descobrir pontos externos sem intimidar." },
            { nome: "Óleo de massagem térmico", desc: "Transforma o toque em experiência de temperatura e cheiro." },
            { nome: "Lubrificante premium", desc: "Remove qualquer atrito mecânico, deixando só a sensação." },
            { nome: "Anel peniano vibratório", desc: "Introduz a vibração compartilhada durante a penetração." },
            { nome: "Venda de seda", desc: "Elimina a visão para obrigar o corpo a sentir o triplo." }
        ],
        roupas: [
            { nome: "Camisola de cetim/seda", desc: "O toque do tecido na pele já inicia a sensibilidade antes do ato." },
            { nome: "Lingerie de renda confortável", desc: "Bonita para ele, mas confortável para você se sentir bem." },
            { nome: "Meia 7/8 simples", desc: "Um clássico visual que molda a perna sem apertar." },
            { nome: "Camisa social dele", desc: "Vestir apenas isso cria um imaginário de intimidade e posse leve." },
            { nome: "Máscara de dormir", desc: "Simples, funcional e cria o mistério imediato." }
        ],
        fantasias: [
            { nome: "O Jogo do Silêncio", desc: "Proibido falar. Vocês se comunicam apenas pelo toque e pela respiração, forçando uma atenção total à linguagem corporal do outro." },
            { nome: "Massagem Cega", desc: "Você vendada, ele usa diferentes texturas (pena, gelo, óleo) no seu corpo. Você não sabe o que vem, apenas sente." },
            { nome: "Primeiro Encontro", desc: "Vocês fingem que não se conhecem, se encontram na sala e conversam como estranhos tentando se seduzir pela primeira vez." },
            { nome: "Espelho, Espelho", desc: "Transar na frente do espelho, mas o foco é você se olhar sendo tocada, validando o seu próprio corpo." },
            { nome: "Slow Motion", desc: "Tudo deve ser feito em câmera lenta. O beijo, o toque, a penetração. A proibição da velocidade aumenta a urgência interna." }
        ]
    },
    2: {
        titulo: "O Explorador",
        subtitulo: "Aprofundamento / Brinquedos e Tecnologia",
        descricao: "A curiosidade assume o controle. O foco é ampliar o orgasmo usando tecnologia e novos estímulos. O tesão vem da novidade e de descobrir que o corpo pode sentir coisas que a \"biologia sozinha\" não entrega.",
        brinquedos: [
            { nome: "Sugador de clitóris", desc: "Foco total na intensidade e rapidez do orgasmo feminino." },
            { nome: "Vibrador remote (ovo)", desc: "Introduz a brincadeira de controle à distância (dentro de casa)." },
            { nome: "Plug anal iniciante", desc: "Quebra o tabu da \"porta dos fundos\" e da sensação de preenchimento." },
            { nome: "Vibrador Wand (Varinha)", desc: "Potência pura para massagem muscular que vira erótica." },
            { nome: "Algemas de pelúcia/velcro", desc: "Restrição simbólica, fácil de tirar, apenas para a sensação de \"preso\"." }
        ],
        roupas: [
            { nome: "Body de renda cavado", desc: "Peça única que valoriza as curvas e facilita o acesso." },
            { nome: "Corselet leve", desc: "Modela a cintura e traz uma estética visual mais elaborada." },
            { nome: "Gargantilha delicada", desc: "Um acessório que começa a marcar o pescoço como zona erógena." },
            { nome: "Meia arrastão", desc: "Textura mais agressiva e visualmente estimulante." },
            { nome: "Saia colegial/temática", desc: "Introdução leve ao roleplay visual sem ser uma fantasia completa." }
        ],
        fantasias: [
            { nome: "O Controle é Seu", desc: "Ele usa o vibrador em você, controlando quando você goza e em qual velocidade, tirando a responsabilidade de você." },
            { nome: "Lugar Proibido (em casa)", desc: "Transar na cozinha, na lavanderia ou na varanda (escondidos). O risco é zero, mas a quebra da regra \"quarto\" excita." },
            { nome: "Voyeurismo Digital", desc: "Vocês filmam uma parte do ato (sem rosto) apenas para assistirem juntos logo depois e apagarem. O tesão é se ver \"de fora\"." },
            { nome: "A Boneca", desc: "Você fica passiva, ele te move, te veste ou te despe como quer. O prazer está na passividade total." },
            { nome: "Strip-tease Privado", desc: "Você coloca uma música e dança para ele. Não precisa ser profissional, o foco é ele te desejar enquanto não pode te tocar." }
        ]
    },
    3: {
        titulo: "O Ousado",
        subtitulo: "Limites / Poder e Dor Leve",
        descricao: "Entrada no mundo do poder e controle. O tesão vem da hierarquia: alguém manda, alguém obedece. Envolve confiança para testar dor leve (spanking) e restrições que começam a ser psicológicas, não só físicas.",
        brinquedos: [
            { nome: "Paddle ou Chibata de couro", desc: "Para introduzir o impacto e a marca na pele (bumbum)." },
            { nome: "Algemas de metal ou couro", desc: "Restrição real, onde você não solta sozinha." },
            { nome: "Mordaça (Gag) ball", desc: "Silencia a voz, forçando a submissão e o foco na sensação física." },
            { nome: "Venda blackout total", desc: "Bloqueio visual completo para aumentar a vulnerabilidade." },
            { nome: "Grampos de mamilo", desc: "Dor pontual que se transforma em prazer intenso." }
        ],
        roupas: [
            { nome: "Conjunto de Vinil/Látex", desc: "A estética do fetiche, o cheiro e o barulho do material excitam." },
            { nome: "Botas de cano alto/Salto fino", desc: "Símbolo de autoridade ou de destaque das pernas." },
            { nome: "Coleira de couro", desc: "Não é mais estética, é um símbolo de quem detém o controle." },
            { nome: "Lingerie com tiras (Strappy)", desc: "Moldura o corpo como se fosse um pacote a ser aberto." },
            { nome: "Chicote na mão", desc: "Acessório de poder para quem está no comando." }
        ],
        fantasias: [
            { nome: "A Entrevista", desc: "Ele é uma autoridade (chefe, policial) e você está em apuros. O sexo é uma negociação de poder e punição." },
            { nome: "Negação (Edging)", desc: "Ele te leva à beira do orgasmo e para. Repetidas vezes. Você implora, mas ele decide quando (e se) você goza." },
            { nome: "O Objeto", desc: "Você é tratada não como parceira, mas como um objeto de prazer dele. Sem beijos românticos, apenas uso intenso e focado." },
            { nome: "Exibicionismo na Janela", desc: "Transar com a janela aberta ou no carro em lugar deserto. A chance real de ser visto é o gatilho." },
            { nome: "Marcação de Território", desc: "Palmadas que deixam a pele vermelha ou chupões em lugares visíveis (se permitido). A dor vira a lembrança do ato no dia seguinte." }
        ]
    },
    4: {
        titulo: "O Aventureiro",
        subtitulo: "Hotwife / Cuckold Leve",
        descricao: "O tesão aqui é o jogo mental: você se sentir desejada por outros, e ele sentir orgulho + excitação por ser \"o dono do segredo\". Tudo gira em torno de roteiro e limites bem claros.",
        brinquedos: [
            { nome: "Controle remoto avançado", desc: "Para ser estimulada à distância, intensificando a adrenalina do risco." },
            { nome: "Consolo realístico \"terceiro\"", desc: "Objeto para fantasia, simulando a presença de outro, mas mantido privado." },
            { nome: "Coleira + guia (estética)", desc: "Para introduzir o simbolismo de posse e controle no jogo de poder." },
            { nome: "Kit amarração leve", desc: "Para criar a vulnerabilidade controlada do seu parceiro (Cuckold)." },
            { nome: "Masturbador masculino topo", desc: "Para o Cuckold focar em seu prazer enquanto ela explora o poder." }
        ],
        roupas: [
            { nome: "Vestido preto transparente com lingerie aparente", desc: "Sugere exposição controlada sem ser vulgar." },
            { nome: "Vestido curto vinho colado", desc: "Look de alto impacto que atrai olhares externos." },
            { nome: "Saia preta micro + meia 7/8", desc: "Visual sedutor que facilita a adrenalina da exposição sutil." },
            { nome: "Salto alto fino preto", desc: "Confere poder e postura, elevando a auto-confiança (persona)." },
            { nome: "Strappy/arnês discreto por baixo do look", desc: "Adiciona um segredo pessoal de kink que só o casal conhece." }
        ],
        fantasias: [
            { nome: "Exposição Controlada (Troféu)", desc: "Você usa um look que provoca sem pedir desculpas. Ele vê as reações externas e você devolve o olhar excitado dele, celebrando o poder do seu desejo." },
            { nome: "Date Solo Roteirizado", desc: "Você sai sozinha, manda 2–3 mensagens curtas (\"me olharam\", \"eu sustentei\", \"tô voltando perigosa\") e volta pra ele com o clima pronto." },
            { nome: "Cena da Porta no Hotel", desc: "Você simula uma \"cena de retorno\" na porta — não é sobre o que houve lá fora, mas sobre o papel. Você volta rindo, como quem acabou de acender um fósforo." },
            { nome: "Casa de Swing como Passeio", desc: "Vocês vão pelo ambiente, roupa, música, gente se exibindo. Vocês não \"precisam\" fazer nada; só absorver o clima e ir embora com o tesão acumulado." },
            { nome: "Relato Guiado", desc: "Você conta uma cena imaginada (olhando nos olhos, pausando, aumentando detalhes) do jeito que ele gosta, focando no prazer dele e no seu poder de narrar." }
        ]
    },
    5: {
        titulo: "O Radical",
        subtitulo: "Hotwife / Cuckold Avançado",
        descricao: "Aqui vira experiência completa: preparação, performance, suspense, \"pós-cena\" e repetição como ritual. Você não só participa — você dirige e ritualiza a noite.",
        brinquedos: [
            { nome: "Sex machine (privado)", desc: "Para uma experiência de prazer mecânico intensa, focada na performance." },
            { nome: "Cinto de castidade (dinâmica)", desc: "Usado pelo Cuckold, transformando o \"final\" em um evento raro e ritualístico." },
            { nome: "Plug avançado", desc: "Para o Cuckold manter a concentração na submissão e aumentar a excitação dela." },
            { nome: "Consolo grande/realístico", desc: "Acessório de impacto para a cena, elevando o nível de fantasia e performance." },
            { nome: "Masturbador masculino premium", desc: "Para a Hotwife controlar e recompensar a excitação do Cuckold." }
        ],
        roupas: [
            { nome: "Conjunto vinil/couro completo", desc: "Look de domínio e performance, sinalizando a personagem Hotwife." },
            { nome: "Lingerie preta de transparência forte", desc: "Aumenta a sensação de exposição e vulnerabilidade controlada." },
            { nome: "Peruca + óculos (persona)", desc: "Ajuda a criar uma personagem e separar a fantasia da realidade do casal." },
            { nome: "Salto altíssimo de impacto", desc: "Confere autoridade e transforma o andar dela em performance." },
            { nome: "Arnês/strappy completo", desc: "Visual de alto BDSM, usado como armadura de seu poder sexual." }
        ],
        fantasias: [
            { nome: "A Noite da Hotwife", desc: "Você se monta como persona (roupa, peruca, postura) e entra como se ele estivesse prestes a assistir ao que sempre desejou — você conduz tudo com calma e autoridade." },
            { nome: "Castidade como tensão", desc: "A brincadeira não é o \"final\", é o caminho — você provoca, domina, aumenta a vontade, e transforma a liberação em evento, não em rotina." },
            { nome: "Roteiro em 3 atos", desc: "(1) produção e provocação (2) suspense e controle (3) cena intensa em ambiente privado — com começo/meio/fim, como um filme." },
            { nome: "Mensagens ao vivo", desc: "Você manda áudios curtos se arrumando (\"olha a roupa\", \"olha o salto\", \"olha como eu tô\") e ele fica carregando o tesão antes mesmo de você aparecer." },
            { nome: "Debrief cinematográfico", desc: "Você volta e conta com riqueza de sensação (olhares, frases, clima, poder), e isso vira o gatilho direto para a cena final da noite." }
        ]
    }
};

function atualizarProgresso() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const progresso = (telaAtual / (telas.length - 1)) * 100;
        progressBar.style.width = `${progresso}%`;
    }
}

function contarPerguntas() {
    return telas.filter(t => t.tipo === 'pergunta').length;
}

function getPerguntaAtual() {
    let count = 0;
    for (let i = 0; i <= telaAtual; i++) {
        if (telas[i].tipo === 'pergunta') count++;
    }
    return count;
}

function mostrarTela() {
    const tela = telas[telaAtual];
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    
    atualizarProgresso();
    
    if (tela.tipo === "boasvindas") {
        container.innerHTML = `
            <div class="tela-inicial fade-in">
                <div class="badge-18">+18</div>
                <h1>Guia de<br>Sexualidade</h1>
                <p class="subtitulo">Teste o nível do seu presente.<br>Projete o nível do seu futuro.</p>
                <p class="descricao">Este guia irá te auxiliar a explorar suas preferências, da rotina ao fetiche. No final, você recebe um nível (1–5) e sugestões que facilitam suas escolhas no nosso catálogo, para encontrar acessórios que combinam com o seu perfil e elevam sua experiência.</p>
                <p class="aviso">Conteúdo exclusivo para maiores de 18 anos.</p>
            </div>
        `;
        btnContainer.innerHTML = `<button type="button" id="btn-iniciar">Tenho 18 anos ou mais</button>`;
        setTimeout(() => {
            document.getElementById('btn-iniciar').onclick = () => avancarTela();
        }, 50);
        
    } else if (tela.tipo === "pergunta") {
        const numPergunta = getPerguntaAtual();
        const totalPerguntas = contarPerguntas();
        
        let html = `
            <div id="question-box" class="fade-in">
                <div class="question-number">Pergunta ${numPergunta} de ${totalPerguntas}</div>
                <div class="question-title">${tela.texto}</div>
                ${tela.descricao ? `<div class="question-desc">${tela.descricao}</div>` : ''}
            </div>
            <div id="options-box" class="fade-in">
        `;
        
        // MENU SUSPENSO (apenas perguntas 1-5)
        if (tela.menu) {
            html += '<select id="resposta"><option value="">Selecione uma opção</option>';
            tela.menu.forEach(o => html += `<option value="${o}">${o}</option>`);
            html += '</select></div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '';
            
            setTimeout(() => {
                document.getElementById('resposta').onchange = function() {
                    if (this.value) {
                        salvarResposta(tela, this.value);
                        setTimeout(() => avancarTela(), 250);
                    }
                };
            }, 50);
        }
        
        // RADIO - ESCOLHA ÚNICA
        else if (tela.radio) {
            tela.radio.forEach(o => {
                html += `<label class="option-card"><input type="radio" name="radio" value="${o}"><span>${o}</span></label>`;
            });
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '<button type="button" id="btn-proxima">Continuar</button>';
            
            setTimeout(() => {
                document.getElementById('btn-proxima').onclick = () => {
                    const selected = document.querySelector('input[name="radio"]:checked');
                    if (!selected) {
                        document.getElementById('options-box').style.animation = 'none';
                        document.getElementById('options-box').offsetHeight;
                        document.getElementById('options-box').style.animation = 'shake 0.4s ease';
                        return;
                    }
                    salvarResposta(tela, selected.value);
                    avancarTela();
                };
            }, 50);
        }
        
        // CHECKBOX - MÚLTIPLA ESCOLHA
        else if (tela.checkbox) {
            tela.checkbox.forEach(o => {
                html += `<label class="option-card"><input type="checkbox" name="check" value="${o}"><span>${o}</span></label>`;
            });
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '<button type="button" id="btn-proxima">Continuar</button>';
            
            setTimeout(() => {
                document.getElementById('btn-proxima').onclick = () => {
                    const checks = document.querySelectorAll('input[name="check"]:checked');
                    if (checks.length === 0) {
                        document.getElementById('options-box').style.animation = 'none';
                        document.getElementById('options-box').offsetHeight;
                        document.getElementById('options-box').style.animation = 'shake 0.4s ease';
                        return;
                    }
                    salvarResposta(tela, Array.from(checks).map(c => c.value).join(", "));
                    avancarTela();
                };
            }, 50);
        }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function salvarResposta(tela, valor) {
    answers[tela.campo] = valor;
    if (tela.pontuavel && pontuacaoRespostas[valor]) {
        pontuacaoTotal += pontuacaoRespostas[valor];
    }
}

function avancarTela() {
    if (enviando) return;
    telaAtual++;
    if (telaAtual >= telas.length) {
        calcularResultado();
    } else {
        mostrarTela();
    }
}

function calcularResultado() {
    const perguntasPontuaveis = telas.filter(t => t.pontuavel).length;
    const pontuacaoMaxima = perguntasPontuaveis * 4;
    const porcentagem = (pontuacaoTotal / pontuacaoMaxima) * 100;
    
    let nivel;
    if (porcentagem <= 25) nivel = 1;
    else if (porcentagem <= 40) nivel = 2;
    else if (porcentagem <= 55) nivel = 3;
    else if (porcentagem <= 75) nivel = 4;
    else nivel = 5;
    
    mostrarResultado(nivel);
}

function mostrarResultado(nivel) {
    const r = resultados[nivel];
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    const progressContainer = document.getElementById("progress-container");
    
    if (progressContainer) progressContainer.style.display = 'none';
    
    container.innerHTML = `
        <div class="resultado-container fade-in">
            <div class="resultado-nivel">
                <div class="nivel-badge">Nível ${nivel}</div>
                <h1>${r.titulo}</h1>
                <div class="subtitulo">${r.subtitulo}</div>
            </div>
            
            <p class="resultado-descricao">${r.descricao}</p>
            
            <div class="resultado-secao">
                <h2>Brinquedos Sugeridos</h2>
                <ul>
                    ${r.brinquedos.map(b => `<li><strong>${b.nome}</strong><span>${b.desc}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="resultado-secao">
                <h2>Roupas e Acessórios</h2>
                <ul>
                    ${r.roupas.map(ro => `<li><strong>${ro.nome}</strong><span>${ro.desc}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="resultado-secao">
                <h2>Fantasias a Explorar</h2>
                <ul>
                    ${r.fantasias.map(f => `<li><strong>${f.nome}</strong><span>${f.desc}</span></li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    btnContainer.innerHTML = '';
    answers['nivel_resultado'] = nivel;
    enviarParaPlanilha();
}

async function enviarParaPlanilha() {
    enviando = true;
    const respostasArray = Object.values(answers);
    
    try {
        const formData = new FormData();
        formData.append('respostas', JSON.stringify(respostasArray));
        await fetch(WEBAPP_URL, { method: 'POST', body: formData });
        console.log('✅ Enviado');
    } catch (e) {
        console.error('❌ Erro:', e);
    } finally {
        enviando = false;
    }
}

const style = document.createElement('style');
style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => mostrarTela());
