<?php/** * @package Helix Framework * @author JoomShaper http://www.joomshaper.com * @copyright Copyright (c) 2010 - 2013 JoomShaper * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later */defined('_JEXEC') or die;$document=JFactory::getDocument();require_once JPATH_ROOT.DS.'libraries/less.php_1.7.0.10/less.php/Less.php';$parser = Less_Parser::getInstance();$parser->parseFile(JPATH_ROOT.DS.'templates/vina_bonnie/bootstrap-3.3.7/less/bootstrap.less', JUri::root());$parser->ModifyVars( $template_helper->list_var_template_config );?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>"><head>    <jdoc:include type="head"/>    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/general.css" type="text/css"/>    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/template.css" type="text/css"/>    <?php if ($this->direction == 'rtl') : ?>        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/template_rtl.css" type="text/css"/>    <?php endif; ?></head><body class="contentpane"><jdoc:include type="message"/><jdoc:include type="component"/></body></html>