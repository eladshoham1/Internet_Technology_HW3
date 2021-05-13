$(() => {
    $.get('http://localhost:8080/places', data => {
        var places = "<table>";
        places += "<thead><tr>";
        places += "<th>Name</th>";
        places += "<th>Country</th>";
        places += "<th>Likes</th>";
        places += "</tr></thead>";

        places += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            places += "<tr>";
            places += "<td><a class='placeLink' href='../client/place.html?id=" + data[i]._id + "'>" + data[i].name + "</a></td>";
            places += "<td>" + data[i].country + "</td>";
            places += "<td>" + data[i].likes + "</td>";
            places += "</tr>";
        }
        places += "</tbody>";
        
        places += "</table>";
        document.getElementById('places').innerHTML = places;
    });
});

$('#submit').click(() => {
    const addPlaceForm = document.form["addPlaceForm"];
    var name = addPlaceForm["name"].value;
    //var country = addPlaceForm["country"].value;
    var description = addPlaceForm["description"].value;

    if (name == "") {
        alert("Name must be filled out");
        return false;
    }

    /*if (country == "") {
        alert("You must select country");
        return false;
    }*/

    if (description == "") {
        alert("Description must be filled out");
        return false;
    }

    return true;
});