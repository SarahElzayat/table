<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function paginated($perPage = 10, $pageIndex = 0)
    {
        return User::paginate($perPage, ['*'], 'page', $pageIndex);
    }


    public function search($column, $value, $perPage = 10)
    {
        return User::where($column, 'LIKE', "%{$value}%")->paginate($perPage);
    }

    public function sort($column, $order = 'asc', $perPage = 10)
    {
        return User::orderBy($column, $order)->paginate($perPage);
    }
}
