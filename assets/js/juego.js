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



//Eventos
btnNuevo.addEventListener('click', () => {
    deck = [];
    crearDeck();
    status = true;
    divCartasJugador.innerHTML = '';
    puntosJugador = 0;
    puntosHtml[0].innerText = 0;
})

btnPedir.addEventListener('click', () => {
    if (status) {

        const carta = pedirCarta();
        let imagenes = divCartasJugador;
        puntosJugador += valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;
        console.log(true)
        imagenes.innerHTML += `<img src="./assets/cartas/${carta}.png" class="carta">`

    } else {
        alert('Cree un nuevo juego');
    }
})

btnDetener.addEventListener('click', () => {
    if (status) {
        alert('JUEGO TERMINADO');//AQUI VA JUEGO DE LA PC
        status = false;
    } else {
        alert('Cree un nuevo juego');
    }
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