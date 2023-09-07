<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Auth;
use Validator;
use Illuminate\Support\Facades\Redirect;


class LoginController extends Controller
{
    public function login() {
        if (Auth::check()) {
            if (auth()->user()->is_admin == 1) {
                return redirect()->route('/admin-dashboard');
            }else{
                return redirect()->route('/user-dashboard');
            }
        }
        return view('admin.login');
    }

    public function authenticate(Request $request) {
        
        
        $validator = Validator::make($request->all(), [
                    'email' => 'required|email',
                    'password' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect('/login')->withErrors($validator)->withInput();
        }

        $input = $request->all();
     
        if(auth()->attempt(array('email' => $input['email'], 'password' => $input['password'])))
        {
            if (auth()->user()->is_admin == 1) {
                return redirect()->route('/admin-dashboard');
            }else{
                return redirect()->route('/user-dashboard');
            }
        }else{
            return redirect()->route('/login')->with('error','Email-Address And Password Are Wrong.');
        }
    }

    public function adminDashboard() {
        return view('admin.admin_dashboard');
    }

   
    
    public function logout() {
        Auth::logout();
        return redirect('/login');
    }


  

}
