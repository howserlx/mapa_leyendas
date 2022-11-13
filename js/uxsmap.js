/*************************************************
 uxsmap.js
 v 2.1.0
 Utils and functions for Google Maps API
**************************************************/
const ZOOM_ANIMATION_SPEED = 220;
const GEOJSON_TEMPLATE = '{ "type":"FeatureCollection", "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } }, "features":[] }';
const GEOJSON_FEATURE_TEMPLATE  = '{ "type":"Feature", "geometry":{ "type":"", "coordinates":[] }, "properties":null }';
const GEOMETRY_TYPE = {
  POINT:'Point',
  MULTIPOINT:'MultiPoint',
  LINE:'LineString',
  MULTILINE:'MultiLineString',
  POLYGON:'Polygon',
  MULTIPOLYGON:'MultiPolygon',
  GEOMETRY_COLLECTION:'GeometryCollection'
}

const ICON_MAP_URL = 'img/map/';

/*******************************
 ready
********************************/
$( document ).ready(function() {


});

/*******************************
 MapStyle
********************************/
function setMapStyle(map_style){
  $.get( map_style, function( data ) {
    if (data) {
        let mapStyle = data;
        if(map)
           map.setOptions({styles:mapStyle});
    }
  });
}

/*change map backgroundColor once google maps is initializated */
function setMapBackgroundColor($color){
  let element = document.getElementById('map').children[0];
  if(element){
    element.style.backgroundColor = $color;
  }
}

/*******************************
 Position
********************************/
function moveTo(lat,lng){

  if(map && lat && lng){
    lat = (lat instanceof Number)? lat: parseFloat(''+lat);
    lng = (lng instanceof Number)? lng: parseFloat(''+lng);

    let latLng = new google.maps.LatLng(lat, lng);

    let pos = {
      lat: lat,
      lng: lng
    };
    map.setCenter(latLng);
    //map.setOptions({center:latLng});
  }
}

function panTo(lat,lng){

  if(map && lat && lng){
    lat = (lat instanceof Number)? lat: parseFloat(''+lat);
    lng = (lng instanceof Number)? lng: parseFloat(''+lng);

    let latLng = new google.maps.LatLng(lat, lng);

    let pos = {
      lat: lat,
      lng: lng
    };
    map.panTo(latLng);
    //map.setOptions({center:latLng});
  }
}

/*******************************
 Zoom && Pan
********************************/
function setZoom(map_zoom, animate){
  if(map)
     if(animate)
       smoothZoom(map, map_zoom, map.getZoom());
     else
       map.setOptions({zoom:map_zoom});
}

// the smooth zoom function
function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, ZOOM_ANIMATION_SPEED);
    }
}

/*******************************
 geoJSON to JSON
********************************/
/*Convert geojson properties to point array*/
function geoJSONToArray($geojson_path, $data, $callback){
  //json data
  $geojson_path+='?v='+moment.now().toString(); //need moment

  $.getJSON($geojson_path, function(data){
      //create Array
      data.features.forEach(function(d){
        $data.push(d.properties);
      });

      

      //callback
      if($callback){
        $callback($data);
      }
  }).fail(function(){
      console.log("An error has occurred on loading a GeoJSON.");
  });
}


/*******************************
  JSON to geoJSON
********************************/
/**
 * 
 * @param {*} $data 
 * @param {*} $lat_name 
 * @param {*} $lng_name 
 * @param {*} $geometry_type GEOMETRY_TYPE.POINT
 * @returns 
 */
function jsonToGeoJSON($data, $lat_name, $lng_name, $geometry_type){

  let geojson_ = JSON.parse(GEOJSON_TEMPLATE);

  if($data && $data.length>0)
    $data.forEach(function(d){
      let $lat = parseFloat(d[$lat_name]);
      let $lng = parseFloat(d[$lng_name]);

      //build feature
      let feature_ = JSON.parse(GEOJSON_FEATURE_TEMPLATE);

      feature_.geometry.type = $geometry_type
      feature_.geometry.coordinates = [$lng, $lat];
      feature_.properties = d;

      geojson_.features.push(feature_);
    });

    return geojson_;
}


/*Convert geojson line to point array*/
function geoJSONLineToPointArray($geojson_path, $data, $reverse, $callback, $line_id){
  //json data
  $geojson_path+='?v='+moment.now().toString(); //need moment
  
  //json data
  $.getJSON($geojson_path, function(data){
      //create Array

      let cont = 0;
      data.features.forEach(function(d){
        if(d.geometry){
          if($reverse){
            for (let coordinate in d.geometry.coordinates.reverse()) {
              $data.push(d.geometry.coordinates[coordinate]);
            }
          }else{
            for (let coordinate in d.geometry.coordinates) {
              $data.push(d.geometry.coordinates[coordinate]);
            }
          }
        }
      });

      //callback
      if($callback){
        $callback($data, $line_id);
      }

  }).fail(function(){
      console.log("An error has occurred on loading a GeoJSON.");
  });
}


/*******************************
 measeure
********************************/
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance_points = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};


/*******************************
 show info dialog
********************************/
function showInfo(jsonEvent, type){

}//showInfo


/*******************************
 GeoJSONLayer
********************************/
function initGeoJSONLayer($layer, $callback){
  $layer.layer = new google.maps.Data({map: map});
  $layer.layer.loadGeoJson($layer.src, null, $callback);
  $layer.loaded = true;

}

function destroyGeoJSONLayer($layer){
  if ($layer.layer) {
      $layer.layer.setMap(null);
      $layer.layer = null;
  }
}


/*******************************
 KMLLayer
********************************/
function initKMLLayer($layer){
  $layer.layer = new google.maps.KmlLayer($layer.src, {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  $layer.loaded = true;

}

/*******************************
 Enables/Disabled Layer
********************************/
function toggleLayer(layer, status, _id){
  if (layer) {
        layer.setMap(status?map:null);

        if(!status){
          $(_id).addClass('grey-img');
          $(_id).addClass('fab-label-light');
          $(_id+'_label').addClass('muted-text');
        }
  	    else{
          $(_id).removeClass('grey-img');
          $(_id).removeClass('fab-label-light');
          $(_id+'_label').removeClass('muted-text');
        }
    }
}

function toggleLayerBtn(status, _id){
    if(!status){
      $(_id).addClass('grey-img');
      $(_id).addClass('fab-label-light');
      $(_id+'_label').addClass('muted-text');
    }
    else{
      $(_id).removeClass('grey-img');
      $(_id).removeClass('fab-label-light');
      $(_id+'_label').removeClass('muted-text');
    }
}

/*******************************
 Layer Style
********************************/
function getLayerIcon($layer){
  return ICON_MAP_URL+$layer.style.icon+'.png';
}

function getLayerDisplayName($layer){
  return $layer.style.display_name;
}

/*******************************
 Error Handle
********************************/
/*Handle Location Error from HTML5 geolocation*/
function handleLocationError(browserHasGeolocation, infoWindow, pos) {

}

/*******************************
 Street View
********************************/

function setStreetViewPosition(position, toogle){
  if(position){
    panorama = map.getStreetView();
    panorama.setPosition(position);
    panorama.setPov(
    /** @type {google.maps.StreetViewPov} */ {
      heading: 265,
      pitch: 0,
    });

    if(toogle) toggleStreetView();
  }
}

function toggleStreetView() {
  if(panorama){
    const toggleSV = panorama.getVisible();

    if (toggleSV == false) {
      panorama.setVisible(true);
    } else {
      panorama.setVisible(false);
    }
  }
}
