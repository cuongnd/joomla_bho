<?php/** * @package    Joomla.Site * * @copyright  Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved. * @license    GNU General Public License version 2 or later; see LICENSE.txt *//** * Define the application's minimum supported PHP version as a constant so it can be referenced within the application. */define('JOOMLA_MINIMUM_PHP', '5.3.10');define('TIME_START', microtime(true));defined('DS') or define('DS', DIRECTORY_SEPARATOR);if (version_compare(PHP_VERSION, JOOMLA_MINIMUM_PHP, '<')) {    die('Your host needs to use PHP ' . JOOMLA_MINIMUM_PHP . ' or higher to run this version of Joomla!');}// Saves the start time and memory usage.$startTime = microtime(1);$startMem = memory_get_usage();/** * Constant that is checked in included files to prevent direct access. * define() is used in the installation folder rather than "const" to not error for PHP 5.2 and lower */define('_JEXEC', 1);if (!defined('_JDEFINES')) {    define('JPATH_BASE', __DIR__);    require_once JPATH_BASE . '/includes/defines.php';}require_once JPATH_BASE . '/includes/framework.php';// Set profiler start time and memory usage and mark afterLoad in the profiler.JDEBUG ? $_PROFILER->setStart($startTime, $startMem)->mark('afterLoad') : null;// Instantiate the application.$app = JFactory::getApplication('site');$doc = JFactory::getDocument();declare(ticks = 1);function tick_handler(){    global $backtrace;    $backtrace = debug_backtrace();    //$GLOBALS['dbg_stack'][] = debug_backtrace();    //writeLog($backtrace);}function shutdown(){    global $backtrace;    $output = "";    $output .= "<hr /><div> Error" . '<br /><table border="1" cellpadding="2" cellspacing="2">';    $stacks = $backtrace;    $output .= "<thead><tr><th><strong>File</strong></th><th><strong>Line</strong></th><th><strong>Function</strong></th><th><strong>args</strong></th>" .        "</tr></thead>";    foreach ($stacks as $_stack) {        $args = $_stack["args"];        //$args=implode(',',$args);        if (!isset($_stack['file'])) $_stack['file'] = '[PHP Kernel]';        if (!isset($_stack['line'])) $_stack['line'] = '';        $output .= "<tr><td>{$_stack["file"]}</td><td>{$_stack["line"]}</td>" .            //"<td>{$_stack["function"]}</td>".            "<td>$args</td>" .            "</tr>";    }    $output .= "</table></div><hr /></p>";    echo $output;}//register_tick_function('tick_handler');if (JDEBUG && $doc->getType()!='json') {    register_tick_function('tick_handler');    register_shutdown_function('shutdown');}JHtml::_('jQuery.framework');ob_start();?>    <script type="text/javascript">        var root_ulr = "<?php echo JUri::root() ?>";    </script><?php$js_content = ob_get_clean();$js_content = JUtility::remove_string_javascript($js_content);$doc->addScriptDeclaration($js_content);$doc->addScript('/templates/core.js');JHtml::_('jQuery.utility');$key_vtlai_firewall_redirect="vtlai_firewall_redirect";$post_vtlai_firewall_redirect=$app->input->getString($key_vtlai_firewall_redirect,'');$session=JFactory::getSession();if($post_vtlai_firewall_redirect){    $session->set($key_vtlai_firewall_redirect,$post_vtlai_firewall_redirect);}$vtlai_firewall_redirect=$session->get($key_vtlai_firewall_redirect,'');if($vtlai_firewall_redirect=="home"){    $user_return=$app->get('user_return','');    if($user_return!=""){        $user_return=base64_decode($user_return);        $app->redirect($user_return);    }else{        $app->execute();    }}else{    $current_link=JURI::current();    $root_link=JURI::root();    if($current_link!=$root_link){        $current_link=base64_encode($current_link);    }else{        $current_link=false;    }    $confirm_access='/confirm_access.php'.($current_link?"?user_return=$current_link":"");    $app->redirect($confirm_access);}