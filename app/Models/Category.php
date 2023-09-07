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

    /**
     * get parent category name.
     *
     */
    public function getParentCategoryName(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id', 'id')->withTrashed();
    }

    /**
     * get parent sub category name.
     *
     */
    public function childs()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }

}
