<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Dog;

class DogsController extends Controller
{
  public function index() {
    return Dog::all();
  }

  public function show($breed)
  {
      $dog = Dog::where('breed', 'LIKE', '%'.$breed.'%')->get();

      return response()->json($dog, 200);
  }

  public function store(Request $request)
  {
      $this->validate($request, [
        'breed' => 'bail|required|unique:dogs|regex:/^[a-zA-Z -]+$/u|max:191',
      ]);

      $dog = Dog::create(['breed' => $request->input('breed')]);

      return response()->json($dog, 201);
  }

}
