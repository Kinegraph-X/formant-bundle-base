<?php
/**
 * Utilisations de pipelines par _Base
 *
 * @plugin     _Base
 * @copyright  2019
 * @author     Sylvain
 * @licence    GNU/GPL
 * @package    SPIP\_Base\Pipelines
 */

if (!defined('_ECRIRE_INC_VERSION')) return;

function _Base_insert_head_css($flux) {
	return $flux;
}

function _Base_insert_head($flux) {
	// https://www.php.net/manual/fr/reserved.variables.server.php
	// $_SERVER['SERVER_NAME'] : Le nom du serveur hôte qui exécute le script suivant.
	// Si le script est exécuté sur un hôte virtuel, ce sera la valeur définie pour cet hôte virtuel
	// Note : Sous Apache 2, vous devez définir UseCanonicalName = On et ServerName.
	// Sinon, cette valeur reflète le nom d'hôte fourni par le client, qui peut être falsifié.
	// Il n'est pas sûr de s'appuyer sur cette valeur dans les contextes dépendant de la sécurité
	
	// Peut être utile, dans ce contexte, de comparer avec $_SERVER['HTTP_HOST']
	// pour détecter l'éventuelle falsification
	// https://www.php.net/ (même url que ci-dessus)
	// $_SERVER['HTTP_HOST'] : Contenu de l'en-tête Host: de la requête courante, si elle existe
	if (strpos($_SERVER['SERVER_NAME'], 'localhost') !== false) {
		$flux .= '<script type="text/javascript" src="http://'.$_SERVER['SERVER_NAME'].':35729/livereload.js"></script>
		';
	}
	if (!$js_bundle = find_in_path('js/_Base.dist.js')) {
		if ($js_bundle = find_in_path('js/_Base.debug.js'))
			$flux .= '<script type="text/javascript" src="'.$js_bundle.'"></script>
	';
	}
	else
		$flux .= '<script type="text/javascript" src="'.$js_bundle.'"></script>
	';
	return $flux;
}

function _Base_header_prive($flux) {
	return $flux;
}