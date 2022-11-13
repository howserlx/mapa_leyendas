<?php
ini_set('display_errors','off');
session_start();
header('Cache-control: private'); // IE 6 FIX

$i18n = 'es_MX';
$i18n_min = 'es';

if(isSet($_GET['lang'])) {
	$lang_selected = $_GET['lang'];

	// register the session and set the cookie
	$_SESSION['lang'] = $lang_selected;
	setcookie('lang', $lang_selected, time() + (3600 * 24 * 30));
}
else if(isSet($_SESSION['lang'])) {
	//session
	$lang_selected = $_SESSION['lang'];
}
else if(isSet($_COOKIE['lang'])){
	//cookie
	$lang_selected = $_COOKIE['lang'];
}
else {
	//browser
  $lang_selected = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

	// register the session and set the cookie
	$_SESSION['lang'] = $lang_selected;
	setcookie('lang', $lang_selected, time() + (3600 * 24 * 30));
}

$i18n = $lang;

switch ($lang_selected) {
  case 'en':
  $lang_file = 'lang.es.php';
  $i18n_min = 'es';
  break;

  case 'es':
  $lang_file = 'lang.es.php';
  $i18n_min = 'es';
  break;

  default:
  $lang_file = 'lang.es.php';
  $i18n_min = 'es';

}

function prefered_language(array $available_languages, $http_accept_language) {

    $available_languages = array_flip($available_languages);

    $langs = [];

    preg_match_all('~([\w-]+)(?:[^,\d]+([\d.]+))?~', strtolower($http_accept_language), $matches, PREG_SET_ORDER);

    foreach($matches as $match) {

        list($a, $b) = explode('-', $match[1]) + array('', '');
        $value = isset($match[2]) ? (float) $match[2] : 1.0;

        if(isset($available_languages[$match[1]])) {
            $langs[$match[1]] = $value;
            continue;
        }

        if(isset($available_languages[$a])) {
            $langs[$a] = $value - 0.1;
        }
    }

    arsort($langs);
    return $langs;

}

include_once 'i18n/'.$lang_file;
?>
