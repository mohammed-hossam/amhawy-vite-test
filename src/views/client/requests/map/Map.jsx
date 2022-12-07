/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
// import toast from 'react-hot-toast';
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import mapStyles from './map.module.css';
import { roundToTwo } from '../../../../utils/math/index';

let jsts = window.jsts;

const Map = ({ gpx, owner, gov, totalArea }) => {
  const mapRef = useRef(null);
  const legendRef = useRef(null);
  // const editBtnRef = useRef(null);
  // const saveBtnRef = useRef(null);
  const gogle = useRef(window.google);
  const map = useRef(null);
  const infoWindow = useRef(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  // const [renderedPolygons, setRenderedPolygons] = useState([]);
  // const [totalArea, setTotalArea] = useState(0);

  //to be sure if the user upload the same data shown, dont render the data agian as new layer on top of the existing one

  const globalPolygonsMarkers = useRef([]);

  function drawIntersectionArea(map, polygon) {
    var coords = polygon.getCoordinates().map(function (coord) {
      return { lat: coord.x, lng: coord.y };
    });

    var intersectionArea = new gogle.current.maps.Polygon({
      paths: coords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2.5,
      fillColor: 'red',
      fillOpacity: 0.35,
    });
    intersectionArea.setMap(map);
  }

  function createJstsPolygon(geometryFactory, polygon) {
    // console.log(polygon);
    var path = polygon.getPath();
    // console.log(path.getArray());
    var coordinates = path.getArray().map(function name(coord) {
      // console.log(coord);
      return new jsts.geom.Coordinate(coord?.lat(), coord?.lng());
    });
    coordinates.push(coordinates[0]);
    var shell = geometryFactory.createLinearRing(coordinates);
    return geometryFactory.createPolygon(shell);
  }

  useEffect(() => {
    if (gpx) {
      const google = gogle.current;
      const mapOptions = {
        zoom: 16,
        // center: myLatlng,
        // center: { lat: 24.886, lng: -70.268 },
        streetViewControl: false,
        mapTypeId: 'satellite',
        scrollwheel: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'water',
            stylers: [
              {
                saturation: 43,
              },
              {
                lightness: -11,
              },
              {
                hue: '#0088ff',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
              {
                hue: '#ff0000',
              },
              {
                saturation: -100,
              },
              {
                lightness: 99,
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#808080',
              },
              {
                lightness: 54,
              },
            ],
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#ece2d9',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#ccdca1',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#767676',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#ffffff',
              },
            ],
          },
          {
            featureType: 'poi',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry.fill',
            stylers: [
              {
                visibility: 'on',
              },
              {
                color: '#b8cb93',
              },
            ],
          },
          {
            featureType: 'poi.park',
            stylers: [
              {
                visibility: 'on',
              },
            ],
          },
          {
            featureType: 'poi.sports_complex',
            stylers: [
              {
                visibility: 'on',
              },
            ],
          },
          {
            featureType: 'poi.medical',
            stylers: [
              {
                visibility: 'on',
              },
            ],
          },
          {
            featureType: 'poi.business',
            stylers: [
              {
                visibility: 'simplified',
              },
            ],
          },
        ],
      };

      map.current = new google.maps.Map(mapRef.current, mapOptions);
      infoWindow.current = new google.maps.InfoWindow({
        content: '',
        disableAutoPan: true,
      });

      map.current.controls[google.maps.ControlPosition.RIGHT_CENTER].push(
        legendRef.current
      );
      // map.current.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      //   editBtnRef.current
      // );
      // map.current.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      //   saveBtnRef.current
      // );

      setPolygonPoints(gpx);
    }
  }, [gpx]);

  useEffect(() => {
    if (gpx) {
      const google = gogle.current;

      if (gpx.length > 0 && polygonPoints.length > 0) {
        // let finalTotalArea = 0;
        const polygons = polygonPoints?.map((el, i) => {
          // Construct the polygon.
          const polygon = new google.maps.Polygon({
            geodesic: true,
            // editable: true,
            paths: el.points,
            strokeColor: 'black',
            strokeOpacity: 0.4,
            strokeWeight: 2,
            fillColor: 'green',
            fillOpacity: 0.5,
          });

          // const areaMeter = google.maps.geometry.spherical.computeArea(
          //   polygon.getPath()
          // );
          // const areaFeddan = roundToTwo(areaMeter * 0.00023809523809524);
          // finalTotalArea = finalTotalArea + areaFeddan;

          //Define position of label
          const bounds = new google.maps.LatLngBounds();
          for (let i = 0; i < el.points.length; i++) {
            bounds.extend(el.points[i]);
          }

          const myLatlngg = bounds.getCenter();

          const marker = new google.maps.Marker({
            position: myLatlngg,
            icon: `/assets/images/media/alphabet/${el.name_ar}.png`,
            animation: google.maps.Animation.DROP,
          });

          const oldMarkers = globalPolygonsMarkers.current.filter((el) =>
            el.getPosition().equals(myLatlngg)
          );
          // console.log(oldMarkers);
          if (oldMarkers?.length === 0) {
            globalPolygonsMarkers.current.push(marker);
            marker.setMap(map.current);
            polygon.setMap(map.current);
            marker.addListener('click', () => {
              // eslint-disable-next-line no-useless-concat
              const label = `
          <table class='${mapStyles.googleTable_table}'>
          <tr class='${mapStyles.googleTable_tr}'>
            <td class='${mapStyles.googleTable_td}'>اسم المالك</td>
            <td class=${mapStyles.googleTable_td}>${owner}</td>
          </tr>
          <tr class='${mapStyles.googleTable_tr}'>
          <td class='${mapStyles.googleTable_td}'>اسم القطعة</td>
            <td class=${mapStyles.googleTable_td}>${el.name_ar}</td>
          </tr>
          <tr class='${mapStyles.googleTable_tr}'>
          <td class='${mapStyles.googleTable_td}'>المساحة (فدان)</td>
            <td class=${mapStyles.googleTable_td}>${el.area}</td>
          </tr>
          <tr class='${mapStyles.googleTable_tr}'>
          <td class='${mapStyles.googleTable_td}'>الصنف</td>
            <td class=${mapStyles.googleTable_td}>${
                el.variety === null
                  ? 'لم يتم تحديد الصنف بعد'
                  : el.variety.replace(/_/g, ' ')
              }</td>
          </tr>
        </table>
          `;
              infoWindow.current.setContent(label);
              infoWindow.current.open(map.current, marker);
            });
          }

          return { name_ar: el.name_ar, polygon: polygon };
        });

        // zoom to the polygons
        if (polygons.length > 0) {
          function FitBounds() {
            let bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < polygons.length; i++) {
              var paths = polygons[i].polygon.getPaths();
              paths.forEach(function (path) {
                var ar = path.getArray();
                for (var i = 0, l = ar.length; i < l; i++) {
                  bounds.extend(ar[i]);
                }
              });
            }
            map.current.fitBounds(bounds);
            map.current.setCenter(bounds.getCenter());
          }
          FitBounds();
        }

        // setRenderedPolygons(polygons);
        // setTotalArea(finalTotalArea);
        // console.log(bounds.extend(polygons[0]?.getPosition()));
        // var geometryFactory = new jsts.geom.GeometryFactory();
        // var Polygon1 = createJstsPolygon(geometryFactory, polygons[0]);
        // var Polygon2 = createJstsPolygon(geometryFactory, polygons[1]);
        // var intersection = Polygon1.intersection(Polygon2);
        // drawIntersectionArea(map.current, intersection);
      }
    }
  }, [gpx, polygonPoints, owner]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <div>
                  <p>موقع المزرعة</p>
                </div>
              </CardHeader>

              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  {gpx && <div style={{ height: `100%` }} ref={mapRef}></div>}

                  <table
                    className={mapStyles.googleTable_table}
                    id={mapStyles.legend}
                    ref={legendRef}
                  >
                    <tbody>
                      <tr className={mapStyles.googleTable_tr}>
                        <td
                          className={mapStyles.googleTable_td}
                          style={{ fontSize: '1rem' }}
                        >
                          اسم المالك
                        </td>
                        <td
                          className={mapStyles.googleTable_td}
                          style={{ fontSize: '1rem' }}
                        >
                          {owner}
                        </td>
                      </tr>
                      <tr className={mapStyles.googleTable_tr}>
                        <td
                          className={mapStyles.googleTable_td}
                          style={{ fontSize: '1rem' }}
                        >
                          عدد القطع
                        </td>
                        <td
                          className={mapStyles.googleTable_td}
                          style={{ fontSize: '1rem' }}
                        >
                          {(gpx && gpx.length) || 0}
                        </td>
                      </tr>
                      <tr className={mapStyles.googleTable_tr}>
                        <td
                          className={mapStyles.googleTable_td}
                          style={{ fontSize: '1rem' }}
                        >
                          المحافظة
                        </td>
                        <td
                          className={mapStyles.googleTable_td}
                          style={{ fontSize: '1rem' }}
                        >
                          {gov}
                        </td>
                      </tr>
                      <tr className={mapStyles.googleTable_tr}>
                        <td
                          className={mapStyles.googleTable_td}
                          style={{ fontSize: '1rem' }}
                        >
                          المساحة الكلية
                        </td>
                        <td
                          className={mapStyles.googleTable_td}
                          style={{ fontSize: '1rem' }}
                        >
                          {totalArea && roundToTwo(totalArea)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Map;
