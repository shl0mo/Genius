var ordem = []
var ordem_clicks = []
var pontos = 0
var nivel = 0

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const azul = document.querySelector('.azul')
const vermelho = document.querySelector('.vermelho')
const verde = document.querySelector('.verde')
const amarelo = document.querySelector('.amarelo')

const corElemento = (cor) => {
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

const acendeCor = (elemento, number) => {
	number = number * 500
	setTimeout(() => {
		elemento.classList.add('selecionado')
	}, tempo - 250)
	setTimeout(() => {
		elemento.classList.remove('selecionado')
	})
}

const defineOrdem = () => {
	let cor = Math.floor(Math.random() * 4)
	ordem[ordem.length] = cor
	ordem_clicks = []
	for (let i in ordem) {
		let cor_elemento = corElemento(ordem[i])
		acendeCor(cor_elemento, Number(i) + 1)
	}
}


const proximoNivel = () => {
	pontos++
	document.querySelector('.pontuacao').innerText = pontos
	nivel++
	document.querySelector('.nivel').innerText = nivel
	defineOrdem()
}

const iniciaJogo = () => {
	pontos = 0
	proximoNivel()
}

const perdeu = () => {
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

const reiniciaJogo = () => {
	ordem = []
	ordem_clicks = []
	pontos = 0
	iniciaJogo()
}

const verificaOrdem = () => {
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

const click = (cor) => {
	ordem_clicks[ordem_clicks.length] = cor
	corElemento(cor).classList.add('selecionado')
	setTimeout(() => {
		corELemento(cor).classList.remove('selecionado')
		verificaOrdem()
	})
}
