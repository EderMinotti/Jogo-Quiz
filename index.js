const containerPergunta = document.getElementById("local-pergunta");
const botaoProxima = document.getElementById("proxima");
let pontos = 0;
let totalPerguntas = 1;

let numerosSorteados = [];



function sortearNumero() {
    return parseInt(Math.random() * 50);
}




const indiceAtual = sortearNumero()




mostrarPergunta(indiceAtual);


function mostrarPergunta(indice) {

    containerPergunta.innerHTML = "";
    const perguntaObj = listaPerguntas[indice]

    let pergunta = document.createElement("h2");
    pergunta.classList.add("pergunta");
    pergunta.innerText = perguntaObj.pergunta;
    containerPergunta.appendChild(pergunta);


    mostrarAlternativas(perguntaObj);


}

function mostrarAlternativas(perguntaObj) {

    const listaRespostas = document.querySelector(".lista-respostas");
    listaRespostas.innerHTML = "";

    perguntaObj.alternativas.forEach(alternativa => {
        const listaAlternativas = document.createElement("li");
        listaAlternativas.classList.add("item-lista");

        const botao = document.createElement("button");
        botao.type = "button";
        botao.innerText = "escolha"
        botao.style.display = "none";

        const paragrafoPergunta = document.createElement("p");
        paragrafoPergunta.innerText = alternativa;
        paragrafoPergunta.style.cursor = "pointer";

        listaAlternativas.appendChild(paragrafoPergunta);
        listaRespostas.appendChild(listaAlternativas);
        listaAlternativas.appendChild(botao);


        listaAlternativas.addEventListener("click", (evento) => {

            if (evento.target.innerText == perguntaObj.resposta) {
                listaAlternativas.style.backgroundImage = "var(--verde-metalico)";
                botaoProxima.style.display = "block";
                pontos++
                pontosJogo();


            } else {
                listaAlternativas.style.backgroundImage = "var(--vermelho-metalico)";
                botaoProxima.style.display = "block"
            }
        })
    });

}

function perguntaQuantidade() {
    let perguntas = document.querySelector(".perguntas");
    perguntas.innerText = `Pergunta: ${totalPerguntas}`;
}


botaoProxima.addEventListener("click", () => {
    let novoIndice = sortearNumero();
    mostrarPergunta(novoIndice);
    botaoProxima.style.display = "none"
    numerosSorteados.push(novoIndice);
    totalPerguntas++
    perguntaQuantidade();
    

    if (totalPerguntas == 6) {
        const sectionQuiz = document.querySelector(".quiz");
        sectionQuiz.style.display = "none"

        const fimDeJogo = document.querySelector(".fim-de-jogo");
        fimDeJogo.style.display = "block"
        const acertos = document.getElementById("acertos");
        acertos.innerText = `Total de acertos ${pontos}`
        let perguntas = document.querySelector(".perguntas");
        perguntas.style.display = "none";
    }
})



function pontosJogo() {
    let pontuacao = document.querySelector(".pontos");
    pontuacao.innerText = `Pontos: ${pontos}`;
}


const botaoNovoJogo = document.getElementById("button_novoJogo")
botaoNovoJogo.addEventListener("click", () => {
    totalPerguntas = 1;
    pontos = 0;
    numerosSorteados = []

    const novoIndice = sortearNumero();
    mostrarPergunta(novoIndice);
    pontosJogo();
    perguntaQuantidade();

    document.querySelector(".quiz").style.display = "block";
    document.querySelector(".fim-de-jogo").style.display = "none";
})
