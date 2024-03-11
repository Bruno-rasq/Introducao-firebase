import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://ciri-ff88e-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const db = getDatabase(app);
const moviesInDB = ref(db, "movies");

const input = document.querySelector('#input-field');
const btn = document.querySelector('#add-button');
const movies = document.querySelector('#movies');



// --- funções auxiliares ---

function clearInput() {
  input.value = '';
}

function appendMovieToMovies(item) {

  let itemValue = item[1];
  let itemID = item[0];
  
  let newElement = document.createElement('li');
  newElement.innerText = itemValue;

  newElement.addEventListener('dblclick', function(){
    let exactLocationOfDB = ref(db, `movies/${itemID}`);

    remove(exactLocationOfDB);
  })
  
  movies.appendChild(newElement);
}

function log(message) {
  console.log(message)
}

function clearList() {
  movies.innerHTML = '';
}



// ------ Eventos -------

/**
 * @description - a função onValue fornece um callback que é executado quando há alterações no Firebase Database.
 * @param {objeto} - movieInDB - referenciando a chave de dados do Firebase.
 * @param {função} - callback - função que será executada quando houver alterações.
 */
onValue(moviesInDB, function(snapshot){

  if(snapshot.exists()){
    let moviesArray = Object.entries(snapshot.val())

    clearList();
    
    for(let i = 0; i < moviesArray.length; i++){
      let current = moviesArray[i];
  
      appendMovieToMovies(current)
    }
    
  } else {
    movies.innerHTML = 'Nenhum filme cadastrado';
  }
  
})

/**
 * @description - função que adiciona um novo filme ao Firebase.
 */
btn.addEventListener(
  'click', 
  () => {
    const inputValue = input.value;

    push(moviesInDB, inputValue);
    //addList(inputValue);
    log(`${inputValue} foi adicionado ao Banco de dados!`);
    clearInput();
    
  }
);
