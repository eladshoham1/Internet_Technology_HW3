var place;

function showPlace() {
    var content = "<h1>" + place.name + "</h1>";
    content += "<table>";
    content += "<tr height='60px'>";
    content += "<td width='20%'>Place Name</td>";
    content += "<td width='60%' style='text-align: left;'>" + place.name + "</td>";
    content += "<td rowspan='4' width='20%'>";
    content += "<marquee direction='up' height='400'>";
    for (var i = 0; i < place.images.length; i++)
        content += "<img src='./images/" + place.images[i].fileName + "' class='img_sites' />";
    content += "</marquee>";
    content += "</td>";
    content += "</tr>";
    content += "<tr height='60px'>";
    content += "<td>Country</td>";
    content += "<td style='text-align: left;'>" + place.country + "</td>";
    content += "</tr>";
    content += "<tr height='60px'>";
    content += "<td>Likes</td>";
    content += "<td style='text-align: left;'>";
    content +=  place.likes;
    content += "<button class='likeButton' onclick='likePlace()'>Like</button>";
    content +=  "</td>";
    content += "</tr>";
    content += "<tr>";
    content += "<td>Description</td>";
    content += "<td style='text-align: left;'>" + place.description + "</td>";
    content += "</tr>";
    content += "</table>";
    content += "<a class='indexButton' href='index.html'>Back To Index</a>";
    content += "<button class='deletePlaceButton' onclick='deletePlace()'>Delete This Place</button>";
    
    document.getElementById('title').innerHTML = place.name;
    document.getElementById('root').innerHTML = content;
}

function likePlace() {
    const url = 'http://localhost:8080/places/' + place._id;

    fetch(url, {
        method: 'PATCH'
    }
    ).then(result => {
        return result.json();
    }).then(data => {
        window.location.href = "place.html?id=" + place._id;
    });
}

function deletePlace() {
    const url = 'http://localhost:8080/places/' + place._id;

    fetch(url, {
        method: 'DELETE',
    }
    ).then(result => {
        return result.json();
    }).then(data => {
        window.location.href = "index.html";
    });
}

$(() => {
    const url = document.URL;
    const id = url.substring(url.indexOf('=') + 1);

    $.get('http://localhost:8080/places/' + id , data => {
        place = data;
        showPlace(data);
    });
});