<?php/** * @package     Joomla.Site * @subpackage  mod_menu * * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved. * @license     GNU General Public License version 2 or later; see LICENSE.txt */$doc = JFactory::getDocument();$doc->addLessStyleSheet(JUri::root() . 'modules/mod_menu/assests/less/homeverticalmenutag.less');$doc->addScript(JUri::root() . 'modules/mod_menu/assests/js/homeverticalmenutag.js');$doc = JFactory::getDocument();$params=$module->params;$lazyload=(boolean)$params->get('lazyload',false);?><div class="mod_menu homeverticalmenutag" id="mod_menu_<?php echo $module->id ?>">    <div class="category hidden-xs-to-lg">        <div class="row text-uppercase">            <div class="col-xxxs-10">                <div class="category-title"><strong><a href="javascript:void(0)"  class="show-hide-category"  data-toggle="collapse" data-target="#homeverticalmenutag_category_<?php echo $module->id ?>" aria-expanded="false" aria-controls="homeverticalmenutag_category_<?php echo $module->id ?>"                                                      ><?php echo JText::_('Danh mục sản phẩm') ?></a></strong></div>            </div>            <div class="col-xxxs-2 icon">                <a class="show-hide-category" href="javascript:void(0)" data-toggle="collapse" data-toggle="collapse" data-target="#homeverticalmenutag_category_<?php echo $module->id ?>" aria-expanded="false" aria-controls="homeverticalmenutag_category_<?php echo $module->id ?>"><strong><i class=" glyphicon glyphicon-plus"></i></a></strong>            </div>        </div>    </div>    <?php    if(!$lazyload){        require JModuleHelper::getLayoutPath('mod_menu', 'homeverticalmenutag_basic');    }else{        require JModuleHelper::getLayoutPath('mod_menu', 'homeverticalmenutag_deconstruction');    }    ?></div><?php$js_content = '';$doc = JFactory::getDocument();ob_start();?><script type="text/javascript">    jQuery(document).ready(function ($) {        $("#mod_menu_<?php echo $module->id ?>").homeverticalmenutag({            module_id:<?php echo $module->id   ?>,            lazyload: "<?php echo json_encode($lazyload) ?>",            params:<?php echo json_encode($params->toObject()) ?>        });    });</script><?php$js_content = ob_get_clean();$js_content = JUtility::remove_string_javascript($js_content);$doc->addScriptDeclaration($js_content);?>