/*******************************
 project.js
  v 1.4 (2022)
********************************/
let initLat = 24.242109488767056;
let initLng = -101.48496095215182;

let initZoom = 6;
let finalZoom = 6;

let geolocationZoom = 7;

let currentLat = 24.242109488767056;
let currentLng = -101.48496095215182;

let map; //map object
let panorama; //street view object
let infowindow; //global info window
let titlewindow; //global title window
const SHOW_LABELS = true;

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

//GMap Controls
//let gmap_restriction = null; /*boundary that restricts the area of the map accessible to users*/

let gmap_restriction = {
  latLngBounds: {
    north: 36.49744201329152,
    south: 10.722654154816919,
    west: -127.9474281164977,
    east: -71.85858914732421,
  },
  strictBounds: false,
};

let gmap_backgroundColor = "#fff"; //
let gmap_backgroundColor_night = "rgb(8,48,75)"; //important in rgb
let gmap_backgroundColor_day = "rgb(236,234,228)"; //important in rgb

let gmap_mapTypeId = "roadmap";

let gmap_maxZoom = 10;
let gmap_minZoom = 6;

let gmap_mapTypeControl = false;
let gmap_fullscreenControl = false;
let gmap_zoomControl = true;
let gmap_streetViewControl = false;

//LAYERS
//-----------------------------------------------------------------
let layers = [];
layers["traffic"] = {
  src: "",
  layer: null,
  status: true,
  loaded: false,
  style: { icon: "traffic", display_name: "Tráfico" },
};
layers["mx_ent_00"] = {
  src: "data/mx_ent_00.geojson",
  layer: null,
  status: true,
  loaded: false,
  style: { icon: "", display_name: "Estados de México" },
};

let entidades = layers["mx_ent_00"];
let trafficLayer = layers["traffic"];

//PLACES
//-----------------------------------------------------------------
let places = [];
places["a"] = {
  lat: 21.0,
  lng: -100.0,
  title: "a",
  zoom: 5,
  final_zoom: 15,
  icon: "a.png",
  marker: null,
  data: { name: "a", title: "a", description: "a" },
};

//AUDIO
//-----------------------------------------------------------------
let audio;
let audio_loop;
let soundEnabled = false;

const AUDIO_ON_CLASS = "icon-volume-high";
const AUDIO_OFF_CLASS = "icon-volume-mute5";

let sounds = [];
sounds["music"] = { file: "sound/ghost_stories.mp3", volume: 0.5 };
sounds["ghost_scream"] = { file: "sound/ghost_scream.mp3", volume: 0.5 };

//MAP CONTROL
//-----------------------------------------------------------------
const MAP_FIRST_HOUR = 6; //daytime
const MAP_LAST_HOUR = 18; //daytime

let firstUserInteracion = false; //user interaction

let mapModeON = true;
let html5GeolocationEnabled = true; //enables html5Geolocation
let html5GeolocationInit = false; //enables html5Geolocation when page is loaded
let showDisclaimer = false;

const DELAY_1 = 1000;
const DELAY_2 = 1000;
const DELAY_3 = 1000;

//SIDEBAR
let mapLeftSidebarOpen = false;
let mapRightSidebarOpen = false;

//FILTER
let $total_count = 0;
let $filter_count = 0;

//LEYENDAS MAP
const GHOST_IMAGE = "ghost-index.png";

/*******************************
 messages
********************************/
const HELP_INFO = {
  help: "",
};

/*******************************
 ready
********************************/
$(document).ready(function () {
  //Mensajes de ayuda
  $("[data-toggle=popover]").each(function () {
    $(this).popover({
      title: HELP_INFO["titulo"],
      content: HELP_INFO[$(this).attr("data-info")],
      trigger: "hover",
      html: true,
    });
  });

  //closeSideBar
  //closeLeftMapSidebar();

  //lang_selected
  let lang_selected = $("#lang_selected").val();
  $("#lang_selected_" + lang_selected).addClass("active btn-info");

  //locale
  moment.locale($("#lang_selected").val()); //Multilanguaje

  //example
  //let txt = ($('#lang_selected').val()==='es')?'Hola':'Hello';

  //Floating
  // $('#uxmap_controls').affix({
  //     offset: {
  //         top: $('#uxmap_controls').offset().top - 20
  //     }
  // });

  //Tooltips
  $(".layer-tooltip").tooltip();

  //Disclaimer
  if (showDisclaimer) $("#modal_disclaimer_info").modal("show");

  //activate map
  $("#activate_map").click(function (e) {
    e.preventDefault();

    mapModeON = true;
    activateMap(mapModeON);
  });

  /*Traffic Layer*/
  $("#uxmap_c_traffic_layer").click(function () {
    let layer_ = layers["traffic"];

    if (layer_) {
      layer_.status = !layer_.status;
      toggleLayer(layer_.layer, layer_.status, "#" + $(this).attr("id"));
    }
  });

  /*Activate/deactivate layer*/
  $(".uxmap_c_layer").click(function () {
    let layer_id = $(this).attr("uxmap-layer");
    let layer_ = layers[layer_id];

    if (layer_) {
      layer_.status = !layer_.status;
      let $id = "#" + $(this).attr("id");
      toggleLayer(layer_.layer, layer_.status, $id);
      toggleLayerBtn(layer_.status, "_p" + $id);

      //apply filter
      //doFilter();
    }
  });

  /*Activate/deactivate layer*/
  $(".p_uxmap_c_layer").click(function () {
    let layer_id = $(this).attr("uxmap-layer");
    let layer_ = layers[layer_id];

    if (layer_) {
      layer_.status = !layer_.status;
      let $id = "#" + $(this).attr("id");
      toggleLayer(layer_.layer, layer_.status, $id);
      toggleLayerBtn(layer_.status, $id.replace("p_uxmap", "uxmap"));

      //apply filter
      //doFilter();
    }
  });

  //reload
  $("#uxmap_c_layer_reload").click(function () {
    currentLat = map.getCenter().lat();
    currentLng = map.getCenter().lng();
  });

  //uxmap controls - deactivate
  $("#uxmap_c_deactivate_map").click(function (e) {
    e.preventDefault();
    setMapStyle("map_style_day.json");

    mapModeON = false;
    activateMap(mapModeON);
  });

  //uxmap controls - geolocation
  $("#uxmap_c_geolocation").click(function (e) {
    e.preventDefault();

    if (html5GeolocationEnabled && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          currentLat = position.coords.latitude;
          currentLng = position.coords.longitude;

          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(pos);
          map.setZoom(geolocationZoom);

          //init marker / reload
        },
        function () {
          handleLocationError(true, infowindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infowindow, map.getCenter());
    }
  });

  //uxmap controls - audio
  $("#uxmap_c_sound_map").click(function (e) {
    e.preventDefault();

    soundEnabled = !soundEnabled;

    enableAudio(true);
  });

  //uxmap controls - exit streetview
  $(".uxmap_c_exit_street_view").click(function (e) {
    e.preventDefault();
    map.getStreetView().setVisible(false);
  });

  //audio
  //initAudio();

  //detect first user interaction (audio.play)
  window.addEventListener("click", () => {
    if (!firstUserInteracion) {
      firstUserInteracion = true;
      if (mapModeON) initAudio("music", true);
    }
  });
  window.addEventListener("toogle", () => {
    if (!firstUserInteracion) {
      firstUserInteracion = true;
      if (mapModeON) initAudio("music", true);
    }
  });

  window.addEventListener("scroll", () => {
    if (!firstUserInteracion) {
      firstUserInteracion = true;
      if (mapModeON) initAudio("music", true);
    }
  });

  //init Controls
  initControls();

  //Determina cuando se esconde el dialogo de footer
  hideFooterDialog();

  $("#footer_dialog_header .card-title").click(function () {
    $("#footer_dialog_collapse").click(); //haciendo click en el titulo se colapsa
  });

  $("#footer_dialog_btn").click(function () {
    $("#footer_dialog_collapse").click(); //haciendo click en el boton se colapsa
  });

  // DIALOG EVENTS
  /*on modal shown*/
  $("#modal_map_").on("shown.bs.modal", function () {});
  /*on modal hide*/
  $("#modal_map_").on("hide.bs.modal", function () {});

  //FILTER EVENTS

  //filtrar
  $("#do_filter").on("click", function (e) {
    doFilter();
  });

  //i18n
  $("#lang_selected_en").on("click", function (e) {
    e.preventDefault();
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set("lang", "en");

    let shareURL =
      location.protocol +
      "//" +
      location.host +
      location.pathname +
      "?" +
      urlParams.toString();
    window.location = shareURL;
  });

  $("#lang_selected_es").on("click", function (e) {
    e.preventDefault();
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set("lang", "es");

    let shareURL =
      location.protocol +
      "//" +
      location.host +
      location.pathname +
      "?" +
      urlParams.toString();
    window.location = shareURL;
  });
});

function initControls() {
  //initWizard();

  //QueryParams
  let urlParams = new URLSearchParams(window.location.search);
  let aParam_ = urlParams.get("myParam");

  // select
  // $('.select2').select2({
  //   minimumResultsForSearch: -1
  // });

  // //multiselect
  // $('.multiselect').multiselect();

  // // Styled checkboxes and radios
  // $('.styled').uniform();
} //initControls

/*Slider Aux*/
let lang = "es-MX";
function dateToTS(date) {
  return date.valueOf();
}

function tsToDate(ts) {
  let d = new Date(ts);

  return d.toLocaleDateString(lang, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

function initWizard() {} //initWizard

/*
  id_ - sounds[]
  loop - audio objet
  delay - in ms
*/
function initAudio(id_, loop, delay = 10, callback) {
  //audio
  let sound = sounds[id_];

  if (sound) {
    if (loop) {
      setTimeout(function () {
        audio_loop = document.getElementById("audio_loop");
        audio_loop.src = sound.file;
        audio_loop.volume = sound.volume;
        audio_loop.play();

        if (callback) callback();
      }, delay);
    } else {
      setTimeout(function () {
        audio = document.getElementById("audio");
        audio.src = sound.file;
        audio.volume = sound.volume;
        audio.play();
        if (callback) callback();
      }, delay);
    }

    soundEnabled = true;
    enableAudio();
  }
} //initAudio

/*
  id_ - sounds[]
  loop - audio objet
  delay - in ms
*/
function stopAudio(loop, delay = 10) {
  //audio

  if (loop) {
    setTimeout(function () {
      audio_loop = document.getElementById("audio_loop");
      audio_loop.pause();
    }, delay);
  } else {
    setTimeout(function () {
      audio = document.getElementById("audio");
      audio.pause();
    }, delay);
  }
} //initAudio

function enableAudio(loop) {
  if (!mapModeON)
    if (loop)
      if (audio_loop) audio_loop.pause();
      else if (audio) audio.pause();

  if (firstUserInteracion && mapModeON)
    if (soundEnabled) {
      $("#uxmap_c_sound_map_icon").addClass(AUDIO_ON_CLASS);
      $("#uxmap_c_sound_map_icon").removeClass(AUDIO_OFF_CLASS);
      if (loop)
        if (audio_loop) audio_loop.play();
        else if (audio) audio.play();
    } else {
      $("#uxmap_c_sound_map_icon").removeClass(AUDIO_ON_CLASS);
      $("#uxmap_c_sound_map_icon").addClass(AUDIO_OFF_CLASS);
      if (loop)
        if (audio_loop) audio_loop.pause();
        else if (audio) audio.pause();
    }
}

/*******************************
 init google maps
********************************/
function initMap() {
  $.get(defineMapStyle(), function (data) {
    if (data) {
      let mapStyle = data;

      /*--------------------------------------------*/
      // QUERY PARAMS
      /*--------------------------------------------*/
      let urlParams = new URLSearchParams(window.location.search);
      let p_cvegeo = urlParams.get("cvegeo");
      let p_l = urlParams.get("l");

      if (p_cvegeo) loadLeyendasMap(p_cvegeo, p_l);

      /*--------------------------------------------*/
      // init map
      /*--------------------------------------------*/
      map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(initLat, initLng),
        restriction: gmap_restriction,

        styles: mapStyle,
        mapTypeId: gmap_mapTypeId,
        backgroundColor: gmap_backgroundColor,

        zoom: initZoom,
        maxZoom: gmap_maxZoom,
        minZoom: gmap_minZoom,

        mapTypeControl: gmap_mapTypeControl,
        fullscreenControl: gmap_fullscreenControl,
        zoomControl: gmap_zoomControl,
        streetViewControl: gmap_streetViewControl,
        gestureHandling: "greedy" /*Important to navigate on mobile */,
      });

      /*--------------------------------------------*/
      //Try HTML5 geolocation.
      /*--------------------------------------------*/
      if (
        html5GeolocationEnabled &&
        html5GeolocationInit &&
        navigator.geolocation
      ) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;

            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            map.setCenter(pos);
            map.setZoom(geolocationZoom);

            //init marker
          },
          function () {
            handleLocationError(true, infowindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infowindow, map.getCenter());
      }

      /*--------------------------------------------*/
      // Layers
      /*--------------------------------------------*/
      initGeoJSONLayer(entidades, function () {
        //click
        entidades.layer.addListener("click", function (event) {
          let cvegeo = event.feature.getProperty("CVEGEO");
          loadLeyendasMap(cvegeo);
        });

        //hover style
        entidades.layer.addListener("mouseover", function (event) {
          let cvegeo = event.feature.getProperty("CVEGEO");
          let entidad = searchEntidad(cvegeo);

          if (entidad && entidad.enabled) {
            entidades.layer.revertStyle();
            entidades.layer.overrideStyle(event.feature, {
              strokeColor: "#ccc",
              strokeWeight: 6,
            });
          }
        });

        //hover style out
        entidades.layer.addListener("mouseout", function (event) {
          entidades.layer.revertStyle();
        });

        //markers
        ENTIDADES.forEach(function (e) {
          //solo leyendas/entidades habilitadas
          if (e.enabled) buildMarker(e.id);
        });
      }); //

      /*--------------------------------------------*/
      // Traffic Layer
      /*--------------------------------------------*/
      trafficLayer.layer = new google.maps.TrafficLayer();
      trafficLayer.status = false;
      trafficLayer.loaded = true;
      toggleLayer(
        trafficLayer.layer,
        trafficLayer.status,
        "#uxmap_c_traffic_layer"
      );

      /*--------------------------------------------*/
      //StreetMap change visibility event
      /*--------------------------------------------*/
      google.maps.event.addListener(
        map.getStreetView(),
        "visible_changed",
        function () {
          panorama = map.getStreetView();

          //control de propiedades de StreetView
          //panorama.setEnableCloseButton(false);
          panorama.setOptions({
            addressControlOptions: {
              position: google.maps.ControlPosition.TOP_RIGHT,
            },
            linksControl: true /*nav arrows*/,
            panControl: true /*compass*/,
            enableCloseButton: true /*close button*/,
            fullscreenControl: false,
          });

          if (this.getVisible() == true) {
            $("#uxmap_c_exit_street_view_container").show();
            $("#uxmap_c_geolocation").hide();
            $("#lang-selector").hide();
            $("#footer_dialog").hide();
          } else {
            $("#uxmap_c_exit_street_view_container").hide();
            $("#uxmap_c_geolocation").show();
            $("#lang-selector").show();
            $("#footer_dialog").show();
          }
        }
      );

      //toggleLayer(layer_leyendas, status_leyendas, "#leyendas");

      /*--------------------------------------------*/
      //Zoom to finalZoom animation
      /*--------------------------------------------*/
      setZoom(finalZoom, true);

      //init Marker

      /*--------------------------------------------*/
      //Click Map Event
      /*--------------------------------------------*/
      google.maps.event.addListener(map, "click", (e) => {});

      /*--------------------------------------------*/
      //Map Center Change Event
      /*--------------------------------------------*/
      google.maps.event.addListener(map, "center_changed", (e) => {
        let newLat = map.getCenter().lat();
        let newLng = map.getCenter().lng();

        currentLat = newLat;
        currentLng = newLng;
      });
    } //data
  });
} //initMap

/*define map style */
function defineMapStyle() {
  //map on
  mapModeON = true;
  activateMap(mapModeON);

  //background color
  gmap_backgroundColor = gmap_backgroundColor_night;

  return "map_style_night.json?v=2";
}

/*map mode ON*/
function activateMap(mode) {
  if (mode) {
    //elements
    $("#night").show();
    $("#uxmap_controls").show();

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
function loadLeyendasMap(cvegeo, leyenda) {
  //ghost animation
  $(".center-window").css("display", "flex"); //show ghost animation
  initAudio("ghost_scream", false); //ghost_scream

  window.setTimeout(function () {
    let entidad = searchEntidad(cvegeo);
    if (entidad && entidad.enabled)
      window.location.href =
        window.location.origin +
        ("/stories.php?cvegeo=" + cvegeo) +
        (leyenda ? "&l=" + leyenda : "");
  }, 1250);
}

/*******************************
 Places
********************************/
function goToPlace(id, pan = false, final = false) {
  let place = places[$id];

  let a_zoom = final ? place.final_zoom : place.zoom;
  //zoom (si es pantalla chica el zoom disminuye un nivel)
  a_zoom =
    getBootstrapDeviceSize() == "xs" || getBootstrapDeviceSize() == "sm"
      ? a_zoom - 1
      : a_zoom;

  if (place) {
    if (pan) panTo(place.lat, place.lng);
    else moveTo(place.lat, place.lng);

    setZoom(a_zoom, false);
  }
} //goToPlace

/*******************************
 Markers
********************************/
function buildMarker(id_, draggable = false, animation = false) {
  let marker_data = searchEntidad(id_);
  animation = animation ? google.maps.Animation.BOUNCE : null;

  let a_icon = {
    url: ICON_MAP_URL + GHOST_IMAGE,
    scaledSize: new google.maps.Size(35, 50),
    origin: new google.maps.Point(0, 0),
  };

  if (marker_data) {
    let aMarker = new MarkerWithLabel({
      position: { lat: marker_data.lat, lng: marker_data.lng },
      draggable: false,
      raiseOnDrag: false,
      map: map,
      icon: a_icon,
      labelContent: marker_data.title,
      labelAnchor: new google.maps.Point("25", 0),
      labelClass: "legend_name_label", // the CSS class for the label
      labelStyle: { opacity: 0.66 },
    });

    aMarker.addListener("click", function (event) {
      loadLeyendasMap(id_);
    });
  }
} //buildMarker

function showMarkerInfo(jsonEvent, $id) {
  if (mapModeON) {
    let place = places[$id];
    if (place) {
      let $img = "img/" + place.icon;
      let $name = place.data.name;
      let $title = place.data.title;
      let $description = place.data.description;

      $(".modal_marker_img").attr("src", $img);
      $("#modal_marker_name").html($name ? $name : "");
      $("#modal_marker_description").html($description ? $description : "");
      $(".modal_marker_title").html($title ? $title : "");
      $("#modal_marker").modal("show");

      //si el zoom final es diferente va hacia el zoom
      if (place.zoom != place.final_zoom) goToPlace($id, true, true);
    }
  } //showMarkerInfo
}

/*******************************
BLOCK/UNBLOCK
********************************/
function blockPage() {
  $("body").block({
    message:
      '<i class="icon-spinner4 spinner" style="font-size:3em;"></i> <h6>LOADING</h6>',
    overlayCSS: {
      backgroundColor: "#1B2024",
      opacity: 0.85,
      cursor: "wait",
    },
    css: {
      border: 0,
      padding: 0,
      backgroundColor: "none",
      color: "#fff",
    },
  });
}

function unblockPage() {
  if (
    cementerio.loaded &&
    panteon.loaded
  ) {
    window.setTimeout(function () {
      $("body").unblock();
      cementerio.loaded = false;
      panteon.loaded = false;
    }, 2000);
  }
}

/*******************************
  VIEW HANDLERS
********************************/
function hideFooterDialog() {
  //esconde dialogo footer si es una pantalla chica
  if (getBootstrapDeviceSize() == "xs" || getBootstrapDeviceSize() == "sm")
    window.setTimeout(function () {
      $("#footer_dialog_collapse").click();
    }, 2000);
}
function getBootstrapDeviceSize() {
  return $("#users-device-size").find("div:visible").first().attr("id");
}


/*******************************
  MAP SIDEBARS
********************************/
function openLeftMapSidebar() {
  if (getBootstrapDeviceSize() == "xs") {
    document.getElementById("map-left-sidebar").style.left = "0";
    //document.getElementById("main").style.marginLeft = "100%";
  } else {
    document.getElementById("map-left-sidebar").style.left = "0";
    //document.getElementById("main").style.marginLeft = "460px";
  }

  mapLeftSidebarOpen = true;
}

function closeLeftMapSidebar() {
  if (getBootstrapDeviceSize() == "xs") {
    document.getElementById("map-left-sidebar").style.left = "-100%";
    //document.getElementById("main").style.marginLeft = "100%";
  } else {
    document.getElementById("map-left-sidebar").style.left = "-50%";
    //document.getElementById("main").style.marginLeft = "460px";
  }

  mapLeftSidebarOpen = false;
}

function openRightMapSidebar() {
  if (getBootstrapDeviceSize() == "xs") {
    document.getElementById("map-right-sidebar").style.right = "0";
    //document.getElementById("main").style.marginLeft = "100%";
  } else {
    document.getElementById("map-right-sidebar").style.right = "0";
    //document.getElementById("main").style.marginLeft = "460px";
  }

  mapRightSidebarOpen = true;
}

function closeRightMapSidebar() {
  if (getBootstrapDeviceSize() == "xs") {
    document.getElementById("map-right-sidebar").style.right = "-100%";
    //document.getElementById("main").style.marginLeft = "100%";
  } else {
    document.getElementById("map-right-sidebar").style.right = "-50%";
    //document.getElementById("main").style.marginLeft = "460px";
  }

  mapRightSidebarOpen = false;
}

/*******************************
  FILTER
********************************/
function doFilter() {
  //restart
  destroyGeoJSONLayer(example);
  initGeoJSONLayer(example, function () {
    //style
    example.layer.setStyle(function (feature) {
      let tipo = feature.getProperty("tipo_penal");
      let image_icon = tipo == "1" ? "1.png" : "2.png";
      return {
        icon: {
          url: ICON_MAP_URL + image_icon,
          scaledSize: new google.maps.Size(32, 32),
        },
      };
    });

    //listener
    example.layer.addListener("click", function (event) {
      showInfo(event, "");
    });

    let $layer = example.layer;

    $total_count = 0;
    $filter_count = 0;

    $layer.forEach(function (d) {
      $total_count++;
      //console.log(d);

      //si no cumple remueve el feature
      if (!matchFilters(d)) {
        $layer.remove(d);
      } else {
        $filter_count++;
      }
    });

    //update filter
    $("#filter_count").html($filter_count);
    $("#total_count").html($total_count);
  });
}

/*Valida si cumple filtros*/
function matchFilters($feature) {
  let $a_in = true;
  let $b_in = true;
  let $c_in = true;
  let $d_in = true;

  return $a_in && $b_in && $c_in && $d_in;
}
