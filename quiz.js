let perguntas = [
  { tipo: "menu", texto: "Pergunta 1", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 2", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 3", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 4", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 5", opcoes: ["", "", ""] },
  { tipo: "menu", texto: "Pergunta 6", opcoes: ["", "", ""] },

  { tipo: "checkbox", texto: "Pergunta 7", opcoes: ["", "", "", ""] },
  { tipo: "checkbox", texto: "Pergunta 8", opcoes: ["", "", "", ""] },
  { tipo: "checkbox", texto: "Pergunta 9", opcoes: ["", "", "", ""] },
  { tipo: "checkbox", texto: "Pergunta 10", opcoes: ["", "", "", ""] },
  { tipo: "checkbox", texto: "Pergunta 11", opcoes: ["", "", "", ""] },
];

for (let i = 12; i <= 29; i++) {
  perguntas.push({
    tipo: "menu",
    texto: `Pergunta ${i}`,
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

function mostrar() {
  const q = perguntas[atual];
  document.getElementById("progress").innerText =
    `Pergunta ${atual + 1} de ${perguntas.length}`;
  document.getElementById("question-box").innerText = q.texto;

  let html = "";

  if (q.tipo === "menu") {
    html = `
      <select id="sel">
        <option value="">Selecione...</option>
        ${q.opcoes.map(o => `<option>${o}</option>`).join("")}
      </select>
    `;
  } else {
    html = q.opcoes.map(o =>
      `<label><input type="checkbox" value="${o}"> ${o}</label>`
    ).join("");
  }

  document.getElementById("options-box").innerHTML = html;
}

function proxima() {
  const q = perguntas[atual];

  if (q.tipo === "menu") {
    let v = document.getElementById("sel").value;
    if (!v) {
      alert("Selecione uma opção!");
      return;
    }
    respostas.push(v);
  } else {
    let marcados = [...document.querySelectorAll("input:checked")]
      .map(e => e.value);
    if (marcados.length === 0) {
      alert("Selecione pelo menos uma opção!");
      return;
    }
    respostas.push(marcados);
  }

  atual++;
  if (atual < perguntas.length) mostrar();
  else finalizar();
}

function finalizar() {
  document.getElementById("quiz-container").innerHTML = `
    <h2>Quiz Finalizado!</h2>
    <p>Respostas salvas.</p>
  `;
}

mostrar();
