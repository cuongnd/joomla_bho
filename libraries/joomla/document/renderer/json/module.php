<?php
/**
 * @package     Joomla.Platform
 * @subpackage  Document
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */
defined('JPATH_PLATFORM') or die;
use Joomla\Registry\Registry;
/**
 * JDocument Module renderer
 *
 * @since  3.5
 */
class JDocumentRendererJsonModule extends JDocumentRenderer
{
    /**
     * Renders a module script and returns the results as a string
     *
     * @param   string $module The name of the module to render
     * @param   array $attribs Associative array of values
     * @param   string $content If present, module information from the buffer will be used
     *
     * @return  string  The output of the script
     *
     * @since   3.5
     */
    public function render($module, $attribs = array(), $content = null)
    {
        if (!is_object($module)) {
            $title = isset($attribs['title']) ? $attribs['title'] : null;
            $module = JModuleHelper::getModule($module, $title);
            if (!is_object($module)) {
                if (is_null($content)) {
                    return '';
                }
                /**
                 * If module isn't found in the database but data has been pushed in the buffer
                 * we want to render it
                 */
                $tmp = $module;
                $module = new stdClass;
                $module->params = null;
                $module->module = $tmp;
                $module->id = 0;
                $module->user = 0;
            }
        }
        // Set the module content
        if (!is_null($content)) {
            $module->content = $content;
        }
        $params = Registry::getInstance('module_id_' . $module->id);
        if (empty($params->toArray())) {
            $params->loadString($module->params);
        }
        $app = JFactory::getApplication();
        // Use parameters from template
        if (isset($attribs['params'])) {
            $template_params = new Registry(html_entity_decode($attribs['params'], ENT_COMPAT, 'UTF-8'));
            $params->merge($template_params);
            $module = clone $module;
            $module->params = $params;
        }
        // Default for compatibility purposes. Set cachemode parameter or use JModuleHelper::moduleCache from within the module instead
        $cachemode = $params->get('cachemode', 'oldstatic');
        $config = JFactory::getConfig();
        if ($params->get('cache', 0) == 1 && $config->get('caching') >= 1 && $cachemode != 'id' && $cachemode != 'safeuri') {
            // Default to itemid creating method and workarounds on
            $cacheparams = new stdClass;
            $cacheparams->cachemode = $cachemode;
            $cacheparams->class = 'JModuleHelper';
            $cacheparams->method = 'renderModule';
            $cacheparams->methodparams = array($module, $attribs);
            $module->content = JModuleHelper::ModuleCache($module, $params, $cacheparams);
        } else {
            $module->content = JModuleHelper::renderModule($module, $attribs);
        }
        $func_check_module_in_array = function ($module_id, $modules) {
            foreach ($modules as $module) {
                if ($module->id == $module_id) {
                    return true;
                }
                return false;
            }
        };

        preg_match_all('/src="(.+?)"/', $module->content, $matches);

        if(count($matches[1])) {

            foreach ($matches[1] AS &$item) {

                $item=strtolower($item);

                if (strpos($item, 'http') == false) {

                    $item = 'src="'.JUri::root().$item.'"';

                }



            }

            $module->content=str_replace($matches[0],$matches[1],$module->content);

        }
        preg_match_all('/src="(.+?)"/', $module->content, $matches);

        if(count($matches[1])) {

            foreach ($matches[1] AS &$item) {

                $item=strtolower($item);

                if (strpos($item, 'http') == false) {

                    $item = 'src="'.JUri::root().$item.'"';

                }



            }

            $module->content=str_replace($matches[0],$matches[1],$module->content);

        }

        if (!$func_check_module_in_array($module->id, $app->modules)) {
            if ($module->params instanceof Registry) {
            } else if (is_string($module->params)) {
                $params = new Registry();
                $params->loadString($module->params);
                $module->params = $params;
            } else if (is_array($module->params)) {
                $params = new Registry();
                $params->loadArray($module->params);
                $module->params = $params;
            } else if (is_object($module->params)) {
                $params = new Registry();
                $params->loadObject($module->params);
                $module->params = $params;
            }
            $module->strparams = $params->toString();
            array_push($app->modules, $module);
        }
        return $module->content;
    }
}
