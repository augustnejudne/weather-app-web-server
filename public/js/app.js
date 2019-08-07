document.querySelector('#year').innerHTML = new Date().getFullYear();

const myForm = document.querySelector('#myForm');
const mySearchInput = document.querySelector('#mySearchInput ');
const mySearchInputSubmitButton = document.querySelector('#mySearchInputSubmitButton');
const myForecastSummary = document.querySelector('#myForecastSummary');

mySearchInput.addEventListener('keyup', e => {
  console.log('mySearchInput');
  if (e.target.value.length > 0) {
    mySearchInputSubmitButton.disabled = false;
  } else {
    mySearchInputSubmitButton.disabled = true;
  }
});

myForm.addEventListener('submit', e => {
  e.preventDefault();
  myForecastSummary.innerHTML = 'loading...';
  fetch(`/weather?address=${mySearchInput.value}`).then(response => {
    response.json().then(data => {
      const { summary, temperature, precipProbability, location } = data;
      if (data.error) {
        myForecastSummary.textContent = data.error;
        return;
      }
      myForecastSummary.textContent = `${summary} It is ${temperature} degrees celsius in ${location} with ${(precipProbability * 100).toFixed(2)}% chance of rain.`;
      return;
    });
  });
  mySearchInput.value = '';
});
