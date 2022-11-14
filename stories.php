<!DOCTYPE html>
<html>
<head>
  <?php include '_gtag.php';?>
  <?php include 'i18n.php';?>
  <?php include '_meta.php';?>
  <?php include '_favicon.php';?>
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
			<img src="img/ghost.png?v=<?php include '_latest_revision.php';?>" class="ghost-centered animate__animated animate__zoomInDown" />
		</div>

		<!--/day-->
		<!-- <div id="day">
			<img id="activate_map" class="" src="img/dia_muertos.png" />
			<img id="activate_map_ghost" class="" src="img/ghost.png" />
			<div id="activate_map_text" class="speech-bubble">
				<p><?php echo $lang['STORY_DAY_1']; ?> <br/>
				  <i class="icon-arrow-up16"></i> <span><?php echo $lang['STORY_DAY_2']; ?></span> <br/><br/>
				  <i class="icon-arrow-down16"></i> <span><?php echo $lang['STORY_DAY_3']; ?></span>
				</p> 
			</div>

			<a href="/index" class="btn bg-purple rounded-pill btn-icon btn-float back_init_btn">
				<img src="img/mexico.png?v=<?php include '_latest_revision.php';?>"
					 class="img-responsive menu-img" alt=""/>
			</a>
			  
		
	  
		</div> -->
		<!--/day-->
	
		<!--/night-->
		<div id="night" >
			<!-- night header -->
			<div class="night-header"></div>
	
			<!-- night footer -->
			<div class="night-footer"></div>
		</div><!--/night-->


		<!--page-content-->
		<div class="page-container">
		
			<!--lang-->
			<input id="lang_selected" type="hidden" value="<?php echo $lang['lang']; ?>" />

			<!-- SELECT LANGUAGE
			<div id="lang-selector" class="lang-selector">
				
				<div class="btn-group language-switch">
					<a id="lang_selected_en"  class="btn btn-default"> <img src="img/en.png?v=<?php include '_latest_revision.php';?>" class="mr-2 position-left" alt="">EN</a>
					<a id="lang_selected_es"  class="btn btn-default"> <img src="img/es.png?v=<?php include '_latest_revision.php';?>" class="mr-2 position-left" alt="">ES</a>
				</div>
			</div>-->

			
		    <!--map-->
		    <div id="uxmap_control_container">

				<!-- header -->
				<div class="header"></div><!--/header-->
				
				<?php include '_map_menu_options.php';?>

				<!-- footer -->
				<div class="footer">
					
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
			  <div id="xs" class="d-block d-sm-none"></div>
			  <div id="sm" class="d-none d-sm-block d-md-none"></div>
			  <div id="md" class="d-none d-md-block d-lg-none"></div>
			  <div id="lg" class="d-none d-lg-block d-xl-none"></div>
			  <div id="xl" class="d-none d-xl-block"></div>
			</div>

			
		</div><!--/.page-content-->
	
    </div><!--/.-->

	

	<?php include '_map_modal_custom.php';?>
	
	<?php include '_map_modal_marker.php';?>
	
    <?php include '_map_modal_disclaimer.php';?>
	
    <?php include '_map_modal_info.php';?>
	
    <?php include '_map_modal_share.php';?>

    <?php include '_scripts.php';?>

    <!-- custom -->
	<script type="text/javascript" src="data/entidades.js?v=<?php include '_latest_version.php';?>"></script>
    <script type="text/javascript" src="js/uxsmap.js?v=<?php include '_latest_version.php';?>"></script>

	<script type="text/javascript" src="js/denue.js?v=<?php include '_latest_version.php';?>"></script>
	<script type="text/javascript" src="js/places.js?v=<?php include '_latest_version.php';?>"></script>
    <script type="text/javascript" src="js/project.js?v=<?php include '_latest_version.php';?>"></script>
    

    <!-- Google Maps -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeUNoCns_PJw6uTLdTvM3xJX2bKZ8Gwao&callback=initMap&libraries=geometry,places">
    </script>

    <!--v3-utility-library--> 
    <!--when use this library you must remove 'async defer' from googlemaps API script-->
    <script type="text/javascript" src="js/v3-utility-library/markerwithlabel.js?v=<?php include '_latest_version.php';?>"></script>

	
</body>
</html>
