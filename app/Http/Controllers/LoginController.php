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
    
    /**
     * show login screen
     *
     */
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

    /**
     * get login credentials and verify and jump dashboard
     *
     */
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

     /**
     * logout session
     *
     */
    public function logout() {
        Auth::logout();
        return redirect('/login');
    }


  

}
