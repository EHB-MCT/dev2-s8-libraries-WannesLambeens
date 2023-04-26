"use strict";

const app = {
    map: null, // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
    init() {
        // initialise de kaart
        this.map = L.map('map').setView([50.846869, 4.352187], 13);

        // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
        // vergeet openstreetmap attributie niet
        //var marker = L.marker([50.8710816,4.3369149]).addTo(this.map);
        // gebruik de functie "loadMarkers" om de markers toe te voegen
        this.loadMarkers();
    },
    loadMarkers() {
        // fetch de data van opendata.brussels.be
        fetch('https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000')
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            let i = 0;
            data.records.forEach(e => {
                let lat = data.records[i].fields.wgs84_lat;
                let lon = data.records[i].fields.wgs84_long;
                app.addMarker(lat, lon);
                i++;
            });

        });
        
            // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
        
        
    },
    addMarker(lat, lon) {
        // voeg een marker toe op lat, lon
        var marker = L.marker([lat, lon]).addTo(this.map);
    }
}

app.init();
