// console.log('Client side javascript data is loaded.');

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data);
//     })
// })


// fetch('http://localhost:3000/weather?address=asmara').then((response) => {

//     response.json().then(data => {
//         if(data.error)  {
//             return console.log(data.error);
//         }
//         console.log(data.location);
        
//     })
// })

const searchForm = document.querySelector('form');
const search = document.querySelector('input');
const paragraphOne = document.querySelector('#message-1');
const paragraphTwo = document.querySelector('#message-2');


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const locatio = search.value;

    paragraphOne.textContent = 'loading..';
    paragraphTwo.textContent = '';

    fetch(`/weather?address=${locatio}`).then((response) => {

        response.json().then(data => {
            if(data.error)  {
                return paragraphOne.textContent = data.error;
            }
            paragraphOne.textContent = data.location;
            paragraphTwo.textContent = data.forecast.currentWeather;
        })
    })
})