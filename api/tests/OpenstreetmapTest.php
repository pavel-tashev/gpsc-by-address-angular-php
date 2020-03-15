<?php

class OpenstreetmapTest extends TestCase
{
    /**
     * /geocode/openstreetmap [GET]
     */
    public function testShouldReturnAllOpenstreetmap()
    {
        $this->get('/geocode/openstreetmap?address=bulevard Vitosha 4, Sofia, Bulgaria')
            ->seeJsonStructure([
                '*' => [
                    'lat',
                    'lon'
                ]
            ]);
    }
}
