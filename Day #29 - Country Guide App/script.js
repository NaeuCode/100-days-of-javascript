let infoBox = document.querySelector(".container .info-box");
let countryName = document.querySelector(".container .search-box input");

//Define a function called getCountryInfo that takes a country as an argument
let getCountryInfo = (country) => {
    //Build the URL for The REST countries API using the provided country name.
    let url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    //Fetch data from the API and process it 
    fetch(url).then(res => res.json())
        .then(data => {
            //Extract relevant information from the API response and construct an HTML string.
            let info = `
                    <div class="flag-and-name">
                        <div class="flag">
                            <img src="${data[0].flags.svg}" alt="">
                        </div>
                        <h3 class="country-name">${data[0].name.common}</h3>
                    </div>
                    <div class="other-info">
                        <h5>Capital: <span>${data[0].capital}</span></h5>
                        <h5>Continent: <span>${data[0].continents}</span></h5>
                        <h5>Population: <span>${data[0].population}</span></h5>
                        <h5>Currency: <span>${Object.keys(data[0].currencies)[0]} - ${data[0].currencies[Object.keys(data[0].currencies)].name} (${data[0].currencies[Object.keys(data[0].currencies)].symbol})</span></h5>
                        <h5>Common Languages: <span>${Object.values(data[0].languages).join(",")}</span></h5>
                    </div>
            `;

            //Update the inner HTML of the element with class "info-box" to display the country information
            infoBox.innerHTML = info;
        })

        .catch(()=> {
            // Handle errors (when the API request fails)
            if (countryName.value.length == 0){
                alert('Input Field Cannot be Empty!');
            } else {
                infoBox.innerHTML = '<h3 class="invalid-name-message">Please enter valid country name!</h3>';
            }
        });
}

//Add an event listener to the input element
countryName.addEventListener('keyup', (e)=>{
    // Check if the "enter" key is pressed and the input field is not empty
    if (e.key == "Enter" && countryName.value != ''){
        //Call the getCountryInfo function with the entered country name
        getCountryInfo(countryName.value);
    }
})

//Initially, fetch information for the default country name value (if any)
getCountryInfo(countryName.value);
