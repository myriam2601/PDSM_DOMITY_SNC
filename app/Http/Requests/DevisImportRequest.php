<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DevisImportRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'lignesDevis.*.designation' => 'required|string',
            'lignesDevis.*.quantite' => 'required|numeric|min:1',
            'lignesDevis.*.prixUnitaire' => 'required|numeric|min:0',
            'lignesDevis.*.tva' => 'required|numeric|min:0|max:100',
            'projectId' => 'required|exists:projets,id',
        ];
    }
}
