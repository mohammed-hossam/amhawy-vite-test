class MapUtils {
  fitBounds(polygonsInstances, mapInstance) {
    const bounds = new window.google.maps.LatLngBounds();
    if (polygonsInstances.length > 0) {
      for (let i = 0; i < polygonsInstances.length; i++) {
        var paths = polygonsInstances[i].getPaths();

        paths.forEach((path) => {
          const ar = path.getArray();

          for (let i = 0, l = ar.length; i < l; i++) {
            bounds.extend(ar[i]);
          }
        });
      }
      mapInstance.fitBounds(bounds);
      mapInstance.setCenter(bounds.getCenter());
    }
  }

  markersFitBounds(markers, mapInstance) {
    // console.log(markers);
    var bounds = new window.google.maps.LatLngBounds();

    if (markers.length > 0) {
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].getVisible()) {
          bounds.extend(markers[i].getPosition());
        }
      }

      mapInstance.fitBounds(bounds);
      mapInstance.setCenter(bounds.getCenter());
    }
  }
}

export default MapUtils;
