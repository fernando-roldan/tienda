<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;

class EcommersController extends Controller
{
    public function ecommers() {

        return ProductResource::collection(
            Product::with('category:id,name')->orderBy('id', 'desc')
                ->where('stock', '>', 0)
                ->paginate(10)
        );
    }
}
