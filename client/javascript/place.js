var place;

function showPlace() {
    var content = "<h1>" + place.name + "</h1>";
    content += "<table>";
    content += "<tr height='60px'>";
    content += "<td width='20%'>Place Name</td>";
    content += "<td width='60%' style='text-align: left;'>" + place.name + "</td>";
    
    if (place.images.length !== 0) {
        content += "<td rowspan='4' width='20%'>";
        content += "<marquee direction='up' height='400px'>";

        for (var i = 0; i < place.images.length; i++)
            content += "<img src='./images/" + place.images[i] + "' class='img_sites' />";

        content += "</marquee>";
        content += "</td>";
    }
    
    content += "</tr>";
    content += "<tr height='60px'>";
    content += "<td>Country</td>";
    content += "<td style='text-align: left;'>" + place.country + "</td>";
    content += "</tr>";
    content += "<tr height='60px'>";
    content += "<td>Likes</td>";
    content += "<td style='text-align: left;'>" + place.likes + "</td>";
    content += "</tr>";
    content += "<tr>";
    content += "<td>Description</td>";
    content += "<td style='text-align: left;'>" + place.description + "</td>";
    content += "</tr>";
    content += "</table>";
    
    document.getElementById('title').innerHTML = place.name;
    document.getElementById('placeDetails').innerHTML = content;
}

$(() => {
    const url = document.URL;
    
    if (url.includes('=')) {
        const id = url.substring(url.indexOf('=') + 1);
    
        $.get('http://localhost:8080/places/' + id , data => {
            place = data;
            showPlace(data);
        });
    } else {
        alert("There is no such a place");
        window.location.href = "index.html?page=1";
    }
});

$('#backToIndex').click(() => {
    window.location.href = "index.html";
});

$('#likePlace').click(() => {
    $.ajax({
        url: 'http://localhost:8080/places/' + place._id,
        type: 'PATCH',
        success: () => {
            place.likes += 1;
            showPlace(place);
        },
        error: error => console.log(error)
    });
});

$('#deletePlace').click(() => {
    if (confirm("Are you sure you want to delete " + place.name + "?")) {
        $.ajax({
            url: 'http://localhost:8080/places/' + place._id,
            type: 'DELETE',
            success: result => window.location.href = "index.html",
            error: error => console.log(error)
        });
    }
});