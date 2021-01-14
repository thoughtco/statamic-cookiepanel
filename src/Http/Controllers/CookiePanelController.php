<?php

namespace Thoughtco\CookiePanel\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Listeners\TCFormListener;
use Cookie;
use Request;

class CookiePanelController extends Controller
{
    public function index()
    {
        $value = Request::input('categories', false);
        
        if ($value !== false) {
            $categories = explode(',', $value);
            Cookie::queue('tc_cookie_policy', json_encode($categories), 30*24*60);
        }
        
        return json_encode([
            'error' => false,
        ]);
    }
}