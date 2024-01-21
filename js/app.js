//Variables
const formulario = document.querySelector('#formulario')
const displayTweets = document.querySelector('#display')
let tweets = []

//Eventos
cargarEventos()

function cargarEventos(){
    formulario.addEventListener('submit', enviarTweet)

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []

        listaTweets()
    })
}

//Funciones
function enviarTweet(e){
    e.preventDefault()

    const tweet = document.querySelector('#tweet').value

    if(tweet === ''){
        showAlert('Debe de escribir algo')
        return
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }

    tweets = [...tweets, tweetObj]

    listaTweets()

    formulario.reset()
}

function showAlert(mensje){
    const error = document.createElement('div')

    error.classList.add('error')
    error.textContent = mensje

    const section = document.querySelector('#section')

    section.appendChild(error)

    setTimeout(() => {
        error.remove()
    }, 2500);
}

function listaTweets(){
    limpiar()
    
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            const btnBorrar = document.createElement('a')

            btnBorrar.textContent = 'X'
            btnBorrar.classList.add('borrar-tweet')

            btnBorrar.onclick = () => {
                borrarTweet(tweet.id)
            }

            const lista = document.createElement('li')

            lista.textContent = tweet.tweet
            lista.classList.add('lista')

            lista.appendChild(btnBorrar)

            displayTweets.appendChild(lista)    
        })
    }

    almacenandoStorage()
}

function limpiar(){
    while(displayTweets.firstChild){
        displayTweets.removeChild(displayTweets.firstChild)
    }
}

function almacenandoStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)

    listaTweets()
}