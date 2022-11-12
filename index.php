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
                <img class="info-logo-modal" src="img/fantasma.png" alt=""></span> Mapa de <b>Leyendas</b>
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
      							<div data-fab-label="Ir a tu ubicación en el Mapa">
      								<a id="uxmap_c_geolocation" class="btn btn-default btn-rounded btn-icon btn-float legitRipple">
      									<i class="icon-location4"></i>
      								</a>

      							</div>
      						</li> 

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
            
            <!-- collapsible_footer_dialog -->
            <div id="collapsible_footer_dialog" class="panel panel-flat">

              <div id="collapsible_footer_dialog_header" class="panel-heading">
                <h6 class="panel-title"><span id="collapsible_footer_dialog_title"> <img src="img/fantasma.png" /> &nbsp;&nbsp; Mapa de <b class="purple">Leyendas </b> de México </span><a class="heading-elements-toggle"><i class="icon-more"></i></a></h6>
                <div class="heading-elements">
                  <ul class="icons-list">
                      <li><a id="collapsible_footer_dialog_collapse" data-action="collapse"></a></li>
                      <!--<li><a data-action="reload"></a></li>-->
                      <!--<li><a data-action="close"></a></li>-->
                    </ul>
                  </div>
              </div>

              <div class="panel-body">
                  
                  <div class="row">
                    <div class="col-sm-12">
                      <div id="collapsible_footer_dialog_info">
                        <h3 class="text-semibold"><span>  <img class="info-logo-modal" src="img/fantasma.png" alt=""></span>Mapa de <b class="map-primary-color">Leyendas </b> de México </h3>

                        <p class="text-justify">
                          Las leyendas mostradas en este mapa son una recopilación de anécdotas, mitos y cuentos del folklor mexicano contadas de generación en generación y que forman parte de nuestra cultura e identidad.
                        </p>
                        <h6 class="text-justify"></p>
                          <b class="">Selecciona un Estado </b>del cual quieras conocer sus <br/>👻leyendas, mitos e historias de terror😱
                        </h6>
            
                        <a id="collapsible_footer_dialog_btn" class="btn btn-sm btn-ripple bg-purple bg-map-primary-color">¡QUE MIEDO!</a>
                      </div>
                    </div>
                  </div>
                 
              </div><!--/panel-body-->
            </div><!-- /collapsible_footer_dialog -->
       

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



    <?php include '_map_disclaimer.php';?>

    <?php include '_map_info.php';?>

    <?php include '_map_share.php';?>

    <?php include '_scripts.php';?>

    <!-- custom -->
    <script type="text/javascript" src="data/entidades.js?v=<?php include '_latest_version.php';?>"></script>
    <script type="text/javascript" src="js/uxsmap.js?v=<?php include '_latest_version.php';?>"></script>
    <script type="text/javascript" src="js/index.js?v=<?php include '_latest_version.php';?>"></script>
    


    <!-- Google Maps -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeUNoCns_PJw6uTLdTvM3xJX2bKZ8Gwao&callback=initMap&libraries=geometry">
    </script>

    <!--v3-utility-library--> 
    <!--when use this library you must remove 'async defer' from googlemaps API script-->
    <script type="text/javascript" src="js/v3-utility-library/markerwithlabel.js?v=19"></script>



</body>
</html>
