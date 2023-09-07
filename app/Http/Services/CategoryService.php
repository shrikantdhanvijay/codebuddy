<?php

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryService
{

    public function getParentCategory()
    {
        return Category::where('parent_id', '=', 0)->get();
    }

    /**
     * get all category
     *
     * @return category
     */
    public function getAllCategory()
    {
        return Category::orderby('id', 'desc')->get();
    }

    /**
     * get category detail by id
     *
     * @param  mixed $id
     * @return category
     */
    public function getCategoryDetail($id)
    {
        return Category::findOrFail($id);
    }

    /**
     * insert and update category on table
     *
     * @param  mixed $data
     * @return void
     */
    public function saveCategory($data)
    {

        $categoryObj = new Category();
        if (!empty($data->id)) {
            $categoryObj->id = $data->id;
            $categoryObj->exists  = true;
        }
        if (!empty($data->parent_id)) {
            $categoryObj->parent_id = $data->parent_id;
        }

        $categoryObj->category_name = $data->category_name;
        $response =  $categoryObj->save();
        return $response;
    }


    public function categoryList()
    {
        return Category::whereNull('deleted_at')->pluck('category_name', 'id');
    }

    public function deleteCategory($data)
    {
        return Category::where('id', $data->id)->delete();
    }
}
