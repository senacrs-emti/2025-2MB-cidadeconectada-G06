var map = L.map('map').setView([-30.0297,-51.2157 ], 6); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,  
    minZoom: 13,
    var: map = L.map('map', {
        zoomAnimation: true
    })
      
}).addTo(map);

    var escola = L.marker([-30.0297,-51.2157]).addTo(map);
escola.bindTooltip("<b>Escola Irmão Pedro</b>  <br>Pública<br>   Infraestrutura:OK", {
    permanent: false,
    direction: "right",
   
});


var escola = L.marker([-30.0297,-51.2176]).addTo(map);
escola.bindTooltip("<b>Escola Irmão Pedro</b>   <br>Infraestrutura: ok", {
    permanent: false,
    direction: "right"
});
    var escola = L.marker([]).addTo(map);
escola.bindTooltip("<b>Escola Irmão Pedro</b>  <br>Pública<br>   Infraestrutura: OK", {
    permanent: false,
    direction: "right"
});

var escola = L.marker([]).addTo(map);
escola.bindTooltip("<b>Escola Irmão Pedro</b><br>Infraestrutura: ok", {
    permanent: false,
    direction: "right"
});
var escola = L.marker([]).addTo(map);
escola.bindTooltip("<b>Escola Irmão Pedro</b><br>Pública:</b><br>Infraestrutura:OK", {
    permanent: false,
    direction: "right"
});
var escola = L.marker([]).addTo(map);
escola.bindTooltip("<b>Escola Irmão Pedro</b><br>Infraestrutura: ok", {
    permanent: false,
    direction: "right"
});

