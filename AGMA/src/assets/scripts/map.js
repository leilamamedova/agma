data = { iconclass: 'A' };
const lat = $('#map').attr('lat');
const lon = $('#map').attr('lon');
var iconclasses = {
    A: 'font-size: 22px;'
};
var map = new L.Map('map-container', {
    center: [lat, lon-0.002],
    zoom: 50
});
L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    accessToken: '1D3RATovmYp10lDxhUOKUn7nBR0el5RpDbWuB45tQ8wF7Paarixv6cUZSbmeMhPu'
}).addTo(map);

var pos = new L.LatLng(lat, lon);
var iconclass = iconclasses[data.iconclass] ? data.iconclass : '';
var iconstyle = iconclass ? iconclasses[iconclass] : '';
var icontext = iconclass ? '' : data.iconclass;

var icon = L.divIcon({
    className: 'map-marker ' + iconclass,
    iconSize: null,
    html: '<div class="icon" style="' + iconstyle + '">' + icontext + '</div><div class="map-arrow" />'
});

L.marker(pos).addTo(map);
L.marker(pos, { icon: icon }).addTo(map);



