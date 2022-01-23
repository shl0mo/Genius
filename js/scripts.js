let ordem = [];
let ordem_clicks = [];
let pontos = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const azul = document.querySelector('.azul')
const vermelho = document.querySelector('.vermelho')
const verde = document.querySelector('.verde')
const amarelo = document.querySelector('.amarelo')

let ciraCorElemento = (cor) => {
	if (cor == 0) {
		return verde
	} else if (cor  == 1) {
		return vermelho
	} else if (cor == 2) {
		return amarelo
	} else {
		return azul
	}
}

let acendeCor = (elemento, number) => {
	let tempo = tempo * 500
	setTimeout(() => {
		elemento.classList.add('selecionado')
	}, tempo - 250)
	setTimeout(() => {
		elemento.classList.remove('selecionado')
	}, tempo)
}

let ordemRodada = () => {
	let cor = Math.floor(Math.random * 4)
	ordem[ordem.length] = cor
	ordem_clicks = []
	for (let i in ordem) {
		let cor_elemento = criaCorElemento(ordem[i])
		acendeCor(cor_elemento, Number[i] + 1)
	}
}

let proximoNivel = () => {
	pontos++
	embaralhaCores()
}

let perdeu = () => {
	let container_perdeu = document.createElement('div')
	container_perdeu.className = 'container-perdeu'
	let conteudo_container_perdeu = `
		<div class="box-label-perdeu">
			<span class="label-perdeu">Você perdeu</span>
		</div>
		<div class="box-botao-reiniciar">
			<button class="botaoReiniciar">Reiniciar o jogo</button>
		</div>
	`
	container_perdeu.innerHTML = conteudo_container_perdeu.trim()
	document.querySelector('.container-genius').append(container_perdeu)
}

let reiniciaJogo = () => {
	ordem = []
	ordem_clicks = []
	pontos = 0
	iniciaJogo()
}

let verificaCor = () => {
	for (let i in ordem_clicks) {
		if (ordem_clicks[i] != ordem[i]) {
			perdeu()
			break
		}
	}
	if (ordem_clicks.length == ordem.length) {
		document.querySelector('.pontuacao').innerText = pontos
		proximoNivel()
	}
}

let click = (cor) => {
	ordem_clicks[ordem_clicks.length] = cor
	cor_elemento[cor].classList.add('selecionado')
	setTimeout(() => {
		cor_elemento[cor].classList.remove('selecionado')
	})
	verificaOrdem()
}
