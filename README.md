# Task description
Retrieve and display coordinates (longitude and latitude) for an address, using Google Maps and OpenStreetMap (OSM). Show results from both Google Maps and OSM.

Requirements:
* Frontend. Angular 2 application with the ability to enter the address manually and display the results.
* Backend. PHP application using OOP. Make the implementation easily expandable, with ability to add additional APIs to retrieve coordinates by address. Write some unit tests.

# Installation and details
## API
### Details
For the development of the API I used Lumen - [https://lumen.laravel.com/docs/6.x](https://github.com/your/project/contributors).

The reasons to choose Lumen are:
* fast and reliable
* easy to develop and maintain it
* convenient way to unit tests 

### Third-party services
For the communication with Google Maps API and OpenStreetMap API (OMS) I used [Geocoder](https://github.com/geocoder-php/Geocoder).

Geocoder is a PHP library which helps you build geo-aware applications by providing a powerful abstraction layer for geocoding manipulations.

The reasons to choose Geocoder are:
* well documented
* supports communication with Google Maps API and OpenStreetMap API (OMS)
* in the future if we decide to implement other APIs that can be easily achieved (check the full list of data providers here [https://github.com/geocoder-php/Geocoder#world](https://github.com/geocoder-php/Geocoder#world))

### Installation
I will use Ubuntu 18.04 LTS to run the API.

Checkout the github repository:
```
...
cd project
```

Inside the folder **project** you will see two folders:
```
angular
api
```

The API is located inside **api**.
```
cd api
``` 

Make sure to place the ~/.composer/vendor/bin directory in your PATH so the lumen executable can be located by your system.
export PATH="$PATH:$HOME/.composer/vendor/bin"

Unit testing:
vendor/bin/phpunit --filter=testShouldReturnAllGooglemaps
vendor/bin/phpunit --filter=testShouldReturnAllOpenstreetmap

Endpoints:
https://taskapi.peoplegogo.com/geocode/googlemaps?address=ADDRESS
https://taskapi.peoplegogo.com/geocode/openstreetmap?address=ADDRESS

Allow Cros Domain Requests:
https://www.codementor.io/@chiemelachinedum/steps-to-enable-cors-on-a-lumen-api-backend-e5a0s1ecx



======== Angular ========
Version: 2
https://v2.angular.io/docs/ts/latest/guide/

To run: 
npm start

Example address:
bulevard Vitosha 4, Sofia, Bulgaria

