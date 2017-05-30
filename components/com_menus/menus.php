<?php
/**
 * @version    CVS: 1.0.0
 * @package    Com_menus
 * @author     cuong <nguyendinhcuong@gmail.com>
 * @copyright  2016 cuong
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

// Include dependancies
jimport('joomla.application.component.controller');

JLoader::registerPrefix('menus', JPATH_COMPONENT);
JLoader::register('menusController', JPATH_COMPONENT . '/controller.php');


// Execute the task.
$controller = JControllerLegacy::getInstance('menus');
$controller->execute(JFactory::getApplication()->input->get('task'));
$controller->redirect();
