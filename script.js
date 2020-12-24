
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



