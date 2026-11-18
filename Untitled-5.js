async function getWeather() {
    var city = document.getElementById("city").value.trim();
    var result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "Please enter a city name.";
        return;
    }

    result.innerHTML = "Loading...";

    try {
        // Find the latitude and longitude of the city
        var placeResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name="
            + encodeURIComponent(city) + "&count=1"
        );

        var placeData = await placeResponse.json();

        if (!placeData.results) {
            result.innerHTML = "City not found.";
            return;
        }

        var place = placeData.results[0];

        // Get current weather using the coordinates
        var weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude="
            + place.latitude + "&longitude=" + place.longitude
            + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );

        var weatherData = await weatherResponse.json();
        var current = weatherData.current;

        result.innerHTML =
            "<h3>" + place.name + "</h3>" +
            "Temperature: " + current.temperature_2m + " °C<br>" +
            "Humidity: " + current.relative_humidity_2m + " %<br>" +
            "Wind Speed: " + current.wind_speed_10m + " km/h";

    } catch (error) {
        result.innerHTML = "Unable to get weather. Check your internet.";
    }
}