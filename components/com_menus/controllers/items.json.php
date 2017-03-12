<?php/** * @version    CVS: 1.0.0 * @package    Com_Modules * @author     cuong <nguyendinhcuong@gmail.com> * @copyright  2016 cuong * @license    GNU General Public License version 2 or later; see LICENSE.txt */// No direct accessdefined('_JEXEC') or die;use Joomla\Registry\Registry;jimport('joomla.application.component.controllerform');/** * Module controller class. * * @since  1.6 */class MenusControllerItems extends JControllerLegacy{	public function ajax_get_navigation()	{	    $module_navigation_id=114;	    $module=JModuleHelper::getModuleById($module_navigation_id);	    $params=new Registry();	    $params->loadString($module->params);		$input=JFactory::getApplication()->input;		$post=json_decode(file_get_contents('php://input'));		require_once JPATH_ROOT.DS.'modules/mod_menu/helper.php';		$mod_menu_helper=ModMenuHelper::getInstance();		$params->set('endLevel',1);        $list=$mod_menu_helper->getList($params);        $list1=array();        foreach($list as $item)        {            $item1=new stdClass();            $item1->id=$item->id;            $item1->target="list:12";            $item1->type="Itemid";            $item1->name=$item->title;            $item1->image_url=JUri::root().$item->android_image;            if(!$item->android_image)            {                $item1->image_url='http://77.93.198.186/u/2016/05/03/1462284245-9.jpg';            }            $list1[]=$item1;        }        $response=array(            metadata=>array(                links=>array(                    first=>"first",                    last=>"last",                    prev=>null,                    next=>null,                    self=>"self"                ),                records_count=>3            ),            records=>$list1        );        echo json_encode($response);        die;	}	public function ajax_get_left_menu_category()	{	    $module_navigation_id=114;	    $module=JModuleHelper::getModuleById($module_navigation_id);	    $params=new Registry();	    $params->loadString($module->params);		$input=JFactory::getApplication()->input;		$post=json_decode(file_get_contents('php://input'));		require_once JPATH_ROOT.DS.'modules/mod_menu/helper.php';		$mod_menu_helper=ModMenuHelper::getInstance();		$children_menu_item = array();        $list=$mod_menu_helper->getList($params);        foreach ($list as $v) {            $pt = $v->parent_id;            $temp = new Registry();            $temp->set('menu_image', $v->params->get('menu_image', ''));            $temp->set('jv_selection', $v->params->get('jv_selection', ''));            $v->params = $temp;            $pt = ($pt == '' || $pt == $v->id) ? 'list_root' : $pt;            $temp_list = @$children_menu_item[$pt] ? $children_menu_item[$pt] : array();            array_push($temp_list, $v);            $children_menu_item[$pt] = $temp_list;        }        $make_tree=function($function_call_back,$root_id,&$tree_node,$children_menu_item){            if(count($children_menu_item[$root_id])){                foreach($children_menu_item[$root_id] as $item){                    $current_item=new stdClass();                    $current_item->id=$item->id;                    $current_item->name=$item->title;                    $current_item->itemid=$item->id;                    $current_item->type="Itemid";                    $option=$item->query['option'];                    $view=$item->query['view'];                    $layout=$item->query['layout'];                    if($option=='com_hikashop'&&$view=='category'){                        $current_item->type="category";                    }elseif($option=='com_hikashop'&&$view=='product'){                        $current_item->type="products";                    }                    $current_item->weight=0;                    $current_item->graph_id=$item->id;                    $current_item->original_id=$item->id;                    $current_item->children=array();                    $function_call_back($function_call_back,$item->id,$current_item->children,$children_menu_item);                    $tree_node[]=$current_item;                }            }        };        $tree_node=array();        $root_id=1;        foreach($children_menu_item[$root_id] as $item){            $current_item=new stdClass();            $current_item->id=$item->id;            $current_item->name=$item->title;            $current_item->itemid=$item->id;            $current_item->type="Itemid";            $option=$item->query['option'];            $view=$item->query['view'];            $layout=$item->query['layout'];            if($option=='com_hikashop'&&$view=='category'){                $current_item->type="category";            }elseif($option=='com_hikashop'&&$view=='product'){                $current_item->type="products";            }            $current_item->weight=0;            $current_item->graph_id=$item->id;            $current_item->original_id=$item->id;            $current_item->children=array();            $make_tree($make_tree,$item->id,$current_item->children,$children_menu_item);            $tree_node[]=$current_item;        }        $response=array(            navigation=>$tree_node        );        echo json_encode($response);        die;	}}