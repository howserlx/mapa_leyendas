<!-- layer menu options -->
<ul id="uxmap_controls" class="fab-menu fab-menu-absolute fab-menu-top-left" data-fab-toggle="click"
	data-fab-state="open">
	<li>

		<a class="fab-menu-btn btn btn-white btn-float rounded-pill btn-icon">
			<img src="img/uxsmap_square.png?v=<?php include '_latest_revision.php';?>" class="fab-icon-open" />
			<img src="img/uxsmap_square.png?v=<?php include '_latest_revision.php';?>" class="fab-icon-close" />
		</a>

		<ul class="fab-menu-inner">
			<!-- <li>
				<div data-fab-label="<?php echo $lang['MENU_CLOSE']; ?>">
					<a id="uxmap_c_deactivate_map" class="btn btn-white rounded-pill btn-icon btn-float">
						<i class="icon-sun3"></i>
					</a>
					<span class="badge badge-danger badge-pill">X</span>
				</div>
			</li> -->


			<li>
				<div data-fab-label="<?php echo $lang['MENU_INIT']; ?>">
					<a href="/index" id="uxmap_c_back" class="btn btn-white rounded-pill btn-icon btn-float"
						style="padding:3px !important">
						
						<img src="img/mexico.png?v=<?php include '_latest_revision.php';?>"
							class="img-responsive menu-img" alt=""/>
						
					</a>

				</div>
			</li>


			<!-- <li>
				<div data-fab-label="<?php echo $lang['MENU_FILTER']; ?>">
				  <a id="uxmap_c_open_sidepanel" class="btn btn-white rounded-pill btn-icon btn-float" onclick="openLeftMapSidebar()">
					<i class="icon-filter3"></i>
				  </a>

				</div>
		    </li> -->

			<!-- <li>
				<div data-fab-label="<?php echo $lang['MENU_TRAFFIC']; ?>">
					<a id="uxmap_c_traffic_layer" class="uxmap_c_layer btn btn-white rounded-pill btn-icon btn-float">
						<img src="img/traffic.png?v=<?php include '_latest_revision.php';?>" class="img-responsive" alt="">
					</a>
					
				</div>
			</li> -->

			<!-- <li>
				<div data-fab-label="<?php echo $lang['MENU_YOUR_LOCATION']; ?>">
					<a id="uxmap_c_geolocation" class="btn btn-white rounded-pill btn-icon btn-float">
						<i class="icon-location4"></i>
					</a>

				</div>
			</li> -->

			<li>
				<div data-fab-label="<?php echo $lang['MENU_SOUND']; ?>">
					<a id="uxmap_c_sound_map" class="btn btn-white rounded-pill btn-icon btn-float">
						<i id="uxmap_c_sound_map_icon" class="icon-volume-mute5"></i>
					</a>
				</div>
			</li>


			<li>
				<div data-fab-label="<?php echo $lang['MENU_SHARE']; ?>">
					<a id="uxmap_c_share_map" class="btn btn-white rounded-pill btn-icon btn-float" data-toggle="modal"
						data-target="#modal_map_share">
						<i class="icon-share3"></i>
					</a>
				</div>
			</li>

			<li>
				<div data-fab-label="<?php echo $lang['MENU_MORE_INFO']; ?>">
					<a id="uxmap_c_map_info" class="btn btn-transparent rounded-pill btn-icon btn-float" data-toggle="modal"
						data-target="#modal_map_info">
						<img src="img/ghost.png?v=<?php include '_latest_revision.php';?>"
							class="img-responsive alt="" style="max-width:80%">
					</a>
					 <span class="badge badge-purple badge-pill"><i class="icon-info22"></i></span> 

				</div>
			</li>


			<!-- FAB menu no more than 5 childs -->

		</ul>

		<!-- exit google street view -->
	<li id="uxmap_c_exit_street_view_container" style="display:none">
		<div data-fab-label="<?php echo $lang['MENU_GOOGLE_STREET_OFF']; ?>">
			<a id="uxmap_c_exit_street_view" class="d-none d-sm-block btn btn-danger uxmap_c_exit_street_view">
				<i class="icon-arrow-left16"></i><i class="icon-map4"></i>
				<?php echo $lang['BACK']; ?>
			</a>
			<a id="uxmap_c_exit_street_view_xs" class="d-block d-sm-none btn btn-danger uxmap_c_exit_street_view">
				<i class="icon-arrow-left16"></i><i class="icon-map4"></i>
			</a>
		</div>
	</li>

	</li>

</ul><!-- / layer menu options -->