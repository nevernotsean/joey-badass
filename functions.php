<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});

	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_image_size('archiveImageCropped', 800, 400, true);
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadScripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadStyles' ) );
		parent::__construct();
	}

	function loadScripts() {
		wp_enqueue_script( 'jquery', get_template_directory_uri() . '/static/js/vendor/jquery.js', array(), '1.0.0', true );
		wp_enqueue_script( 'foundation', get_template_directory_uri() . '/static/js/vendor/foundation.js', array(), '1.0.0', true );
		wp_enqueue_script( 'whatinput', get_template_directory_uri() . '/static/js/vendor/what-input.js', array(), '1.0.0', true );
		wp_enqueue_script( 'slick', get_template_directory_uri() . '/static/slick/slick.js', array(), '1.0.0', true );
		wp_enqueue_script( 'app', get_template_directory_uri() . '/static/js/app.js', array(), '1.0.0', true );
	}

	function loadStyles() {
		// Add main stylesheet
		wp_enqueue_style( 'foundation', get_template_directory_uri() . '/static/css/foundation.css');
		wp_enqueue_style( 'fontawesome', get_template_directory_uri() . '/static/css/font-awesome.min.css');
		wp_enqueue_style( 'slick', get_template_directory_uri() . '/static/slick/slick.css');
		wp_enqueue_style( 'slick-theme', get_template_directory_uri() . '/static/slick/slick-theme.css');
		wp_enqueue_style( 'site', get_template_directory_uri() . '/static/css/app.css');

		// designer overrides
		wp_enqueue_style( 'robs', get_template_directory_uri() . '/static/css/robs.css');

		// add_filter('timber_compile_result', function($output) {
		// 	return str_replace('http://www.joeybadass.com', 'https://www.joeybadass.com', $output);
		// });
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function add_to_context( $context ) {
		$context['foo'] = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}
}

new StarterSite();
