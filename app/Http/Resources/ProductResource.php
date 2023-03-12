<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray(Request $request): array
    {
        $date = $this->created_at;
        $date = strftime($date, strtotime( date('Y-m-d')));

        return [
            'id'         => $this->id,
            'category_id'=> $this->category_id,
            'name'       => $this->name,
            'description'=> $this->description,
            'image'      => $this->image,
            'price'      => $this->price,
            'stock'      => $this->stock,
            'created_at' => $date,
            'category'   => [
                'id'   => $this->category->id,
                'name' => $this->category->name
            ]
        ];
    }
}
