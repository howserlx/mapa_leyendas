  <!-- map disclaimer modal-->
  <div id="modal_disclaimer_info" class="modal fade" tabindex="-1" data-backdrop="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          
          <b><h2 class="modal-title"><?php echo $lang['DIALOG_DISCLAIMER_TITLE']; ?></h2></b>
          <button type="button" class="btn btn-<?php include '_template_base_color.php';?> bg-map-primary-color btn-disclaimer" data-dismiss="modal"><?php echo $lang['DIALOG_DISCLAIMER_BTN']; ?></button>
        </div>

        <div class="modal-body">

          <div class="row">

            <div class="col-md-4 disclaimer-img">
                <img  src="img/ghost.png?v=<?php include '_latest_revision.php';?>" alt="">
            </div>

            <div class="col-md-8">
              <h6 class="text-semibold"><?php echo $lang['DIALOG_DISCLAIMER_TITLE']; ?> </b> </h6>

              <p class="text-justify">
              <?php echo $lang['DIALOG_DISCLAIMER_DESC']; ?>
              </p>

            </div>

            <div class="col-md-12">
              <hr/>
              <p class="text-justify">

              </p>
            </div>
          </div><!--./row-->


        </div><!--./modal-body-->

        <div class="modal-footer">

        </div>

      </div>
    </div>
  </div>
  <!-- /map discalimer modal -->