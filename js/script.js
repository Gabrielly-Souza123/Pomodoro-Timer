let acao = document.getElementById('acao')
let pausa = document.getElementById('pausa')
let sessoes = document.getElementById('sessoes') 
let segundos


var flores = new Audio("./audios/flores-coloridas.mp3") 
var volta = new Audio ("./audios/passaro.mp3")
var final = new Audio ("./audios/sucesso.mp3")

var forest = document.getElementById('forest-lullaby')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

document.getElementById('timer').style.setProperty('display', 'none', 'important')

function pausar_musica(){
    forest.pause()
    play.style.setProperty('display', 'block', 'important')
    pause.style.setProperty('display', 'none', 'important')
}

function executar(){
    forest.play()
    play.style.setProperty('display', 'none', 'important')
    pause.style.setProperty('display', 'block', 'important')
}

function iniciar(){
    if(acao.value == 0){
        document.getElementById('erro-acao').innerHTML = "Adicione os minutos"
        acao.focus()
    } else if(pausa.value == 0){
        document.getElementById('erro-pausa').innerHTML = "Adicione a pausa"
        acao.focus()
    } else if (sessoes.value == 0){
        document.getElementById('erro-sessoes').innerHTML = "Adicione as sessões"
        acao.focus()
    }else{
        forest.play()
        pause.style.setProperty('display', 'block', 'important' )

        localStorage.setItem('acao', String(acao.value))
        localStorage.setItem('pausa', String(pausa.value))
        localStorage.setItem('sessoes', String(sessoes.value))

        document.getElementById('configuracoes').style.setProperty('display', 'none', 'important')
        document.getElementById('timer').style.setProperty('display', 'block', 'important')

        momentoAcao()
    }

}

function momentoAcao(){

    let sessoes_valor = localStorage.getItem('sessoes')

    if(localStorage.getItem('sessoes') != '1'){
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
    }else{
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
    }

    let title = document.getElementById('title')
    title.innerHTML = "AÇÃO"
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#28a74', 'important')

    min = Number(localStorage.getItem('acao'))

    min = min - 1
    segundos = 59 

    document.getElementById('minutos-ok').innerHTML = min
    document.getElementById('segundos-ok').innerHTML = segundos

    var min_intervalo = setInterval(minTimer, 60000)
    var seg_intervalo = setInterval(segTimer, 1000)

    function minTimer(){
        min = min - 1
        document.getElementById('minutos-ok').innerHTML = min
    }

    function segTimer(){
        segundos = segundos- 1
        document.getElementById('segundos-ok').innerHTML = segundos

        if(segundos <= 0 ){
            if(min <= 0){
                clearInterval(min_intervalo)
                clearInterval(seg_intervalo)

                flores.play();

                momentoPausa();
            }
            segundos = 60
        }
    }

}


function momentoPausa(){
    let title = document.getElementById('title')
    title.innerHTML = "PAUSA"
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#dc3545', 'important')
    pausar_musica()
    
    min_pausa = Number(localStorage.getItem('pausa'))

    min_pausa = min_pausa - 1
    segundos = 59 

    document.getElementById('minutos-ok').innerHTML = min_pausa
    document.getElementById('segundos-ok').innerHTML = segundos

    
    var min_intervalo = setInterval(minTimer, 60000)
    var seg_intervalo = setInterval(segTimer, 1000)

    function minTimer(){
        min_pausa = min_pausa - 1
        document.getElementById('minutos-ok').innerHTML = min_pausa
    }

    function segTimer(){
        segundos = segundos- 1
        document.getElementById('segundos-ok').innerHTML = segundos

        if(segundos <= 0 ){
            if(min <= 0){
                ses = Number(localStorage.getItem('sessoes'))
                ses = ses -1 
                localStorage.setItem('sessoes', String(ses))

                clearInterval(min_intervalo)
                clearInterval(seg_intervalo)

                if(ses <= 0){
                    final.play()
                    localStorage.clear()

                    document.getElementById('configuracoes').style.setProperty('display', 'none', 'important')
                    document.getElementById('timer').style.setProperty('display', 'none', 'important')
                    document.getElementById('fim').style.setProperty('display', 'block', 'important')

                }else{
                    volta.play();
                    momentoAcao()
                }
            }
            segundos = 60
        }
    }


}