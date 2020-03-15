<?php

class GooglemapsTest extends TestCase
{
    /**
     * /geocode/googlemaps [GET]
     */
    public function testShouldReturnAllGooglemaps()
    {
        $this->get('/geocode/googlemaps?address=bulevard Vitosha 4, Sofia, Bulgaria')
            ->seeJsonStructure([
                '*' => [
                    'lat',
                    'lon'
                ]
            ]);
    }
}
