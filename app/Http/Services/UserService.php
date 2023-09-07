<?php

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\User;

class UserService
{
    /**
     * get all user list 
     *
     * @return category
     */
    public function getAllUser()
    {
        return User::orderby('id', 'desc')->get();
    }

}
