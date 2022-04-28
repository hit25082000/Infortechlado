const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')

var tempoEntreTeclas;
var Cronometro;
let LogVelocidade = []
var input = document.getElementById("CriarMusica");
var clear = document.getElementById("BotaoApagar");

function Reproduzir(tecla){    
    let som = tecla.getAttribute("data-id")
    if(document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime > 0){
        document.querySelector(`#som_tecla_${som.toLowerCase()}`).currentTime = 0
    }     
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
    tecla.classList.add('ativa','active','focus')
        setTimeout(() => {
            tecla.classList.remove('ativa','active','focus')
        }, 250);        
}

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
});

(()=>{

})()

function musica1(){
    let notas = [1,3,5,6,7,2,4,5]
    notas.forEach((som,i)=> {   
        setTimeout(() => {
            Reproduzir(listaDeTeclas[som-1])             
        }, i * 1000);
    });
}

function musica2(){
    let notas = [2,2,2,2,2,2,2,2,5,2,5]
    notas.forEach((som,i)=> {   
        setTimeout(() => {
            Reproduzir(listaDeTeclas[som-1])             
        }, i * 1000);
    });       
}



function musica3(){

    let notas = Array.from(String(input.value), Number);

    console.log('notas',notas)
    console.log("Log",LogVelocidade)
    

    for (let i = 0; i < notas.length; i++) {
        let time = LogVelocidade[i]                
            setTimeout(() => {
                Reproduzir(listaDeTeclas[notas[i]-1])
                
                console.log("Index: ",i ,"Log: ",time )
                console.log("Tecla: ",listaDeTeclas[notas[i]-1])

            },time);
    }
}

function musica(){
    max = Math.floor(8);
    min = Math.ceil(0);
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    let nota = listaDeTeclas[x].getAttribute("data-id");
    document.querySelector(`#som_tecla_${nota.toLowerCase()}`).play();    
} 

function Musica(x){
    switch(x){
        case 1:            
            musica1()
            break;            
        case 2:              
            musica2()
            break;
        case 3:              
            musica3()
            break;
        default:
            musica()
            break;
}}

function TocarMusica(x){
    const intervalo = setInterval(() => {
        Musica(x)
    }, 500);
    setTimeout(() => {
        clearInterval(intervalo)
    }, 10000);
}

