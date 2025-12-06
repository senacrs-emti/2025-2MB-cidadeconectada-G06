var map = L.map('map').setView([-30.025, -51.20], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    minZoom: 13,
}).addTo(map);


// LISTA DE LOCAIS (TEUS DADOS)
var locais = [
    {
        nome: "Colégio Irmão Pedro",
        lat: -30.0275,
        lng: -51.1568,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.1",
        avaliacoes: "306",
        categoria: "Colégio Público",
        tooltip: "<b>Escola Irmão Pedro</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Infraestrutura<br>Lanches<br>Professores<br>"
    },
    {
        nome: "bbbbbbbbbbbbbbbbbbbbbb",
        lat: -30.0229,
        lng: -51.1654,
        img: "Rainha.JPG",
        estrelas: "3.98",
        avaliacoes: "251",
        categoria: "Colégio Público",
        tooltip: "<b>bbbbbbbbbbbbbb</b><br>Pública<br>Infraestrutura: Boa<br> Coisas a serem melhoradas:<br>Segurança<br>Quadra esportiva<br>Biblioteca<br>"
    },
    {
        nome: "aaaaaaaaaaaaaaaaaa",
        lat: -30.0187,
        lng: -51.1732,
        img: "RioBranco.JPEG",
        estrelas: "4.7",
        avaliacoes: "641",
        categoria: "Colégio Público",
        tooltip: "<b>aaaaaaaaaaaaaaa</b><br>Pública<br>Infraestrutura: Ótima<br> Coisas a serem melhoradas:<br>Filas no atendimento<br>Áreas de convivência<br>"
    },
    {
        nome: "cccccccccccccccccc",
        lat: -30.0341,
        lng: -51.1631,
        img: "Floriano.JPEG",
        estrelas: "3.3",
        avaliacoes: "801",
        categoria: "Colégio Público",
        tooltip: "<b>ccccccccccccccc</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Manutenção estrutural<br>Professores<br>Recursos tecnológicos<br>"
    },
    {
        nome: "ddddddddddddddddddddddd",
        lat: -30.0402,
        lng: -51.1539,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.4",
        avaliacoes: "482",
        categoria: "Colégio Público",
        tooltip: "<b>ddddddddddddddddd</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Atendimento administrativo<br>Laboratórios<br>"
    },
    {
        nome: "eeeeeeeeeeeeeeeeeeeee",
        lat: -30.0302,
        lng: -51.1705,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.2",
        avaliacoes: "366",
        categoria: "Colégio Público",
        tooltip: "<b>eeeeeeeeeeeeeeeeeeee</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Banheiros<br>Material didático<br>"
    },
    {
        nome: "fffffffffffffffffff",
        lat: -30.0436,
        lng: -51.1762,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.3",
        avaliacoes: "319",
        categoria: "Colégio Público",
        tooltip: "<b>fffffffffffffffff</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Cantina<br>Acessibilidade<br>"
    },
    {
        nome: "gggggggggggggggggggggg",
        lat: -30.0245,
        lng: -51.1824,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.5",
        avaliacoes: "499",
        categoria: "Colégio Público",
        tooltip: "<b>gggggggggggt</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Espaço para lazer<br>Comunicação com pais<br>"
    },
    {
        nome: "hhhhhhhhhhhhhhhhhhhhhhhhh",
        lat: -30.0379,
        lng: -51.1661,
        img: "IrmãoPedro.JPEG",
        estrelas: "5",
        avaliacoes: "242",
        categoria: "Colégio Público",
        tooltip: "<b>hhhhhhhhhhhhhh</b><br>Pública<br>Infraestrutura: Excelente<br> Coisas a serem melhoradas:<br>Ampliação de cursos<br>"
    },
    {
        nome: "iiiiiiiiiiiiiiiiiiiiiiiiiiii",
        lat: -30.0328,
        lng: -51.1813,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.2",
        avaliacoes: "301",
        categoria: "Colégio Público",
        tooltip: "<b>iiiiiiiiiiiiiiiiiiiii</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Área esportiva<br>Lanches<br>"
    },
    {
        nome: "jjjjjjjjjjjjjjjjjjjjjjj",
        lat: -30.0206,
        lng: -51.1872,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.0",
        avaliacoes: "691",
        categoria: "Colégio Público",
        tooltip: "<b>jjjjjjjjjjjjjjjjjjjjjj</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Disciplina<br>Manutenção geral<br>"
    },
    {
        nome: "kkkkkkkkkkkkkkkkkkkkkkkkk",
        lat: -30.0411,
        lng: -51.1913,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.9",
        avaliacoes: "572",
        categoria: "Colégio Público",
        tooltip: "<b>kkkkkkkkkkkkkkkkkkkkkkk</b><br>Pública<br>Infraestrutura: Ótima<br> Coisas a serem melhoradas:<br>Estacionamento<br>"
    },
    {
        nome: "llllllllllllllllllllllllll",
        lat: -30.0177,
        lng: -51.2011,
        img: "IrmãoPedro.JPEG",
        estrelas: "3.8",
        avaliacoes: "719",
        categoria: "Colégio Público",
        tooltip: "<b>llllllllllllllllllllll</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Professores<br>Organização<br>Limpeza<br>"
    },
    {
        nome: "mmmmmmmmmmmmmmmmmmmmmmmmm",
        lat: -30.0450,
        lng: -51.1994,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.7",
        avaliacoes: "1024",
        categoria: "Colégio Público",
        tooltip: "<b>mmmmmmmmmmmmmmmmmmmm</b><br>Pública<br>Infraestrutura: Ótima<br> Coisas a serem melhoradas:<br>Demora em serviços<br>Espaços culturais<br>"
    },
    {
        nome: "nnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        lat: -30.0324,
        lng: -51.2106,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.7",
        avaliacoes: "892",
        categoria: "Colégio Público",
        tooltip: "<b>nnnnnnnnnnnnnnnnnnn</b><br>Pública<br>Infraestrutura: Ótima<br> Coisas a serem melhoradas:<br>Comunicação interna<br>Áreas de estudo<br>"
    },
    {
        nome: "oooooooooooooooooooooo",
        lat: -30.0433,
        lng: -51.1857,
        img: "IrmãoPedro.JPEG",
        estrelas: "3.9",
        avaliacoes: "618",
        categoria: "Colégio Público",
        tooltip: "<b>oooooooooooooooooo</b><br>Pública<br>Infraestrutura: OK<br> Coisas a serem melhoradas:<br>Segurança<br>Internet<br>Refeitório<br>"
    },
    {
        nome: "ppppppppppppppppppppp",
        lat: -30.0300,
        lng: -51.1950,
        img: "IrmãoPedro.JPEG",
        estrelas: "4.6",
        avaliacoes: "902",
        categoria: "Colégio Público",
        tooltip: "<b>ppppppppppppppppppp</b><br>Pública<br>Infraestrutura: Ótima<br> Coisas a serem melhoradas:<br>Tempo de resposta<br>Atividades extracurriculares<br>"
    },
    {
        nome: "qqqqqqqqqqqqqqqqqqqqqq",
        lat: -30.0250,
        lng: -51.2000,
        img: "IrmãoPedro.JPEG",
        estrelas: "5",
        avaliacoes: "862",
        categoria: "Colégio Público",
        tooltip: "<b>qqqqqqqqqqqqqqqqqqqqqqqqqq</b><br>Pública<br>Infraestrutura: Excelente<br> Coisas a serem melhoradas:<br>Ampliação de turmas<br>"
    }
];


// CRIA OS MARCADORES
locais.forEach(function(local) {

    var marker = L.marker([local.lat, local.lng]).addTo(map);

    // --- tooltip limpinho ---
    let tooltipClean = local.tooltip.split("Coisas a serem melhoradas:")[0];
    marker.bindTooltip(tooltipClean, {
        permanent: false,
        direction: "right",
        offset: [10, 0],
        opacity: 1
    });

    // --- extrai melhorias ---
    let melhoriasText = local.tooltip.split("Coisas a serem melhoradas:<br>")[1] || "";
    let melhoriasArray = melhoriasText.split("<br>").filter(t => t.trim() !== "");

    let melhoriasHTML = melhoriasArray.length
        ? "<ul style='padding-left:15px;font-size:12px;'>" + melhoriasArray.map(m => `<li>${m}</li>`).join("") + "</ul>"
        : "Sem informações";

    // --- popup ---
    var popupContent = `
        <div style="max-width:200px;">
            <img src="${local.img}" style="width:100%;border-radius:6px">
            <div style="font-weight:bold;margin-top:6px">${local.nome}</div>
            <div>⭐ ${local.estrelas} • (${local.avaliacoes} avaliações)</div>
            <div style="color:gray">${local.categoria}</div>
            <br>
            <b>Coisas a serem melhoradas:</b>
            ${melhoriasHTML}
        </div>
    `;
    marker.bindPopup(popupContent);

    marker.on("click", function(){
        abrirSidebar(local, melhoriasHTML);
    });
});


// SIDEBAR CORRIGIDO
function abrirSidebar(local, melhoriasHTML){
    document.getElementById("sidebarContent").innerHTML = `
        <img src="${local.img}" style="width:100%;border-radius:6px;">
        <h2>${local.nome}</h2>
        <p>⭐ ${local.estrelas} • (${local.avaliacoes} avaliações)</p>
        <p>${local.categoria}</p>
        <br>
        <b>Melhorias:</b>
        ${melhoriasHTML}
    `;
    document.getElementById("sidebar").style.display = "block";
}

document.getElementById("closeSidebar").onclick = function(){
    document.getElementById("sidebar").style.display = "none";
};

document.getElementById("btnVoltar").onclick = function() {
    window.location.href = "index.html"; 
};
