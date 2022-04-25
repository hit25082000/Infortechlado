const listaDeTeclas = document.querySelectorAll('.tecla')
console.log(listaDeTeclas)

function Reproduzir(tecla){    
    let som = tecla.getAttribute("data-id")
    document.querySelector(`#som_tecla_${som.toLowerCase()}`).play();
}

listaDeTeclas.forEach(tecla => {
    tecla.setAttribute('onclick', "Reproduzir(this), console.log(this.getAttribute('data-id'))");
    let teclas = [97,98,99,100,101,102,103,104,105]        
});

document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

        switch (name) {
            case "1":
                document.querySelector(`#som_tecla_pom`).play()
                break;
            case "2":
                document.querySelector(`#som_tecla_clap`).play()
                break;
            case "3":
                document.querySelector(`#som_tecla_tim`).play()
                break;
            case "4":
                document.querySelector(`#som_tecla_puff`).play()
                break;
            case "5":
                document.querySelector(`#som_tecla_splash`).play()
                break;
            case "6":
                document.querySelector(`#som_tecla_toim`).play()
                break;
            case "7":
                document.querySelector(`#som_tecla_psh`).play()
                break;
            case "8":
                document.querySelector(`#som_tecla_tic`).play()
                break;
            case "9":
                document.querySelector(`#som_tecla_tom`).play()
                break;
        
            default:
                break;
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

function Teclado(){
    listaDeTeclas
}

function tocarMusica(x){
    const intervalo = setInterval(() => {
        Musica(x)
    }, 300);
    setTimeout(() => {
        clearInterval(intervalo)
    }, 10000);
}

