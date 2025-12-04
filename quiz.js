let perguntas = [
  // 1 a 6 -> menu para você preencher depois
  { tipo: "menu", texto: "Pergunta 1", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 2", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 3", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 4", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 5", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 6", opcoes: ["", "", ""] },

  // 7 a 11 -> checkbox para você preencher depois
  { tipo: "checkbox", texto: "Pergunta 7", opcoes: ["", "", "", ""] },
  { tipo: "checkbox", texto: "Pergunta 8", opcoes: ["", "", "", ""] },
  { tipo: "checkbox", texto: "Pergunta 9", opcoes: ["", "", "", ""] },
  { tipo: "checkbox", texto: "Pergunta 10", opcoes: ["", "", "", ""] },
  { tipo: "checkbox", texto: "Pergunta 11", opcoes: ["", "", "", ""] },

  // 12 a 29 -> menu suspenso com opções fixas
  ...Array.from({ length: 18 }, (_, i) => ({
    tipo: "menu",
    texto: `Pergunta ${i + 12}`,
    opcoes: [
      "Nunca fiz e não tenho vontade",
      "Nunca fiz mas tenho curiosidade",
      "Já fiz e não gostei",
      "Já fiz e repetiria com prazer"
    ]
  }))
];

let respostas = [];
let atual = 0;

function mostrar() {
  const q = perguntas[atual];
  document.getElementById("progress").innerText = `Pergunta ${atual + 1} de ${perguntas.length}`;
  document.getElementById("question-box").innerText = q.texto;

  let html = "";

  if (q.tipo === "menu") {
    html += `<select onchange="respostaMenu(this.value)">
      <option value="">Selecione...</option>
      ${q.opcoes.map(o => `<option value="${o}">${o}</option>`).join("")}
    </select>`;
  }

  if (q.tipo === "checkbox") {
    html += q.opcoes.map((o, i) => `
      <label><input type="checkbox" id="c${i}" value="${o}"> ${o}</label>
    `).join("");
  }

  document.getElementById("options-box").innerHTML = html;
}

function respostaMenu(v) {
  if (v !== "") {
    respostas.push(v);
    proxima();
  }
}

function proxima() {
  const q = perguntas[atual];

  if (q.tipo === "checkbox") {
    const marcados = [...document.querySelectorAll("input[type=checkbox]:checked")].map(x => x.value);
    if (marcados.length === 0) {
      alert("Selecione ao menos uma opção.");
      return;
    }
    respostas.push(marcados);
  }

  atual++;
  if (atual < perguntas.length) {
    mostrar();
  } else {
    finalizar();
  }
}

function finalizar() {
  document.getElementById("quiz-container").innerHTML = `
    <h2>Quiz finalizado!</h2>
    <p>As respostas foram registradas localmente.</p>
    <button onclick="location.reload()">Refazer</button>
  `;
}

mostrar();
