const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')
let TabelaMusicas = document.querySelector(".Musicas tbody")
let logAcertos = []
let GameLog = []
let musicaTocando;
let acerto;
let pontuacao = [];

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "reproduzir(this)");
    tecla.classList.toggle("gameMode")
    document.querySelector(".teclado").classList.toggle('gameMode')
});

document.addEventListener('keydown', (event) => {
    for (let i = 0; i < listaDeTeclas.length; i++) {

        if (event.key.toLowerCase() == listaDeTeclas[i].id || event.code.toLowerCase() == listaDeTeclas[i].id) {

            anime(listaDeTeclas[i], 'act')


            acerto = (new Date().getTime() - TempoAtual);
            logAcertos.push(acerto)


            let proxLog = musicaTocando.Log.find(x => x >= acerto)
            let proxNota = musicaTocando.Notas.find(x => x === musicaTocando.Notas[musicaTocando.Log.indexOf(proxLog)])

            if (i + 1 == proxNota && acerto <= proxLog && acerto >= proxLog - 250) {
                console.log("ACERTOU: ", acerto, "Log: ", proxLog, "Nota", proxNota)

                let div = document.querySelector(`.teclaImg${musicaTocando.Log.indexOf(proxLog)}`)
                div.style.background = "red"
                div.style.transition = "none"
                pontuacao++

                console.log(pontuacao)
            } else {
                pontuacao--
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

    tocaMusica(NotasData, LogData) {
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
                }, 5000);
            }, GameLog[i])

            setTimeout(() => {
                reproduzir(listaDeTeclas[NotasData[i] - 1])
                if (i == NotasData.length - 1) {
                    document.querySelector(".Musicas").classList.toggle('gameMode')

                    App.reload()
                }
                if (i == 0) {
                    TempoAtual = new Date().getTime();
                }
            }, LogData[i] + 5000);

        }
        App.reload()
    },

    play(index) {
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
                            MusicConfig.procuraMusica(index)
                        }, 0);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    },

    procuraMusica(index) {
        MusicConfig.ListaMusicas.forEach((musica, i) => {
            if (index == i) {
                musicaTocando = musica
                MusicConfig.tocaMusica(musica.Notas, musica.Log)
            }
        });
    },

    remove(index) {
        MusicConfig.ListaMusicas.splice(index, 1)
        App.reload()
    },

    ListaMusicas: Storage.get()
}

function anime(element, classe) {
    element.classList.add(classe)
    setTimeout(() => {
        element.classList.remove(classe)
    }, 200);
}

function reproduzir(tecla) {
    let som = tecla.getAttribute("data-id")
    if (document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime > 0) {
        document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime = 0
    }
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
}

function exibir(musica, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td onclick="MusicConfig.play(${index})" style="cursor: pointer;" >${musica.Name} </td>
    <td onclick="MusicConfig.remove(${index})" style="cursor: pointer;">
     <img width="5" heigh="5"  src="./images/657059.png" alt=""> 
     </td>
    `
    TabelaMusicas.appendChild(tr)
}

const App = {
    init() {
        Storage.set(MusicConfig.ListaMusicas)
        MusicConfig.ListaMusicas.forEach(exibir)
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
