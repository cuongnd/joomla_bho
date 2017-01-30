<?php
/**
 * @package         Regular Labs Library
 * @version         16.8.22020
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            http://www.regularlabs.com
 * @copyright       Copyright © 2016 Regular Labs All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

require_once dirname(__DIR__) . '/helpers/field.php';

class JFormFieldRL_Header extends RLFormField
{
	public $type = 'Header';

	protected function getLabel()
	{
		return '';
	}

	protected function getInput()
	{
		$this->params = $this->element->attributes();

		RLFunctions::stylesheet('regularlabs/style.min.css');

		$title       = $this->get('label');
		$description = $this->get('description');
		$xml         = $this->get('xml');
		$url         = $this->get('url');

		if ($description)
		{
			// variables
			$v1 = $this->get('var1');
			$v2 = $this->get('var2');
			$v3 = $this->get('var3');
			$v4 = $this->get('var4');
			$v5 = $this->get('var5');

			$description = RLText::html_entity_decoder(trim(JText::sprintf($description, $v1, $v2, $v3, $v4, $v5)));
		}

		if ($title)
		{
			$title = JText::_($title);
		}

		if ($description)
		{
			$description = str_replace('span style="font-family:monospace;"', 'span class="rl_code"', $description);
			if ($description['0'] != '<')
			{
				$description = '<p>' . $description . '</p>';
			}
		}

		if (!$xml && $this->form->getValue('element'))
		{
			if ($this->form->getValue('folder'))
			{
				$xml = 'plugins/' . $this->form->getValue('folder') . '/' . $this->form->getValue('element') . '/' . $this->form->getValue('element') . '.xml';
			}
			else
			{
				$xml = 'administrator/modules/' . $this->form->getValue('element') . '/' . $this->form->getValue('element') . '.xml';
			}
		}

		if ($xml)
		{
			$xml     = JApplicationHelper::parseXMLInstallFile(JPATH_SITE . '/' . $xml);
			$version = 0;
			if ($xml && isset($xml['version']))
			{
				$version = $xml['version'];
			}
			if ($version)
			{
				if (strpos($version, 'PRO') !== false)
				{
					$version = str_replace('PRO', '', $version);
					$version .= ' <small style="color:green">[PRO]</small>';
				}
				else if (strpos($version, 'FREE') !== false)
				{
					$version = str_replace('FREE', '', $version);
					$version .= ' <small style="color:green">[FREE]</small>';
				}
				if ($title)
				{
					$title .= ' v';
				}
				else
				{
					$title = JText::_('Version') . ' ';
				}
				$title .= $version;
			}
		}
		$html = array();

		if ($title)
		{
			if ($url)
			{
				$title = '<a href="' . $url . '" target="_blank" title="' . preg_replace('#<[^>]*>#', '', $title) . '">' . $title . '</a>';
			}
			$html[] = '<h4>' . RLText::html_entity_decoder($title) . '</h4>';
		}
		if ($description)
		{
			$html[] = $description;
		}
		if ($url)
		{
			$html[] = '<p><a href="' . $url . '" target="_blank" title="' . JText::_('RL_MORE_INFO') . '">' . JText::_('RL_MORE_INFO') . '...</a></p>';
		}

		return '</div><div>' . implode('', $html);
	}
}
