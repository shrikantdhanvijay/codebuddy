<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Redirect;
use App\Http\Services\CategoryService;

class AdminController extends Controller
{

    public $categoryService;

    public function __construct()
    {
        $this->categoryService = new CategoryService();
    }

    public function dashboard()
    {
        $categoryResponse = $this->categoryService->getParentCategory();
        return view('admin.admin_dashboard')->with([
            "category" => $categoryResponse
        ]);
    }
}
