<?php

namespace Thoughtco\CookiePanel;

use Route;
use Statamic;
use Statamic\Facades\File;
use Statamic\Facades\YAML;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $tags = [
        Tags\CookiePanel::class,
    ];
    
    protected $scripts = [
        __DIR__.'/../resources/js/cookiepanel.js'
    ];
    
    protected $stylesheets = [
        __DIR__.'/../resources/css/cookiepanel.css'
    ];
    
    public function boot()
    {
        parent::boot();

        // handle the posting of the cookie
        Statamic::booted(function () {
            $this->registerActionRoutes(function () {
                Route::post('/', 'CookiePanelController@index');
            });
        });
    
        // after install we need to copy our global
        Statamic::afterInstalled(function ($command) {
            
            if (File::exists(resource_path('blueprints/globals/cookie_panel.yaml')))
                return;
            
            $original = __DIR__.'/../resources/blueprints/cookie_panel.yaml';
            $yaml = YAML::file($original)->parse();
            File::put(resource_path('blueprints/globals/cookie_panel.yaml'), YAML::dump($yaml));
            
            $original = __DIR__.'/../resources/content/cookie_panel.yaml';
            $yaml = YAML::file($original)->parse();
            File::put(base_path('content/globals/cookie_panel.yaml'), YAML::dump($yaml));
            
        });
    }
}