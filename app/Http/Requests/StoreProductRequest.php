<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required|integer',
            'name'  => 'required|string|max:150',
            'description' => 'required|string|max:255',
            'image' => 'image|mimes:jpeg,png|max:3000',
            'price' => 'required|float',
            'stock' => 'required|integer'
        ];
    }
}
