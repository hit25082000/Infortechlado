const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')
var notas = document.getElementById("CriarMusica")
var nome = document.getElementById('NomeMusica')
let TabelaMusicas = document.querySelector(".Musicas tbody")
let volume = document.querySelector("#volume")
var Cronometro;
let LogAcertos = []
let GameLog = []

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this)");
});

document.addEventListener('keydown', (event) => {
    for (let i = 0; i < listaDeTeclas.length; i++) {
        if (event.key == (NotasData[i])) {
            if (!LogAcertos.length) {
                TempoAtual = (new Date()).getTime();
                Cronometro = LogAcertos.push((new Date(0)).getTime());
            }
            else {
                LogAcertos.push(new Date().getTime() - TempoAtual);
            }
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

            console.log("Game", GameLog[i])
            console.log("Data", LogData[i])

            let div = document.createElement('div')

            div.innerHTML = `<div style="z-index:${i}" class="teclaImg teclaImg${i}">${NotasData[i]}</div>`

            listaDeTeclas[NotasData[i] - 1].appendChild(div)

            setTimeout(() => {

                document.querySelector(`.teclaImg${i}`).classList.toggle('gamefic')

                setTimeout(() => {
                    div.remove()
                }, 2000);
            }, GameLog[i])

            setTimeout(() => {
                Reproduzir(listaDeTeclas[NotasData[i] - 1])
                if (i + 1 == NotasData.length) {
                    document.querySelector(".Musicas").classList.remove('gameMode')
                    document.querySelector(".teclado").classList.remove('gameMode')

                    App.reload()
                }
            }, LogData[i] + 2000);

        }
        App.reload()
    },

    Play(index) {
        document.querySelector('.modal-overlay').classList.toggle('active')
        document.querySelector(".Musicas").classList.add('gameMode')
        document.querySelector(".teclado").classList.add('gameMode')
        document.querySelector(".tecla_pom").classList.add("gameMode")
        document.querySelector(".tecla_clap").classList.add("gameMode")
        document.querySelector(".tecla_tim").classList.add("gameMode")
        document.querySelector(".tecla_puff").classList.add("gameMode")
        document.querySelector(".tecla_splash").classList.add("gameMode")
        document.querySelector(".tecla_toim").classList.add("gameMode")
        document.querySelector(".tecla_tic").classList.add("gameMode")
        document.querySelector(".tecla_tom").classList.add("gameMode")
        document.querySelector(".tecla_psh").classList.add("gameMode")
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
                        }, 2000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    },

    Game(index) {
        MusicConfig.ListaMusicas.forEach((musica, i) => {
            if (index == i) {
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

volume.oninput = () => {
    audios.forEach(x => {
        x.volume = .3
    })
}