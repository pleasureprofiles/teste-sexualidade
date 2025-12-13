const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

const answers = {};
let telaAtual = 0;
let enviando = false;
const imageCache = {};

// Paleta de cores para cada tipo de background
const paletas = {
    "BGBV": { btn: "#8B4513", btnHover: "#A0522D", text: "#FFE4B5" },
    "BG01P01": { btn: "#4B0082", btnHover: "#6A0DAD", text: "#E6E6FA" },
    "BG1": { btn: "#483D8B", btnHover: "#6959CD", text: "#E6E6FA" },
    "BG02P02": { btn: "#8B0000", btnHover: "#B22222", text: "#FFB6C1" },
    "BG2": { btn: "#800020", btnHover: "#A52A2A", text: "#FFC0CB" },
    "BG03P03": { btn: "#2F4F4F", btnHover: "#3D5C5C", text: "#B0E0E6" },
    "BG3": { btn: "#1C3A3A", btnHover: "#2E5454", text: "#AFEEEE" },
    "BG04P04": { btn: "#4A0E0E", btnHover: "#6B1414", text: "#FFD700" },
    "BG4": { btn: "#5C1A1A", btnHover: "#7D2323", text: "#FFA500" },
    "BG05P05": { btn: "#1A0A2E", btnHover: "#2D1450", text: "#DDA0DD" },
    "BG5": { btn: "#2E0854", btnHover: "#3D0B6B", text: "#DA70D6" },
    "BGRDOURADOLIMPO": { btn: "#B8860B", btnHover: "#DAA520", text: "#FFFACD" },
    "BGRDOURADO": { btn: "#D4AF37", btnHover: "#FFD700", text: "#1A1A1A" },
    "BGRESULT": { btn: "#C9A227", btnHover: "#E6B800", text: "#1A1A1A" }
};

const telas = [
    { tipo: "transicao", bg: "./quiz/BGBV.jpg", botao: "Começar sua Jornada", paleta: "BGBV" },
    { tipo: "transicao", bg: "./quiz/BG01P01.png", botao: "Iniciar Portal 1", paleta: "BG01P01" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual é o seu signo?", campo: "q1_signo", menu: ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"], paleta: "BG1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual sua faixa etária?", campo: "q2_idade", menu: ["18-24","25-34","35-44","45-54","55-64","65+"], paleta: "BG1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual é a sua orientação sexual?", campo: "q3_orientacao", menu: ["Heterossexual","Bissexual","Homossexual","Pansexual"], paleta: "BG1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "Qual seu status de relacionamento?", campo: "q4_status", menu: ["Solteira","Namorando","Noiva","Casada","União Estável","Relacionamento Aberto","Divorciada","Viúva","É complicado"], paleta: "BG1" },
    { tipo: "pergunta", bg: "./quiz/BG1.png", texto: "E o seu 'currículo amoroso'?", campo: "q5_curriculo", menu: ["0-1","2-5","6-10","11-20","21-30","31-50","51+"], paleta: "BG1" },
    { tipo: "transicao", bg: "./quiz/BG02P02.png", botao: "Iniciar Portal 2", paleta: "BG02P02" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Quem prefere que tome a iniciativa na hora H?", campo: "q6_iniciativa", menu: ["Eu","Ele(s)","Depende do momento"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O que mais faz seu corpo entrar no clima?", campo: "q7_clima", checkbox: ["Beijos quentes","Carícias no corpo","Toque íntimo","Conversas picantes"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Posição preferida?", campo: "q8_posicoes", checkbox: ["Cavalgando","Papai & Mamãe","De quatro","Em pé","69","De ladinho"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "Quantos orgasmos você tem na semana?", campo: "q9_orgasmos", menu: ["Nenhum","1","2–3","4–6","Mais de 6"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O tamanho importa? Qual a preferência?", campo: "q10_tamanho", checkbox: ["12 a 15cm","15 a 18cm","19 a 21cm","22cm ou mais"], paleta: "BG2" },
    { tipo: "pergunta", bg: "./quiz/BG2.png", texto: "O que te leva ao auge do prazer?", campo: "q11_auge", checkbox: ["Sexo oral","Penetração","Estimulação com dedos","Brinquedos","Estimulação anal","Vários ao mesmo tempo"], paleta: "BG2" },
    { tipo: "transicao", bg: "./quiz/BG03P03.png", botao: "Iniciar Portal 3", paleta: "BG03P03" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Quando a imaginação bate sozinha, a que você recorre:", campo: "q12_sozinha", checkbox: ["Contos eróticos","Vídeo pornô","Vibrador","Brinquedos variados","Banho estratégico"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Pessoas do mesmo sexo", campo: "q13_mesmoSexo", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "A três (2 homens e você)", campo: "q13b_tres2Homens", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "A três (você, amiga e parceiro)", campo: "q14_tresAmigaParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Com pessoas trans", campo: "q15_trans", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Com total desconhecido(a)", campo: "q16_desconhecido", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Troca de casais / Swing", campo: "q17_swing", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "pergunta", bg: "./quiz/BG3.png", texto: "Suruba (mais de 3 pessoas)", campo: "q18_orgia", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG3" },
    { tipo: "transicao", bg: "./quiz/BG04P04.png", botao: "Iniciar Portal 4", paleta: "BG04P04" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "O que você prefere?", campo: "q19_prefereDom", menu: ["Ser dominada","Dominar"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Inversão de papéis", campo: "q20_inversaoPapeis", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Bondage", campo: "q21_bondage", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Sado Moderado", campo: "q22_sadoModerado", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Sado Intenso", campo: "q23_sadoHard", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Humilhação erótica", campo: "q24_humilhacaoParceiro", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "pergunta", bg: "./quiz/BG4.png", texto: "Pegging", campo: "q26_pegging", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG4" },
    { tipo: "transicao", bg: "./quiz/BG05P05.png", botao: "Iniciar Portal 5", paleta: "BG05P05" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Traição com consentimento", campo: "q27_traicaoCons", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Hotwife Clássica", campo: "q28_cuckoldClassico", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Confidência Divina da HotWife", campo: "q29_hotwifeConf", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Adoração Sagrada da Hotwife", campo: "q30_hotwifeAdoracao", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Hotwife Soberana", campo: "q31_hotwifeSoberana", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Trono da Cuckqueen", campo: "q32_cuckqueenTrono", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "pergunta", bg: "./quiz/BG5.png", texto: "Banquete Profano da Deusa", campo: "q33_banqueteProfano", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BG5" },
    { tipo: "transicao", bg: "./quiz/BGRDOURADOLIMPO.png", botao: "Continuar", paleta: "BGRDOURADOLIMPO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Cenário com você, parceiro e outra mulher, qual te chama atenção?", campo: "q34_cenaTrindade", checkbox: ["Beijar ela enquanto ele assiste","As duas com ele","Você e ela mais que com ele","Ele te estimula e você com ela","Revezar"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Seu foco seria?", campo: "q35_focoTrindade", checkbox: ["Não faria","Tesão com ela","Dividir o parceiro","Ele olhar","Ser o centro","Observar"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "E o ciúmes?", campo: "q36_ciumesTrindade", menu: ["Eu travaria","Ciúmes mas excitação fala mais alto","Com regras claras relaxo","Me excita ver ele com outra","Mais ciumenta com ela"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Golden shower", campo: "q37_goldenNivel", menu: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Que vibe?", campo: "q38_goldenVibe", checkbox: ["Nojo","Curiosidade","Humilhação erótica","Dominação intensa","Intimidade extrema","Mais ideia que prática"], paleta: "BGRDOURADO" },
    { tipo: "pergunta", bg: "./quiz/BGRDOURADO.png", texto: "Qual papel?", campo: "q39_goldenPapel", checkbox: ["Fazer","Receber","Alternar","Assistir","Nenhuma"], paleta: "BGRDOURADO" }
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
                border: 2px solid ${paleta.text}40;
                font-weight: 600;
                letter-spacing: 0.5px;
                text-shadow: none;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            #btn-container button:hover {
                background: ${paleta.btnHover};
                border-color: ${paleta.text}70;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.4);
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
        
        // Event listener direto para garantir funcionamento
        document.getElementById('btn-avancar').addEventListener('click', function(e) {
            e.preventDefault();
            avancarTela();
        });
        
    } else if (tela.tipo === "pergunta") {
        let html = `<div id="question-box">${tela.texto}</div><div id="options-box">`;
        
        if (tela.menu) {
            html += '<select id="resposta" required><option value="">Selecione...</option>';
            tela.menu.forEach(o => html += `<option value="${o}">${o}</option>`);
            html += '</select>';
        } else if (tela.checkbox) {
            tela.checkbox.forEach(o => html += `<label><input type="checkbox" name="check" value="${o}">${o}</label>`);
        }
        
        html += '</div>';
        container.innerHTML = html;
        btnContainer.innerHTML = '<button type="button" id="btn-proxima">Próxima</button>';
        
        // Event listener para botão de pergunta
        document.getElementById('btn-proxima').addEventListener('click', function(e) {
            e.preventDefault();
            validarEAvancar();
        });
    }
    
    window.scrollTo(0, 0);
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

// Função para validar resposta e avançar (perguntas)
function validarEAvancar() {
    if (enviando) return;
    const tela = telas[telaAtual];
    
    let resp = null;
    
    if (tela.menu) {
        const sel = document.getElementById("resposta");
        if (!sel || !sel.value) {
            alert("Escolha uma opção!");
            return;
        }
        resp = sel.value;
        // Converte para número se for escala de experiência
        if (tela.menu[0] === "Nunca fiz e não tenho vontade") {
            resp = tela.menu.indexOf(sel.value) + 1;
        }
    } else if (tela.checkbox) {
        const checks = document.querySelectorAll('input[name="check"]:checked');
        if (checks.length === 0) {
            alert("Escolha pelo menos uma opção!");
            return;
        }
        resp = Array.from(checks).map(c => c.value);
    }
    
    answers[tela.campo] = resp;
    avancarTela();
}

// Mantém compatibilidade com onclick inline (caso precise)
function proximaTela() {
    const tela = telas[telaAtual];
    if (tela.tipo === "transicao") {
        avancarTela();
    } else {
        validarEAvancar();
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
