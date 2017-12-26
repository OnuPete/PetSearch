<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Dog;

class DogsController extends Controller
{

  public function show(Dog $dog)
  {
      return $dog;
  }

  public function store(Request $request)
  {
      $dog = Dog::create($request->all());

      return response()->json($dog, 201);
  }

}
