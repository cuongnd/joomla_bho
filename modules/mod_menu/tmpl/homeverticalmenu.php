<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_menu
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
use Joomla\Registry\Registry;
defined('_JEXEC') or die;

$max_items_root = $params->get('max_items_root', 0);
$doc=JFactory::getDocument();
$doc->addLessStyleSheet(JUri::root().'modules/mod_menu/assests/less/mod_menu.less');
$doc->addScript(JUri::root().'media/system/js/jquery.utility.js');
$doc->addScript(JUri::root().'modules/mod_menu/assests/js/mod_menu.js');
$id = '';

if (($tagId = $params->get('tag_id', ''))) {
    $id = ' id="' . $tagId . '"';
}
$menu_show = $params->get('menu_show', array());
if (in_array(0, $menu_show)) {
    $menu_show = array();
}

// The menu class is deprecated. Use nav instead
$children_menu_item = array();
$list = JArrayHelper::pivot($list, 'id');
$list1=array();
foreach ($list as $item) {
    $item1=new stdClass();
    $item1->id=$item->id;
    $item1->parent_id=$item->parent_id;
    $item1->title=$item->title;
    $item1->link=$item->link;
    $item1->flink=$item->flink;
    $item1->params=$item->params;
    $list1[]=$item1;
}
foreach ($list1 as $v) {
    $pt = $v->parent_id;
    $temp=new Registry();
    $temp->set('menu_image',$v->params->get('menu_image',''));
    $v->params=$temp;
    $pt = ($pt == '' || $pt == $v->id) ? 'list_root' : $pt;
    $temp_list = @$children_menu_item[$pt] ? $children_menu_item[$pt] : array();
    array_push($temp_list, $v);
    $children_menu_item[$pt] = $temp_list;
}

$get_tree_ul_li = function ($function_call_back, $root_id = 1, &$tree_ul_li, $list_all_menu, $list_tree_menu, $level = 0) {
    if ($level <= 1) {
        $menu_item = $list_all_menu[$root_id];
        if ($menu_item) {
            $menu_image=$menu_item->params->get('menu_image','');
            $tree_ul_li .= '<li class="menu-iem menu-iem-'.$menu_item->id.' level-'.$level.'" ><a data-menu_id="'.$menu_item->id.'"  href="' . $menu_item->flink.'"><img src="'.JUri::root().$menu_image.'"><span>' . $menu_item->title . '</span></a>';
            $tree_ul_li .= count($list_tree_menu[$root_id]) ? '<ul class="level-'.$level.'">' : '';
        }
        foreach ($list_tree_menu[$root_id] as $a_menu_item) {
            $root_id1 = $a_menu_item->id;
            $level1 = $level + 1;
            $function_call_back($function_call_back, $root_id1, $tree_ul_li, $list_all_menu, $list_tree_menu, $level1);
        }
        if ($menu_item) {
            $tree_ul_li .= count($list_tree_menu[$root_id]) ? '</ul>' : '';
            $tree_ul_li .= '</li>';
        }
    }
};
$tree_ul_li = '';
$tree_ul_li .= '<ul class="level-0">';
$get_tree_ul_li($get_tree_ul_li, 1, $tree_ul_li, $list, $children_menu_item, 0);
$tree_ul_li .= '</ul>';
ob_start();
?>
<div class="container-content hidden-phone">
    <div class="noi_bat">
        <h5 class="title"><img class="image-menu-item" src="<?php echo JUri::root() ?>images/icon_category/adr-icon-campfire.png"><?php echo JText::_('Nổi bật') ?></h5>
        <ul>
            <li><a href="#"><?php echo JText::_('Sản phẩm bán chạy') ?></a></li>
            <li><a href="#"><?php echo JText::_('Sản phẩm mới') ?></a></li>
            <li><a href="#"><?php echo JText::_('Hàng giảm giá') ?></a></li>
            <li><a href="#"><?php echo JText::_('Hàng đang đấu giá') ?></a></li>
            <li><a href="#"><?php echo JText::_('Hàng đang có mua chung') ?></a></li>
        </ul>
    </div>
</div>
<?php
$html1=ob_get_clean();

ob_start();
?>
<div class="phone-container-content hidden-desktop">
    <div class="noi_bat">
        <h5 class="title"><img class="image-menu-item" src="<?php echo JUri::root() ?>images/icon_category/adr-icon-campfire.png"><?php echo JText::_('Nổi bật') ?></h5>
        <ul>
            <li><a href="#"><?php echo JText::_('Sản phẩm bán chạy') ?></a></li>
            <li><a href="#"><?php echo JText::_('Sản phẩm mới') ?></a></li>
            <li><a href="#"><?php echo JText::_('Hàng giảm giá') ?></a></li>
            <li><a href="#"><?php echo JText::_('Hàng đang đấu giá') ?></a></li>
            <li><a href="#"><?php echo JText::_('Hàng đang có mua chung') ?></a></li>
        </ul>
    </div>
</div>
<?php
$html2=ob_get_clean();
echo '<div class="mod_menu homeverticalmenu" id="mod_menu_'.$module->id.'">'.$tree_ul_li.$html1.$html12.'</div>';
$js_content = '';
$doc = JFactory::getDocument();
$uri=JFactory::getUri();

ob_start();
?>
<script type="text/javascript">
    jQuery(document).ready(function ($) {
        $("#mod_menu_<?php echo $module->id ?>").mod_menu({
            module_id:<?php echo $module->id   ?>,
            children_menu_item:<?php echo json_encode($children_menu_item) ?>,
            root_url:"<?php echo $uri->root() ?>",
            max_item_level_3:5
        });


    });
</script>
<?php
$js_content = ob_get_clean();
$js_content = JUtility::remove_string_javascript($js_content);
$doc->addScriptDeclaration($js_content);

?>
