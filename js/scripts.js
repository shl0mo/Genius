var ordem = []
var ordem_clicks = []
var pontos = 0
var nivel = 0
var iniciou = false
var perdeu = false

const corElemento = (cor) => {
	if (cor == 0) {
		return document.querySelector('.verde')
	} else if (cor  == 1) {
		return document.querySelector('.vermelho')
	} else if (cor == 2) {
		return document.querySelector('.amarelo')
	} else {
		return document.querySelector('.azul')
	}
}

const acendeCor = (elemento, tempo) => {
	tempo = tempo * 500
	setTimeout(() => {
		elemento.classList.add('selecionado')
	}, tempo - 250)
	setTimeout(() => {
		elemento.classList.remove('selecionado')
	}, tempo)
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
	if (!perdeu) {
		pontos = pontos + 10
		document.querySelector('.pontuacao').innerText = pontos
		nivel++
		document.querySelector('.nivel').innerText = nivel
		defineOrdem()
	}
}

const iniciaJogo = () => {
	if (!iniciou) {
		pontos = 0
		nivel = 0
		iniciou = true
		perdeu = false
		if (document.querySelector('.circulo').children.length > 0) {
			document.querySelector('.circulo').children[0].remove()
		}
		defineOrdem()
	}
}

const gameOver = () => {
	perdeu = true
	if (!document.contains(document.querySelector('.container-perdeu'))) {
		let container_perdeu = document.createElement('div')
		container_perdeu.className = 'container-perdeu'
		let conteudo_container_perdeu = `
			<div class="box-label-perdeu">
				<span class="label-perdeu">VOCÊ PERDEU</span>
			</div>
			<div class="box-botao-reiniciar">
				<button class="botao-reiniciar" onclick="reiniciaJogo()">Reiniciar o jogo</button>
			</div>
		`
		container_perdeu.innerHTML = conteudo_container_perdeu.trim()
		document.querySelector('.container-genius').append(container_perdeu)
	}
}

const reiniciaJogo = () => {
	ordem = []
	ordem_clicks = []
	pontos = 0
	nivel = 0
	document.querySelector('.pontuacao').innerText = pontos
	document.querySelector('.nivel').innerText = nivel
	document.querySelector('.container-perdeu').remove()
	iniciou = false
	iniciaJogo()
}

const verificaOrdem = () => {
	for (let i in ordem_clicks) {
		if (ordem_clicks[i] != ordem[i]) {
			gameOver()
			break
		}
	}
	if (ordem_clicks.length == ordem.length) {
		document.querySelector('.pontuacao').innerText = pontos
		proximoNivel()
	}
}

let intervalo = setInterval(() => {
	console.log('intervalo')
	const click = (cor, tempo) => {
		console.log('clicado')
		tempo = tempo * 500
		ordem_clicks[ordem_clicks.length] = cor
		corElemento(cor).classList.add('selecionado')
		setTimeout(() => {
			corElemento(cor).classList.remove('selecionado')
			verificaOrdem()
		}, tempo - 250)
	}
	if (document.contains(document.querySelector('.azul')) && iniciou) { 
		document.getElementsByClassName('verde')[0].addEventListener('click', () => click(0), false)	
		document.getElementsByClassName('vermelho')[0].addEventListener('click', () => click(1), false)
		document.getElementsByClassName('amarelo')[0].addEventListener('click', () => click(2), false)
		document.getElementsByClassName('azul')[0].addEventListener('click', () => click(3), false)
		clearInterval(intervalo)
	}
}, 500)


intervalo





