<!-- map marker modal-->
  <div id="modal_marker" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          
          <h3 class="modal-title" id="modal_marker_name">
            <!--<a href="https://uxmalsoft.com/uxsmap" target="_blank"><img class="uxsmap-logo-modal" src="img/uxsmap.png?v=<?php include '_latest_revision.php';?>" alt="UXSMAP"></a>-->
          </h3>
          <button type="button" class="btn border-dark btn-icon rounded-pill modal-close" data-dismiss="modal">
            <i class="icon-cross2"></i>
          </button>
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
            <button type="button" class="btn btn-link text-<?php include '_template_base_color.php';?>" data-dismiss="modal"><?php echo $lang['BTN_CANCEL']; ?></button>
            <button type="button" class="btn btn-<?php include '_template_base_color.php';?> bg-map-primary-color" data-dismiss="modal"><?php echo $lang['BTN_OK']; ?></button>
        </div>

      </div>
    </div>
  </div>
  <!-- /map marker modal -->