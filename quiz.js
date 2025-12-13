const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

const answers = {};
let telaAtual = 0;
let enviando = false;
const imageCache = {};

// Paleta de cores SUTIS para cada tipo de background
const paletas = {
    "BGBV": { btn: "rgba(180, 140, 100, 0.35)", btnHover: "rgba(200, 160, 120, 0.5)", text: "#F5E6D3", border: "rgba(245, 230, 211, 0.4)" },
    "BG01P01": { btn: "rgba(150, 130, 180, 0.3)", btnHover: "rgba(170, 150, 200, 0.45)", text: "#E8E0F0", border: "rgba(232, 224, 240, 0.4)" },
    "BG1": { btn: "rgba(130, 120, 170, 0.35)", btnHover: "rgba(150, 140, 190, 0.5)", text: "#E6E0F5", border: "rgba(230, 224, 245, 0.4)" },
    "BG02P02": { btn: "rgba(180, 100, 120, 0.35)", btnHover: "rgba(200, 120, 140, 0.5)", text: "#FFE0E8", border: "rgba(255, 224, 232, 0.4)" },
    "BG2": { btn: "rgba(160, 90, 110, 0.35)", btnHover: "rgba(180, 110, 130, 0.5)", text: "#FFD8E4", border: "rgba(255, 216, 228, 0.4)" },
    "BG03P03": { btn: "rgba(100, 140, 140, 0.35)", btnHover: "rgba(120, 160, 160, 0.5)", text: "#D8F0F0", border: "rgba(216, 240, 240, 0.4)" },
    "BG3": { btn: "rgba(80, 130, 130, 0.35)", btnHover: "rgba(100, 150, 150, 0.5)", text: "#D0EBEB", border: "rgba(208, 235, 235, 0.4)" },
    "BG04P04": { btn: "rgba(160, 100, 80, 0.35)", btnHover: "rgba(180, 120, 100, 0.5)", text: "#FFE8D0", border: "rgba(255, 232, 208, 0.4)" },
    "BG4": { btn: "rgba(150, 90, 70, 0.35)", btnHover: "rgba(170, 110, 90, 0.5)", text: "#FFE0C8", border: "rgba(255, 224, 200, 0.4)" },
    "BG05P05": { btn: "rgba(120, 80, 150, 0.35)", btnHover: "rgba(140, 100, 170, 0.5)", text: "#E8D8F5", border: "rgba(232, 216, 245, 0.4)" },
    "BG5": { btn: "rgba(130, 70, 140, 0.35)", btnHover: "rgba(150, 90, 160, 0.5)", text: "#F0D8F8", border: "rgba(240, 216, 248, 0.4)" },
    "BGRDOURADOLIMPO": { btn: "rgba(200, 170, 100, 0.35)", btnHover: "rgba(220, 190, 120, 0.5)", text: "#FFF8E0", border: "rgba(255, 248, 224, 0.4)" },
    "BGRDOURADO": { btn: "rgba(210, 180, 90, 0.4)", btnHover: "rgba(230, 200, 110, 0.55)", text: "#FFFAEB", border: "rgba(255, 250, 235, 0.5)" },
    "BGRESULT": { btn: "rgba(200, 170, 100, 0.4)", btnHover: "rgba(220, 190, 120, 0.55)", text: "#FFF8E0", border: "rgba(255, 248, 224, 0.5)" }
};

const telas = [
    { tipo: "transicao", bg: "./quiz/BGBV.jpg", botao: "Começar sua Jornada", paleta: "BGBV" },
    { tipo: "transicao", bg: "./quiz/BG01P01.png", botao: "Iniciar Portal 1", paleta: "BG01P01" },
    
    // PORTAL 1 - Perguntas básicas
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual é o seu signo?", campo: "q1_signo", menu: ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"], paleta: "BG1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual sua faixa etária?", campo: "q2_idade", menu: ["18-24","25-34","35-44","45-54","55-64","65+"], paleta: "BG1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual é a sua orientação sexual?", campo: "q3_orientacao", menu: ["Heterossexual","Bissexual","Homossexual","Pansexual"], paleta: "BG1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual seu status de relacionamento?", campo: "q4_status", menu: ["Solteira","Namorando","Noiva","Casada","União Estável","Relacionamento Aberto","Divorciada","Viúva","É complicado"], paleta: "BG1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "E o seu 'currículo amoroso'?", campo: "q5_curriculo", menu: ["0-1","2-5","6-10","11-20","21-30","31-50","51+"], paleta: "BG1" },
    
    // PORTAL 2 - Como se agrada uma Deusa
    { tipo: "transicao", bg: "./quiz/BG02P02.png", botao: "Iniciar Portal 2", paleta: "BG02P02" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Quem prefere que tome a iniciativa na hora H?", campo: "q6_iniciativa", menu: ["Eu","Ele(s)","Depende do momento"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O que mais faz seu corpo entrar no clima?", campo: "q7_clima", checkbox: ["Beijos quentes","Carícias no corpo","Toque íntimo","Conversas picantes"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Posição preferida?", campo: "q8_posicoes", checkbox: ["Cavalgando","Papai & Mamãe","De quatro","Em pé","69","De ladinho"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Quantos orgasmos você tem na semana?", campo: "q9_orgasmos", menu: ["Nenhum","1","2–3","4–6","Mais de 6"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O tamanho importa? Qual a preferência da Deusa?", campo: "q10_tamanho", checkbox: ["12 a 15cm","15 a 18cm","19 a 21cm","22cm ou mais"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O que normalmente te leva ao auge do prazer?", campo: "q11_auge", checkbox: ["Sexo oral","Penetração","Estimulação externa com dedos","Brinquedinhos","Estimulação anal","Vários ao mesmo tempo"], paleta: "BG2" },
    
    // PORTAL 3 - Os mundos secretos
    { tipo: "transicao", bg: "./quiz/BG03P03.png", botao: "Iniciar Portal 3", paleta: "BG03P03" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Quando a imaginação bate sozinha, a que você recorre:", campo: "q12_sozinha", checkbox: ["Contos eróticos","Vídeo pornô","Vibrador","Brinquedos variados","Banho estratégico"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Já experimentou pessoas do mesmo sexo na cama?", campo: "q13_mesmoSexo", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Já teve experiências a três (2 homens e você)?", campo: "q13b_tres2Homens", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Experiências a três (você, uma amiga e um parceiro)?", campo: "q14_tresAmigaParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Experiências com pessoas trans?", campo: "q15_trans", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Sexo com total desconhecido(a)?", campo: "q16_desconhecido", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Troca de casais / Swing?", descricao: "Foi convidada pelo parceiro para troca de casais.", campo: "q17_swing", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Suruba (mais de 3 pessoas)?", descricao: "Foi convidada para uma suruba com mais de 3 pessoas envolvidas.", campo: "q18_orgia", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    
    // PORTAL 4 - Poder & Dominação
    { tipo: "transicao", bg: "./quiz/BG04P04.png", botao: "Iniciar Portal 4", paleta: "BG04P04" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "O que você prefere, no geral?", campo: "q19_prefereDom", menu: ["Ser dominada","Dominar"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Inversão de papéis", descricao: "Homem no papel de \"seu escravo\", obedecendo às suas ordens.", campo: "q20_inversaoPapeis", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Bondage", descricao: "Ser imobilizada ou imobilizar o outro com algemas, cordas, amarras, uso de chicotes, castigar ou ser castigada.", campo: "q21_bondage", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Sado Moderado", descricao: "Tapas, puxões, apertos, prendedores, estímulos de dor controlada.", campo: "q22_sadoModerado", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Sado Intenso", descricao: "Situações em que a dor intensa com uso de acessórios é parte central da cena.", campo: "q23_sadoHard", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Humilhação erótica do parceiro", descricao: "Rebaixar, provocar, \"pisar\", xingar o parceiro, chamar de \"corno\", \"manso\" etc. em contexto sexual, com consenso, como parte do jogo de poder.", campo: "q24_humilhacaoParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Pegging", descricao: "Usar uma cinta no parceiro. Você troca de lugar com seu parceiro, fazendo dele seu submisso com uso de cintas/consolos, invertendo o jogo.", campo: "q26_pegging", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    
    // PORTAL 5 - A Caixa Preta da Deusa
    { tipo: "transicao", bg: "./quiz/BG05P05.png", botao: "Iniciar Portal 5", paleta: "BG05P05" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "\"Traição\" com consentimento", descricao: "Ficar com outra pessoa onde o parceiro sabe, autoriza e gosta.", campo: "q27_traicaoCons", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Hotwife Clássica", descricao: "Você transa com outro homem enquanto seu parceiro assiste, podendo ou não ser humilhado verbalmente.", campo: "q28_cuckoldClassico", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "A Confidência Divina da HotWife", descricao: "Você sai com outro e quando volta conta todos os detalhes sórdidos para seu parceiro na cama, vendo ele delirar de tesão.", campo: "q29_hotwifeConf", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "A Adoração Sagrada da Hotwife", descricao: "Você transa com outro na frente do seu parceiro. Ele assiste ao vivo mas não interage, só pode assistir enquanto você o encara nos olhos.", campo: "q30_hotwifeAdoracao", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "A Hotwife Soberana", descricao: "Você transando com outro homem e ordenando seu parceiro a interagir com ele, enquanto é humilhado como parte da cena consensual.", campo: "q31_hotwifeSoberana", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "O Trono da Cuckqueen", descricao: "Você assiste seu parceiro com outra mulher, mas é você quem controla a cena: escolhe quem entra, até onde vai e quando termina.", campo: "q32_cuckqueenTrono", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Banquete Profano da Deusa", descricao: "Cenário em que homens e mulheres se entrelaçam livremente — todos com todos — em um festim profano sob a regência da Deusa.", campo: "q33_banqueteProfano", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    
    // Trindade Profana & Rito Dourado
    { tipo: "transicao", bg: "./quiz/BGRDOURADOLIMPO.png", botao: "Continuar", paleta: "BGRDOURADOLIMPO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Trindade Profana da Deusa", descricao: "Em um cenário com você, seu parceiro e outra mulher, qual dessas cenas mais te chama atenção?", campo: "q34_cenaTrindade", checkbox: ["Beijar e tocar a mulher enquanto o parceiro assiste","As duas com ele ao mesmo tempo","Você e ela se divertindo mais entre vocês do que com ele","Ele focado em te estimular enquanto você brinca com ela","Revezar: hora você com ele, hora ela com ele, hora só vocês duas"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Numa situação a três com outra mulher, seu foco principal seria…?", campo: "q35_focoTrindade", checkbox: ["Não faria de forma alguma","Sentir tesão com ela, independente dele","Dividir o parceiro e curtir a energia dos três juntos","Deixar ele olhar enquanto você aproveita com ela","Ser o centro das atenções dos dois","Deixar a outra mulher ser o centro e observar tudo"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "E o ciúmes nessa história com outra mulher?", campo: "q36_ciumesTrindade", menu: ["Eu travaria, não consigo nem imaginar dividir ele","Teria ciúmes, mas acho que a excitação falaria mais alto","Se tiver regra clara, confiança e combinado, eu relaxo","Me excita justamente ver ele com outra na minha frente","Eu seria mais ciumenta com ela do que com ele"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Golden Shower", descricao: "Prática em que o xixi se torna instrumento de prazer, dominação e humilhação erótica, sempre dentro de um acordo entre a Deusa e seu parceiro.", campo: "q37_goldenNivel", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Quando você pensa em golden shower, qual dessas vibes mais parece com você?", campo: "q38_goldenVibe", checkbox: ["Me dá mais nojo do que tesão","Sinto curiosidade, mas ainda sem saber se ia rolar na prática","Vejo como parte de humilhação erótica","Vejo como um ato de dominação/submissão bem intenso","Enxergo como uma forma extrema de intimidade e confiança","Me excita mais a ideia do que a prática em si"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Rito Dourado da Deusa: qual papel mais combina com você?", campo: "q39_goldenPapel", checkbox: ["Fazer xixi no parceiro","Receber o xixi do parceiro","Alternar: às vezes dou, às vezes recebo","Só assistir a cena acontecendo, sem participar diretamente","Nenhuma dessas combina comigo (por enquanto)"], paleta: "BGRDOURADO" }
];

function preloadAllImages() {
    const uniqueImages = [...new Set(telas.map(t => t.bg))];
    uniqueImages.forEach(url => {
        if (!imageCache[url]) {
            const img = new Image();
            img.src = url;
            imageCache[url] = img;
        }
    });
}

function aplicarPaletaBotao(paletaKey) {
    const paleta = paletas[paletaKey] || paletas["BGBV"];
    const style = document.getElementById('dynamic-btn-style');
    
    if (style) {
        style.innerHTML = `
            #btn-container button {
                background: ${paleta.btn};
                color: ${paleta.text};
                border: 1px solid ${paleta.border};
                font-weight: 600;
                letter-spacing: 0.5px;
                text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }
            #btn-container button:hover {
                background: ${paleta.btnHover};
                border-color: ${paleta.text};
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }
        `;
    }
}

function mostrarTela() {
    const tela = telas[telaAtual];
    const body = document.body;
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    
    // Aplica background
    body.style.backgroundImage = `url('${tela.bg}')`;
    
    // Aplica paleta de cores ao botão
    aplicarPaletaBotao(tela.paleta);
    
    if (tela.tipo === "transicao") {
        // Tela de transição - apenas botão para avançar
        container.innerHTML = '';
        btnContainer.innerHTML = `<button type="button" id="btn-avancar">${tela.botao}</button>`;
        
        document.getElementById('btn-avancar').addEventListener('click', function(e) {
            e.preventDefault();
            avancarTela();
        });
        
    } else if (tela.tipo === "pergunta") {
        // Monta a pergunta com título e descrição
        let html = `<div id="question-box">
            <div class="question-title">${tela.texto}</div>
            ${tela.descricao ? `<div class="question-desc">${tela.descricao}</div>` : ''}
        </div><div id="options-box">`;
        
        if (tela.menu) {
            // Menu suspenso - avança automaticamente
            html += '<select id="resposta" required><option value="">Selecione...</option>';
            tela.menu.forEach(o => html += `<option value="${o}">${o}</option>`);
            html += '</select>';
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = ''; // SEM BOTÃO para menu
            
            // Auto-avanço ao selecionar
            document.getElementById('resposta').addEventListener('change', function() {
                if (this.value) {
                    salvarRespostaMenu();
                    setTimeout(() => avancarTela(), 300); // Pequeno delay para feedback visual
                }
            });
            
        } else if (tela.checkbox) {
            // Checkbox - precisa de botão
            tela.checkbox.forEach(o => html += `<label><input type="checkbox" name="check" value="${o}">${o}</label>`);
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '<button type="button" id="btn-proxima">Próxima</button>';
            
            document.getElementById('btn-proxima').addEventListener('click', function(e) {
                e.preventDefault();
                validarCheckboxEAvancar();
            });
        }
    }
    
    window.scrollTo(0, 0);
}

// Salva resposta de menu suspenso
function salvarRespostaMenu() {
    const tela = telas[telaAtual];
    const sel = document.getElementById("resposta");
    
    if (sel && sel.value) {
        let resp = sel.value;
        // Converte para número se for escala de experiência
        if (tela.menu[0] === "Nunca fiz e não tenho vontade") {
            resp = tela.menu.indexOf(sel.value) + 1;
        }
        answers[tela.campo] = resp;
    }
}

// Função separada para avançar sem validação (transições)
function avancarTela() {
    if (enviando) return;
    telaAtual++;
    if (telaAtual >= telas.length) {
        calcularResultado();
    } else {
        mostrarTela();
    }
}

// Valida checkbox e avança
function validarCheckboxEAvancar() {
    if (enviando) return;
    const tela = telas[telaAtual];
    
    const checks = document.querySelectorAll('input[name="check"]:checked');
    if (checks.length === 0) {
        alert("Escolha pelo menos uma opção!");
        return;
    }
    
    answers[tela.campo] = Array.from(checks).map(c => c.value);
    avancarTela();
}

// Mantém compatibilidade
function proximaTela() {
    const tela = telas[telaAtual];
    if (tela.tipo === "transicao") {
        avancarTela();
    } else if (tela.checkbox) {
        validarCheckboxEAvancar();
    }
}

function calcularResultado() {
    const s = { HESTIA: 10, ATENA: 10, PERSEFONE: 10, AFRODITE: 10, LILITH: 10 };
    const max = Math.max(...Object.values(s));
    const vencedor = Object.keys(s).find(k => s[k] === max) || "PERSEFONE";
    mostrarResultado(vencedor);
}

function mostrarResultado(deusa) {
    const resultados = {
        HESTIA: { titulo: "Héstia – Fogo Contido", texto: "Você é da linhagem de Héstia: a Deusa do fogo do lar.\n\nSua força mora no cuidado, na estabilidade, em manter tudo funcionando." },
        ATENA: { titulo: "Atena – A Racional", texto: "Você é da linhagem de Atena: a Deusa Racional.\n\nBrilhante, analítica, rápida para entender tudo – menos quando o assunto é sentir." },
        PERSEFONE: { titulo: "Perséfone – Entre Dois Mundos", texto: "Você é da linhagem de Perséfone: a Deusa que caminha entre dois mundos.\n\nEducada por fora, curiosa por dentro." },
        AFRODITE: { titulo: "Afrodite – Em Despertar", texto: "Você é da linhagem de Afrodite: a Deusa em Despertar.\n\nSeu corpo fala. Seu desejo existe. Sua energia é magnética." },
        LILITH: { titulo: "Lilith – Indomável", texto: "Você é da linhagem de Lilith: a Deusa Indomável.\n\nVocê não nasceu para viver pela régua dos outros." }
    };
    
    const r = resultados[deusa];
    const body = document.body;
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    
    aplicarPaletaBotao("BGRESULT");
    body.style.backgroundImage = `url('./quiz/BGRESULT.jpg')`;
    container.innerHTML = `<h1>${r.titulo}</h1><p>${r.texto}</p>`;
    btnContainer.innerHTML = '';
    enviarParaPlanilha();
}

async function enviarParaPlanilha() {
    enviando = true;
    const formData = new FormData();
    formData.append('respostas', JSON.stringify(Object.values(answers)));
    try {
        await fetch(WEBAPP_URL, { method: 'POST', body: formData });
        console.log('✅ Enviado!');
    } catch (e) {
        console.error('Erro:', e);
    } finally {
        enviando = false;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Cria style dinâmico para o botão
    const styleEl = document.createElement('style');
    styleEl.id = 'dynamic-btn-style';
    document.head.appendChild(styleEl);
    
    preloadAllImages();
    mostrarTela();
});
