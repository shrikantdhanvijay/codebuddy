<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\SoftDeletes;


class Category extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'category_name'
    ];


    public function getParentCategoryName(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id', 'id')->withTrashed();
    }


    public function childs()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }


    public function parentSubCategory(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id', 'id')
            ->select('id', 'parent_id', 'category_name');
    }
}
