const listaDeTeclas = document.querySelectorAll('.tecla')
console.log(listaDeTeclas)

function Reproduzir(tecla){    
    let som = tecla.getAttribute("data-id")
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
}

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this), console.log(this.getAttribute('data-id'))");
});

function musica1(){
    let notas = [1,3,5,6,7,2,4,5]
    notas.forEach(som => {
        let nota = listaDeTeclas[som].getAttribute("data-id");
        document.querySelector(`#som_tecla_${nota.toLowerCase()}`).play();        
    });
}

function musica2(){
    let notas = [1,1,5,5,5,2,4,5]
    notas.forEach(som => {
        let nota = listaDeTeclas[som].getAttribute("data-id");
        document.querySelector(`#som_tecla_${nota.toLowerCase()}`).play();        
    });
}

function musica0(){
    max = Math.floor(8);
    min = Math.ceil(0);
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    let nota = listaDeTeclas[x].getAttribute("data-id");
    document.querySelector(`#som_tecla_${nota.toLowerCase()}`).play();    
}  

const Sons = {
    Musica(x){
    switch(x){
        case 1:            
            musica1()
            break;            
        case 2:              
            musica2()
            break;
        default:
            musica()
            break;
    }}
}

function tocarMusica(x){
    const intervalo = setInterval(() => {
        Sons.Musica(x)
    }, 250);
    setTimeout(() => {
        clearInterval(intervalo)
    }, 10000);
}

