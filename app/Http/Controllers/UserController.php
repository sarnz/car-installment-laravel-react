<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::all(),
        ]);
    }

    public function reset(User $user)
    {
        $user->update([
            'password' => Hash::make('password'),
        ]);

        return back()->with('success', 'รีเซ็ตรหัสผ่านเรียบร้อย');
    }

    public function toggle(User $user)
    {
        $user->update([
            'is_active' => !$user->is_active,
        ]);

        return back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back();
    }
}
