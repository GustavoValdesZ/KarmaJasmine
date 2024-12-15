import { Component } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  constructor() {}

  // Obtiene la ubicación y actualiza el iframe con la URL dinámica
  async getLocationAndShowOnMap() {
    try {
      // Solicitar permisos de ubicación
      const permission: PermissionStatus = await Geolocation.requestPermissions();
      if (permission.location !== 'granted') {
        console.error('Permiso de ubicación no otorgado');
        return;
      }

      // Obtener posición actual
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Actualizar iframe dinámicamente
      const mapFrame = document.getElementById('mapframe') as HTMLIFrameElement;
      if (mapFrame) {
        mapFrame.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
      }
    } catch (error) {
      console.error('Error al obtener la ubicación o mostrar el mapa:', error);
    }
  }
}
