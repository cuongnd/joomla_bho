<?phpdefined('_JEXEC') or die;require_once JPATH_ROOT . DS . 'administrator/components/com_hikashop/helpers/helper.php';$moduleclass_sfx = $params->get('moduleclass_sfx', '');$params = $module->params;$user=JFactory::getUser();$list_category_product = $modtab_productshelper->get_list_category_product($params,null,$module);$list_category_product=array_values($list_category_product);$image_helper = hikashop_get('helper.image');$debug=JUtility::get_debug();$i=0;foreach($list_category_product as &$category_product){    $detail=&$category_product->detail;    $detail->icon=$image_helper->getThumbnail($detail->icon_file_path,array(500,500), array('default' => true), true);    foreach($category_product->list as &$product){        $list_image=&$product->list_image;        $list_image=explode(';',$list_image);        foreach($list_image as &$image){            $image=$image_helper->getThumbnail($image,array(500,500), array('default' => true), true);        }        $link='product&task=show&cid=' . $product->product_id . '&name=' . $product->alias;        $product->link=hikashop_contentLink($link.'&partner_id='.$user->user_id, $product);    }    foreach($category_product->list_small_product as &$product){        $list_image=&$product->list_image;        $list_image=explode(';',$list_image);        foreach($list_image as &$image){            $image=$image_helper->getThumbnail($image,array(500,500), array('default' => true), true);        }        $link='product&task=show&cid=' . $product->product_id . '&name=' . $product->alias;        $product->link=hikashop_contentLink($link.'&partner_id='.$user->user_id, $product);    }    foreach($category_product->list_sub_category_detail as &$category){        $category->icon=$image_helper->getThumbnail($category->icon_file_path,array(500,500), array('default' => true), true);        $category->link=hikashop_contentLink('category&task=listing&cid='.$category->category_id.'&name='.$category->alias,$category->category_id);    }    $category_product->is_loaded=1;    if($i==1){        break;    }    $i++;}$debug=0;if($debug){echo "<pre>";print_r($list_category_product,false);echo "</pre>";die;}/*if($module->id==340){echo "<pre>";print_r($list_category_product,false);echo "</pre>";die;}*/echo json_encode($list_category_product);