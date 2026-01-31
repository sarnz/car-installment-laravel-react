<?php
namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CarController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Cars/Index', [
            'cars' => Car::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Cars/Create');
    }

 
    public function store(Request $request)
    {
        $request->validate([
            'brand' => 'required',
            'model' => 'required',
            'year'  => 'required|numeric',
            'price' => 'required|numeric',
        ]);

        Car::create($request->all());

        return redirect()->route('cars.index');
    }


    public function edit(Car $car)
    {
        return Inertia::render('Cars/Edit', [
            'car' => $car,
        ]);
    }

    public function update(Request $request, Car $car)
    {
        $car->update($request->all());
        return redirect()->route('cars.index');
    }


    public function destroy(Car $car)
    {
        $car->delete();
        return redirect()->route('cars.index');
    }
}
