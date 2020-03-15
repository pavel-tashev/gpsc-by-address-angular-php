<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Geocoder\Query\GeocodeQuery;
use Geocoder\Query\ReverseQuery;
use Geocoder\Provider\Nominatim\Nominatim;

class OpenstreetmapController extends Controller
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

        if($address != '') {
            // Initialize and search
            $httpClient = new \Http\Adapter\Guzzle6\Client();
            $provider = Nominatim::withOpenStreetMapServer($httpClient, 'Geocoder PHP/Nominatim Provider/Nominatim Test');
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
