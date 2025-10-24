import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const initialLat = 57.46836682442526;
const initialLng = -4.239353020303229;
const initialZoom = 13;

const map = L.map('map').setView([initialLat, initialLng], initialZoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const marker = L.marker([initialLat, initialLng]).addTo(map);
marker.bindPopup('<b>Inverness, UK</b><br>¡Hola Leaflet!').openPopup();

