const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')
var input = document.getElementById("CriarMusica");
var Cronometro;
let LogVelocidade = []


listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this)");
});

input.addEventListener('keydown',(event)  => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("BotaoCriarMusica").click();        
    }

    if(event.key === "Backspace")
         LogVelocidade.pop()   

    if(input == "")
        LogVelocidade = [] 

    for (let i = 0; i < audios.length ; i++) {
        if(event.key == (i+1)){
            if(!LogVelocidade.length){
                TempoAtual = (new Date()).getTime();
                Cronometro = LogVelocidade.push((new Date(0)).getTime());
            }
            else{
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

    Musica1(){
        let notas = [1,3,5,6,7,2,4,5]
        notas.forEach((som,i)=> {   
            setTimeout(() => {
                Reproduzir(listaDeTeclas[som-1])             
            }, i * 1000);
        });
    },   
    
    MusicaPadrao(){
        max = Math.floor(8);
        min = Math.ceil(0);
        let x = Math.floor(Math.random() * (max - min + 1)) + min;
        let notas = x.push
        notas.forEach((som,i)=> {   
            setTimeout(() => {
                Reproduzir(listaDeTeclas[som-1])             
            }, i * 1000);
        });        
    },

    TocaMusica(notas,log){
        let Notas;
        let Log;

        notas == undefined ? Notas = input.value : Notas = notas;
        log == undefined ? Log = LogVelocidade : Log = log;    
    
        for (let i = 0; i < Notas.length; i++) {
            let time = Log[i]                
                setTimeout(() => {
                    Reproduzir(listaDeTeclas[Notas[i]-1])                    
                },time);
        }              
    },     

    Play(index){
        MusicConfig.ListaMusicas.forEach((e,i) => {
            if(index == i){
                MusicConfig.TocaMusica(e.Notas,e.Log)
            }
        });
    },

    Remove(index){
        MusicConfig.ListaMusicas.splice(index,1)  
        App.reload()            
    },

    ListaMusicas : Storage.get()
}

class Musica{
    constructor(Notas,Log,Name){
        this.Name = Name
        this.Notas = Notas
        this.Log = Log    
        MusicConfig.ListaMusicas.push(this)   
    }
}

function Reproduzir(tecla){    
    let som = tecla.getAttribute("data-id")
    if(document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime > 0){
        document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime = 0
    }     
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
    tecla.classList.add('ativa','active','focus')
    setTimeout(() => {
        tecla.classList.remove('ativa','active','focus')
    }, 200);        
}

function Salvar(){
    let Notas = document.getElementById("CriarMusica").value.split('').map(Number);
    let Log = LogVelocidade
    let Name = document.querySelector('#NomeMusica').value
    
    new Musica(Notas,Log,Name)  
    Storage.set(MusicConfig.ListaMusicas)

    App.reload()
}

function Exibir(musica,index){
    let Name = musica.Name

    let TabelaMusicas = document.querySelector(".MusicConfig")
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td onclick="MusicConfig.Play(${index})" style="cursor: pointer;" >${Name} </td>
    <td onclick="MusicConfig.Remove(${index})" style="cursor: pointer;"> X </td>
    `
    TabelaMusicas.appendChild(tr)
}

const App = {
    init(){
        Storage.set(MusicConfig.ListaMusicas)
        MusicConfig.ListaMusicas.forEach(Exibir)
    },

    reload(){
        input.value = ""
        document.querySelector('#NomeMusica').value = ""
        LogVelocidade = []  
        let TabelaMusicas = document.querySelector(".MusicConfig")
        TabelaMusicas.innerHTML = ""
        App.init()
    }
}

App.init()

audios.forEach(x=>{
    x.volume = .3
})