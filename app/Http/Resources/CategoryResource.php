<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'name'       => $this->name,
            'created_at' => $date
        ];
    }
}
