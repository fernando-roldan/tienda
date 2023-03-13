<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public function category() {

        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'stock',
    ];
}
