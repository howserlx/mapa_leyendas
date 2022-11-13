   <!-- map leyenda modal-->
   <div id="modal_map_leyenda" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content leyenda_modal_background">
        
        <div class="modal-header no-padding no-margin">
          
          
          <button id="modal_map_leyenda_close" type="button" class="btn btn-light btn-icon rounded-pill modal-close btn-opacity" data-dismiss="modal">
            <i class="icon-cross2"></i>
          </button>

          <h1 id="modal_map_leyenda_title"></h1>
          <h6 id="modal_map_leyenda_place"></h6>
          <img id="modal_map_leyenda_banner" class="leyenda_modal_banner" src="/img/leyenda_banner.png" alt="">
        </div>

        <div class="modal-body">
          <div class="row">

            <div id="modal_map_leyenda_text_container" class="col-md-12 leyenda_modal_text_container">
              <h6> <?php echo $lang['STORY_DIALOG_WRITTEN_BY']; ?> <b><span id="modal_map_leyenda_autor"></span></b></h6>
              <hr>

              <!--share leyenda iframe-->
              <div id="modal_map_leyenda_share_block" style="display: none;">
                <div class="form-group">
                    <h6><?php echo $lang['STORY_DIALOG_SHARE_DESCRIPTION_1']; ?> </h6>
                </div>
                
                    
                <div id="leyenda_for_iframe_container">

                </div>

                <div class="form-group">
                    <h6><?php echo $lang['STORY_DIALOG_SHARE_DESCRIPTION_2']; ?> </h6>

                    <textarea id="share_url" class="form-control text-light" style="background:transparent; color: #ccc;font-size: 15px;font-weight: 500;"></textarea>
                    <h6><?php echo $lang['STORY_DIALOG_COPY_DESCRIPTION']; ?></h6>

                    <button id="share_url_clipboard" type="button" class="btn btn-sm btn-raised btn-info" ><i class="icon-copy4"></i> <?php echo $lang['STORY_DIALOG_COPY_BTN']; ?></button>
                    <a id="modal_map_leyenda_share_url" href="" target="_blank" type="button" class="btn btn-sm btn-purple legitRipple"><i class="icon-link"></i> <?php echo $lang['STORY_DIALOG_GO_TO_LINK_BTN']; ?></a>
					  
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
          <a id="modal_map_leyenda_prev" href="" class="btn btn-sm btn-white btn-opacity float-left"><i class="icon-circle-left2"></i></a>
          <a id="modal_map_leyenda_next" href="" class="btn btn-sm btn-white btn-opacity float-left"><i class="icon-circle-right2"></i></a>

          <button type="button" class="btn btn-sm btn-white btn-opacity text-dark float-right" data-dismiss="modal"><i class="icon-cross2"></i><?php echo $lang['BTN_CANCEL']; ?></button>

          <button type="button" class="modal_map_leyenda_share btn btn-dark btn-sm btn-<?php include '_template_base_color.php';?> border-dark d-none d-sm-block float-right"><i class="icon-share3"></i><?php echo $lang['STORY_DIALOG_SHARE_BTN']; ?></button>
          <button type="button" class="modal_map_leyenda_share btn btn-dark btn-sm btn-<?php include '_template_base_color.php';?> border-dark d-block d-sm-none float-right"><i class="icon-share3"></i><?php echo $lang['STORY_DIALOG_SHARE_BTN_XS']; ?></button>
  
        </div>
      </div>
    </div>
  </div>
  <!-- /map leyenda modal -->



<!-- map denue modal-->
<div id="modal_denue" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          
          <h3 class="modal-title" >
            <!--<a href="https://uxmalsoft.com/uxsmap" target="_blank"><img class="uxsmap-logo-modal" src="img/uxsmap.png?v=<?php include '_latest_revision.php';?>" alt="UXSMAP"></a>-->
            <b><span class="map-primary-color modal_denue_nombre"></span></b>
          </h3>
          <button type="button" class="btn border-dark btn-icon rounded-pill modal-close" data-dismiss="modal">
            <i class="icon-cross2"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-md-12 d-none d-sm-block"> 
              <img class='modal_denue_img' style='width: 90px;' src=''/>
              <b style="font-size: 1.2em;"><span class="map-primary-color modal_denue_nombre"></span></b>

              <!-- <h6 class="map-primary-color modal_denue_clase_actividad"></h6> -->
            </div>

            <div class="col-sm-12 text-center d-block d-sm-none" > 
              <img class='modal_denue_img' style='width: 90px;' src=''/>
            </div>

            <div class="col-sm-12 text-center d-block d-sm-none" > 
              <b style="font-size: 1em;"><span class="map-primary-color modal_denue_nombre"></span></b>
              <!-- <h6 class="map-primary-color modal_denue_clase_actividad"></h6> -->
            </div>

          </div>

          <div class="row">
            <legend></legend>
            <div class="form-group col-md-12 row">

              <div class="col-lg-9 col-sm-12">
                <label class="font-weight-semibold"><?php echo $lang['DENUE_ACTIVIDAD']; ?></label>
                <p class="modal_denue_clase_actividad"></p>
              </div>

              <div class="col-lg-2 col-sm-12">
                <label class="font-weight-semibold"><?php echo $lang['DENUE_TIPO']; ?></label>
                <p class="modal_denue_tipo"></p>
              </div>
            </div>

            
            <div class="form-group col-md-12">
              <label class="font-weight-semibold"><i class="icon-direction"></i> <?php echo $lang['DENUE_DIRECCION']; ?></label>
              <p class="modal_denue_direccion"></p>
            </div>
            
            <div class="denue_plaza_block col-md-12 row">

              <div class="form-group col-lg-9 col-sm-12">
                <label class="font-weight-semibold"><?php echo $lang['DENUE_PLAZA']; ?></label>
                <p class="modal_denue_centro_comercial"></p>
              </div>
              <div class="form-group col-lg-2 col-sm-12">
                <label class="font-weight-semibold "><?php echo $lang['DENUE_LOCAL']; ?></label>
                <p class="modal_denue_num_local"></p>
              </div>
            </div>

            <div class="col-md-12">
                <div class="form-group row">
                    <label class="label col-lg-3 col-xs-12"><i class="icon-envelope"></i> <?php echo $lang['DENUE_EMAIL']; ?></label>
                    <div class="col-md-9 col-xs-12">
                        <h6 class="modal_denue_email col-md-8"></h6>
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="form-group row">
                    <label class="label col-lg-3 col-xs-12"><i class="icon-iphone"></i> <?php echo $lang['DENUE_PHONE']; ?></label>
                    <div class="col-md-9 col-xs-12">
                        <h6 class="modal_denue_phone col-md-8"></h6>
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="form-group row">
                    <label class="label col-lg-3 col-xs-12"><i class="icon-sphere"></i> <?php echo $lang['DENUE_WEB']; ?></label>
                    <div class="col-md-9 col-xs-12">
                        <h6 class="modal_denue_web col-md-8"></h6>
                    </div>
                </div>
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

<!-- /map denue modal -->