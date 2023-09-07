<?php

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\User;

class UserService
{
    public function getAllUser()
    {
        return User::orderby('id', 'desc')->get();
    }

}
