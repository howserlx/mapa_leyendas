/*******************************
 project.js
 v 1.3
********************************/
var initLat = 22.152027;
var initLng = -100.978453;

var initZoom = 13;
var finalZoom = 17;

var geolocationZoom = 15;

var currentLat = 22.152027;
var currentLng = -100.978453;

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

var gmap_maxZoom = 21;
var gmap_minZoom = 6;

var gmap_mapTypeControl = false;
var gmap_fullscreenControl = false;
var gmap_zoomControl = true;
var gmap_streetViewControl = true;


//LAYERS
//-----------------------------------------------------------------
var layers = [];
layers['traffic']  = {src:'', layer:null, status:true, loaded:false, style:{icon:'traffic',display_name:'Tráfico'}};
layers['cementerio']  = {src:'', layer:null, status:true, loaded:false, style:{icon:'cementerio',display_name:'Cementerios'}};
layers['panteon']  = {src:'', layer:null, status:true, loaded:false, style:{icon:'panteon',display_name:'Panteónes'}};

var cementerio = layers['cementerio'];
var panteon = layers['panteon'];
var trafficLayer = layers['traffic'];


//PLACES
//-----------------------------------------------------------------
var places = [];
places['a'] = {lat:21.0, lng:-100.0, title:'a', zoom:5, final_zoom:15, icon:'a.png', marker:null, data:{name:'a',title:'a',description:'a'}}



//AUDIO
//-----------------------------------------------------------------
var audio;
var audio_loop;
var soundEnabled = false;


const AUDIO_ON_CLASS = 'icon-volume-high';
const AUDIO_OFF_CLASS = 'icon-volume-mute5';

var sounds = [];
sounds['background_sound'] = {file:'sound/ghost_stories.mp3', volume:0.5};
sounds['ghost_scream'] = {file:'sound/ghost_scream.mp3', volume:0.7};



//DENUE API
//-----------------------------------------------------------------
const DENUE_API_BUSCAR_URL = 'https://www.inegi.org.mx/app/api/denue/v1/consulta/Buscar/{{CONDICION}}/{{COORDENADAS}}/{{DISTANCIA}}/{{TOKEN}}';
const DENUE_API_DISTANCIA = 5000;
const DENUE_API_TOKEN = '34ee721d-a395-4ca5-a4bd-154bae8c9ff7';

const DENUE_API_LAT_ATTR = 'Latitud';
const DENUE_API_LNG_ATTR = 'Longitud';


//MAP CONTROL
//-----------------------------------------------------------------
const MAP_FIRST_HOUR = 6; //daytime
const MAP_LAST_HOUR = 19; //daytime

var firstUserInteracion = false; //user interaction

var mapModeON = true;
var html5GeolocationEnabled = true; //enables html5Geolocation
var html5GeolocationInit = false //enables html5Geolocation when page is loaded
var showDisclaimer = false;

const DELAY_1 = 1000;
const DELAY_2 = 1000;
const DELAY_3 = 1000;


//DIALOGS
//-----------------------------------------------------------------
const TITLE_TEMPLATE = '<img class="title-template-image" src="{{IMAGE}}"/> <small class="title-template-title">{{TITLE}}<small>';
const INFO_TEMPLATE = '<table class="data-table"> 	<tbody> 	<tr> 		<td> 			<img class="data-image" src="{{IMAGE}}"> 		</td>  		<td> 			<h5 class="data-title">{{NOMBRE}}</h5> 			<h6 class="data-field">{{CLASE_ACTIVIDAD}}</h6> 		</td> 	</tr> 	</tbody> </table>';

const COLLAPSIBLE_FOOTER_DIALOG_TITLE = 'Project';


//SIDEBAR
var sidebarOpen = false;


//FILTER
var $total_count  = 0;
var $filter_count = 0;



//LEGEND
//============================================================

//templates dialog
const AUTOR_TEMPLATE = '{{AUTOR_NAME}} <a href="https://instagram.com/{{AUTOR_IG}}" target="_blank">@{{AUTOR_IG}}</a> / <a href="https://www.instagram.com/{{MEDIA_IG}}/" target="_blank">@{{MEDIA_IG}}</a>';
const SOUNDCLOUD_TEMPLATE = '<iframe width="100%" height="500" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url={{URL}}&color=%230e415c&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="{{URL}}" title="Midnight Strike" target="_blank" style="color: #cccccc; text-decoration: none;">Midnight Strike</a> · <a href="{{URL}}" title="{{TITLE}}" target="_blank" style="color: #cccccc; text-decoration: none;">{{TITLE}}</a></div>';
const VIDEO_TEMPLATE = '<div class="video-responsive"><iframe src="https://www.youtube.com/embed/{{VIDEO_ID}}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
const REEL_TEMPLATE = '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/{{REEL_ID}}/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="13" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/{{REEL_ID}}/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/{{REEL_ID}}/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank"></a></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>';
const TIKTOK_TEMPLATE = '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/{{TIKTOK_USER}}/video/{{TIKTOK_ID}}" data-video-id="{{TIKTOK_ID}}" style="border:none; width:100%; max-width:605px;min-width: 325px;" > <section> <a target="_blank" title="{{TIKTOK_USER}}" href="https://www.tiktok.com/{{TIKTOK_USER}}">{{TIKTOK_USER}}</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>';

var CVEGEO; /* Entidad actual (queryparams)*/
var ENTIDAD = '';

//Leyendas Info
var LEYENDAS_INFO_PATH = 'leyendas.json?v=' + moment.now().toString();
var leyendas;
var INIT_LEYENDA; /* Leyenda Inicial (queryparams) */

var leyenda_has_media = false; //if leyend dialog shows media (pause music)

//Leyendas Paths
var leyendasPointArray = [];

//ghost symbol
const GHOST_SVG_1 = 'M625.21,170.17c0.61-6.28-1.04-12.27-3.23-17.94c-2.6-6.75-7.1-12.18-14.96-12.98 				c-7.72-0.79-13.67,2.37-18.32,8.68c-6.04,8.19-8.85,17.77-12.21,27.07c-5.46,15.1-15.75,25.39-30.06,32.12 				c-1.97,0.93-3.03,0.45-4.11-1.03l0,0c-1.6-14.73-4.87-29.06-10.03-42.96l0,0c-11.51-33.56-30.02-62.43-57.61-85.07 				c-31.35-25.73-66.95-37.71-107.7-32.93c-18.98,2.22-37.09,7.44-54.12,15.94c-20.96,10.46-39.57,24.06-55.05,41.96 				c-14.31,16.55-24.8,35.24-33.55,55.08c-6.71,15.23-11.61,31.06-15.47,47.23c-0.44,1.85-0.37,4.24-3.41,3.79l0,0 				c-4.33-2-8.66-3.99-12.99-5.99l0,0l0,0c-12.28-8.38-19.93-19.89-24.3-34.08c-2.37-7.71-5.7-15.16-10.57-21.86 				c-7.97-10.96-23.07-10.81-30.46,0.55c-3.63,5.58-5.1,11.93-5.53,18.34c-1.8,26.46,3.2,51.52,16.73,74.55 				c5.03,8.56,10.43,16.92,18.09,23.5c12.21,13.61,27.22,23.1,44.02,29.97l0,0c0.33,1.1,0.92,2.19,0.97,3.3 				c0.83,19.21,3.42,38.18,7.01,57.06c6.17,32.41,16.41,63.19,35.09,90.76c9.31,13.74,18.76,27.32,30.87,38.82 				c4.39,5.25,9.53,9.7,14.68,14.17c19.99,17.35,42.61,30.12,67.7,38.26c27.34,8.87,55.42,11.41,84.08,8.64 				c26.93-2.6,53.06-8.44,78.23-18.29c14.28-5.59,28.03-12.26,38.8-23.77c6.72-7.18,8.14-15.45,5.41-24.49 				c-2.36-7.82-7.9-11.57-16.06-11.62c-5-0.03-10,0.26-14.98-0.01c-5.96-0.33-11.36-2.18-15.48-6.92 				c-7.17-8.26-8.45-18.46-8.13-28.55c0.46-14.45,4-28.51,8.16-42.37c8.4-27.97,16.18-56.12,21.3-84.9c1.03-5.77,3.6-8.17,8.7-10.28 				c22.61-9.34,41.44-23.67,55.56-43.88C619.06,226.05,626.66,199.41,625.21,170.17z';
const GHOST_SVG_2 = 'M412.63,304.85c-0.13,3.34-0.17,7.32-0.97,11.28c-3.44,16.9-13.45,26.48-30.46,29.2 				c-7.17,1.14-14.3,1.05-21.35-0.47c-13.92-3-23.49-11.14-26.75-25.19c-4.48-19.31-1.87-37.84,8.98-54.62 				c9.14-14.13,25.06-19.64,40.57-14.8c9.76,3.05,16.5,9.72,21.44,18.41C409.66,278.44,412.59,290.79,412.63,304.85z';
const GHOST_SVG_3 = 'M391.77,171.56c0,8.95-7.26,16.21-16.21,16.21s-16.21-7.26-16.21-16.21s7.26-35.95,16.21-35.95 		C384.51,135.61,391.77,162.61,391.77,171.56z';
const GHOST_SVG_4 = 'M476.32,121.53c5.97,6.67,5.4,16.92-1.28,22.89c-6.67,5.97-16.92,5.4-22.89-1.28s-18.56-31.63-11.88-37.6 		C446.94,99.58,470.35,114.86,476.32,121.53z';
const GHOST_SVG_5 = 'M320.82,105.54c6.67,5.97-5.91,30.93-11.88,37.6s-16.22,7.24-22.89,1.28c-6.67-5.97-7.24-16.22-1.28-22.89 		C290.74,114.86,314.15,99.58,320.82,105.54z';
const GHOST_SVG_6 = 'M414.34,546.15c59.5,1.36,28.12-68.02-8.38-20.09c36.5-47.94-44.03-58.23-20.77-2.65 			c-23.27-55.58-72.23,5.04-13.08,17.42c-0.06-0.01,10.62,2.57,20.76,3.76C403.02,545.77,414.4,546.15,414.34,546.15z';
const GHOST_SVG_7 = 'M390.2,526.93c-6.82,1.17-11.95,6.88-12.83,13.75l-0.07,1.3c0,0,8.72,1.76,15.59,2.61s16.1,1.39,16.1,1.39 			l0.21-1.22C410.52,534.34,401.55,524.98,390.2,526.93z';
const GHOST_SVG_8 = 'M335.49,218.91c5.14-1.74,8.84-6.58,8.84-12.31c0-7.18-5.09-13.44-14.84-12.85c1.16-1.95,1.84-4.21,1.84-6.64 			c0-7.18-5.82-13-13-13c-4.09,0-7.74,1.9-10.12,4.86c-0.81-6.4-6.26-11.36-12.88-11.36c-5.46,0-10.13,3.37-12.05,8.15 			c-2.26-3.83-6.44-6.8-11.19-6.41c0,0-13.29,0.98-12.64,15.99c-2.07-1.39-4.56-2.21-7.25-2.21c-7.18,0-13,5.82-13,13 			c0,3.58,1.45,6.82,3.79,9.17c-6.88,0.33-12.37,6-12.37,12.97c0,6.47,4.73,11.82,10.93,12.82c-2.41,2.36-3.91,5.64-3.91,9.28 			c0,7.18,5.82,13,13,13c1.57,0,3.08-0.29,4.47-0.81c-0.45,1.32-0.7,2.72-0.7,4.19c0,7.18,5.82,13,13,13c5.16,0,9.6-3.01,11.7-7.36 			c2.1,4.35,6.54,7.36,11.7,7.36c7.18,0,14.66-6.51,12.95-13.92c2.37,2.49,5.7,4.04,9.41,4.04c7.18,0,13-5.82,13-13 			c0-1.51-0.27-2.95-0.74-4.3c1.07,0.28,2.19,0.45,3.34,0.45c7.18,0,13-5.82,13-13C341.75,225.3,339.24,221.19,335.49,218.91z';
const GHOST_SVG_9 = 'M293.34,253.98c-18.84,6.09-39.06-4.25-45.15-23.1s4.25-39.06,23.1-45.15s52.13,0.03,58.22,18.87 			C335.6,223.46,312.19,247.9,293.34,253.98z';
const GHOST_SVG_10 = 'M269.55,232.01c-6.09-18.84,4.25-39.06,23.1-45.15c2.74-0.89,5.8-1.51,9.03-1.87 			c-10.53-2.24-21.91-1.98-30.38,0.75c-18.84,6.09-29.19,26.3-23.1,45.15c5.86,18.14,24.8,28.39,43.01,23.71 			C281.28,250.91,273.07,242.88,269.55,232.01z';
const GHOST_SVG_11 = 'M516.27,218.26c0-6.97-5.48-12.64-12.37-12.97c2.34-2.35,3.79-5.59,3.79-9.17c0-7.18-5.82-13-13-13 			c-2.68,0-5.18,0.81-7.25,2.21c1.2-11.41-5.46-15.99-12.64-15.99c-4.77,0-8.93,2.58-11.19,6.41c-1.92-4.77-6.59-8.15-12.05-8.15 			c-6.62,0-12.07,4.95-12.88,11.36c-2.38-2.96-6.03-4.86-10.12-4.86c-7.18,0-13,5.82-13,13c0,2.43,0.68,4.7,1.84,6.64 			c-9.89-0.86-14.84,5.67-14.84,12.85c0,5.72,3.7,10.57,8.84,12.31c-3.75,2.28-6.26,6.39-6.26,11.1c0,7.18,5.82,13,13,13 			c1.16,0,2.28-0.17,3.34-0.45c-0.47,1.35-0.74,2.79-0.74,4.3c0,7.18,5.82,13,13,13c3.7,0,7.04-1.56,9.41-4.04 			c-0.88,8.52,5.77,13.92,12.95,13.92c5.16,0,9.6-3.01,11.7-7.36c2.1,4.35,6.54,7.36,11.7,7.36c7.18,0,15.67-8.31,12.3-17.18 			c1.4,0.51,2.9,0.81,4.47,0.81c7.18,0,13-5.82,13-13c0-3.64-1.5-6.92-3.91-9.28C511.53,230.08,516.27,224.73,516.27,218.26z';
const GHOST_SVG_12 = 'M453.54,253.98c18.84,6.09,39.06-4.25,45.15-23.1c6.09-18.84-4.25-39.06-23.1-45.15s-52.13,0.03-58.22,18.87 			C411.28,223.46,434.69,247.9,453.54,253.98z';
const GHOST_SVG_13 = 'M441.04,205.74c3.78-11.7,18.04-18.49,32.82-20.5c-19.08-5.2-50.59,1.1-56.5,19.38 			c-6.09,18.84,17.33,43.28,36.17,49.37c7.18,2.32,14.55,2.25,21.27,0.24C456.44,246.95,435.21,223.79,441.04,205.74z';
const GHOST_SVG_14 = 'M318.85,58.23c-1.01,11.58,9.48,24.71,31.36,15.64c-41.83,17.33,1.84,60.99,19.16,19.16 			c-17.33,41.83,44.43,41.83,27.1,0c17.33,41.83,60.99-1.84,19.16-19.16c21.88,9.06,32.25-2.79,31.24-14.36 			c-19.56-10.18-41-15.41-63.95-15.41C359.97,44.1,337.96,49.99,318.85,58.23z';
const GHOST_SVG_15 = 'M364.83,45.21c-3.42,4.09-5.48,9.36-5.48,15.11c0,13.02,10.56,23.58,23.58,23.58s23.58-10.56,23.58-23.58 			c0-5.75-2.06-11.02-5.48-15.11c-5.93-0.73-11.97-1.11-18.1-1.11C376.8,44.1,370.76,44.48,364.83,45.21z';

//ghost symbol styles
const GHOST_COLOR_0 = '#E9E9E9';
const GHOST_COLOR_1 = '#3E3D42';
const GHOST_COLOR_2 = '#ED539D';
const GHOST_COLOR_3 = '#424EDE';
const GHOST_COLOR_4 = '#E23991';
const GHOST_COLOR_5 = '#FFE477';
const GHOST_COLOR_6 = '#FF3F62';
const GHOST_COLOR_7 = '#2D2D30';
const GHOST_COLOR_8 = '#F23D19';
const GHOST_SCALE = 0.075;
const GHOST_ROTATION = [0,180,270,270];
var GHOST_ANCHOR;


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


    /*Traffic Layer*/
    $('#uxmap_c_traffic_layer').click(function(){

      var layer_ = layers['traffic'];

      if(layer_){
        layer_.status = !layer_.status;
        toggleLayer(layer_.layer, layer_.status, '#'+$(this).attr('id'));

      }
    });


    //activate map
    $('#activate_map, #activate_map_ghost').click(function(e){
      e.preventDefault();
      setMapStyle('map_style_night.json');

      mapModeON = true;
      activateMap(mapModeON);
    });


    //uxmap controls - deactivate
    $('#uxmap_c_deactivate_map').click(function(e){
      e.preventDefault();
      setMapStyle('map_style_day.json');

      mapModeON = false;
      activateMap(mapModeON);
    });


	  /*Activate/deactivate layer*/
    $('.uxmap_c_layer').click(function(){
      var layer_id = $(this).attr('uxmap-layer');
      var layer_ = layers[layer_id];

      if(layer_){
        layer_.status = !layer_.status;
        toggleLayer(layer_.layer, layer_.status, '#'+$(this).attr('id'));

        //apply filter
        //doFilter();
      }
    });

	  //reload
	  $('#uxmap_c_layer_reload').click(function(){

      currentLat = map.getCenter().lat()
      currentLng = map.getCenter().lng();

  	});


    //uxmap controls - deactivate
    $('#uxmap_c_deactivate_map').click(function(e){
      e.preventDefault();
      setMapStyle('map_style_day.json');

      mapModeON = false;
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


    //audio
    //initAudio();

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


    // DIALOG EVENTS
    /*on modal shown*/
    $('#modal_map_').on('shown.bs.modal', function () {

    })
    /*on modal hide*/
    $('#modal_map_').on('hide.bs.modal', function () {

    })


    //FILTER EVENTS

    //filtrar
    $('#do_filter').on('click',function(e){
        doFilter();
    });



    //NAVIGATION
    $('#modal_map_leyenda_prev,#modal_map_leyenda_next').click(function(e){
      e.preventDefault();
      goToLeyenda($(this).attr('href'));
    });


    //BUILD SHARE LINK
    $('.modal_map_leyenda_share').click(function(e){
      let $id = $(this).attr('href');
      let leyenda = searchLeyenda($id);

      if(leyenda){
        var shareURL = location.protocol + '//' + location.host + location.pathname;

        shareURL+= '?cvegeo=' + CVEGEO;
        shareURL+= '&l=' + $id;

        //btn share
        $('#modal_map_leyenda_share_url').attr('href',shareURL);
        $('#share_url').html(shareURL);

        //iframe
        shareURL = shareURL.replace(/\&/g,'{{ast}}'); /*{{ast}} is n identifier */
        var iframeShareURL= '<iframe src="share_custom_leyenda.html?shareURL='+shareURL+'&title='+leyenda.titulo+'" width="100%" height="60" style="border:none;"></iframe>';
        
        $('#leyenda_for_iframe_container').html(iframeShareURL);
        }

        //show
        $('#modal_map_leyenda_share_block').show();
        

        //hide
        $('#modal_map_leyenda_multimedia').hide();
        $('#modal_map_leyenda_text').hide();
    });

    //COPY TO CLIPBOARD
    $('#share_url_clipboard').click(function(e){
      e.preventDefault();
      
      let copiedText = $('#share_url').html();

      $('#share_url').select();
      document.execCommand("copy");

      if(copiedText){

        new PNotify({
          title: 'Portapapeles',
          text: 'El enlace ha sido copiado al portapapeles',
          icon: 'icon-checkmark3',
          addclass: 'bg-success',
          buttons: {
            closer: true,
            sticker: false
        }
      });
      }
        
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




function initWizard(){

}//initWizard


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
        CVEGEO = urlParams.get('cvegeo');
        INIT_LEYENDA = urlParams.get('l');

        /* Valores de la Entidad */
        let entidad = searchEntidad(CVEGEO);
        if(entidad){
          ENTIDAD = entidad.title;
          LEYENDAS_INFO_PATH = '/data/' + CVEGEO + '/' + LEYENDAS_INFO_PATH;
        
          initLat = entidad.lat;
          initLng = entidad.lng;
          currentLat = entidad.lat;
          currentLng = entidad.lng;

          initZoom = entidad.zoom;
          finalZoom = entidad.zoom;
        }

        
        

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
        // Load Leyendas Info
        /*--------------------------------------------*/
        $.getJSON(LEYENDAS_INFO_PATH, function(data){
          leyendas = data;

          /*--------------------------------------------*/
          //Build paths fo animated symbols
          /*--------------------------------------------*/
          buildLeyendasPath();

          //hay leyenda inicial??
          if(INIT_LEYENDA)
             goToLeyenda(INIT_LEYENDA);

        }).fail(function(){
            console.log("An error has occurred on loading a JSON.");
        });


        
        /*--------------------------------------------*/
        // DENUE
        /*--------------------------------------------*/
        cementerio.layer = new google.maps.Data({map: map});
        panteon.layer = new google.maps.Data({map: map});
        loadDENUEData();

        /*--------------------------------------------*/
        //custom styles
        /*--------------------------------------------*/
        cementerio.layer.setStyle({
          icon: {
            url: 'img/map/cementerio.png',
            scaledSize: new google.maps.Size(64, 64)
          }
        });

        panteon.layer.setStyle({
          icon: {
            url: 'img/map/cementerio.png',
            scaledSize: new google.maps.Size(64, 64)
          }
        });

        /*--------------------------------------------*/
        // Traffic Layer
        /*--------------------------------------------*/
        trafficLayer.layer = new google.maps.TrafficLayer();
        trafficLayer.status = false
        trafficLayer.loaded = true;
        toggleLayer(trafficLayer.layer, trafficLayer.status, '#uxmap_c_traffic_layer');
        

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

        //toggleLayer(layer_leyendas, status_leyendas, "#leyendas");


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

  let hours = new Date().getHours()
  let isDayTime = hours > MAP_FIRST_HOUR && hours < MAP_LAST_HOUR

  //map on
  isDayTime = false;
  mapModeON = !isDayTime;
  activateMap(mapModeON);

  //background color
  gmap_backgroundColor = (isDayTime)? gmap_backgroundColor_day : gmap_backgroundColor_night;

  if(isDayTime)
    return 'map_style_day.json?v=2';

  return 'map_style_night.json?v=2';
}

/*map mode ON*/
function activateMap(mode){

  if(mode){
    //elements
    $('#day').hide();
    $('#night').show();
    $('#uxmap_controls').show();

    //initAudio('background_sound',true);

    //map bg color
    setMapBackgroundColor(gmap_backgroundColor_night);

  }else{
    //elements
    $('#day').show();
    $('#night').hide();
    $('#uxmap_controls').hide();

    setMapBackgroundColor(gmap_backgroundColor_day);
  }

  //check if audio is enabled
  enableAudio(true);
}



/*******************************
 show info dialog
********************************/
function showTitle(jsonEvent, $layer){
  if(mapModeON){
		
  }//mapModeOn
}


function hideTitle(){
}
  

function showInfo(jsonEvent, $layer){
  if(mapModeON){
	/*var content = INFO_TEMPLATE.replace('{{NOMBRE}}',jsonEvent.feature.getProperty('Nombre'));
      content = content.replace('{{IMAGE}}', 'img/'+$icon+'.png');
      content = content.replace('{{CLASE_ACTIVIDAD}}',jsonEvent.feature.getProperty('Clase_actividad'));
      content = content.replace('{{TIPO}}',jsonEvent.feature.getProperty('Tipo'));

      if(infowindow)infowindow.close();//important

      infowindow = new google.maps.InfoWindow({
        content: content
      })

     infowindow.setPosition(jsonEvent.latLng);
     infowindow.setOptions({
      pixelOffset:jsonEvent.pixelOffset,
      content: content
     });
    infowindow.open(map);*/

  }//mapModeOn
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

  var marker_data = places[id_];
  var $animation = ($animation)?google.maps.Animation.BOUNCE:null;
  
  a_icon = {
        url:ICON_MAP_URL+marker_data.icon,
        scaledSize: new google.maps.Size(40, 40),
      }
  

  if(marker_data){
    var a_marker = new google.maps.Marker({
      title:marker_data.title,
      position: { lat: marker_data.lat, lng: marker_data.lng },
      map,
      icon: a_icon,
      draggable:$draggable,
      animation: $animation,
      /*optimized: false*/ /*important GIF*/
    });
	
	marker_data.marker = a_marker; //gmObject
	
	 a_marker.addListener('click', function(event) {
	  showMarkerInfo(event,id_);
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
      message: '<i class="icon-spinner4 spinner" style="font-size:3em;"></i> <h6>BUSCANDO APARICIONES CERCANAS</h6>',
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
  if(cementerio.loaded && panteon.loaded){


    window.setTimeout(function () {
        $('body').unblock();
        cementerio.loaded = false;
        panteon.loaded = false;
    }, 2000);
  }
}




/*******************************
DENUE API
********************************/
function denueAPI_buscar($layer, $condicion, $lat, $lng){

  var denueURL = DENUE_API_BUSCAR_URL.replace(/{{CONDICION}}/g, $condicion);
      denueURL = denueURL.replace(/{{COORDENADAS}}/g, ''+$lat+','+$lng);
      denueURL = denueURL.replace(/{{DISTANCIA}}/g, DENUE_API_DISTANCIA);
      denueURL = denueURL.replace(/{{TOKEN}}/g, DENUE_API_TOKEN);

      //consulta DENUE
      $.get( denueURL, function() {

      }).done(function(data) {
          //prepara GOEJSON con Datos de DENUE
          $layer.src = jsonToGeoJSON(data, DENUE_API_LAT_ATTR, DENUE_API_LNG_ATTR, GEOMETRY_TYPE.POINT);

          //load GEOJSON
          $layer.layer.addGeoJson($layer.src);


          console.log($layer.src);
      }).fail(function(status, error) {
        console.log(error)
      }).always(function(){
        //unblock
        $layer.loaded = true;
        unblockPage();
      });
}

function loadDENUEData(){

  cementerio.loaded = false;

  blockPage();
  denueAPI_buscar(cementerio, 'cementerio', currentLat, currentLng);
  denueAPI_buscar(panteon, 'panteon', currentLat, currentLng);
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



/*******************************
LEYENDAS
********************************/
/*
construye un path de recorrido de cada leyenda 
*/
function buildLeyendasPath(){
  for(var i in leyendas){

    leyenda = leyendas[i];
    leyendasPointArray[leyenda.clave] = []
    let $path = '/data/' + CVEGEO + '/' + leyenda.clave + '.geojson';
    geoJSONLineToPointArray($path, leyendasPointArray[leyenda.clave], false, animateRoute, leyenda.clave)

  }
}

/**
 caallback para colocar el marker de recorrido sobre la leyenda
*/
function animateRoute($data, $line_id){

  GHOST_ANCHOR = new google.maps.Point(350,350);

  var GHOST_BASE_STROKE_COLOR = '#444';
  var ghost_symbol_1 = {labelOrigin:(-100,-200), path: GHOST_SVG_1,fillOpacity: 1,strokeOpacity: 1 ,strokeWeight: 1,fillColor: GHOST_COLOR_0,strokeColor: GHOST_BASE_STROKE_COLOR,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_2 = {path: GHOST_SVG_2,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_1,strokeColor: GHOST_COLOR_1,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_3 = {path: GHOST_SVG_3,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_2,strokeColor: GHOST_COLOR_2,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_4 = {path: GHOST_SVG_4,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_3,strokeColor: GHOST_COLOR_3,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_5 = {path: GHOST_SVG_5,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_3,strokeColor: GHOST_COLOR_3,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};

  var ghost_symbol_6 = {path: GHOST_SVG_6,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_4,strokeColor: GHOST_COLOR_4,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_7 = {path: GHOST_SVG_7,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_5,strokeColor: GHOST_COLOR_5,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_8 = {path: GHOST_SVG_8,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_6,strokeColor: GHOST_COLOR_6,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_9 = {path: GHOST_SVG_9,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_1,strokeColor: GHOST_COLOR_1,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_10 = {path: GHOST_SVG_10,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_7,strokeColor: GHOST_COLOR_7,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};

  var ghost_symbol_11 = {path: GHOST_SVG_11,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_6,strokeColor: GHOST_COLOR_6,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_12 = {path: GHOST_SVG_12,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_1,strokeColor: GHOST_COLOR_1,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_13 = {path: GHOST_SVG_13,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_7,strokeColor: GHOST_COLOR_7,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_14 = {path: GHOST_SVG_14,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_8,strokeColor: GHOST_COLOR_8,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};
  var ghost_symbol_15 = {path: GHOST_SVG_15,fillOpacity: 1,strokeOpacity: 0.0,strokeWeight: 3,fillColor: GHOST_COLOR_5,strokeColor: GHOST_COLOR_5,scale: GHOST_SCALE, anchor: GHOST_ANCHOR,rotation:GHOST_ROTATION};


  var path = [];
  for(var p in $data){
    var point = new google.maps.LatLng($data[p][1], $data[p][0]); //important lat lng
    path.push(point);
  }

  // Create the polyline and add the symbol to it via the 'icons' property.
  var animatedLine = new google.maps.Polyline({
    path: path,
    icons: [
      {icon: ghost_symbol_1,offset: "0%"},
      {icon: ghost_symbol_2,offset: "0%"},
      {icon: ghost_symbol_3,offset: "0%"},
      {icon: ghost_symbol_4,offset: "0%"},
      {icon: ghost_symbol_5,offset: "0%"},
      {icon: ghost_symbol_6,offset: "0%"},
      {icon: ghost_symbol_7,offset: "0%"},
      {icon: ghost_symbol_8,offset: "0%"},
      {icon: ghost_symbol_9,offset: "0%"},
      {icon: ghost_symbol_10,offset: "0%"},
      {icon: ghost_symbol_11,offset: "0%"},
      {icon: ghost_symbol_12,offset: "0%"},
      {icon: ghost_symbol_13,offset: "0%"},
      {icon: ghost_symbol_14,offset: "0%"},
      {icon: ghost_symbol_15,offset: "0%"},

    ],
    strokeColor: 'white',
    strokeWeight: 10, /*easier click*/
    strokeOpacity: 0.0,/*invisible line*/
    map: map,
  });

  //event handler
  animatedLine.addListener('click', function(event) {
    showLeyendaInfo($line_id);
  });

  //animation starts
  animateRouteStart(animatedLine);

  //legendName
  if(SHOW_LABELS)
    setLabelForRoute(path, $line_id);

}//animateRoute


/**
 * Put the label for the legend
 */
function setLabelForRoute(path, $id) {

  let leyenda = searchLeyenda($id);
  if(leyenda){
    let $title = (leyenda.titulo)?leyenda.titulo:'';
    //let position = google.maps.geometry.spherical.interpolate(path[0], path[path.length-1],(1/20));
    //var position = google.maps.geometry.spherical.interpolate(path[0], path[1],(1/20));
    //var position = (path[0]);
    let position = new google.maps.LatLng(leyenda.latitud, leyenda.longitud);

    let $icon;
    if(leyenda.clave == 'l_llorona'){
      $icon = {
        url:'img/llorona.png',
        scaledSize: new google.maps.Size(48,48),
        origin: new google.maps.Point(0, 0),
      }
    }else{
      $icon = {
        url:'img/transparent.png',
        size: new google.maps.Size(2, 2),
      }
    }

    var marker = new MarkerWithLabel({
      position: position,
      draggable: false,
      raiseOnDrag: false,
      map: map,
      icon: $icon,
      /*label: {
        text: $title,
        color: "#F5F5F5",
        fontSize: "14px",
        fontFamily: "Roboto",
        fontWeight: "bold"
      },*/
      labelContent: $title,
      labelAnchor: new google.maps.Point(100, 0),
      labelClass: "legend_name_label", // the CSS class for the label
      labelStyle: {opacity: 0.66}
    });

    /*var marker1 = google.maps.Marker({
      position: position,
      draggable: false,
      map: map,
      icon: $icon,
    });*/

    google.maps.event.addListener(marker, "click", function (e) { showLeyendaInfo(leyenda.clave); });

  }
 }



/*
inicia el recorrido 
*/
function animateRouteStart($line) {
  let count = 0;
  window.setInterval(() => {
    count = (count + 1) % 200;

    const icons = $line.get("icons");
    for(var i in icons){
      icons[i].offset = count / 2 + "%";
    }

    $line.set("icons", icons);
  }, 200);
}


/*******************************
 showLeyendaInfo
********************************/
function showLeyendaInfo($id){
  if(mapModeON){
    //hide
    $('#modal_map_leyenda').modal('hide');

    let leyenda = searchLeyenda($id);

    if(leyenda){
      //search info
      let leyenda_title  = leyenda.titulo;
      let leyenda_place  = (leyenda.ubicacion)?leyenda.ubicacion:ENTIDAD;

      let leyenda_banner = 'img/leyendas/'+$id+'.png?v=2';

      let leyenda_text   = leyenda.narracion;
          leyenda_text   = leyenda_text.replace(/(?:\r\n|\r|\n)/g, '<br><br>'); //reemplaza los saltos tradicionales por saltos html
          leyenda_text   = leyenda_text.replace(/<br><br><br><br>/g,'<br><br>'); //replace saltos unecesarios
      let leyenda_multimedia = '';

      let leyenda_autor = AUTOR_TEMPLATE.replace(/{{AUTOR_NAME}}/g, leyenda.autor).replace(/{{AUTOR_IG}}/g, leyenda.autor_ig.replace('@','')).replace(/{{MEDIA_IG}}/g, leyenda.media_ig.replace('@',''));

      //ghost scream first scream -> then multimedia check
      initAudio('ghost_scream',false, 10, function(){

           
          

      }); //ghost_scream*/


      if(leyenda.multimedia_sound){
        leyenda_multimedia = SOUNDCLOUD_TEMPLATE.replace(/{{TITLE}}/g, leyenda_title).replace(/{{URL}}/g, leyenda.multimedia_sound);
        //pause audio
        leyenda_has_media = soundEnabled; //with media + tenia audio antes de abrir
        soundEnabled = false;
        enableAudio(true);
      }
      if(leyenda.multimedia_video_id){
        leyenda_multimedia = VIDEO_TEMPLATE.replace(/{{VIDEO_ID}}/g, leyenda.multimedia_video_id);
        //pause audio
        leyenda_has_media = soundEnabled; //with media + tenia audio antes de abrir
        soundEnabled = false;
        enableAudio(true);
      }
      if(leyenda.multimedia_tiktok_id){
        let $tiktok_id = leyenda.multimedia_tiktok_id.replace('t_',''); //Important for csv not consider a big number
        leyenda_multimedia = TIKTOK_TEMPLATE.replace(/{{TIKTOK_ID}}/g, $tiktok_id).replace(/{{TIKTOK_USER}}/g, leyenda.multimedia_tiktok_user);
        
        //pause audio
        leyenda_has_media = soundEnabled; //with media + tenia audio antes de abrir
        soundEnabled = false;
        enableAudio(true);
      }
      

      //set info
      $('#modal_map_leyenda_title').html(leyenda_title);
      $('#modal_map_leyenda_place').html(leyenda_place);
      $('#modal_map_leyenda_autor').html(leyenda_autor);
      /*$('#modal_map_leyenda_banner').attr('src', leyenda_banner);*/
      $('#modal_map_leyenda_text').html(leyenda_text);
      $('#modal_map_leyenda_multimedia').html(leyenda_multimedia);

      
      
      //set prev & next
      let prev_next= searchPrevNextLeyenda($id);
      if(prev_next.length>=2){
        $('#modal_map_leyenda_prev').attr('href', prev_next[0]);
        $('#modal_map_leyenda_next').attr('href', prev_next[1]);
      }
      if(leyendas.length<2){
        $('#modal_map_leyenda_prev').hide();
        $('#modal_map_leyenda_next').hide();
      }else{
        $('#modal_map_leyenda_prev').show();
        $('#modal_map_leyenda_next').show();
      }

      //set $id to share
      $('#modal_map_leyenda_share_url').attr('href','');
      $('#share_url').html('');
      $('.modal_map_leyenda_share').attr('href', $id);

      //restart scroll
      var myDiv = document.getElementById('modal_map_leyenda_text');
      myDiv.scrollTop = 0;
      $('body, html, #modal_map_leyenda_text').scrollTop(0);

      //ghost animation
      $('.center-window').css('display','flex'); //show ghost animation

      //show modal after ghost animation
        window.setTimeout(function() {
          $('#modal_map_leyenda').modal('show');
      }, 750)

     

    }

  }
}

/*on modal shown hide ghost animation*/
$('#modal_map_leyenda').on('shown.bs.modal', function () {
  $('.center-window').css('display','none'); //hide ghost animation
})

/*on hide*/
$('#modal_map_leyenda').on('hide.bs.modal', function () {
  //reset info
  modal_map_leyenda_title
  $('#modal_map_leyenda_title').html('');
  $('#modal_map_leyenda_place').html('');
  $('#modal_map_leyenda_autor').html('');
  $('#modal_map_leyenda_text').html('');
  $('#modal_map_leyenda_multimedia').html('');

  $('#modal_map_leyenda_prev').attr('href', '');
  $('#modal_map_leyenda_next').attr('href', '');

  //iframe
  $('#leyenda_for_iframe_container').html('');


  //show
  $('#modal_map_leyenda_multimedia').show();
  $('#modal_map_leyenda_text').show();

  //hide
  $('#modal_map_leyenda_share_block').hide();

  //reestablece audio
  if(leyenda_has_media){
    soundEnabled = true;
    enableAudio(true);
  }
})

/*
Busca una leyenda 
*/
function searchLeyenda($id){
  for(var i in leyendas){
    if(leyendas[i].clave == $id)
       return leyendas[i];
  }

  return null;
}

/*
Determina cual leyenda es la anterior y siguiente
*/
function searchPrevNextLeyenda($id){
  let prev_next = [];

  for(var i in leyendas){
    leyenda = leyendas[i];

    if(leyenda.clave == $id){

      if(i==0){
        //first
        prevIndex = leyendas.length-1;
        nextIndex = parseInt(i)+1

      }else if(i==leyendas.length-1){
        //last
        prevIndex = parseInt(i)-1;
        nextIndex = 0
      }else{
        prevIndex = parseInt(i)-1;
        nextIndex = parseInt(i)+1;
      }
    }
  }

  if(leyendas[prevIndex])
     prev_next[0] = leyendas[prevIndex].clave;

  if(leyendas[nextIndex])
    prev_next[1] = leyendas[nextIndex].clave;

  return prev_next;
}


/*******************************
 goToLeyenda
********************************/
function goToLeyenda($id){
  let leyenda = searchLeyenda($id);

  if(leyenda){
     //coordenadas
     let lat = leyenda.latitud;
     let lng = leyenda.longitud;

     //ir a punto / zoom
     moveTo(lat, lng);
     //setZoom(finalZoom, true);

     //activate map (always with this)
     if(!mapModeON){
       setMapStyle('map_style_night.json');
       mapModeON = true;
       activateMap(mapModeON);
     }


     //dialogo
     showLeyendaInfo($id);
  }
}