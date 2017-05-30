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
defined('_JEXEC') or die('Unauthorized Access');

FD::import('admin:/tables/clustercategory');

/**
 * Object mapping for `#__social_clusters_category` table.
 *
 * @author	Mark Lee <mark@stackideas.com>
 * @since	1.2
 */
class SocialTableGroupCategory extends SocialTableClusterCategory
{
	/**
	 * Override parent's store behavior
	 *
	 * @since	1.0
	 * @access	public
	 * @param	string
	 * @return
	 */
	public function store($updateNulls = null)
	{
		$this->type = SOCIAL_TYPE_GROUP;

		// Save the current category first.
		return parent::store($updateNulls);
	}

	/**
	 * Retrieves total groups in this category
	 *
	 * @since	1.2
	 * @access	public
	 * @return	int
	 */
	public function getTotalGroups($excludeBlocked = false)
	{
		static $total = array();

		if (!isset($total[$this->id])) {
			$options = array('types' => array(SOCIAL_GROUPS_PUBLIC_TYPE, SOCIAL_GROUPS_PRIVATE_TYPE));

			if ($excludeBlocked) {
				$options['excludeblocked'] = 1;
			}

			$total[$this->id] = $this->getTotalNodes($options);
		}

		return $total[$this->id];
	}
}
