<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'category_id' => 'integer',
            'name'  => 'string|max:150',
            'description' => 'string|max:255',
            'image' => 'image|mimes:jpeg,png|max:3000',
            'price' => 'float',
            'stock' => 'integer'
        ];
    }
}
