function renderPlaces() {
    fetch('http://localhost:8080/places').then(result => {
        return result.json();
    }).then(data => {
        makeTable(data);
    });
}

function renderPlace() {
    const url = document.URL;
    const id = url.substring(url.indexOf('=') + 1);
   
    fetch('http://localhost:8080/places/' + id).then(result => {
        return result.json();
    }).then(data => {
        showPlace(data);
    });
}

function makeTable(placesData) {
    var places = "<table border='1'>";
    places += "<thead><tr>";
    places += "<th>Name</th>";
    places += "<th>Country</th>";
    places += "<th>Likes</th>";
    places += "</tr></thead>";

    places += "<tbody>";
    for (var i = 0; i < placesData.length; i++) {
        places += "<tr>";
        places += "<td><a href='../client/place.html?id=" + placesData[i]._id + "'>" + placesData[i].name + "</a></td>";
        places += "<td>" + placesData[i].country + "</td>";
        places += "<td>" + placesData[i].likes + "</td>";
        places += "</tr>";
    }
    places += "</tbody>";

    places += "</table>";
    document.getElementById('places').innerHTML = places;
}

function showPlace(place) {
    document.getElementById('title').innerHTML = place.name;
    document.getElementById('header').innerHTML = place.name;
    document.getElementById('name').innerHTML = place.name;
    document.getElementById('country').innerHTML = place.country;
    document.getElementById('description').innerHTML = place.description;
}