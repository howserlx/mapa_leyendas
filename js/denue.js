//-----------------------------------------------------------------
//DENUE API
//-----------------------------------------------------------------
const DENUE_API_BUSCAR_URL = 'https://www.inegi.org.mx/app/api/denue/v1/consulta/Buscar/{{CONDICION}}/{{COORDENADAS}}/{{DISTANCIA}}/{{TOKEN}}';
const DENUE_API_BUSCAR_TODOS_PARAM = 'todos';
const DENUE_API_BUSCAR_AREA_ACT_URL = 'https://www.inegi.org.mx/app/api/denue/v1/consulta/BuscarAreaAct/{{CVE_ENT}}/{{CVE_MUN}}/{{CVE_LOC}}/{{CVE_AGEB}}/{{CVE_MZA}}/{{D_SECTOR}}/{{D_SUBSECTOR}}/{{D_RAMA}}/{{D_CLASE}}/{{NOMBRE}}/{{NUM_R_INI}}/{{NUM_R_FIN}}/{{ID}}/{{TOKEN}}';
const DENUE_API_FICHA_URL = 'https://www.inegi.org.mx/app/api/denue/v1/consulta/Ficha/{{ID}}/{{TOKEN}}';

const DENUE_API_DISTANCIA = 5000;  //Distancia de radio de busqueda de DENUE
const DENUE_DISTANCIA_RELOAD = 5000; //Distancia entre el ultimo punto de carga y actual para recargar

const DENUE_API_NUM_R_INI = 1;    //primer registro e la busqueda (paginacion)
const DENUE_API_NUM_R_FIN = 2000; //ultimo registro e la busqueda (paginacion)

let denueAPIToken = ''; //API Token
const DENUE_API_TOKEN = "34ee721d-a395-4ca5-a4bd-154bae8c9ff7"; //API Token

const DENUE_API_ID_ATTR = 'Id';
const DENUE_API_LAT_ATTR = 'Latitud';
const DENUE_API_LNG_ATTR = 'Longitud';

let lastDenueLat = 22.152027;
let lastDenueLng = -100.978453;

/*******************************
DENUE API
********************************/
/*Consulta la informacion por condicion */
function denueAPI_buscar(layer, condicion, lat, lng){

    //token
    if(!denueAPIToken)
        denueAPIToken = DENUE_API_TOKEN; 

    let denueURL = DENUE_API_BUSCAR_URL.replace(/{{CONDICION}}/g, condicion);
        denueURL = denueURL.replace(/{{COORDENADAS}}/g, ''+lat+','+lng);
        denueURL = denueURL.replace(/{{DISTANCIA}}/g, DENUE_API_DISTANCIA);
        denueURL = denueURL.replace(/{{TOKEN}}/g, denueAPIToken);
  
        //consulta DENUE
        $.get( denueURL, function() {
  
        }).done(function(data) {
  
            //prepara GOEJSON con Datos de DENUE
            layer.src = jsonToGeoJSON(data, DENUE_API_LAT_ATTR, DENUE_API_LNG_ATTR, GEOMETRY_TYPE.POINT);
  
            //load GEOJSON
            layer.layer.addGeoJson(layer.src);
  
  
            console.log(layer.src);
        }).fail(function(status, error) {
          console.log(error)
        }).always(function(){
          //unblock
          layer.loaded = true;
          unblockPage();
        });
  }
  
  
  /*Consulta la informacion por area y actividad economica */
  //'https://www.inegi.org.mx/app/api/denue/v1/consulta/BuscarAreaAct/{{CVE_ENT}}/{{CVE_MUN}}/{{CVE_LOC}}/{{CVE_AGEB}}/{{CVE_MZA}}/{{D_SECTOR}}/{{D_SUBSECTOR}}/{{D_RAMA}}/{{D_CLASE}}/{{NOMBRE}}/{{NUM_R_INI}}/{{NUM_R_FIN}}/{{ID}}/{{TOKEN}}';
  
  function denueAPI_buscar_area_act(layer, cveEnt, cveMun='0', cveLoc='0', cveAgeb='0', cveMza='0', denueSector='0',denueSubsector='0',denueRama='0', denueClase='0', nombre='', _id='0', displaName){
  
    //token
    if(!denueAPIToken)
        denueAPIToken = (mapConfig.denue_api_token)? mapConfig.denue_api_token : DENUE_DEFAULT_API_TOKEN; 


    let denueURL = DENUE_API_BUSCAR_AREA_ACT_URL.replace(/{{CVE_ENT}}/g, cveEnt);
        denueURL = denueURL.replace(/{{CVE_MUN}}/g, cveMun);
        denueURL = denueURL.replace(/{{CVE_LOC}}/g, cveLoc);
        denueURL = denueURL.replace(/{{CVE_AGEB}}/g, cveAgeb);
        denueURL = denueURL.replace(/{{CVE_MZA}}/g, cveMza);
  
        denueURL = denueURL.replace(/{{D_SECTOR}}/g, denueSector);
        denueURL = denueURL.replace(/{{D_SUBSECTOR}}/g, denueSubsector);
        denueURL = denueURL.replace(/{{D_RAMA}}/g, denueRama);
        denueURL = denueURL.replace(/{{D_CLASE}}/g, denueClase);
  
        denueURL = denueURL.replace(/{{NOMBRE}}/g, nombre);
        denueURL = denueURL.replace(/{{ID}}/g, _id);
  
        denueURL = denueURL.replace(/{{NUM_R_INI}}/g, DENUE_API_NUM_R_INI);
        denueURL = denueURL.replace(/{{NUM_R_FIN}}/g, DENUE_API_NUM_R_FIN);
  
        denueURL = denueURL.replace(/{{TOKEN}}/g, denueAPIToken);
  
        //consulta DENUE
        console.log(`Consultando información DENUE: {tipo: ${displaName}, AGEB:${cveAgeb}}`);
        $.get( denueURL, function() {
  
        }).done(function(data) {
            //console.log(`Información DENUE consultada para ${displaName}`);
  
            //Filtra solo los cp validos si se incluyen en la configuracion
            let filterData = [];
            
            for(let unidadEco of data){
              //incluir si contiene los codigos postales validos
              if(mapConfig.geo_data.cp && mapConfig.geo_data.cp.length > 0){

                //la configuracion permite filtrar por CP
                if(mapConfig.geo_data.cp.includes(unidadEco.CP))
                  filterData.push(unidadEco);

              }else{
                //no filtra por CP
                filterData.push(unidadEco);
              }
                
              
            }
              
  
            //prepara GOEJSON con Datos de DENUE
            layer.src = jsonToGeoJSON(filterData, DENUE_API_LAT_ATTR, DENUE_API_LNG_ATTR, GEOMETRY_TYPE.POINT);
  
            //load GEOJSON
            layer.layer.addGeoJson(layer.src);
  
            //console.log(layer.src);
        }).fail(function(status, error) {
          if(status.status!==404)
            console.log(error)
        }).always(function(){
          //unblock
          layer.loaded = true;
          unblockPage();
        });
  }
  
  /*Consulta la informacion de una ficha especifica */
  function denueAPI_ficha(_id, callback){

    //token
    if(!denueAPIToken)
        denueAPIToken = (mapConfig.denue_api_token)? mapConfig.denue_api_token : DENUE_DEFAULT_API_TOKEN; 
  
    let denueURL = DENUE_API_FICHA_URL.replace(/{{ID}}/g, _id);
        denueURL = denueURL.replace(/{{TOKEN}}/g, denueAPIToken);
  
        //consulta DENUE
        $.get( denueURL, function() {
  
        }).done(function(data) {
            callback(data);
  
        }).fail(function(status, error) {
          console.log(error)
        }).always(function(){
          //unblock
          unblockPage();
        });
  }
  

  function loadDENUEData(){
  
     blockPage();
  
     filterList = '';
  
     for(let d_layer of mapLayers){
      d_layer.loaded = false;
      loadDENUEData_for(d_layer);
     }
  
     //botones
     $('#filter-list-container').html(filterList);
  
     //init status
     for(let d_layer of mapLayers){
      let btnLayerFilter = '#p_uxmap-c-layer-'+d_layer.id;
      toggleLayerBtn(d_layer.status, btnLayerFilter);
     }
      
     //popover
     $('[data-popup="popover"]').popover({
          boundary: '.page-content'
      });
  
  }

  
  /**
   * Layer Object creation
   * Crea un objeto de GM e inicializa el menu de filtros
   */
  function createDenueLayer(layer){
      //layer creation
      layer.layer = new google.maps.Data({map: map});
              
      //layer style (definition before loading)
      layer.layer.setStyle(function(feature){
      let image_icon = layer.style.icon;
      return {icon: {
          url: ICON_MAP_URL + image_icon,
          scaledSize: new google.maps.Size(32, 32)
        }}
      });
  
      //listener
      layer.layer.addListener('click', function(event) {
        showDenueInfo(event.feature, layer);
      });
  
  
      //filter controls
      let filterBtn = FILTER_TEMPLATE.replace(/{{ID}}/g, layer.id);
      filterBtn = filterBtn.replace(/{{NAME}}/g, layer.style.display_name);
      filterBtn = filterBtn.replace(/{{DESC}}/g, layer.style.display_desc);
      filterBtn = filterBtn.replace(/{{ICON}}/g, layer.style.icon);
  
      filterList += filterBtn;
  
  }
  
  
  /**
   * Consulta informacion de DENUE para una capa definida
   */
  function loadDENUEData_for(layer){
  
    //layer object init
    if(!layer.layer){
      createDenueLayer(layer);
    }
       
    //solo consulta si la capa esta activa, el estatus en verdadero y no se ha cargado
    if(layer.status && !layer.loaded)
      //consulta informacion de DENUE por cada cve_ageb definida en la configuracion del mapa
      for(cveAgeb of mapConfig.geo_data.cve_ageb){
        denueAPI_buscar_area_act(layer,
                mapConfig.geo_data.cve_ent, mapConfig.geo_data.cve_mun, mapConfig.geo_data.cve_loc, 
                cveAgeb, mapConfig.geo_data.cve_mza,
                layer.geo_data.d_sector,layer.geo_data.d_subsector,layer.geo_data.d_rama,layer.geo_data.d_clase,
                layer.geo_data.nombre,layer.geo_data.id, layer.style.display_name);
      }
  
  }

