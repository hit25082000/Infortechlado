const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')
const corFundo = document.querySelectorAll('.corFundo')
var notas = document.getElementById("CriarMusica")
var nome = document.getElementById('NomeMusica')
let TabelaMusicas = document.querySelector(".Musicas tbody")
let volume = document.querySelector("#volume")
var Cronometro;
let LogAcertos = []
let GameLog = []
let musicaTocando;

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this)");
});

document.querySelector(".teclado").classList.toggle('gameMode')
document.querySelector(".tecla_pom").classList.toggle("gameMode")
document.querySelector(".tecla_clap").classList.toggle("gameMode")
document.querySelector(".tecla_tim").classList.toggle("gameMode")
document.querySelector(".tecla_puff").classList.toggle("gameMode")
document.querySelector(".tecla_splash").classList.toggle("gameMode")
document.querySelector(".tecla_toim").classList.toggle("gameMode")
document.querySelector(".tecla_tic").classList.toggle("gameMode")
document.querySelector(".tecla_tom").classList.toggle("gameMode")
document.querySelector(".tecla_psh").classList.toggle("gameMode")



document.addEventListener('keydown', (event) => {
    for (let i = 0; i < listaDeTeclas.length; i++) {

        if (event.key.toLowerCase() == listaDeTeclas[i].id) {
            corFundo[i].classList.add('act')
            setTimeout(() => {
                corFundo[i].classList.remove('act')
            }, 200);

            if (!LogAcertos.length) {
                TempoAtual = (new Date()).getTime();
                Cronometro = LogAcertos.push((new Date(0)).getTime());
            }
            else {
                LogAcertos.push(new Date().getTime() - TempoAtual);
            }
            console.log(i + 1)
            console.log(musicaTocando.Notas[i])
            if (i + 1 == musicaTocando.Notas[i]) {
                if (LogAcertos[i] <= musicaTocando.Log[i] && LogAcertos[i] >= musicaTocando.Log[i] - 250) {
                    console.log("Acertos: ", LogAcertos[i], "Log: ", musicaTocando.Log[i])
                }
            }
        }

        if (event.code.toLowerCase() == listaDeTeclas[i].id) {
            corFundo[i].classList.add('act')
            setTimeout(() => {
                corFundo[i].classList.remove('act')
            }, 200);
        }
    }
}, false);

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("MusicConfig")) || []
    },

    set(musicas) {
        localStorage.setItem("MusicConfig", JSON.stringify(musicas))
    }
}

const MusicConfig = {

    TocaMusica(NotasData, LogData) {
        for (let i = 0; i < NotasData.length; i++) {
            GameLog.push(LogData[i])

            GameLog[0] = 100

            let div = document.createElement('div')

            div.innerHTML = `<div  class="teclaImg teclaImg${i}">${NotasData[i]}</div>`

            listaDeTeclas[NotasData[i] - 1].append(div)

            setTimeout(() => {
                document.querySelector(`.teclaImg${i}`).classList.toggle('gamefic')

                setTimeout(() => {
                    div.remove()
                }, 2000);
            }, GameLog[i])

            setTimeout(() => {
                Reproduzir(listaDeTeclas[NotasData[i] - 1])
                if (i == NotasData.length - 1) {
                    document.querySelector(".Musicas").classList.toggle('gameMode')

                    App.reload()
                }
            }, LogData[i] + 2000);

        }
        App.reload()
    },

    Play(index) {
        document.querySelector(".Musicas").classList.toggle('gameMode')
        document.querySelector('.modal-overlay').classList.toggle('active')

        document.querySelector(".modal").innerHTML = 3
        setTimeout(() => {
            document.querySelector(".modal").innerHTML = 2
            setTimeout(() => {
                document.querySelector(".modal").innerHTML = 1
                setTimeout(() => {
                    document.querySelector(".modal").innerHTML = "START"
                    setTimeout(() => {
                        document.querySelector('.modal-overlay').classList.toggle('active')
                        setTimeout(() => {
                            MusicConfig.Game(index)
                        }, 0);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    },

    Game(index) {
        MusicConfig.ListaMusicas.forEach((musica, i) => {
            if (index == i) {
                musicaTocando = musica
                MusicConfig.TocaMusica(musica.Notas, musica.Log)
            }
        });
    },

    Remove(index) {
        MusicConfig.ListaMusicas.splice(index, 1)
        App.reload()
    },

    ListaMusicas: Storage.get()
}

function Reproduzir(tecla) {
    let som = tecla.getAttribute("data-id")
    if (document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime > 0) {
        document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime = 0
    }
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
}

function Exibir(musica, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td onclick="MusicConfig.Play(${index})" style="cursor: pointer;" >${musica.Name} </td>
    <td onclick="MusicConfig.Remove(${index})" style="cursor: pointer;">
     <img width="5" heigh="5"  src="./images/657059.png" alt=""> 
     </td>
    `
    TabelaMusicas.appendChild(tr)
}

const App = {
    init() {
        Storage.set(MusicConfig.ListaMusicas)
        MusicConfig.ListaMusicas.forEach(Exibir)
    },

    reload() {
        TabelaMusicas.innerHTML = ""
        App.init()
    }
}

App.init()

audios.forEach(x => {
    x.volume = .3
})
