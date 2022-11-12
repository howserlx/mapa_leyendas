<!DOCTYPE html>
<html lang="es">
<head>
  <?php include 'gtag.php';?>
  <?php include '_meta.php';?>
  <?php include '_styles.php';?>

</head>

<body>
  <!--like/follow-->
  <div id="fb-root"></div>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v9.0" nonce="dcXwDpNL"></script>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  <script src="https://apis.google.com/js/platform.js"></script>

  <div class="">

     <!--ghost animation-->
     <div class="center-window">
     <img src="img/fantasma.png" class="ghost-centered animate__animated animate__zoomInDown" />
    </div>

    <!--/day-->
    <div id="day">
      <img id="activate_map" class="" src="img/dia_muertos.png" />
      <img id="activate_map_ghost" class="" src="img/fantasma.png" />
      <div id="activate_map_text" class="speech-bubble">
          <p>¡Nosotros solo salimos de noche! <br/>
            <i class="icon-arrow-up16"></i> <span>activa el mapa haciendo click en la imagen</span> <br/><br/>
            <i class="icon-arrow-down16"></i> <span>o regresa al mapa de inicio</span>
          </p> 
      </div>
        
      <a href="/index" class="btn btn- bg-purple  btn-icon btn-rounded legitRipple back_init_btn">
        <img src="img/mexico.png" class="img-responsive" />
      </a>

    </div><!--/day-->

    <!--/night-->
    <div id="night" >
      <!-- night header -->
      <div class="night-header"></div>

      <!-- night footer -->
      <div class="night-footer"></div>

    </div><!--/night-->

    <!--container-->
    <div class="page-container">

      <!--sidebar-->
      <div id="mapSidebar" class="map-sidebar">
          <div class="panel panel-flat">
            <div class="panel-heading ">
              <!--title-->
              <h3 class="title">
                <img class="info-logo-modal" src="img/fantasma.png" alt=""></span> Mapa de <b>Ejemplo</b>
              </h3>

              <!--filter-->
              <button id="do_filter" type="button" class="btn bg-blue bg-map-primary-color filterbtn"><i class="icon-filter3"></i> Filtrar</button>

              <!--count-->
              <h6 class="filtercount">
                  <span id="filter_count">000</span> / <span id="total_count">000</span>
              </h6>


              <a href="javascript:void(0)" class="btn border-blue-800  text-blue-800 btn-flat btn-icon btn-rounded legitRipple closebtn" onclick="closeMapSidebar()">
                <i class="icon-cross2"></i>
              </a>

            </div><!--./panel-heading-->

            <div class="panel-body">

              <div class="col-lg-12 col-sm-12">
                <legend>
                  <i class="icon-calendar2"></i> <b>Filtro</b>
                </legend>

              </div>

              <br/>

              <div class="col-lg-12 col-sm-12">
                <legend>
                  <i class="fa fa-calendar2"></i> <b>Filtro</b>
                </legend>


              </div>

            </div><!--./panel-body-->


          </div><!--/panel-flat-->


      </div>
      <!--/sidebar-->

        <!--map-->
        <div id="uxmap_control_container">

          <!-- header -->
          <div class="header"></div><!--/header-->


          <!-- layer control -->
          <ul id="uxmap_controls" class="fab-menu fab-menu-absolute fab-menu-top-left affix" data-fab-toggle="click" data-fab-state="open">
    			<li>
                    <a class="fab-menu-btn btn bg-white btn-float btn-rounded btn-icon legitRipple">
                        <img src="img/uxsmap_square.png" class="fab-icon-open" />
                        <img src="img/uxsmap_square.png" class="fab-icon-close" />
                    </a>

      				<ul class="fab-menu-inner">
      					<li>
                            <div data-fab-label="¡Me dió miedo, quisiera que fuera de día!">
                                <a id="uxmap_c_deactivate_map" class="btn btn-default btn-rounded btn-icon btn-float legitRipple">
                                    <i class="icon-sun3"></i>
                                </a>
                                <span class="badge bg-pink">X</span>
                            </div>
                        </li>

                         <li>
                            <div>
                                <a id="uxmap_c_back" href="/index" class="uxmap_c_layer btn bg-white btn-rounded btn-icon btn-float legitRipple layer-tooltip" title="Regresar al Inicio">
                                    <img src="img/mexico.png" class="img-responsive" alt="">
                                </a>

                            </div>

                        </li> 

                        <!-- <li>
                            <div data-fab-label="Filtros">
                                <a id="uxmap_c_open_sidepanel" class="btn btn-default btn-rounded btn-icon btn-float legitRipple" onclick="openMapSidebar()">
                                    <i class="icon-filter3"></i>
                                </a>

                            </div>
                        </li>

                        <li>
                            <div data-fab-label="Ver tráfico">
                                <a id="uxmap_c_traffic_layer" class="uxmap_c_layer btn bg-white btn-rounded btn-icon btn-float legitRipple layer-tooltip" data-original-title="Ver tráfico">
                                    <img src="img/traffic.png" class="img-responsive" alt="">
                                </a>
                                
                            </div>
                        </li> -->

                        <!-- <li>
                            <div data-fab-label="Ir a tu ubicación en el Mapa">
                                <a id="uxmap_c_geolocation" class="btn btn-default btn-rounded btn-icon btn-float legitRipple">
                                    <i class="icon-location4"></i>
                                </a>

                            </div>
                        </li> -->

                        <li>
                            <div data-fab-label="Sonido de fondo">
                                <a id="uxmap_c_sound_map" class="btn btn-default btn-rounded btn-icon btn-float legitRipple">
                                    <i id="uxmap_c_sound_map_icon" class="icon-volume-mute5"></i>
                                </a>
                            </div>
                        </li>


                        <li>
                            <div data-fab-label="Compartir">
                                <a id="uxmap_c_share_map" class="btn btn-default btn-rounded btn-icon btn-float legitRipple" data-toggle="modal" data-target="#modal_map_share">
                                    <i class="icon-share3"></i>
                                </a>
                            </div>
                        </li>

                        <li>
                            <div data-fab-label="Más información del mapa">
                                <a id="uxmap_c_map_info" class="btn btn-default btn-rounded btn-icon btn-float legitRipple" data-toggle="modal" data-target="#modal_map_info">
                                <img src="img/uxmalsoft_circle.png" class="img-responsive" alt="">
                                </a>
                                <span class="badge bg-primary-400"><i class="icon-info22"></i></span>

                            </div>
                        </li>

                        <!-- FAB menu no more than 5 childs -->

                    </ul>

                <!-- exit google street view -->
                <li id="uxmap_c_exit_street_view_container" style="display:none">
                  <div data-fab-label="Salir de Google Street View">
                    <a id="uxmap_c_exit_street_view" class="hidden-xs btn bg-danger-600 btn-icon legitRipple uxmap_c_exit_street_view">
                      <i class="icon-arrow-left16"></i><i class="icon-map4"></i> Regresar
                    </a>
                    <a id="uxmap_c_exit_street_view_xs" class="visible-xs btn bg-danger-600 btn-icon legitRipple uxmap_c_exit_street_view">
                      <i class="icon-arrow-left16"></i><i class="icon-map4"></i>
                    </a>
                  </div>
                </li>

              </li>

          </ul><!-- / layer control -->

          <!-- footer -->
          <div class="footer">
            <!--<ul id="uxmap_footer_controls" class="fab-menu fab-menu-absolute fab-menu-bottom-left affix" data-fab-toggle="click" data-fab-state="open">


            </ui>-->

		      </div><!--/footer-->

        </div><!--/map-->

        <!--map-->
        <div id="map"></div>
        <!--/map-->

        <!--audio-->
        <audio id="audio" src="" ></audio>
        <audio id="audio_loop" src=""  loop></audio>

		    <!--detect size mode-->
        <div id="users-device-size">
          <div id="xs" class="visible-xs"></div>
          <div id="sm" class="visible-sm"></div>
          <div id="md" class="visible-md"></div>
          <div id="lg" class="visible-lg"></div>
        </div>

    </div><!--/.page-container-->
  </div><!--/.-->


   <!-- map leyenda modal-->
   <div id="modal_map_leyenda" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content leyenda_modal_background">
        
        <div class="modal-header no-padding no-margin">
          <button id="modal_map_leyenda_close" type="button" class="btn border-grey-800 btn-flat btn-icon btn-rounded bg-grey-300 text-grey-800 modal-close" data-dismiss="modal">
            <i class="icon-cross2"></i>
          </button>
          <h1 id="modal_map_leyenda_title"></h1>
          <h6 id="modal_map_leyenda_place"></h6>
          <img id="modal_map_leyenda_banner" class="leyenda_modal_banner" src="/img/leyenda_banner.png" alt="">
        </div>

        <div class="modal-body">
          <div class="row">

            <div id="modal_map_leyenda_text_container" class="col-md-12 leyenda_modal_text_container">
              <h6> Escrito por: <b><span id="modal_map_leyenda_autor"></span></b></h6>
              <hr>

              <!--share leyenda iframe-->
              <div id="modal_map_leyenda_share_block">
                <div class="form-group">
                    <h6>Comparte esta <b>👻leyenda😱</b> en tus redes sociales </h6>
                </div>
                
                    
                <div id="leyenda_for_iframe_container">

                </div>

                <div class="form-group">
                    <h6>A través del siguiente enlace podrás compartir la esta leyenda </h6>

                    <textarea id="share_url" class="form-control text-light" style="color: #ccc;font-size: 15px;font-weight: 500;"></textarea>
                    <h6>Para copiarlo puedes usar (Ctrl + C) o (Cmd + C) o dar click en el botón <strong>Copiar al portapapeles</strong></h6>
                    
                    
                    

                    <button id="share_url_clipboard" type="button" class="btn btn-sm btn-raised legitRipple btn-info" ><i class="icon-copy4"></i> Copiar al portapapeles</button>
                    <a id="modal_map_leyenda_share_url" href="" target="_blank" type="button" class="btn btn-sm bg-purple legitRipple"><i class="icon-link"></i> Ir al Link</a>
					
                    
                </div>

                
                

              </div>
              

              <!--multimedia-->
              <div id="modal_map_leyenda_multimedia"></div>

              <!--narracion-->
              <p id="modal_map_leyenda_text"></p>
            </div>
          </div>

        </div>

        <div class="modal-footer">
          <br/>
          <a id="modal_map_leyenda_prev" href="" class="btn btn-sm btn-default bg-grey-300 text-grey-800 float-left"><i class="icon-circle-left2"></i></a>
          <a id="modal_map_leyenda_next" href="" class="btn btn-sm btn-default bg-grey-300 text-grey-800 float-left"><i class="icon-circle-right2"></i></a>

          <button type="button" class="btn btn-sm btn-default bg-grey-300 text-grey-800 float-right " data-dismiss="modal"><i class="icon-cross2"></i>Cerrar</button>

          <button href="" type="button" class="btn btn-sm bg-purple-400 modal_map_leyenda_share hidden-xs float-right"><i class="icon-share3"></i> Comparte esta Leyenda</button>
          <button href="" type="button" class="btn btn-sm bg-purple-400 modal_map_leyenda_share visible-xs float-right"><i class="icon-share3"></i>Comparte</button>
        </div>
      </div>
    </div>
  </div>
  <!-- /map leyenda modal -->


  <!-- map marker modal-->
  <div id="modal_marker" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn border-grey-800 btn-flat btn-icon btn-rounded modal-close" data-dismiss="modal">
            <i class="icon-cross2"></i>
          </button>
          <h5 class="modal-title">
            <h3 class="modal-title" id="modal_marker_name"></h5>
            <!--<a href="https://www.uxmalsoft.com/uxsmap" target="_blank"><img class="uxsmap-logo-modal" src="img/uxsmap.png" alt="UXSMAP"></a>-->
          </h5>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-md-12 hidden-xs"> 
              <img class='modal_marker_img' style='width: 120px;' src=''/>
              <b style="font-size: 1.3em;;"> &nbsp; &nbsp; <i class="modal_marker_title"></i></b>
            </div>

            <div class="col-sm-12 visible-xs text-center" > 
              <img class='modal_marker_img' style='width: 120px;' src=''/>
            </div>

            <div class="col-sm-12 visible-xs text-center" > 
              <b style="font-size: 1.3em;;"> &nbsp; &nbsp; <i class="modal_marker_title"></i></b>
            </div>
            
            
            <div class="col-md-12">
              <h5 id="modal_marker_description"></h5>
            </div>
          </div>
  
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-link" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn bg-blue bg-map-primary-color" data-dismiss="modal">Aceptar</button>
        </div>

      </div>
    </div>
  </div>
  <!-- /map marker modal -->

    <?php include '_map_disclaimer.php';?>

    <?php include '_map_info.php';?>

    <?php include '_map_share.php';?>

    <?php include '_scripts.php';?>

    <!-- custom -->
    <script type="text/javascript" src="data/entidades.js?v=<?php include '_latest_version.php';?>"></script>
    <script type="text/javascript" src="js/uxsmap.js?v=<?php include '_latest_version.php';?>"></script>
    <script type="text/javascript" src="js/project.js?v=<?php include '_latest_version.php';?>"></script>
 
    <!-- Google Maps -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeUNoCns_PJw6uTLdTvM3xJX2bKZ8Gwao&callback=initMap&libraries=geometry">
    </script>

    <!--v3-utility-library--> 
    <!--when use this library you must remove 'async defer' from googlemaps API script-->
    <script type="text/javascript" src="js/v3-utility-library/markerwithlabel.js?v=19"></script>


</body>
</html>
