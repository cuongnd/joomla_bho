<?php
/**
* @package		EasySocial
* @copyright	Copyright (C) 2010 - 2014 Stack Ideas Sdn Bhd. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* EasySocial is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/
defined( '_JEXEC' ) or die( 'Unauthorized Access' );

// Include main views file.
FD::import( 'admin:/views/views' );

class EasySocialViewThemes extends EasySocialAdminView {

	public function compile($task) {
		header('Content-type: text/x-json; UTF-8');
		echo $task->toJSON();
		exit;
	}

	public function minify($task) {
		header('Content-type: text/x-json; UTF-8');
		echo $task->toJSON();
		exit;
	}

	public function build($task) {
		header('Content-type: text/x-json; UTF-8');
		echo $task->toJSON();
		exit;
	}

	public function purge($task) {
		header('Content-type: text/x-json; UTF-8');
		echo $task->toJSON();
		exit;
	}
}
