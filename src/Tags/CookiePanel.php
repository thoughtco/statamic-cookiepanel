<?php

namespace Thoughtco\CookiePanel\Tags;

use Request;
use Statamic\Facades\GlobalSet;
use Statamic\Tags\Tags;

class CookiePanel extends Tags
{
    /**
     * The {{ cookie_panel:panel }} tag.
     *
     * @return string|array
     */
    public function panel()
    {
        $cookie = Request::cookie('tc_cookie_policy', false);   
        
        $panelData = GlobalSet::findByHandle('cookie_panel')
            ->inCurrentSite()
            ->data();
      
        return view('cookiepanel::panel', [
            'openPanel' => $cookie === false,
            'data' => $panelData,
        ]);
    }

    /**
     * The {{ cookie_panel:styles }} tag.
     *
     * @return string
     */    
    public function styles()
    {
        return '<link rel="stylesheet" href="/vendor/cookiepanel/css/cookiepanel.css">';
    }
      
    /**
     * The {{ cookie_panel:scripts }} tag.
     *
     * @return string
     */  
    public function scripts()
    {
        return '<script src="/vendor/cookiepanel/js/cookiepanel.js"></script>';
    }
    
    /**
     * The {{ cookie_panel:cookie_table }} tag.
     *
     * @return array
     */
    public function cookieTable()
    {
        $panelData = GlobalSet::findByHandle('cookie_panel')
            ->inCurrentSite()
            ->data();
            
        return $panelData['cookie_table'];     
    }

    /**
     * The {{ cookie_panel:has_consented_to }} tag.
     *
     * @return boolen
     */
    public function hasConsentedTo($type = 'functional')
    {        
        $cookie = Request::cookie('tc_cookie_policy', false);    
    
        // we don't have the cookie policy
        if (!$cookie)
            return false;
            
        $consentedTo = json_decode($cookie);
        
        // if we have none then we dont consent
        if (in_array('none', $consentedTo))
            return false;

        return in_array($type, $consentedTo);
    }
}
