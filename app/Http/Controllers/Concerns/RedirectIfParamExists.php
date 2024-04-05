<?php
// app/Http/Controllers/Concerns/RedirectIfParametreExists.php

namespace App\Http\Controllers\Concerns;

trait RedirectIfParamExists
{
public function create()
{
$user = auth()->user();

if ($user->parametre()->exists()) {
return redirect()->route('parametres.edit', $user->parametre->id)->with([
'message' => 'Vous avez déjà configuré vos paramètres. Vous pouvez les modifier ici.'
]);
}

return $this->createParametreView();
}

abstract protected function createParametreView();
}
