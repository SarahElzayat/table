<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/users', 'App\Http\Controllers\UserController@index');

// get users paginated and specify the number of users per page (optional)
Route::get('/users/paginated/{perPage?}/{page?}', 'App\Http\Controllers\UserController@paginated');

// search by value in a column and results are paginated
Route::get('/users/search/{column}/{value}/{perPage?}', 'App\Http\Controllers\UserController@search');

// sort by column (asc or desc optional with default asc) and results are paginated
Route::get('/users/sort/{column}/{order?}/{perPage?}', 'App\Http\Controllers\UserController@sort');
