
// Creo l'oggetto 

let arr = {
    'user':100,
    'acquisti': 3000,
    'contatti': 1000
}

// Seleziono gli elementi
console.log(arr.user);
Object.keys(arr).forEach((element , index) => {
    let contatori = document.querySelector(`#${element}`)
    console.log(element);
    console.log(arr.element);
    contatori.innerHTML = arr.element
}) ;


// let acquisti = document.querySelector("#acquisti")
// console.log(acquisti);

// acquisti.innerHTML = 3000;
// let contatti = document.querySelector("#contatti")
// contatti.innerHTML = 1000;

// let ninja = document.querySelector("#ninja")
// console.log(ninja) 

// ninja.addEventListener ("click" , () => { 
//     let user = document.querySelector("#user")
//     user.innerHTML = 100;

// })
