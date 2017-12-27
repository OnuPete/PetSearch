<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('dogs/{breed}', 'DogsController@show')->where('breed', '[A-Za-z]+');;

Route::post('dogs','DogsController@store');
