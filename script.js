
// Creo l'oggetto 

let arr = [
    {
        'selector' : 'utenti',
        'value' : 100
    },
    {
        'selector' : 'acquisti',
        'value' : 3000
    },
    {
        'selector' : 'contatti',
        'value' : 1000
    }
]
function counterFunction (){
    let counterWrapper = document.querySelector('#counter-wrapper')
    if((window.innerHeight + window.pageYOffset) > counterWrapper.offsetTop) {
        setTimeout(() => {
            arr.forEach(el => {
                let selettori = document.querySelector(`[data-counter="${el.selector}"]`)
                let counter = 0
                let tempo = 5000/ el.value
                if(tempo < 50){
                    counter = el.value/2
                }
                let intervallo = setInterval(() => {
                    selettori.innerHTML = counter
                    counter++
                    if(counter > el.value){
                        clearInterval(intervallo)
                    }
                }, tempo)
                document.removeEventListener('scroll' , counterFunction) 
            })
        }, 1500)
    }
}
document.addEventListener('scroll' , counterFunction)

// implementazione ricerca

fetch('./prodotti.json')
.then(response => response.json())
.then(data => {
    function populateCategory(){
        let radio = document.querySelector("#categoryRadioButton")
        let categories = new Set(data.map(ad => ad.category))
        categories.forEach(el => {
            let form = document.createElement('div')
            form.classList.add('form-check')
            form.innerHTML = `
                <input data-filter="${el}"  class="form-check-input" type="radio" name="exampleRadios2" id="${el}" value="${el}">
                <label class="form-check-label" for="${el}">
                    ${el}
                </label>
            `
            radio.appendChild(form)
        })
       
    }
    populateCategory()

    function populatePrice(){
        let change = document.querySelector('#change') 
        let control = document.querySelector("#price")
        let max = Math.ceil((data.map(pr => pr.price).sort((a,b) => a-b)).pop())
        let min = Math.ceil((data.map(pr => pr.price).sort((a,b) => a-b)).shift())
        let input = document.querySelector('#inputPrice')
        control.innerHTML = `
        <p>${min} $</p>
        <p>${max} $</p>
        `
        input.max = max
        input.value = max
        input.min = min
            change.innerHTML = `${max} $`
        input.addEventListener('input' , () => {
            change.innerHTML = input.value + '$'
        })
    }
    populatePrice()

    let i = 300

    function generateCard (cards){
      let card = document.querySelector("#cardGenerate")
      card.innerHTML = ''
      cards.forEach(el => {
        let create = document.createElement("div")
        create.classList.add("col-12", "col-md-6", "col-lg-4")
        create.innerHTML= `
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-12">
              <img src="https://picsum.photos/${i}/200" class="card-img img-fluid" alt="image">
            </div>
            <div class="col-12">
              <div class="card-body">
                <h4 class="card-title">${el.name}</h4>
                <p class="card-text nav-link">Categoria : ${el.category}</p>
                <p class="card-text logo">Prezzo ${el.price}</p>
              </div>
            </div>
          </div>
        </div>
        `
        i++
        card.appendChild(create)
      })
    }
    generateCard(data)

   function filterAds (){
     let filter = document.querySelector("#filterAds")
     filter.addEventListener('click' , () => {
       //  valori da filtrare
       let filterCategory = Array.from(document.querySelectorAll('input[type="radio"]')).filter(el => el.checked == true)[0].getAttribute('data-filter')
       let filterPrice = document.querySelector('#inputPrice').value
       let filterWord = document.querySelector('#filteredWord').value
       //  filtri
      
       let filterByPrice = data.filter(ad => Number(ad.price) < Number(filterPrice))
      let filterByCategory = []
      if(filterCategory != 'tutti'){
        filterByCategory = filterByPrice.filter(ad => ad.category == filterCategory)
      } else {
        filterByCategory = filterByPrice.map(el => el)
      }
      let filterByWord = filterByCategory.filter(ad => ad.name.toLowerCase().includes(filterWord.toLowerCase()))

      generateCard(filterByWord)
     })
   } 
   filterAds()

   function reset () {
     let reset = document.querySelector("#reset")
     reset.addEventListener('click' , () => {
       max = Math.ceil((data.map(pr => pr.price).sort((a,b) => a-b)).pop())
       document.querySelector('#inputPrice').value = max
       document.querySelector('#change').innerHTML = max + '$'
       document.querySelector('#filteredWord').value = ''
       document.querySelector('[data-filter="tutti"]').checked = true
      generateCard(data)
     })
   }
   reset()
})
// Fine Ricerca

// Sezione Annunci Pagina Profilo

let table = document.querySelector('#tablebody');
console.log(table);

// Creo l'oggetto profileUser
let profileUser = [ 
  {
    'prodotto': 'moto',
    'descrizione': 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'prezzo': 1000,
    'status': true
  },

  {
    'prodotto': 'auto',
    'descrizione': 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'prezzo': 3000,
    'status': true
  },

  {
    'prodotto': 'scooter',
    'descrizione': 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'prezzo': 600,
    'status': false
  },

]
// console.log(profileUser);
// Ciclo tutti gli elementi della tabella
profileUser.forEach(( el , index) => {
  let riga = document.createElement("tr")

  // controllo lo status
  if (el.status){

    riga.innerHTML = `
    <th scope="row">${index+1}</th>
    <td>${el.prodotto}</td>
    <td>${el.prezzo}</td>
    <td>${el.descrizione}</td>
    <td><i class="far fa-check-circle text-success"></i></td>

    `

  } else {

    riga.innerHTML = `
    <th scope="row">${index+1}</th>
    <td>${el.prodotto}</td>
    <td>${el.prezzo}</td>
    <td>${el.descrizione}</td>
    <td><i class="fas fa-times-circle text-danger"></i></td>

    `
  }
  
table.appendChild(riga)
// console.log(el);
})

