<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Dog;

class DogsController extends Controller
{

  public function show(Request $request)
  {
      $this->validate($request, [
        'breed' => 'bail|required|unique:dogs|regex:/^[a-zA-Z -]+$/u|max:191',
      ]);
      $breed = $request->query('breed');
      $dog = Dog::where('breed', 'LIKE', '%'.$breed.'%', 'OR', 'breed', 'LIKE', '^'.$breed, 'OR', 'breed', 'LIKE', $breed.'$')->get();

      return response()->json($dog);
  }

  public function store(Request $request)
  {
      $this->validate($request, [
        'breed' => 'bail|required|regex:/^[a-zA-Z -]+$/u|max:191',
      ]);

      $dog = Dog::firstOrCreate(['breed' => $request->input('breed')]);
      // if ($dog[0].errors) return show($request);
      return response()->json($dog);
  }

}
