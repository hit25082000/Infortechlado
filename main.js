//#region  Variaveis
const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')
var notas = document.getElementById("CriarMusica")
var nome = document.getElementById('NomeMusica')
let TabelaMusicas = document.querySelector(".Musicas tbody")
let volume = document.querySelector("#volume")
var Cronometro;
let LogVelocidade = []
//#endregion

volume.oninput = () => {
    audios.forEach(x => {
        x.volume = volume.value / 100
    })
}

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this)");
});

notas.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("BotaoCriarMusica").click();
    }

    if (event.key === "Backspace")
        LimparCampos()

    for (let i = 0; i < listaDeTeclas.length; i++) {
        if (event.key == (i + 1)) {
            if (!LogVelocidade.length) {
                TempoAtual = (new Date()).getTime();
                Cronometro = LogVelocidade.push((new Date(0)).getTime());
            }
            else {
                LogVelocidade.push(new Date().getTime() - TempoAtual);
            }
            Reproduzir(listaDeTeclas[i])
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

    Musica1() {
        let notas = [1, 3, 5, 6, 7, 2, 4, 5]
        notas.forEach((som, i) => {
            setTimeout(() => {
                Reproduzir(listaDeTeclas[som - 1])
            }, i * 1000);
        });
    },

    MusicaPadrao() {
        let notas = []
        for (i = 0; i <= 99; i++) {
            max = Math.floor(8);
            min = Math.ceil(0);
            let x = Math.floor(Math.random() * (max - min + 1)) + min;
            notas.push(x)
        }
        notas.forEach((som, i) => {

            setTimeout(() => {
                Reproduzir(listaDeTeclas[som - 1])
            }, i * 250);
        });
    },

    TocaMusica(NotasData, LogData) {

        NotasData == undefined ? NotasData = notas.value : "";
        LogData == undefined ? LogData = LogVelocidade : "";

        for (let i = 0; i < NotasData.length; i++) {

            let time = LogData[i]
            setTimeout(() => {
                Reproduzir(listaDeTeclas[NotasData[i] - 1])
            }, time);
        }
        App.reload()
    },

    Play(index) {
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

class Musica {
    constructor(Notas, Log, Name) {
        this.Name = Name
        this.Notas = Notas
        this.Log = Log
        MusicConfig.ListaMusicas.push(this)
    }
}

function Reproduzir(tecla) {
    let som = tecla.getAttribute("data-id")
    if (document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime > 0) {
        document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime = 0
    }
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
    tecla.classList.add('ativa', 'active', 'focus')
    setTimeout(() => {
        tecla.classList.remove('ativa', 'active', 'focus')
    }, 200);
}

function LimparCampos() {
    nome.value = ""
    notas.value = ""
    LogVelocidade = []
    nome.focus()
}

function Salvar() {
    new Musica(notas.value.split('').map(Number), LogVelocidade, nome.value)
    Storage.set(MusicConfig.ListaMusicas)

    App.reload()
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
        LimparCampos()

        TabelaMusicas.innerHTML = ""
        App.init()
    }
}

App.init()

