/*******************************
 places.js
  v 1.0.0
********************************/

const DEFALUT_PLACES_FIELDS =  ['name', 'geometry'];
let placesService;


/**
 * Find Places
 * @param {*} query 
 * @param {*} fields 
 * @param {*} callback 
 */
function searchPlaces(query, fields, callback){

    if(!placesService)
        placesService = new google.maps.places.PlacesService(map);

    fields = (fields)?fields:DEFALUT_PLACES_FIELDS;

    let request = {
        query: query,
        fields: ['name', 'geometry'],
    };

    placesService.findPlaceFromQuery(request, function(results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            callback(results[i]);
          }
        }
    });

}
