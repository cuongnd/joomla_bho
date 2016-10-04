<?php
defined('_JEXEC') or die;
$doc=JFactory::getDocument();
$doc->addScript(JUri::root().'modules/mod_cart/assets/js/mod_cart.js');
$doc->addLessStyleSheet(JUri::root().'modules/mod_cart/assets/less/mod_cart.less');
?>
<div id="mod_cart_<?php echo $module->id ?>" class="mod_cart">
    <div class="group_like_cart">
        <div class="fl header_like cart" title="<?php echo JText::_('Giỏ hàng của bạn') ?>">
            <a rel="nofollow" href="javascript:void(0)" class="follow">
                <i class="icon_vg40 icon_vg40_cart"></i>
                <span><?php echo JText::_('Giỏ hàng') ?></span>
                <div class="notify">0</div>
            </a>
        </div>
        <div class="wrapper-cart">
            <ul class="dropdown-menu">
                <li><a href="#">HTML</a></li>
                <li><a href="#">CSS</a></li>
                <li><a href="#">JavaScript</a></li>
            </ul>
        </div>

    </div>
</div>
<?php
$js_content = '';
$doc = JFactory::getDocument();
ob_start();
?>
<script type="text/javascript">
    jQuery(document).ready(function ($) {
        $("#mod_cart_<?php echo $module->id ?>").mod_cart({
            module_id:<?php echo $module->id   ?>,
            params:<?php echo json_encode($params->toObject()) ?>
        });


    });
</script>
<?php
$js_content = ob_get_clean();
$js_content = JUtility::remove_string_javascript($js_content);
$doc->addScriptDeclaration($js_content);

?>
