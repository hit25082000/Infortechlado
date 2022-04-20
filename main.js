function Reproduzir(som){    
    let nomeSom = som.getAttribute("data-id")
    document.querySelector(`#som_tecla_${nomeSom.toLowerCase()}`).play();
}

document.querySelectorAll('.tecla').forEach(som => {
    som.setAttribute('onclick', "Reproduzir(this), console.log(this)");
});

