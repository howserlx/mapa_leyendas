<!-- map info modal-->
  <div id="modal_map_info" class="modal fade" tabindex="-1">
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
          
          <h3 class="text-semibold">
            <span> <img src="img/ghost.png?v=<?php include '_latest_revision.php';?>" class="info-logo-modal" /></span>
            <?php echo $lang['DIALOG_INFO_TITLE']; ?></b> </h3>

          <p class="text-justify">
            <?php echo $lang['DIALOG_INFO_SUBTITLE']; ?>
            <br/>
            <p>
              <?php echo $lang['DIALOG_INFO_DESCRIPCION_1']; ?>
            </p>

            <p>
              <?php echo $lang['DIALOG_INFO_DESCRIPCION_2']; ?>
            </p>
            
           

          </p>

          <hr>

          <h6 class="text-semibold"><?php echo $lang['DIALOG_INFO_MAP']; ?></h6>
          <ul>
            <li>Juan Francisco Gerardo Hernández</li>
            <li>Karen Kimbeerley Colmenero Delgado</li>
            <li>Gabriela Vega Eraña</li>
          </ul>

          <h6 class="text-semibold"><?php echo $lang['DIALOG_INFO_WRITERS']; ?></h6>
          <ul>
            <li>Daniela Morán Villasana <a href="https://instagram.com/theterribleartistsblog" target="_blank">@theterribleartistsblog</a></li>
            <li>Gabriela O. Vega Eraña <a href="https://instagram.com/theunexpectedg" target="_blank">@theunexpectedg</a></li>
            <li>Raséc <a href="https://instagram.com/jcrasec22" target="_blank">@jcrasec22</a></li>
          </ul>
          <h6 class="text-semibold"><?php echo $lang['DIALOG_INFO_MULTIMEDIA']; ?></h6>
          <ul>
            <li>Dirección del video <i>La Loca Zulley</i> : Johana Paola López Bravo <a href="https://instagram.com/yoyis_lbravo" target="_blank">@yoyis_lbravo</a></li>
            <li>Dirección del video <i>La Dama Enlutada</i>: Héctor del Ángel Moreno Candelaria / Fotografías: Mariana Prieto y Héctor del Ángel</li>
            <li>Dirección del video <i>El Jergas</i>: Gabriela O. Vega Eraña</li>
            <li>Dirección del video <i>La Maltos</i>: Daniela Morán Villasana</li>
          </ul>
          <h6 class="text-semibold"><?php echo $lang['DIALOG_INFO_STORY_TELLER']; ?></h6>
          <ul>
            <li>Daniela Morán Villasana</li>
            <li>Gabriela Vega Eraña</li>
            <li>Dante Alberto Núñez Rodríguez</li>
            <li>Adrián Fível Martínez Rangel</li>
            <li>Aurora Rangel Núñez</li>
            <li>Giovanni Bárcenas</li>
            <li>Willy Rangel</li>
            <li>Héctor Hugo Morán Villasana</li>
            <li>Carlos Miguel Siade Sánchez</li>
          </ul>
          <h6 class="text-semibold"><?php echo $lang['DIALOG_INFO_THANKS']; ?></h6>
          <ul>
            <li>Edgard Dávila Salas</li>
            <!--<li>Música: Terror-Fear-Noise-Chaos (and he still has hell to look forward to) by Soularflair <a href="http://soularflair.net/" target="_blank">http://soularflair.net/</a></li>-->
            <li>Música: Ghost Stories (By Steve Oxen) - Ominous halloween track with piano and spooky ambience.</li>
            <li>Sound Effects: <a href="https://freesound.org/people/Robinhood76/sounds/332854/" target="_blank"></a>Spooky ghostly (By Robinhood76) in Freesound.org</li>
            <li>Sound Effects: <a href="https://freesound.org/people/snapssound/sounds/528114/" target="_blank"></a>Ghost scream (By snapssound) in Freesound.org</li>
            <li>Sound effects from <a href="https://quicksounds.com" target="_blank">https://quicksounds.com</a></li>
          </ul>

          <!-- <h6 class="text-semibold"><?php echo $lang['DIALOG_INFO_MUSIC']; ?></h6>
          <ul>
            <li>
              Music
            </li>
          </ul> -->

          <br/>

          <p class="float-left"><?php echo $lang['DIALOG_INFO_DEVELOPED']; ?> 
            <a href="https://www.uxmalsoft.com/" target="_blank"><img class="modal-info-small-logo" src="img/uxmalsoft.png?v=<?php include '_latest_revision.php';?>" alt="UXMALSOFT" /></a>
            &amp;
            <a href="https://www.instagram.com/midnightstrike_mx/" target="_blank"><img class="modal-info-small-logo" src="img/midnight_strike_light.png?v=<?php include '_latest_revision.php';?>" alt="Midnight Strike" style="height:50px"/></a>

          <hr/>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-link text-<?php include '_template_base_color.php';?>" data-dismiss="modal"><?php echo $lang['BTN_CANCEL']; ?></button>
            <button type="button" class="btn btn-<?php include '_template_base_color.php';?> bg-map-primary-color" data-dismiss="modal"><?php echo $lang['BTN_OK']; ?></button>
        </div>

      </div>
    </div>
  </div>
  <!-- /map info modal -->