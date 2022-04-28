const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')
var input = document.getElementById("CriarMusica");

var Cronometro;
let LogVelocidade = []

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this), console.log(this.getAttribute('data-id'))");
});

document.addEventListener('keydown',(event)  => {
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
    
    Musica2(){
        let notas = [2,2,2,2,2,2,2,2,5,2,5]
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

    MusicaCriada(){

        let notas = Array.from(String(input.value), Number);         
    
        for (let i = 0; i < notas.length; i++) {
            let time = LogVelocidade[i]                
                setTimeout(() => {
                    Reproduzir(listaDeTeclas[notas[i]-1])                    
                },time);
        }
    }, 
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
    Musicas += {
        MusicaNova(){
            let notas = input
            let Log = LogVelocidade
        notas.forEach((som,i)=> {   
            setTimeout(() => {
                Reproduzir(listaDeTeclas[som-1])             
            }, Log[i]);
        });
        }
    }

    let TabelaMusicas = document.querySelector(".Musicas")
    let ListaMusicas = document.createElement("h1")

    ListaMusicas.innerHTML = `<h1> Musica Nova </h1>`

    TabelaMusicas.appendChild(ListaMusicas)
}