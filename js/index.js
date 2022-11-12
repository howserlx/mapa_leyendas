/*******************************
 index.js
 v 1.3
********************************/
var initLat = 24.242109488767056;
var initLng = -101.48496095215182;

var initZoom = 6;
var finalZoom = 6;

var geolocationZoom = 7;

var currentLat = 24.242109488767056;
var currentLng = -101.48496095215182;

var map; //map object
var panorama; //street view object
var infowindow; //global info window
var titlewindow; //global title window
const SHOW_LABELS = true;

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';


//GMap Controls
//var gmap_restriction = null; /*boundary that restricts the area of the map accessible to users*/

var gmap_restriction = {
  latLngBounds: {
    north: 36.49744201329152, 
    south: 10.722654154816919, 
    west: -127.9474281164977,
    east: -71.85858914732421,
  },
  strictBounds: false,
};

var gmap_backgroundColor = '#fff'; //
var gmap_backgroundColor_night = 'rgb(8,48,75)'; //important in rgb
var gmap_backgroundColor_day = 'rgb(236,234,228)'; //important in rgb

var gmap_mapTypeId = 'roadmap';

var gmap_maxZoom = 10;
var gmap_minZoom = 6;

var gmap_mapTypeControl = false;
var gmap_fullscreenControl = false;
var gmap_zoomControl = true;
var gmap_streetViewControl = false;


//LAYERS
//-----------------------------------------------------------------
var layers = [];
layers['traffic']  = {src:'', layer:null, status:true, loaded:false, style:{icon:'traffic',display_name:'Tráfico'}};
layers['mx_ent_00']  = {src:'data/mx_ent_00.geojson', layer:null, status:true, loaded:false, style:{icon:'',display_name:'Estados de México'}};

var entidades = layers['mx_ent_00'];
var trafficLayer = layers['traffic'];


//PLACES
//-----------------------------------------------------------------
var places = [];
//places['24'] = {id:'24', lat:22.152027, lng:-100.978453, title:'a', zoom:5, final_zoom:10, icon:'fantasma.png', marker:null, data:{name:'San Luis Potosí',title:'San Luis Potosí',description:'San Luis Potosí'}}



//AUDIO
//-----------------------------------------------------------------
var audio;
var audio_loop;
var soundEnabled = false;


const AUDIO_ON_CLASS = 'icon-volume-high';
const AUDIO_OFF_CLASS = 'icon-volume-mute5';

var sounds = [];
sounds['background_sound'] = {file:'sound/ghost_stories.mp3', volume:0.5};
sounds['ghost_scream'] = {file:'sound/ghost_scream.mp3', volume:0.5};


//MAP CONTROL
//-----------------------------------------------------------------
var firstUserInteracion = false; //user interaction

var mapModeON = true;
var html5GeolocationEnabled = true; //enables html5Geolocation
var html5GeolocationInit = false //enables html5Geolocation when page is loaded
var showDisclaimer = false;

const COLLAPSIBLE_FOOTER_DIALOG_TITLE = 'Project';

//SIDEBAR
var sidebarOpen = false;

//FILTER
var $total_count  = 0;
var $filter_count = 0;


//LEGEND
//============================================================



/*******************************
 messages
********************************/
const HELP_INFO = {
  help:'',
}

/*******************************
 ready
********************************/
$( document ).ready(function() {


  //Mensajes de ayuda
    $("[data-toggle=popover]").each(function () {
        $(this).popover({
            title: HELP_INFO['titulo'],
            content: HELP_INFO[$(this).attr('data-info')],
            trigger: 'hover',
            html:true
        });
    });

    //closeSideBar
    //closeMapSidebar();

    //Floating
    $('#uxmap_controls').affix({
        offset: {
            top: $('#uxmap_controls').offset().top - 20
        }
    });

	  //Tooltips
    $('.layer-tooltip').tooltip();


    //Disclaimer
    if(showDisclaimer)
      $('#modal_disclaimer_info').modal('show');

    //activate map
    $('#activate_map').click(function(e){
      e.preventDefault();

      mapModeON = true;
      activateMap(mapModeON);
    });



    //uxmap controls - geolocation
    $('#uxmap_c_geolocation').click(function(e){
      e.preventDefault();

      if (html5GeolocationEnabled && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {

          currentLat = position.coords.latitude;
          currentLng = position.coords.longitude;

          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(pos);
          map.setZoom(geolocationZoom);

          //init marker / reload



        }, function() {
          handleLocationError(true, infowindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infowindow, map.getCenter());
      }
    });


    //uxmap controls - audio
    $('#uxmap_c_sound_map').click(function(e){
      e.preventDefault();

      soundEnabled = !soundEnabled;

      enableAudio(true);

    });


    //uxmap controls - exit streetview
    $('.uxmap_c_exit_street_view').click(function(e){
      e.preventDefault();
      map.getStreetView().setVisible(false);
    });



    //detect first user interaction (audio.play)
    window.addEventListener("click", () => {
      if(!firstUserInteracion){firstUserInteracion=true; if(mapModeON) initAudio('background_sound',true); }
    });
    window.addEventListener("toogle", () => {
      if(!firstUserInteracion){firstUserInteracion=true; if(mapModeON) initAudio('background_sound',true);}
    });

    window.addEventListener("scroll", () => {
      if(!firstUserInteracion){firstUserInteracion=true; if(mapModeON) initAudio('background_sound',true);}
    });

    //init Controls
    initControls();

    hideCollapsibleFooterDialog();
	  
    $('#collapsible_footer_dialog_header .panel-title').click(function(){
        $('#collapsible_footer_dialog_collapse').click(); //haciendo click en el titulo se colapsa
    });
    $('#collapsible_footer_dialog_btn').click(function(){
      $('#collapsible_footer_dialog_collapse').click(); //haciendo click en el titulo se colapsa
	});


    //FILTER EVENTS

    //filtrar
    $('#do_filter').on('click',function(e){
        doFilter();
    });

});

function initControls(){

    //initWizard();

    // select
    $('.select2').select2({
      minimumResultsForSearch: -1
    });

	  //multiselect
    $('.multiselect').multiselect();

    // Styled checkboxes and radios
    $('.styled').uniform();

}//initControls



/*
  id_ - sounds[]
  loop - audio objet
  delay - in ms
*/
function initAudio(id_ , loop, delay=10, callback){
  //audio
  var sound = sounds[id_]

  if(sound){
    if(loop){

      setTimeout(function() {
        audio_loop =  document.getElementById("audio_loop");
        audio_loop.src = sound.file;
        audio_loop.volume = sound.volume;
        audio_loop.play();

        if(callback)
           callback();
      }, delay);


    }else{

      setTimeout(function() {
        audio =  document.getElementById("audio");
        audio.src = sound.file;
        audio.volume = sound.volume;
        audio.play();
        if(callback)
           callback();
      }, delay);

    }

    soundEnabled = true;
    enableAudio(true);
  }
}//initAudio


/*
  id_ - sounds[]
  loop - audio objet
  delay - in ms
*/
function stopAudio(loop, delay=10){
  //audio

    if(loop){
      setTimeout(function() {
        audio_loop =  document.getElementById("audio_loop");
        audio_loop.pause();
      }, delay);


    }else{
      setTimeout(function() {
        audio =  document.getElementById("audio");
        audio.pause();
      }, delay);

    }
}//initAudio


function enableAudio(loop){

    if(!mapModeON)
      if(loop)
        if(audio_loop)audio_loop.pause();
      else
        if(audio)audio.pause();
  
    if(firstUserInteracion && mapModeON)
      if(soundEnabled){
        $('#uxmap_c_sound_map_icon').addClass(AUDIO_ON_CLASS);
        $('#uxmap_c_sound_map_icon').removeClass(AUDIO_OFF_CLASS);
        if(loop)
          if(audio_loop)audio_loop.play();
        else
          if(audio)audio.play();
        }
  
      else{
        $('#uxmap_c_sound_map_icon').removeClass(AUDIO_ON_CLASS);
        $('#uxmap_c_sound_map_icon').addClass(AUDIO_OFF_CLASS);
        if(loop)
          if(audio_loop)audio_loop.pause();
        else
          if(audio)audio.pause();
      }
  
}


/*******************************
 init google maps
********************************/
function initMap(){
  $.get( defineMapStyle(), function( data ) {
    if (data) {
        let mapStyle = data;

        /*--------------------------------------------*/
        // QUERY PARAMS
        /*--------------------------------------------*/
        var urlParams = new URLSearchParams(window.location.search);
        var p_cvegeo = urlParams.get('cvegeo');
        var p_l = urlParams.get('l');

        if(p_cvegeo)
            loadLeyendasMap(p_cvegeo, p_l);


        /*--------------------------------------------*/
        // init map
        /*--------------------------------------------*/
        map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(initLat,initLng),
            restriction: gmap_restriction,

            styles: mapStyle,
            mapTypeId:gmap_mapTypeId,
            backgroundColor:gmap_backgroundColor,

            zoom: initZoom,
            maxZoom: gmap_maxZoom,
            minZoom: gmap_minZoom,

            mapTypeControl: gmap_mapTypeControl,
            fullscreenControl:gmap_fullscreenControl,
            zoomControl:gmap_zoomControl,
            streetViewControl:gmap_streetViewControl,

        });

        /*--------------------------------------------*/
        //Try HTML5 geolocation.
        /*--------------------------------------------*/
        if (html5GeolocationEnabled && html5GeolocationInit && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

			      currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
            map.setZoom(geolocationZoom);

            //init marker


          }, function() {
            handleLocationError(true, infowindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infowindow, map.getCenter());
        }


        
        /*--------------------------------------------*/
        // Layers
        /*--------------------------------------------*/
        initGeoJSONLayer(entidades,function(){
            
            //click
            entidades.layer.addListener('click', function(event) {
                let cvegeo = event.feature.getProperty('CVEGEO');
                loadLeyendasMap(cvegeo);
            });

            //hover style
            entidades.layer.addListener('mouseover', function(event) {
                let cvegeo = event.feature.getProperty('CVEGEO');
                let entidad = searchEntidad(cvegeo);

                if(entidad && entidad.enabled){
                    entidades.layer.revertStyle();
                    entidades.layer.overrideStyle(event.feature, {
                        strokeColor: '#ccc',
                        strokeWeight: 6
                    });
                }
            });
              
            //hover style out
            entidades.layer.addListener('mouseout', function(event) {
                entidades.layer.revertStyle();
            });


            //markers
            ENTIDADES.forEach(function(e){
                //solo leyendas/entidades habilitadas
                if(e.enabled)
                    buildMarker(e.id);
            })

            //
            
        })//

        /*--------------------------------------------*/
        //StreetMap change visibility event
        /*--------------------------------------------*/
        google.maps.event.addListener(map.getStreetView(), 'visible_changed', function(){
            panorama = map.getStreetView();

            //control de propiedades de StreetView
            //panorama.setEnableCloseButton(false);
            panorama.setOptions({
              addressControlOptions:{
                position: google.maps.ControlPosition.TOP_RIGHT,
              },
              linksControl: true, /*nav arrows*/
              panControl: true, /*compass*/
              enableCloseButton: true, /*close button*/
              fullscreenControl:false,
            });

            if(this.getVisible() == true) {
                $('#uxmap_c_exit_street_view_container').show()
                $('#uxmap_c_geolocation').hide();
            } else {
                $('#uxmap_c_exit_street_view_container').hide()
                $('#uxmap_c_geolocation').show();
            }
        });

        /*--------------------------------------------*/
        //Zoom to finalZoom animation
        /*--------------------------------------------*/
        setZoom(finalZoom, true);


        //init Marker


        /*--------------------------------------------*/
        //Click Map Event
        /*--------------------------------------------*/
        google.maps.event.addListener(map, "click", (e) => {


        });
		
		
	    /*--------------------------------------------*/
        //Zoom Map Event
        /*--------------------------------------------*/
        google.maps.event.addListener(map, "zoom_changed", (e) => {

          
          
        });

    }//data
  });


}//initMap


/*define map style */
function defineMapStyle(){

  //map on
  mapModeON = true;
  activateMap(mapModeON);

  //background color
  gmap_backgroundColor = gmap_backgroundColor_night;

  return 'map_style_night.json?v=2';
}

/*map mode ON*/
function activateMap(mode){

  if(mode){
    //elements
    $('#night').show();
    $('#uxmap_controls').show();

    //initAudio('background_sound',true);

    //map bg color
    setMapBackgroundColor(gmap_backgroundColor_night);

  }

  //check if audio is enabled
  enableAudio(true);
}



/*******************************
 GoToMap
********************************/

/*
 *  Init a Legend Map
 */
function loadLeyendasMap($cvegeo, $leyenda){
    //ghost animation
    $('.center-window').css('display','flex'); //show ghost animation
    initAudio('ghost_scream',false); //ghost_scream

    window.setTimeout(function() {
      let entidad = searchEntidad($cvegeo);
      if(entidad && entidad.enabled)
          window.location.href = window.location.origin + ("/stories.php?cvegeo="+$cvegeo) + (($leyenda)?'&l='+$leyenda:'');
    }, 750)
    
}



/*******************************
 Places
********************************/
function goToPlace($id, $pan=false, $final=false){
  var place = places[$id];

  let a_zoom = ($final)?place.final_zoom:place.zoom;
  //zoom (si es pantalla chica el zoom disminuye un nivel)
      a_zoom = (getBootstrapDeviceSize()=='xs' || getBootstrapDeviceSize()=='sm')? (a_zoom)-1 : a_zoom;

  if(place){
    if($pan)
      panTo(place.lat, place.lng);
    else
      moveTo(place.lat, place.lng);

    setZoom(a_zoom, false);
  }
}//goToPlace



/*******************************
 Markers
********************************/
function buildMarker(id_, $draggable=false){

  var marker_data = searchEntidad(id_)
  var $animation = ($animation)?google.maps.Animation.BOUNCE:null;
  
  a_icon = {
        url:ICON_MAP_URL+'fantasma.png',
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
  }
  

  if(marker_data){
    var a_marker = new MarkerWithLabel({
      position: { lat: marker_data.lat, lng: marker_data.lng },
      draggable: false,
      raiseOnDrag: false,
      map: map,
      icon: a_icon,
      labelContent: marker_data.title,
      labelAnchor: new google.maps.Point('25', 0),
      labelClass: "legend_name_label", // the CSS class for the label
      labelStyle: {opacity: 0.66}
    });

	 a_marker.addListener('click', function(event) {
        loadLeyendasMap(id_);
     });
  }

}//buildMarker


function showMarkerInfo(jsonEvent, $id){
  if(mapModeON){
    let place = places[$id];
    if(place){
      let $img = 'img/'+ place.icon;
      let $name = place.data.name;
      let $title = place.data.title;
      let $description = place.data.description;
      
      $('.modal_marker_img').attr('src',$img);
      $('#modal_marker_name').html(($name)?$name:'');
      $('#modal_marker_description').html(($description)?$description:'');
      $('.modal_marker_title').html(($title)?$title:'');
      $('#modal_marker').modal('show');

      //si el zoom final es diferente va hacia el zoom
      if(place.zoom != place.final_zoom)
         goToPlace($id, true, true);
    }
    

  }//showMarkerInfo
} 



/*******************************
BLOCK/UNBLOCK
********************************/
function blockPage(){
  $('body').block({
      message: '<i class="icon-spinner4 spinner" style="font-size:3em;"></i> <h6>CONSULTANDO INFORMACIÓN</h6>',
      overlayCSS: {
          backgroundColor: '#1B2024',
          opacity: 0.85,
          cursor: 'wait'
      },
      css: {
          border: 0,
          padding: 0,
          backgroundColor: 'none',
          color: '#fff'
      }
  });
}

function unblockPage(){
  if(cafeterias.loaded && dulcerias.loaded && florerias.loaded && regalos.loaded){


    window.setTimeout(function () {
        $('body').unblock();
        cafeterias.loaded = false;
        dulcerias.loaded = false;
        florerias.loaded = false;
        regalos.loaded = false;
    }, 2000);
  }
}


/*******************************
  VIEW HANDLERS
********************************/
function hideCollapsibleFooterDialog(){
  //esconde dialogo collapsible si es una pantalla chica
  if(getBootstrapDeviceSize()=='xs' || getBootstrapDeviceSize()=='sm')
    window.setTimeout(function () {
      $('#collapsible_footer_dialog_collapse').click();
    }, 2000);
}
function getBootstrapDeviceSize() {
  return $('#users-device-size').find('div:visible').first().attr('id');
}



/*******************************
  MAP SIDEBAR
********************************/
function openMapSidebar() {
  if(getBootstrapDeviceSize()=='xs'){
    document.getElementById("mapSidebar").style.left = "0";
    //document.getElementById("main").style.marginLeft = "100%";
  }else{
    document.getElementById("mapSidebar").style.left = "0";
    //document.getElementById("main").style.marginLeft = "460px";
  }

  sidebarOpen = true;
}

function closeMapSidebar() {
  if(getBootstrapDeviceSize()=='xs'){
    document.getElementById("mapSidebar").style.left = "-100%";
    //document.getElementById("main").style.marginLeft = "100%";
  }else{
    document.getElementById("mapSidebar").style.left = "-50%";
    //document.getElementById("main").style.marginLeft = "460px";
  }

  sidebarOpen = false;
}



/*******************************
  FILTER
********************************/
function doFilter(){

  

}

/*Valida si cumple filtros*/
function matchFilters($feature){

  let $a_in = true;
  let $b_in = true;
  let $c_in  = true;
  let $d_in = true;

  return ($a_in && $b_in && $c_in && $d_in );
}




/**
 * Put the label for the legend
 */
function setLabelForRoute(path, $id) {

  let leyenda = searchLeyenda($id);
  if(leyenda){
    let $title = (leyenda.titulo)?leyenda.titulo:'';
    var position = google.maps.geometry.spherical.interpolate(path[0], path[path.length-1],(1/20));
    //var position = google.maps.geometry.spherical.interpolate(path[0], path[1],(1/20));
    //var position = (path[0]);

    var marker = new MarkerWithLabel({
      position: position,
      draggable: true,
      raiseOnDrag: true,
      map: map,
      icon: {
        url:'img/transparent.png',
        size: new google.maps.Size(2, 2),
      },
      
      labelContent: $title,
      labelAnchor: new google.maps.Point(100, 0),
      labelClass: "legend_name_label", // the CSS class for the label
      labelStyle: {opacity: 0.66}
    });

    google.maps.event.addListener(marker, "click", function (e) { showLeyendaInfo(leyenda.clave); });

  }
 }
