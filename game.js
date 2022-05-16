const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')
let tabelaMusicas = document.querySelector(".Musicas tbody")
let tabelaRanks = document.querySelector(".Ranks tbody")
let gameBG = document.querySelector("#gameBG")
let thunder = document.querySelector("#thunder")
let logAcertos = []
let GameLog = []
var musicaTocando = {
    Log: [],
    Notas: []
};
let pontos = 0;
let acerto;

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "reproduzir(this)");
    tecla.classList.toggle("gameMode")
    document.querySelector(".teclado").classList.toggle('gameMode')
});
document.addEventListener('keydown', (event) => {
    for (let i = 0; i < listaDeTeclas.length; i++) {
        if (event.key.toLowerCase() == listaDeTeclas[i].id || event.code.toLowerCase() == listaDeTeclas[i].id) {
            anime(listaDeTeclas[i], 'act', 200)
            reproduzir(listaDeTeclas[i])

            acerto = (new Date().getTime() - TempoAtual);

            let proxLog = musicaTocando.Log.find(x => x >= acerto)
            let passLog = musicaTocando.Log.find(x => x <= acerto)
            let proxNota = musicaTocando.Notas.find(x => x === musicaTocando.Notas[musicaTocando.Log.indexOf(proxLog)])

            if (acerto >= proxLog - 300) {//Acerto PERFEITO
                if (i + 1 == proxNota) {

                    musicaTocando.Notas.splice(musicaTocando.Log.indexOf(proxLog), 1)
                    musicaTocando.Log.splice(musicaTocando.Log.indexOf(proxLog), 1)

                    anime(listaDeTeclas[i], 'perfeito', 200)

                    logAcertos.push(3)
                    if ((logAcertos[logAcertos.length - 2]) > 0 && (logAcertos[logAcertos.length - 3]) > 0) {
                        let div = document.createElement("div")
                        div.innerHTML = `
                        <div class="teclaImg teclaImg${i}" ><img id="thunder" width="300px" src="images/home-unyc.gif"></div > 
                        `
                        gameBG.classList.add("combo")
                        anime(listaDeTeclas[i], "comboTecla", 200)
                        listaDeTeclas[proxNota - 1].appendChild(div)
                        setTimeout(() => {
                            div.remove()
                        }, 500);
                    }
                } else {
                    gameBG.classList.remove("combo")
                    logAcertos.push(0)
                }
            } else if (acerto >= proxLog - 1000) {//Acerto BOM
                if (i + 1 == proxNota) {

                    musicaTocando.Notas.splice(musicaTocando.Log.indexOf(proxLog), 1)
                    musicaTocando.Log.splice(musicaTocando.Log.indexOf(proxLog), 1)

                    anime(listaDeTeclas[i], 'bom', 200)

                    logAcertos.push(1)

                } else {
                    logAcertos.push(0)

                }
            }

        }
    }
}, false);

const Storage = {
    getMusica() {
        return JSON.parse(localStorage.getItem("MusicConfig")) || []
    },

    getRank() {
        return JSON.parse(localStorage.getItem("Ranks")) || []
    },

    setMusica(musicas) {
        localStorage.setItem("MusicConfig", JSON.stringify(musicas))
    },
    setRank(rank) {
        localStorage.setItem("Ranks", JSON.stringify(rank))
    }
}

const MusicConfig = {

    tocaMusica(NotasData, LogData, Name) {
        for (let i = 0; i < NotasData.length; i++) {

            musicaTocando.Log.push(LogData[i])
            musicaTocando.Notas.push(NotasData[i])
            musicaTocando.Name = Name

            GameLog.push(LogData[i])

            GameLog[0] = 100

            let div = document.createElement('div')

            div.innerHTML = `<div class="teclaImg teclaImg${i}">${NotasData[i]}</div>`

            listaDeTeclas[NotasData[i] - 1].append(div)

            setTimeout(() => {
                document.querySelector(`.teclaImg${i}`).classList.toggle('gamefic')

                if (i == 0) {
                    TempoAtual = new Date().getTime() + 5000;
                }
                setTimeout(() => {
                    div.remove()
                }, 5000);
            }, GameLog[i])

            setTimeout(() => {
                if (i == NotasData.length - 1) {
                    setTimeout(() => {
                        logAcertos.forEach((e, i) => {
                            if (logAcertos[i] > 0)
                                pontos += e
                            if (logAcertos[i] > 0 && logAcertos[i + 1] > 0)
                                pontos += e * 2
                            if (logAcertos[i] > 0 && logAcertos[i + 1] > 0 && logAcertos[i + 2] > 0)
                                pontos += e * 3
                            if (logAcertos[i] > 0 && logAcertos[i + 1] > 0 && logAcertos[i + 2] > 0 && logAcertos[i + 3] > 0)
                                pontos += e * 4
                        });

                        document.querySelector(".Musicas").classList.toggle('gameMode')
                        document.querySelector(".Ranks").classList.toggle('gameMode')
                        document.querySelector('.modal-overlay').classList.toggle('active')

                        document.querySelector(".modalRank").innerHTML = `
                        <h2>CLASSIFICAÇÃO</h2>
                        <p> Voçe fez: <strong style="color:red"> ${pontos}</strong> pontos </p>
                        <p>Na musica: <strong style="color:red">${musicaTocando.Name}</strong></p>
                        <label for="NomeUsuario" class="labelNomeUsuario">Insira seu nome e salve seu resultado</label>
                        <input type="text" id="NomeUsuario" placeholder=""><br>
                        <input type="button" id="SalvarRank" onclick="SalvarRank(this)" value="Salvar">`

                    }, 2000);
                }
            }, LogData[i] + 5000);

        }
        App.reload()
    },

    play(index) {
        document.querySelector(".Musicas").classList.toggle('gameMode')
        document.querySelector(".Ranks").classList.toggle('gameMode')
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
                        document.querySelector(".modal").innerHTML = ""
                        setTimeout(() => {
                            MusicConfig.procuraMusica(index)
                            logAcertos = []
                        }, 0);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    },

    procuraMusica(index) {
        MusicConfig.listaMusicas.forEach((musica, i) => {
            if (index == i) {
                MusicConfig.tocaMusica(musica.Notas, musica.Log, musica.Name)
            }
        });
    },

    removeMusica(index) {
        MusicConfig.listaMusicas.splice(index, 1)
        App.reload()
    },
    removeRank(index) {
        MusicConfig.listaRanks.splice(index, 1)
        App.reload()
    },

    listaMusicas: Storage.getMusica(),

    listaRanks: Storage.getRank()
}

function anime(element, classe, time) {
    element.classList.add(classe)
    setTimeout(() => {
        element.classList.remove(classe)
    }, time);
}

function reproduzir(tecla) {
    let som = tecla.getAttribute("data-id")
    if (document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime > 0) {
        document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime = 0
    }
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
}

function exibirMusicas(musica, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
                                <td onclick="MusicConfig.play(${index})" style="cursor: pointer;" >${musica.Name} </td>
                                <td onclick="MusicConfig.removeMusica(${index})" style="cursor: pointer;">
                                    <img width="5" heigh="5" src="./images/657059.png" alt="">
                                </td>
                                `
    tabelaMusicas.appendChild(tr)
}

function exibirRanks(rank, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
                                <td> ${rank.nome} </td>
                                <td> ${rank.musica} </td>
                                <td onclick="MusicConfig.removeRank(${index})">  ${rank.pontos} </td>`

    tabelaRanks.appendChild(tr)
}

class Rank {
    constructor(pontos, nome, musica) {
        this.nome = nome
        this.musica = musica
        this.pontos = pontos
        MusicConfig.listaRanks.forEach((e, i) => {
            if (this.nome == e.nome)
                if (this.musica == e.musica)
                    if (this.pontos == e.pontos)
                        removeRank(MusicConfig.listaRanks.indexOf(i))
        });
        MusicConfig.listaRanks.push(this)
    }
}

function SalvarRank() {
    document.querySelector('.modal-overlay').classList.toggle('active')
    let nome = document.querySelector("#NomeUsuario")

    new Rank(pontos, nome.value, musicaTocando.Name)
    Storage.setRank(MusicConfig.listaRanks)

    document.querySelector(".modalRank").innerHTML = ""
    pontos = 0
    App.reload()
}

const App = {
    init() {
        Storage.setMusica(MusicConfig.listaMusicas)
        Storage.setRank(MusicConfig.listaRanks)
        MusicConfig.listaMusicas.forEach(exibirMusicas)

        MusicConfig.listaRanks.sort((a, b) => {

            return (a.pontos < b.pontos) ? 1 : -1
        })

        MusicConfig.listaRanks.forEach(exibirRanks)

    },

    reload() {
        tabelaMusicas.innerHTML = ""
        tabelaRanks.innerHTML = ""
        App.init()
    }
}

App.init()

audios.forEach(x => {
    x.volume = .3
})
