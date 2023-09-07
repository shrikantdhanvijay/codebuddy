<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Redirect;
use App\Http\Services\UserService;

class UserController extends Controller
{
    public $userService;

    /**
     * automatic load when class object create
     *
     */
    public function __construct()
    {
        $this->userService = new UserService();
    }

    
    /**
     * show user dashboard
     *
     */
    public function dashboard()
    {
        $userResponse = $this->userService->getAllUser();
        return view('admin.user_dashboard')->with([
            "users" => $userResponse
        ]);
    }
}
