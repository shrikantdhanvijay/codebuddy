<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Redirect;
use App\Http\Services\CategoryService;
use App\Models\Category;

class CategoryController extends Controller
{
    public $categoryService;

    public function __construct()
    {
        $this->categoryService = new CategoryService();
    }

    public function category() {

        $categoryResponse = $this->categoryService->getAllCategory();
// dd($categoryResponse);
        return view('admin.category')->with([
            "category" => $categoryResponse
        ]);

    }

    public function addCategory() {
        try {

            $editRecord = [];
            $categoryList = $this->categoryService->categoryList();
            return view('admin.add_edit_category')->with([
                "editRecord" => $editRecord,
                "categoryList" => $categoryList
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

    }

    public function editCategory($id) {
        try {

            $editRecord = $this->categoryService->getCategoryDetail($id);
            $categoryList = $this->categoryService->categoryList();

            return view('admin.add_edit_category')->with([
                "editRecord" => $editRecord,
                "categoryList" => $categoryList
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

    }

    public function saveCategory(Request $request) {
        try {
           
            $response = $this->categoryService->saveCategory($request);

            if (!empty($request->id)) {
                if($response){
                    return redirect()->route('/category')->with('success', 'Category update successful!');
                }else{
                    return redirect()->route('/edit-category')->with('success', 'Category update failed!');
                }
            } else {
                if($response){
                    return redirect()->route('/category')->with('success', 'Category insert successful!');
                }else{
                    return redirect()->route('/add-category')->with('error', 'Category insert failed!');
                }
            }

        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

    }

    public function deleteCategory(Request $request)
    {
        $returnArr = array();
        $status = false;
        $message = 'Unable to delete record';
        try {
            $category = Category::findOrFail($request->id);
            if($category){
                $response = $this->categoryService->deleteCategory($request);
                if($response){
                    $status = true;
                    $message = 'record deleted successful';
                }
               
            }
        } catch (\Exception $ex) {
            $message = $ex->getMessage();
        }
        $returnArr['status'] = $status;
        $returnArr['message'] = $message;
        echo json_encode($returnArr);
        exit;
    }


}
