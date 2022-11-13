<!-- footer_dialog -->
<div id="footer_dialog" class="card">

	<div id="footer_dialog_header" class="card-header header-elements-inline text-center">
	  	<h6 class="card-title">
		  	  <span id="footer_dialog_title"> 
				<img id="footer_dialog_title_image" src="img/ghost.png?v=<?php include '_latest_revision.php';?>" /> &nbsp;&nbsp; 
				<?php echo $lang['DIALOG_FOOTER_TITLE']; ?> 
			  </span>
		</h6>

	  	<div class="header-elements">
	  		<div class="list-icons">
				<a id="footer_dialog_collapse" class="list-icons-item" data-action="collapse" ></a>
				<!-- <a class="list-icons-item" data-action="reload"></a>
				<a class="list-icons-item" data-action="remove"></a> -->
			</div>

		</div>
	</div>

	<div class="collapse show">
		<div class="card-body">

			
			<div class="row">
				<div class="col-sm-12">
					<div id="footer_dialog_info">
						<h4 class="text-semibold">
							<span>  
								<img class="info-logo-modal" src="img/ghost.png?v=<?php include '_latest_revision.php';?>" alt="">
							</span>
							<?php echo $lang['DIALOG_FOOTER_TITLE']; ?> 
						</h4>

						<p class="text-justify">
							<?php echo $lang['DIALOG_FOOTER_DESC_1']; ?>
						</p>

						<p class="text-justify">
							<?php echo $lang['DIALOG_FOOTER_DESC_3']; ?>
						</p>

						<p class="text-justify">
							<?php echo $lang['DIALOG_FOOTER_DESC_2']; ?>
						</p>
						
						<button id="footer_dialog_btn" type="button" class="btn btn-<?php include '_template_base_color.php';?> bg-map-primary-color float-left"><?php echo $lang['DIALOG_FOOTER_BTN']; ?></button>
						
					</div>
				</div>
			</div>
		
		</div><!--/card-body-->
	</div>

</div><!-- /footer_dialog -->