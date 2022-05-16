# Alura-JS

## Aprendizado

- Decidi automatizar o exemplo do curso como forma de me desafiar

> Implementei uma função que captura o objeto e toca o audio respectivo a seu data-id
> E um foreach com querySelectorAll que captura todos botões e atribui onclick apontando o mesmo para a função
> Assim automatizando todo o projeto do curso de JS iniciante da Alura
> a Função reproduzir reproduz o audio relacionado a tecla enviada como parametro e checka se sua reprodução ja ocorreu para assim fecha-la e reproduzi-la novamente como tambem adiciona classe a tecla por .2 s 

```sh
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

notas.forEach(som => {
    som.setAttribute('onclick', "Reproduzir(this), console.log(this)");
});

```

### Teclado Techlado

- Decidi ligar cada botão a uma tecla do teclado numerico

> Como cada tecla estava no array seu indice e event.key são os mesmos do teclado
> Assim automatizando todo o projeto do curso de JS iniciante da Alura

### Salvar musicas

> Como o teclado numerio estava acionando cada audio para implementar um modo de salvar e reproduzir era preciso de 2 arrays, um para notas e um para o tempo que cada nota for acionada
> assim criei um array notas e um array LogVelocidade
> Quando o usuario clika no input apos sua primeira nota seus dados estão sendo gravados.
> Apos criei um modo de salvar as musicas em LocalStorage
> Com esses 2 arrays as musicas podem ser reproduzidas exatamente como foram salvar

### GameMode

> Apos ter dados de musicas salvas sendo reproduzidas decidi implementar um game estilo Guitar Hero
> que consiste em capturar o log da musica e sua nota e enviar uma animação interativa no tempo exato criando assim um desafio 
> para implementar o mais importante foi decidir como fazer a animação, o modo que fiz para cada nota a ser reproduzida é criada uma <div> e posta abaixo do botão e no css desloquei as divs para fora da view 
> assim 5s antes da tecla ser reproduzida a div começa uma animação linear ate chegar ao botão 
> apos isso para deixar interativo se a tecla pressionada tiver o tempo correto em relação a proxima tecla a ser reproduzida e for a mesma nota é contado como um acerto
> e conseguindo implementar isso é possivel decidir o que fazer com acertos e quase acertos do jogador

# Sobrando talvez um bug onde a tecla pressionada se não for a proxima tecla a ser reproduzida não ia contar portanto deve se segui a ordem de notas
