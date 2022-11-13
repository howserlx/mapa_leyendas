
<button id="map-right-sidebar-btn" type="button" class="btn btn-light btn-sidebar" onclick="openRightMapSidebar()">
    <i class="icon-arrow-left12"></i>
</button>


<!--sidebar-->
<div id="map-right-sidebar" class="map-sidebar map-right-sidebar">

    <div class="sidebar-light sidebar-secondary sidebar-expand-lg">

        <div class="sidebar-content sidebar-header">

            <!-- Header -->
            <div class="sidebar-section sidebar-section-body d-flex align-items-center m-2">
                
                <!--title-->
                <h5 class="mb-0 flex-1 title float-right text-right">
                    <img class="info-logo-modal" src="img/example.png?v=<?php include '_latest_revision.php';?>" alt=""></span> <?php echo $lang['FILTER_PANEL_TITLE']; ?>
                </h5>

                
                <!-- close -->
                <a id="map-right-sidebar-closebtn" href="javascript:void(0)" class="btn btn-outline-white border-<?php include '_template_base_color.php';?> text-<?php include '_template_base_color.php';?> btn-flat btn-icon rounded-pill" onclick="closeRightMapSidebar()">
                    <i class="icon-arrow-right15"></i>
                </a>

            </div>
            <!-- /header -->

    
        </div><!--/sidebar-content-->

        <div class="sidebar-content" style="padding:20px;padding-top:0;margin-top:0;">

            <!--description-->
            <div class="sidebar-section">
                <div class="sidebar-section-header">
                    <span class="font-weight-semibold">
                        <h6 class="">
                            <?php echo $lang['FILTER_PANEL_TITLE']; ?>
                        </h6>
                        <br/>
                    </span>
                </div>
                
            </div>

            <!-- search -->
            <div class="sidebar-section">
                <div class="sidebar-section-header pt-1">
                    <span class="font-weight-semibold"><?php echo $lang['FILTER_PANEL_SEARCH_SECTION']; ?></span>
                    <div class="list-icons ml-auto">
                        <a href="#sidebar-search" class="list-icons-item" data-toggle="collapse" aria-expanded="false">
                            <i class="icon-arrow-down12"></i>
                        </a>
                    </div>
                </div>

                <div class="collapse show" id="sidebar-search"aria-expanded="true" style="height:100px;">
                    <form class="sidebar-section-body" action="#">
                        <div class="form-group-feedback form-group-feedback-right">
                            <input type="search" class="form-control" placeholder="Search">
                            <div class="form-control-feedback">
                                <i class="icon-search4 font-size-base text-muted"></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /search -->


            <!-- Layers -->
            <div class="sidebar-section">
                <div class="sidebar-section-header">
                    <span class="font-weight-semibold"><?php echo $lang['FILTER_PANEL_LAYER_SECTION']; ?></span>
                    <div class="list-icons ml-auto">
                        <a href="#sidebar-layers" class="list-icons-item collapsed" data-toggle="collapse" aria-expanded="false">
                            <i class="icon-arrow-down12"></i>
                        </a>
                    </div>
                </div>

                <div class="collapse" id="sidebar-layers" style="">
                    <ul class="nav nav-sidebar my-2" data-nav-type="accordion">
                        <li class="nav-item-header">...</li>

                        
                    </ul>
                </div>
            </div>
            <!-- /layers -->

        </div><!--/sidebar-content-->

    </div><!--/sidebar-light-->

</div><!--/sidebar-->

<!-- Expand button -->
<button type="button" class="btn btn-sidebar-expand sidebar-control sidebar-secondary-toggle">
    <i class="icon-arrow-right13"></i>
</button>
<!-- /expand button -->