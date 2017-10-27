<?php/** * @package     Joomla.Libraries * @subpackage  Menu * * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved. * @license     GNU General Public License version 2 or later; see LICENSE.txt */defined('JPATH_PLATFORM') or die;/** * JMenu class * * @property  components * @since  1.5 */class JMenuSite extends JMenu{    /**     * Application object     *     * @var    JApplicationCms     * @since  3.5     */    protected $app;    /**     * Database driver     *     * @var    JDatabaseDriver     * @since  3.5     */    protected $db;    /**     * Language object     *     * @var    JLanguage     * @since  3.5     */    protected $language;    /**     * Class constructor     *     * @param   array $options An array of configuration options.     *     * @since   1.5     */    public function __construct($options = array())    {        // Extract the internal dependencies before calling the parent constructor since it calls $this->load()        $this->app = isset($options['app']) && $options['app'] instanceof JApplicationCms ? $options['app'] : JFactory::getApplication();        $this->db = isset($options['db']) && $options['db'] instanceof JDatabaseDriver ? $options['db'] : JFactory::getDbo();        $this->language = isset($options['language']) && $options['language'] instanceof JLanguage ? $options['language'] : JFactory::getLanguage();        parent::__construct($options);    }    /**     * Loads the entire menu table into memory.     *     * @return  boolean  True on success, false on failure     *     * @since   1.5     */    function getsubdomain($new_parse_url) {        $parsedUrl = parse_url(strtolower($new_parse_url));        $parse_url = trim($parsedUrl[host] ? $parsedUrl[host] : array_shift(explode('/', $parsedUrl[path], 2)));        $slds =            '\.co\.uk|\.me\.uk|\.net\.uk|\.org\.uk|\.sch\.uk|    \.ac\.uk|\.gov\.uk|\.nhs\.uk|\.police\.uk|    \.mod\.uk|\.asn\.au|\.com\.au|\.net\.au|\.id\.au|    \.org\.au|\.edu\.au|\.gov\.au|\.csiro\.au';        preg_match (            "/^(http:\/\/|https:\/\/|)[a-zA-Z-]([^\/]+)/i",            $parse_url, $thematches        );        $host = $thematches[2];        if (preg_match("/$slds$/", $host, $thematches)) {            preg_match (                "/[^\.\/]+\.[^\.\/]+\.[^\.\/]+$/",                $host, $thematches            );        }        else {            preg_match (                "/[^\.\/]+\.[^\.\/]+$/",                $host, $thematches            );        }        if($parse_url == $thematches[0]){            $urlParts = "www.$thematches[0]";        } else {            if (substr($parse_url, 0, 4) != "www.") {                $parse_url = "www.$parse_url";            }            $urlParts = $parse_url;        }        $subParts = explode('.', $urlParts);        $subdomain = $subParts[0];        return $subdomain;    }    public static $list_menu_item;    public function load()    {        $db = $this->db;        $website=JFactory::getWebsite();        $app = JFactory::getApplication();        $session = JFactory::getSession();        $lang = JFactory::getLanguage();        $query = $db->getQuery(true)            ->select('m.id, m.menutype, m.title,m.icon, m.website_id, m.alias, m.note, m.path AS route, m.link, m.type, m.level, m.language')            ->select($db->quoteName('m.browserNav') . ', m.access, m.params, m.home, m.img, m.template_style_id, m.component_id, m.parent_id')            ->select('e.element as component')            ->from('#__menu AS m')            ->join('LEFT', '#__extensions AS e ON m.component_id = e.extension_id')            ->where('m.published = 1')            ->where('m.parent_id > 0')            ->where('m.client_id = 0')            //->leftJoin('#__falang_content AS falang_content')            ->order('m.lft');        if($website->id){            $query->select('m.child_website_home AS home')            ->where('m.website_id ='.(int)$website->id);        }else{            $query->select('m.home')            ->where('m.website_id =0')            ;        }        // Set the query        $db->setQuery($query);        $mySql=$db->getQuery();        $cache = JFactory::getCache('_system', 'callback');        $key=md5($mySql);        if (!(static::$list_menu_item = $cache->get($key))) {            static::$list_menu_item  = $db->loadObjectList('id');            $cache->store(static::$list_menu_item, $key);        }        $this->_items=static::$list_menu_item;        foreach ($this->_items as &$item) {            // Get parent information.            $parent_tree = array();            if (isset($this->_items[$item->parent_id])) {                $parent_tree = $this->_items[$item->parent_id]->tree;            }            // Create tree.            $parent_tree[] = $item->id;            $item->tree = $parent_tree;            // Create the query array.            $url = str_replace('index.php?', '', $item->link);            $url = str_replace('&amp;', '&', $url);            parse_str($url, $item->query);        }        return true;    }    /**     * Gets menu items by attribute     *     * @param   string $attributes The field name     * @param   string $values The value of the field     * @param   boolean $firstonly If true, only returns the first item found     *     * @return  array     *     * @since   1.6     */    public function getItems($attributes, $values, $firstonly = false)    {        $attributes = (array)$attributes;        $values = (array)$values;        if ($this->app->isSite()) {            // Filter by language if not set            if (($key = array_search('language', $attributes)) === false) {                if (JLanguageMultilang::isEnabled()) {                    $attributes[] = 'language';                    $values[] = array(JFactory::getLanguage()->getTag(), '*');                }            } elseif ($values[$key] === null) {                unset($attributes[$key]);                unset($values[$key]);            }            // Filter by access level if not set            if (($key = array_search('access', $attributes)) === false) {                $attributes[] = 'access';                $values[] = $this->user->getAuthorisedViewLevels();            } elseif ($values[$key] === null) {                unset($attributes[$key]);                unset($values[$key]);            }        }        // Reset arrays or we get a notice if some values were unset        $attributes = array_values($attributes);        $values = array_values($values);        return parent::getItems($attributes, $values, $firstonly);    }    public static $list_menu_type=array();    public function get_items_menu_site_by_menu_type($menu_type){        if(!isset($list_menu_type[$menu_type])) {            $list_menu_item = array();            foreach ($this->_items as $item) {                if ($item->menutype == $menu_type) {                    $list_menu_item[] = $item;                }            }            $list_menu_type[$menu_type]=$list_menu_item;        }        return $list_menu_type[$menu_type];    }    /**     * Get menu item by id     *     * @param   string $language The language code.     *     * @return  mixed  The item object or null when not found for given language     *     * @since   1.6     */    public function getDefault($language = '*')    {        if (array_key_exists($language, $this->_default) && $this->app->isSite() && $this->app->getLanguageFilter()) {            return $this->_items[$this->_default[$language]];        }        if (array_key_exists('*', $this->_default)) {            return $this->_items[$this->_default['*']];        }        return null;    }}