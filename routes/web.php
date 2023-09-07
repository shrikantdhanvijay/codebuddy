<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [LoginController::class, 'login'])->name('/');
Route::get('/login', [LoginController::class, 'login'])->name('/login');
Route::post('/signin', [LoginController::class, 'authenticate'])->name('/signin');

Route::group(['middleware' => ['auth']], function() {

    Route::get('admin-dashboard', [AdminController::class, 'dashboard'])->name('/admin-dashboard')->middleware('is_admin');
    
    Route::get('category', [CategoryController::class, 'category'])->name('/category')->middleware('is_admin');
    Route::get('add-category', [CategoryController::class, 'addCategory'])->name('/add-category')->middleware('is_admin');
    Route::get('edit-category/{id}', [CategoryController::class, 'editCategory'])->name('/edit-category')->middleware('is_admin');
    Route::post('delete-category', [CategoryController::class, 'deleteCategory'])->name('/delete-category')->middleware('is_admin');
    Route::post('save-category', [CategoryController::class, 'saveCategory'])->name('/save-category')->middleware('is_admin');

    Route::get('user-dashboard', [UserController::class, 'dashboard'])->name('/user-dashboard');

    Route::get('/logout', [LoginController::class, 'logout'])->name('/logout');

});