<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Geocoder\Query\GeocodeQuery;
use Geocoder\Query\ReverseQuery;

class GooglemapsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index(Request $request)
    {
        $address = $request->input('address');
        $results = [];

        if ($address != '') {
            // Initialize and search
            $httpClient = new \Http\Adapter\Guzzle6\Client();
            $provider = new \Geocoder\Provider\GoogleMapsPlaces\GoogleMapsPlaces($httpClient, config('app.GOOGLE_MAP_API_KEY'));
            $findResults = $provider->geocodeQuery(GeocodeQuery::create($address));

            // Extract data
            for ($i = 0; $i < $findResults->count(); $i++) {
                $results[] = [
                    'lat' => $findResults->get($i)->getCoordinates()->getLatitude(),
                    'lon' => $findResults->get($i)->getCoordinates()->getLongitude()
                ];
            }
        }

        return response()->json($results);
    }
}
