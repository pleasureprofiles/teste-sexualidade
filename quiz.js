// URL do seu Apps Script (Web App)
// URL do seu Apps Script (Web App)
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";
let perguntas = [
    // 1 - signo
    {
        tipo: "menu",
        texto: "Qual seu signo?",
        opcoes: [
            "Áries",
            "Touro",
            "Gêmeos",
            "Câncer",
            "Leão",
            "Virgem",
            "Libra",
            "Escorpião",
            "Sagitário",
            "Capricórnio",
            "Aquário",
            "Peixes"
        ]
    },

    // 2 - faixa etária
    {
        tipo: "menu",
        texto: "Qual sua faixa etária?",
        opcoes: [
            "18 a 25",
            "26 a 30",
            "30 a 39",
            "40 a 50",
            "50 a 60",
            "60+"
        ]
    },

    // 3 - situação (estado civil / status)
    {
        tipo: "menu",
        texto: "Qual sua situação atual?",
        opcoes: [
            "Casada",
            "Solteira",
            "Namorando",
            "Noiva",
            "Separada",
            "Viúva",
            "Liberal",
            "Complicado"
        ]
    },

    // 4 - orientação sexual
    {
        tipo: "menu",
        texto: "Qual sua orientação sexual?",
        opcoes: [
            "Hetero",
            "Homo",
            "Bi",
            "Pan"
        ]
    },

    // 5 - número de pessoas
    {
        tipo: "menu",
        texto: "Com quantas pessoas você já teve relações?",
        opcoes: [
            "1 a 5",
            "6 a 10",
            "11 a 15",
            "15 a 20",
            "20 a 25",
            "25 a 30",
            "31+"
        ]
    },

    // 6 a 11 - em branco para editar depois (menu)
    {
        tipo: "menu",
        texto: "Pergunta 6 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 7 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 8 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 9 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 10 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
        tipo: "menu",
        texto: "Pergunta 11 (editar depois)",
        opcoes: ["Opção 1", "Opção 2", "Opção 3"]
    }
];

// 12 a 29 - menus com 4 opções fixas
for (let i = 12; i <= 29; i++) {
    perguntas.push({
        tipo: "menu",
        texto: `Pergunta ${i} (editar depois)`,
        opcoes: [
            "Nunca fiz e não tenho vontade",
            "Nunca fiz mas tenho curiosidade",
            "Já fiz e não gostei",
            "Já fiz e repetiria com prazer"
        ]
    });
}

let respostas = [];
let atual = 0;
let enviando = false; // Flag para evitar envios duplicados

function mostrar() {
    const q = perguntas[atual];
    const progressEl = document.getElementById("progress");
    const questionEl = document.getElementById("question-box");
    const optionsEl = document.getElementById("options-box");
    const btnNext = document.getElementById("btn-next");

    if (!progressEl || !questionEl || !optionsEl || !btnNext) {
        console.error("Elementos do quiz não encontrados no HTML.");
        return;
    }

    progressEl.innerText = `Pergunta ${atual + 1} de ${perguntas.length}`;
    questionEl.innerText = q.texto;

    let html = "";

    if (q.tipo === "menu") {
        html = '<select id="sel"><option value="">Selecione...</option>';
        // Cria as opções a partir do array. O valor é o próprio texto da opção.
        html += q.opcoes.map(o => `<option value="${o}">${o}</option>`).join("");
        html += "</select>";
    }
    // Nota: O tipo "checkbox" foi removido daqui para focar na correção do "menu"

    optionsEl.innerHTML = html;

    // Se for a última pergunta, muda o texto do botão
    if (atual === perguntas.length - 1) {
        btnNext.innerText = 'Ver meu Resultado!';
    } else {
        btnNext.innerText = 'Próxima';
    }
}

// *** FUNÇÃO CORRIGIDA ***
function proxima() {
    // 1. Evita cliques múltiplos durante o envio
    if (enviando) return;

    const q = perguntas[atual];
    let resposta = null;

    // O PROBLEMA ESTAVA AQUI: A VALIDAÇÃO
    if (q.tipo === "menu") {
        const sel = document.getElementById("sel");
        // Verifica se o elemento existe E se o valor não é a string vazia ("")
        if (!sel || !sel.value) { 
            alert("ESCOLHA UMA OPCAO para prosseguir."); // Mensagem original mantida
            return;
        }
        resposta = sel.value;
    }

    // Se a validação não for atendida para outros tipos (como checkbox), você deve adicionar o código aqui

    respostas.push(resposta);
    atual++; // Avança para a próxima pergunta

    // 2. Lógica de Encerramento Aprimorada
    if (atual < perguntas.length) {
        mostrar();
    } else {
        // Fim do quiz
        mudarTelaEnviando("Processando suas 30 respostas...");
        enviarRespostas();
    }
}

// 3. FUNÇÃO DE ENVIO MODERNA (usando Fetch em vez de form.submit)
async function enviarRespostas() {
    enviando = true; // Bloqueia mais cliques
    
    // 1. Prepara os dados para o Apps Script
    const formData = new FormData();
    // Seu Apps Script espera o parâmetro 'respostas' contendo o JSON
    formData.append('respostas', JSON.stringify(respostas));

    try {
        const response = await fetch(WEBAPP_URL, {
            method: 'POST',
            body: formData,
        });

        // O Apps Script retorna o HTML de sucesso
        const htmlRetorno = await response.text();
        mudarTelaEnviando(htmlRetorno); // Mostra a resposta do servidor
        
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        mudarTelaEnviando(`
            <h3 style="color:red; margin-top:40px;">Erro de Conexão.</h3>
            <p>Tente novamente ou verifique a URL do Apps Script.</p>
        `);
    } finally {
        enviando = false; // Permite cliques novamente se houver erro
    }
}

// Função para limpar a tela e mostrar status
function mudarTelaEnviando(conteudoHTML) {
    const container = document.getElementById('quiz-container');
    const style = `text-align:center; padding: 50px; height: 300px; display: flex; flex-direction: column; justify-content: center;`;
    
    // Limpa o conteúdo e insere a mensagem/HTML de retorno
    container.innerHTML = `<div style="${style}">${conteudoHTML}</div>`;
}


document.addEventListener("DOMContentLoaded", mostrar);
