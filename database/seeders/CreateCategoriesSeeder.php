<?php

namespace Database\Seeders;
use App\Models\Category;

use Illuminate\Database\Seeder;

class CreateCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = [
            [
                'category_name'=>'Category 1',
            ],
            [
                'category_name'=>'Category 2',
            ],
            [
                'parent_id'=>1,
                'category_name'=>'Category 1-1',
            ],
            [
                'parent_id'=>1,
                'category_name'=>'Category 1-2',
            ],
            [
                'parent_id'=>2,
                'category_name'=>'Category 2-1',
            ],
            [
                'parent_id'=>2,
                'category_name'=>'Category 2-2',
            ],
        ];
  
        foreach ($category as $key => $value) {
            Category::create($value);
        }
    }
}
