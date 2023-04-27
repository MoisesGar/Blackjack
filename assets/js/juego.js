/*
    2C = 2 OF CLUBS
    2D = 2 OF DIAMONDS
    2H = 2 OF HEARTS
    2S = 2 OF SPEADES
    */
let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;
let status = false;
let ctn = 0;
//const nameJugador = prompt('Nombre del Jugador')

//if (ctn == 0) document.querySelector('h1').innerHTML = `${nameJugador} - <small style="color: red; font-size: larger;">${puntosJugador}</small> </h1>`;
//Referencias HTML
const btnNuevo = document.querySelector('#btn-Nuevo');
const btnPedir = document.querySelector('#btn-Pedir');
const btnDetener = document.querySelector('#btn-Detener');
const puntosHtml = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const imagenes = document.querySelector('#jugador-cartas');
btnDetener.disabled = true;
btnNuevo.disabled = true;


const crearDeck = () => {
    for (let i = 2; i < 11; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (const tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    // console.log(deck ); //Ordenado
    deck = _.shuffle(deck);
    console.log(deck);//Mezclado
}
crearDeck();

//Funcion para Pedir carta

const pedirCarta = () => {
    if (deck.length == 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

//Valor Carta

const valorCarta = (carta) => {

    // const valor = carta[0];//LOS STRINGS SE PUEDEN TRABAJAR COMO ARREGLOS 
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        ((valor === 'A') ? 11 : 10)
        : valor * 1;

    // if (isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     console.log('Es un numero');
    //     puntos = valor * 1;//String => Num
    //     console.log(puntos);
    // }
}

//const valor = valorCarta( pedirCarta());
// console.time('parse');
// puntos = parseInt(valor);
// console.log(puntos);
// console.timeEnd('parse');
// console.time('multi');
// console.timeEnd('multi');

//DESHABILITADOR DE BOTONES

function Deshabilitar(){
    btnDetener.disabled = true;
    btnPedir.disabled = true;
}

//HABILITADOR DE BOTONES
function Habilitar(){
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    btnNuevo.disabled = false;
}

//TURNO PC
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosComputadora += valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img'); //creamos elemento imagen
        imgCarta.src = `assets/cartas/${carta}.png`;//decimos que carta pondra
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos >21) break;
        if(puntosComputadora < 21 && puntosComputadora>= puntosMinimos)console.warn('Lo siento, perdiste...');
        if(puntosComputadora == 21){
            if(puntosMinimos == 21){
                console.warn('Empate, buen juego');
            }
            console.warn('Lo siento, perdiste...');
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));
    if(puntosMinimos <= 21 && puntosComputadora >21)console.warn('Felicidades, ganaste');
    Deshabilitar();
}



//Eventos
btnNuevo.addEventListener('click', () => {
    deck = [];
    crearDeck();
    status = true;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;
    btnPedir.disabled = false;
    btnNuevo.disabled = true;
})
//PEDIR CARTA
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    Habilitar();

    puntosJugador += valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;
    console.log(true)
    imagenes.innerHTML += `<img src="./assets/cartas/${carta}.png" class="carta">`
    if(puntosJugador > 21){
        console.warn('Lo siento mucho, Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador == 21){
        console.warn('21, Genial');
        Deshabilitar();
        turnoComputadora(puntosJugador);
    }
})
//DETENER TURNO
btnDetener.addEventListener('click', () => {
    Deshabilitar();
    turnoComputadora(puntosJugador)
})


//Manipulacion Dom
/*

document.createElement('button'); CreaElemento

document.querySelector('loremTag'); Tagname
document.querySelector('.lorem'); clase
document.querySelector('#lorem'); ID

documen.getElementById('lorem');
Funcionan con elementos seleccionados
.innerText = 'Hola mundo'; agrega texto al elemento seleccionado
.innerHTML = 'Hola mundo'; agrega etiquetas html al elemento seleccionado
.append = agrega algun elemento a otro
.classlist muestra las clases ligadas al elemento
.classlist.add('') agrega una clase al elemento


.placeholder ='lorem' Agrega un placeholder
.background = 'red' agrega color de fondo
.src
.atributo  = '' te permite modificar el valor del atributo

*/
