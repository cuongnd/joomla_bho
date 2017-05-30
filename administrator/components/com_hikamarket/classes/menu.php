<?php
/**
 * @package    HikaMarket for Joomla!
 * @version    1.7.0
 * @author     Obsidev S.A.R.L.
 * @copyright  (C) 2011-2016 OBSIDEV. All rights reserved.
 * @license    GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */
defined('_JEXEC') or die('Restricted access');
?><?php
class hikamarketMenuClass extends hikamarketClass {

	protected $tables = array();
	protected $pkeys = array();
	protected $toggle = array();

	public function processView(&$view) {
		if(empty($view->menus))
			return;

		$currentuser = JFactory::getUser();
		if(HIKASHOP_J16 && !$currentuser->authorise('core.manage', 'com_hikamarket'))
			return;

		$config = hikamarket::config();
		$use_approval = $config->get('product_approval', 0);

		$market = array(
			'name' => HIKAMARKET_NAME,
			'check' => 'ctrl=config',
			'acl' => 'config',
			'task' => 'manage',
			'icon' => 'icon-16-hikamarket',
			'url' => hikamarket::completeLink('dashboard'),
			'children' => array(
				array(
					'name' => JText::_('HIKA_CONFIGURATION'),
					'check' => 'ctrl=config',
					'acl' => 'config',
					'task' => 'manage',
					'icon' => 'icon-16-settings',
					'url' => hikamarket::completeLink('config'),
					'display' => !HIKASHOP_J16 || $currentuser->authorise('core.admin', 'com_hikamarket')
				),
				array(
					'name' => JText::_('HIKAM_ACL'),
					'check' => 'ctrl=config&task=acl',
					'acl' => 'config',
					'task' => 'manage',
					'icon' => 'icon-16-acl',
					'url' => hikamarket::completeLink('config&task=acl'),
					'display' => !HIKASHOP_J16 || $currentuser->authorise('core.admin', 'com_hikamarket')
				),
				array(
					'name' => JText::_('PLUGINS'),
					'check' => 'ctrl=plugins',
					'icon' => 'icon-16-plugin',
					'url' => hikamarket::completeLink('plugins')
				),
				array('name' => ''),
				array(
					'name' => JText::_('HIKA_VENDORS'),
					'check' => 'ctrl=vendor',
					'acl' => 'vendor',
					'icon' => 'icon-16-user',
					'url' => hikamarket::completeLink('vendor'),
					'display' => hikamarket::level(1)
				),
				array(
					'name' => JText::_('WAITING_APPROVAL_LIST'),
					'check' => 'ctrl=product&task=waitingapproval',
					'icon' => 'icon-16-product',
					'url' => hikamarket::completeLink('product&task=waitingapproval'),
					'display' => $use_approval
				),
				array('name' => '', 'display' => hikamarket::level(1) || $use_approval),
				array(
					'name' => JText::_('VIEWS'),
					'check' => 'ctrl=views',
					'icon' => 'icon-16-views',
					'url' => hikamarket::completeLink('shop.view&component='.HIKAMARKET_COMPONENT)
				),
				array(
					'name' => JText::_('MENUS'),
					'check' => 'ctrl=menus',
					'icon' => 'icon-16-menu',
					'url' => hikamarket::completeLink('menus'),
					'display' => hikamarket::level(1)
				),
				array(
					'name' => JText::_('MODULES'),
					'check' => 'ctrl=modules',
					'icon' => 'icon-16-module',
					'url' => hikamarket::completeLink('modules'),
					'display' => hikamarket::level(1)
				),
				array('name' => ''),
				array(
					'name' => JText::_('DOCUMENTATION'),
					'check' => 'ctrl=documentation',
					'icon' => 'icon-16-help',
					'url' => hikamarket::completeLink('documentation')
				),
				array(
					'name' => JText::_('UPDATE_ABOUT'),
					'check' => 'ctrl=update',
					'icon' => 'icon-16-install',
					'url' => hikamarket::completeLink('update')
				),
				array(
					'name' => JText::_('FORUM'),
					'check' => 'support/forum.html',
					'icon' => 'icon-16-info',
					'url' => HIKAMARKET_URL.'support/forum.html'
				)
			)
		);

		$newMenus = array(&$market);
		$this->checkActive($newMenus, 0, HIKAMARKET_COMPONENT);

		$last = array_pop($view->menus);
		array_push($view->menus, $market, $last);
	}

	private function checkActive(&$menus, $level = 0, $default_component = HIKASHOP_COMPONENT) {
		if($level > 2)
			return;

		$currentComponent = JRequest::getCmd('option', HIKASHOP_COMPONENT);
		foreach($menus as $k => $menu) {
			if(isset($menu['display']) && !$menu['display']) {
				unset($menus[$k]);
				continue;
			}
			if(empty($menu['check']))
				continue;

			if(is_array($menu['check'])) {
				$component = $menu['check'][0];
				$check = $menu['check'][1];
			} else {
				$check = $menu['check'];
				$component = $default_component;
			}
			if($component == $currentComponent && strpos($_SERVER['QUERY_STRING'], $check) !== false) {
				if(strpos($_SERVER['QUERY_STRING'], '&task=') === false || strpos($menu['check'], '&task=') !== false) {
					$menus[$k]['active'] = true;
				}
			}
			if(!empty($menu['children'])) {
				$this->checkActive($menus[$k]['children'], $level+1, $default_component);
			}
		}
	}
}
