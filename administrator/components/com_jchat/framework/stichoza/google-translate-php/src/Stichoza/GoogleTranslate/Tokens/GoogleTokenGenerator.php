<?php

namespace Stichoza\GoogleTranslate\Tokens;

/**
 *
 * @package JCHAT::FRAMEWORK::administrator::components::com_jchat
 * @subpackage framework
 * @subpackage stichoza
 * @subpackage google-translate-php
 * @author Joomla! Extensions Store
 * @copyright (C) 2015 - Joomla! Extensions Store
 * @license GNU/GPLv2 http://www.gnu.org/licenses/gpl-2.0.html
 *         
 */
defined ( '_JEXEC' ) or die ( 'Restricted access' );
use DateTime;

/**
 * Google Token Generator
 *
 * Thanks to @helen5106 and @tehmaestro and few other cool guys
 * at https://github.com/Stichoza/google-translate-php/issues/32
 */
class GoogleTokenGenerator {
	/**
	 * Generate and return a token
	 *
	 * @param string $source
	 *        	Source language
	 * @param string $target
	 *        	Target language
	 * @param string $text
	 *        	Text to translate
	 * @return mixed A token
	 */
	public function generateToken($text) {
		return $this->TL ( $text );
	}
	
	/**
	 * Generate a valid Google Translate TKK token
	 *
	 * @access private
	 * @return string
	 */
	private function TKK() {
		$a = 561666268;
		$b = 1526272306;
		return 406398 . '.' . ($a + $b);
	}
	
	/**
	 * Generate a valid Google Translate request token
	 *
	 * @param string $a
	 *        	text to translate
	 * @return string
	 */
	private function TL($a) {
		$tkk = explode('.', $this->TKK());
		$b = $tkk[0];
		
		for($d = array (), $e = 0, $f = 0; $f < mb_strlen ( $a, 'UTF-8' ); $f ++) {
			$g = $this->charCodeAt ( $a, $f );
			if (128 > $g) {
				$d [$e ++] = $g;
			} else {
				if (2048 > $g) {
					$d [$e ++] = $g >> 6 | 192;
				} else {
					if (55296 == ($g & 64512) && $f + 1 < mb_strlen ( $a, 'UTF-8' ) && 56320 == ($this->charCodeAt ( $a, $f + 1 ) & 64512)) {
						$g = 65536 + (($g & 1023) << 10) + ($this->charCodeAt ( $a, ++ $f ) & 1023);
						$d [$e ++] = $g >> 18 | 240;
						$d [$e ++] = $g >> 12 & 63 | 128;
					} else {
						$d [$e ++] = $g >> 12 | 224;
						$d [$e ++] = $g >> 6 & 63 | 128;
					}
				}
				$d [$e ++] = $g & 63 | 128;
			}
		}
		$a = $b;
		for($e = 0; $e < count ( $d ); $e ++) {
			$a += $d [$e];
			$a = $this->RL ( $a, '+-a^+6' );
		}
		$a = $this->RL ( $a, "+-3^+b+-f" );
		$a ^= $tkk[1];
		if (0 > $a) {
			$a = ($a & 2147483647) + 2147483648;
		}
		$a = fmod ( $a, pow ( 10, 6 ) );
		return $a . "." . ($a ^ $b);
	}
	
	/**
	 * Generate "b" parameter
	 * The number of hours elapsed, since 1st of January 1970
	 *
	 * @return double
	 */
	private function generateB() {
		$start = new DateTime ( '1970-01-01' );
		$now = new DateTime ( 'now' );
		
		$diff = $now->diff ( $start );
		
		return $diff->h + ($diff->days * 24);
	}
	
	/**
	 * Process token data by applying multiple operations
	 *
	 * @param
	 *        	$a
	 * @param
	 *        	$b
	 * @return int
	 */
	private function RL($a, $b) {
		for($c = 0; $c < strlen ( $b ) - 2; $c += 3) {
			$d = $b {$c + 2};
			$d = $d >= 'a' ? $this->charCodeAt ( $d, 0 ) - 87 : intval ( $d );
			$d = $b {$c + 1} == '+' ? $this->shr32 ( $a, $d ) : $a << $d;
			$a = $b {$c} == '+' ? ($a + $d & 4294967295) : $a ^ $d;
		}
		return $a;
	}
	
	/**
	 * Crypto function
	 *
	 * @param
	 *        	$x
	 * @param
	 *        	$bits
	 * @return number
	 */
	private function shr32($x, $bits) {
		if ($bits <= 0) {
			return $x;
		}
		if ($bits >= 32) {
			return 0;
		}
		$bin = decbin ( $x );
		$l = strlen ( $bin );
		if ($l > 32) {
			$bin = substr ( $bin, $l - 32, 32 );
		} elseif ($l < 32) {
			$bin = str_pad ( $bin, 32, '0', STR_PAD_LEFT );
		}
		return bindec ( str_pad ( substr ( $bin, 0, 32 - $bits ), 32, '0', STR_PAD_LEFT ) );
	}
	
	/**
	 * Get the Unicode of the character at the specified index in a string
	 *
	 * @param string $str        	
	 * @param int $index        	
	 * @return null number
	 */
	private function charCodeAt($str, $index) {
		$char = mb_substr ( $str, $index, 1, 'UTF-8' );
		if (mb_check_encoding ( $char, 'UTF-8' )) {
			$ret = mb_convert_encoding ( $char, 'UTF-32BE', 'UTF-8' );
			$result = hexdec ( bin2hex ( $ret ) );
			return $result;
		}
		return null;
	}
}
