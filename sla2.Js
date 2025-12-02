var map = L.map('map').setView([-30.0297,-51.2157 ], 6); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 20,  
    minZoom: 16   
}).addTo(map);
var marker = L.marker([-30.0297,-51.2157 ]).addTo(map)
    .bindPopup('Aqui é o Irmão Pedro!')
    .openPopup();
var marker = L.marker([]).addTo(map)
    .bindPopup('Aqui é o Rio Branco!')
    .openPopup();
    var marker = L.marker([]).addTo(map)
    .bindPopup('Aqui Instituto Estadual de Educação Dom Diogo de Souza!')
    .openPopup();
    var marker = L.marker([]).addTo(map)
    .bindPopup('Aqui é Porto Alegre!')
    .openPopup();
    var marker = L.marker([]).addTo(map)
    .bindPopup('Aqui é Porto Alegre!')
    .openPopup();
    var marker = L.marker([]).addTo(map)
    .bindPopup('Aqui é Porto Alegre!')
    .openPopup();