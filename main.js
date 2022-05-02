const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')
var input = document.getElementById("CriarMusica");
var Cronometro;
let LogVelocidade = []

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this)");
});

input.addEventListener('keydown',(event)  => {
    var name = event.key;   

    for (let i = 0; i < audios.length ; i++) {
        if(name == (i+1)){
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

input.addEventListener('keydown',(event) =>{
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("BotaoCriarMusica").click();        
    }
    event.key === "Backspace" ?   LogVelocidade.pop() : "";  
    
    input == "" ? LogVelocidade = [] : "";
});

const Musicas = {

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

    TocarMusica(notas,log){
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
        input.value = ""
        LogVelocidade = []
    },   
    
    ListaMusicas : [
        {            
        },               
    ],

    Play(Name){
        Musicas.ListaMusicas.forEach(e => {
            if(Name == e.Name){
                Musicas.TocarMusica(e.Notas,e.Log)
            }
        });
    }
}

class Musica{
    constructor(Notas,Log,Name){
        this.Name = Name
        this.Notas = Notas
        this.Log = Log
        Musicas.ListaMusicas.push(this)
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

    let TabelaMusicas = document.querySelector(".Musicas")
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>
        <p onclick="Musicas.Play(${Name})" style="cursor: pointer;" >${Name}</p>
    </td>
    `

    TabelaMusicas.appendChild(tr)
}