//import { APIRootPath } from '../../configuration';

function makeTable(placesData) {
    var places = "<table>";
    places += "<thead><tr>";
    places += "<th>Name</th>";
    places += "<th>Country</th>";
    places += "<th>Likes</th>";
    places += "</tr></thead>";

    places += "<tbody>";
    for (var i = 0; i < placesData.length; i++) {
        places += "<tr>";
        places += "<td><a class='placeLink' href='../client/place.html?id=" + placesData[i]._id + "'>" + placesData[i].name + "</a></td>";
        places += "<td>" + placesData[i].country + "</td>";
        places += "<td>" + placesData[i].likes + "</td>";
        places += "</tr>";
    }
    places += "</tbody>";
    
    places += "</table>";
    document.getElementById('places').innerHTML = places;
}

function validateForm() {
    var name = document.forms["addPlaceForm"]["name"].value;
    var images = document.forms["addPlaceForm"]["images"].value;
    var description = document.forms["addPlaceForm"]["description"].value;

    if (name == "") {
        alert("Name must be filled out");
        return false;
    }

    if (images.length < 2) {
        alert("You must choose at least 2 images");
        return false;
    }

    if (description == "") {
        alert("Description must be filled out");
        return false;
    }

    return true;
}

$(() => {
    $.get('http://localhost:8080/places', data => {
        makeTable(data);
    });
});