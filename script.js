const perguntas = [
  {
    enunciado: "Como você se sente ao pensar no ENEM e no seu futuro?",
    alternativas: [
      {
        texto: "Fico preocupado(a) com o que pode acontecer.",
        afirmacao:
          "Você sente certa preocupação com o futuro. Pesquisar possibilidades e organizar seus estudos pode ajudar a trazer mais segurança."
      },
      {
        texto: "Fico motivado(a) para conquistar meus objetivos.",
        afirmacao:
          "Você demonstra motivação para construir seu futuro e buscar novas oportunidades."
      }
    ]
  },
  {
    enunciado: "Como você se prepara para o ENEM?",
    alternativas: [
      {
        texto: "Estudo quando tenho tempo ou quando a prova se aproxima.",
        afirmacao:
          "Criar uma rotina de estudos pode ajudar você a ganhar confiança e melhorar sua preparação."
      },
      {
        texto: "Organizo meus horários e estabeleço metas.",
        afirmacao:
          "Você valoriza o planejamento e demonstra compromisso com seus objetivos."
      }
    ]
  },
  {
    enunciado: "Qual é sua reação diante de novas tecnologias, como a inteligência artificial?",
    alternativas: [
      {
        texto: "Tenho receio de como elas podem afetar o futuro.",
        afirmacao:
          "Você se preocupa com as mudanças tecnológicas. Buscar informações confiáveis pode ajudar a compreender seus impactos."
      },
      {
        texto: "Tenho curiosidade para aprender a utilizá-las.",
        afirmacao:
          "Você demonstra curiosidade e abertura para aprender habilidades importantes para o futuro."
      }
    ]
  },
  {
    enunciado: "Você já pensou no curso ou na profissão que deseja seguir?",
    alternativas: [
      {
        texto: "Ainda tenho dúvidas sobre qual caminho escolher.",
        afirmacao:
          "Você está em uma fase de descoberta. Conhecer cursos e profissões pode ajudar na sua decisão."
      },
      {
        texto: "Já tenho algumas opções e pesquiso sobre elas.",
        afirmacao:
          "Você está explorando possibilidades e buscando informações para tomar decisões conscientes."
      }
    ]
  },
  {
    enunciado: "O que você faria se encontrasse dificuldades na preparação para o ENEM?",
    alternativas: [
      {
        texto: "Poderia desanimar e ter dificuldade para continuar.",
        afirmacao:
          "Reconhecer as dificuldades é importante. Dividir os estudos em pequenas metas pode ajudar você a continuar."
      },
      {
        texto: "Tentaria outras estratégias e aprenderia com meus erros.",
        afirmacao:
          "Você demonstra disposição para aprender com os desafios e buscar novas maneiras de alcançar seus objetivos."
      }
    ]
  }
];

let perguntaAtual = 0;
let respostas = [];

const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");
const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const contador = document.getElementById("contador");
const porcentagem = document.getElementById("porcentagem");
const barra = document.getElementById("barraProgresso");
const feedback = document.getElementById("feedback");
const botaoProximo = document.getElementById("botaoProximo");

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];

  perguntaElemento.textContent = pergunta.enunciado;
  alternativasElemento.innerHTML = "";
  feedback.textContent = "";
  botaoProximo.disabled = true;

  const numero = perguntaAtual + 1;
  const progresso = Math.round(
    (numero / perguntas.length) * 100
  );

  contador.textContent =
    `Pergunta ${numero} de ${perguntas.length}`;

  porcentagem.textContent = `${progresso}%`;
  barra.style.width = `${progresso}%`;

  botaoProximo.textContent =
    perguntaAtual === perguntas.length - 1
      ? "Ver resultado"
      : "Próxima pergunta";

  pergunta.alternativas.forEach((alternativa, indice) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "alternativa";

    const letra = document.createElement("span");
    letra.className = "letra";
    letra.textContent = indice === 0 ? "A" : "B";

    botao.appendChild(letra);
    botao.appendChild(
      document.createTextNode(alternativa.texto)
    );

    botao.addEventListener("click", () => {
      selecionarResposta(indice);
    });

    alternativasElemento.appendChild(botao);
  });
}

function selecionarResposta(indice) {
  // Impede selecionar mais de uma resposta por pergunta.
  if (respostas[perguntaAtual] !== undefined) {
    return;
  }

  respostas[perguntaAtual] = indice;

  const alternativaEscolhida =
    perguntas[perguntaAtual].alternativas[indice];

  const botoes =
    alternativasElemento.querySelectorAll(".alternativa");

  botoes.forEach((botao, i) => {
    botao.disabled = true;

    if (i === indice) {
      botao.classList.add("selecionada");
    }
  });

  // Mostra a afirmação correspondente à resposta escolhida.
  feedback.textContent = alternativaEscolhida.afirmacao;

  botaoProximo.disabled = false;
}

function proximaPergunta() {
  if (respostas[perguntaAtual] === undefined) {
    return;
  }

  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  quiz.hidden = true;
  resultado.hidden = false;

  document.getElementById("tituloResultado").textContent =
    "Seu caminho para o futuro";

  document.getElementById("textoResultado").textContent =
    "Cada resposta revela uma maneira de pensar sobre o ENEM, " +
    "as novas tecnologias e suas perspectivas para o futuro.";

  const detalhes = respostas.map((indice, numero) => {
    const pergunta = perguntas[numero];
    const alternativa = pergunta.alternativas[indice];

    return `Pergunta ${numero + 1}: ${alternativa.afirmacao}`;
  });

  document.getElementById("detalhesResultado").textContent =
    detalhes.join(" ");
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  respostas = [];

  quiz.hidden = false;
  resultado.hidden = true;

  mostrarPergunta();
}

botaoProximo.addEventListener("click", proximaPergunta);

document
  .getElementById("botaoReiniciar")
  .addEventListener("click", reiniciarQuiz);

mostrarPergunta();