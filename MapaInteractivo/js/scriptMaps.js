


(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
    key: "",
    // Add other bootstrap parameters as needed, using camel case.
    // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
});

// Initialize and add the map

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "mapaRef.aspx/CoordenadasData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const coordenadas = JSON.parse(response.d);

            initMap2(coordenadas);
        },
        error: function (error) {
            console.log("Error: ", error);
        }
    });

});

function initMap(data) {

    const positionInitial = { lat: 14.08859223233112, lng: -87.1959680999667 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: positionInitial,
    });

    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();

    // Create the markers.
    for (const i in data) {

        const marker = new google.maps.Marker({
            position: { "lat": parseFloat(data[i].lat), "lng": parseFloat(data[i].lng) },
            map,
            title: data[i].nombre,
            label: `${data[i].id + 1}`,
            optimized: false,
            icon: "/assets/discapacidad-visual.png"
            //icon:  "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"
        });

        // Add a click listener for each marker, and set up the info window.
        marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
        });
    };
}

const iconos = [
    {
        "type": "fisica",
        "source": "/assets/persona-discapacitada.png"
    },
    {
        "type": "visual",
        "source": "/assets/discapacidad-visual.png"
    },
    {
        "type": "verbal",
        "source": "/assets/discapacidad-de-habla.png"
    },
    {
        "type": "auditiva",
        "source": "/assets/discapacidad-auditiva.png"
    }
]

async function initMap2(coordenadas) {

    const positionInitial = { lat: 14.08859223233112, lng: -87.1959680999667 };

    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
        "marker",
    );

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: positionInitial,
        mapId: "DEMO_MAP_ID",
    });

    /*const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
    });*/
    const infoWindow = new google.maps.InfoWindow();
  
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
    const markers = coordenadas.map((data, i) => {

        /*const label = labels[i % labels.length];

        const pinGlyph = new google.maps.marker.PinElement({
            glyph: label,
            glyphColor: "white",
        });

       const marker = new google.maps.marker.AdvancedMarkerElement({
            position: {"lat": parseFloat(data.lat), "lng": parseFloat(data.lng)},
            content: pinGlyph.element,
            title: data.nombre
        });*/

        const marker = new google.maps.Marker({
            position: { "lat": parseFloat(data.lat), "lng": parseFloat(data.lng) },
            map,
            title: data.nombre,
            id: data.id,
            label: `${data.id + 1}`,
            optimized: false,
            icon: "/assets/la-discapacidad-auditiva.png"
        });

        const info = `<h3>Tìtulo</h3><p>Un texto de prueba</p><br/><a href="#" onclick="test(${data.id}">Màs...</a>`

        marker.addListener("click", () => {
            infoWindow.setContent(info);
            infoWindow.open(map, marker);
        });

        return marker;
    });

    const renderer = {
        render({ count, position }) {
            return new google.maps.Marker({
                label: { text: String(count), color: "black", fontSize: "20px" },
                position,
                icon: "/assets/cluster.png",
                zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
            })
        }
    }

    new markerClusterer.MarkerClusterer({ map, markers, renderer });
}

function pop() {
    //Realizar la llamada AJAX y al tener los datos utilizar el alert

    Swal.fire({
        title: "Informacion general",
        text: "Mas datos de informacion general",
        icon: "question"
    });
}


/*function test() {
    $.ajax({
        type: "POST",
        url: "mapaRef.aspx/detalle",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            const data = JSON.parse(response.d);
            
            //data con la info de la bd, pasar parametros a swal
            Swal.fire({
                title: data[0].detalle,
                text: "Mas datos de informacion general",
                icon: "question"
            });
        },
        error: function (error) {
            console.log("Error: ", error);
        }
    });

}*/


function test(infoWindow, id) {
    $.ajax({
        type: "POST",
        url: "mapaRef.aspx/detalle",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            const data = JSON.parse(response.d);
            Swal.fire({
                title: data[0].detalle,
                text: "Mas datos de informacion general",
                icon: "question"
            }).then((result) => { 
                if (result.isConfirmed) { 
                    infoWindow.close();
                }
            });
        },
        error: function (error) {
            console.log("Error: ", error);
        }
    });
}
