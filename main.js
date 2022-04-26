const listaDeTeclas = document.querySelectorAll('.tecla')
const audios = document.querySelectorAll('audio')

function Reproduzir(tecla){    
    let som = tecla.getAttribute("data-id")
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
}

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this), console.log(this.getAttribute('data-id'))");
});

document.addEventListener('keydown',(event)  => {
    var name = event.key;
    for (let i = 0; i < audios.length ; i++) {
        if(name == (i+1)){
            if (audios[i].currentTime > 0) {
                audios[i].currentTime = 0
            }
            audios[i].play()       
        }       
        listaDeTeclas[name-1].classList.add('ativa')
        setTimeout(() => {
            listaDeTeclas[name-1].classList.remove('ativa')
        }, 200);
    }        
}, false);

function musica1(){
    let notas = [1,3,5,6,7,2,4,5]
    notas.forEach(som => {
        let nota = listaDeTeclas[som].getAttribute("data-id");
        document.querySelector(`#som_tecla_${nota.toLowerCase()}`).play();        
    });
}

function musica2(){
    let notas = [2,2,2,2,2,2,2,2,5,2,5]
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

function Musica(x){
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

function tocarMusica(x){
    const intervalo = setInterval(() => {
        Musica(x)
    }, 300);
    setTimeout(() => {
        clearInterval(intervalo)
    }, 10000);
}

