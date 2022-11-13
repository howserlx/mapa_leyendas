<!-- map modal share-->
<div id="modal_map_share" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          
          <h5 class="modal-title">
            <a href="https://uxmalsoft.com/uxsmap" target="_blank"><img class="uxsmap-logo-modal" src="img/uxsmap.png?v=<?php include '_latest_revision.php';?>" alt="UXSMAP"></a>
          </h5>
          <button type="button" class="btn border-dark btn-icon rounded-pill modal-close" data-dismiss="modal">
            <i class="icon-cross2"></i>
          </button>

        </div>

        <div class="modal-body">
          <div class="row">
              <div class="col-md-12">
                <h4><a class="btn btn-default btn-rounded legitRipple"><i class="icon-share3"></i></a> <?php echo $lang['DIALOG_SHARE_TITLE']; ?>

                </h4>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12 text-center">
                  <!-- AddToAny BEGIN -->
                  <div class="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-url="https://mapadeleyendas.com/" data-a2a-title="UXSMAP">
                  <a class="a2a_button_facebook"></a>
                  <a class="a2a_button_facebook_messenger"></a>
                  <a class="a2a_button_whatsapp"></a>
                  <a class="a2a_button_telegram"></a>
                  <a class="a2a_button_twitter"></a>
                  <a class="a2a_button_email"></a>
                  <a class="a2a_button_linkedin"></a>
                  <a class="a2a_button_copy_link"></a>

                  </div>
                  <script>
                  var a2a_config = a2a_config || {};
                  a2a_config.locale = "es";
                  </script>
                  <script async src="https://static.addtoany.com/menu/page.js"></script>
                  <!-- AddToAny END -->
              </div>
          </div>

          <hr/>

          <div class="row">
            <div class="col-md-12">
              <h5>
                <?php echo $lang['DIALOG_SHARE_DESCRIPTION_1']; ?>
              </h5>
            </div>
              <div class="col-md-6 col-sm-12">

                <div class="a2a_kit a2a_kit_size_32 a2a_default_style a2a_follow">
                  <a class="a2a_button_facebook" href="https://www.facebook.com/uxmalsoft"></a>
                  <a class="a2a_button_instagram" href="https://www.instagram.com/uxmalsoft/"></a>
                  <a class="a2a_button_twitter" href="https://twitter.com/uxmalsoft"></a>
                  <a class="a2a_button_youtube" href="https://www.youtube.com/c/UxmalsoftLA"></a>
                </div>

                <br/>&nbsp;
                  <img class="" src="img/uxmalsoft.png?v=<?php include '_latest_revision.php';?>" alt="UXMALSOFT" style="height:33px" />
                <br/>&nbsp;

              </div>

              <div class="col-md-6 col-sm-12">

                <div class="a2a_kit a2a_kit_size_32 a2a_default_style a2a_follow">
                  <a class="a2a_button_facebook" href="https://www.facebook.com/midnightstrikemx"></a>
                  <a class="a2a_button_instagram" href="https://www.instagram.com/midnightstrike_mx/"></a>
                  <a class="a2a_button_twitter" href="https://twitter.com/AgenciaMidnight"></a>
                </div>
                <br/>&nbsp;
                <img class="" src="img/midnight_strike_light.png?v=<?php include '_latest_revision.php';?>" alt="Midnight Strike" style="height:46px" />
                <br/>&nbsp;
              </div>

        </div>

        <hr>

        <div class="row">
          <div class="col-md-12">
            <div class="fb-like" data-href="https://www.facebook.com/uxmalsoft" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
            <a href="https://twitter.com/uxmalsoft?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @uxmalsoft</a>
            <div class="g-ytsubscribe" data-channelid="UCO6YWhs2OaeSHmZrCz3xpDg" data-layout="default" data-count="default"></div>
          </div>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-link text-<?php include '_template_base_color.php';?>" data-dismiss="modal"><?php echo $lang['BTN_CANCEL']; ?></button>
            <button type="button" class="btn btn-<?php include '_template_base_color.php';?> bg-map-primary-color" data-dismiss="modal"><?php echo $lang['BTN_OK']; ?></button>
        </div>

      </div>
    </div>
  </div>
  <!-- /map modal share -->