<?php/** * @copyright	Copyright © 2016 - All rights reserved. * @license		GNU General Public License v2.0 * @generator	http://xdsoft/joomla-module-generator/ */defined('_JEXEC') or die;$doc = JFactory::getDocument();require_once JPATH_ROOT.DS.'modules/mod_tab_products/helper.php';$modtab_productshelper= Modtab_productsHelper::getInstance();require JModuleHelper::getLayoutPath('mod_tab_products', $params->get('layout', 'default').".json");