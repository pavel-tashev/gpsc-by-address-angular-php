# Task description
Retrieve and display coordinates (longitude and latitude) for an address, using Google Maps and OpenStreetMap (OSM). Show results from both Google Maps and OSM.

Requirements:
* Frontend. Angular 2 application with the ability to enter the address manually and display the results.
* Backend. PHP application using OOP. Make the implementation easily expandable, with ability to add additional APIs to retrieve coordinates by address. Write some unit tests.

# Installation and details
## API
### Details
For the development of the API I used Lumen - [https://lumen.laravel.com/docs/6.x](https://lumen.laravel.com/docs/6.x).

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

### Requirements
You will need to make sure your server meets the following requirements:
* PHP>=7.2
* Installed [composer](https://getcomposer.org)
* Installed web service - Apache or Nginx

### Installation
I will use Ubuntu 18.04 LTS to run the API.

Checkout the github repository:
```
git clone https://github.com/pavel-tashev/gpsc-by-address-angular-php.git project
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

Install all dependencies:
```
composer update
```

Configure your Web Service to point to the public directory of the API - **/project/api/public**.

In my case I used NGINX. If you use the same, please check *nginx-config.mydomain.com* file which is inside **api** folder.
Add this file inside Nginx folder like this:
```
cp /PATH-TO-YOUR-PROJECT-FOLDER/api/nginx-config.mydomain.com /etc/nginx/sites-available
```

Note: You can change the name of the config file as you wish. If you do that, take that into account for the commands below.

Open the file and change the required fields in order to configure it pointing to the API folder and the corresponding domain name
you will use to access the API.

Execute the following:
```
cd /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/nginx-config.mydomain.com .
nginx -t
service nginx reload
```

Be sure that the web service has access to the folder where the api is located.
```
chmod -R 0755 /PATH-TO-YOUR-PROJECT-FOLDER/api/
chown -R www-data:www-data /PATH-TO-YOUR-PROJECT-FOLDER/api/
```

One last step is to add your Google Maps API key. If you don't have one, visit the following link
[https://developers.google.com/maps/documentation/javascript/get-api-key](https://developers.google.com/maps/documentation/javascript/get-api-key).
Follow the instruction on the page. Also, be sure that you have enabled your API key to access Google Places API. 

When ready open the following file:
```
api/config/app.php
```

and replace **PUT_YOUR_CODE_HERE** with your API key.

Save and close.

### Additional
Make sure to place the ~/.composer/vendor/bin directory in your PATH so the lumen executable can be located by your system.
export PATH="$PATH:$HOME/.composer/vendor/bin"

### Endpoints
The API supports the following two endpoints:

```
GET /geocode/googlemaps?address=ADDRESS
GET /geocode/openstreetmap?address=ADDRESS
```

Replace ADDRESS with address of your choice. The output will be in the following example JSON format:
```
[
    {
        "lat": 42.6947414,
        "lon": 23.3205482
    }
]
```

Open Postman to test.

### Unit testing
Go to the API directory:
```
cd /PATH-TO-YOUR-PROJECT-FOLDER/api/
```

The two endpoints listed above have the following unit tests:
```
vendor/bin/phpunit --filter=testShouldReturnAllGooglemaps
vendor/bin/phpunit --filter=testShouldReturnAllOpenstreetmap
```

### Cros Domain Requests
Since you may run the API and the Angular application on different domains or ports I have configured Lumen 
to accept CORS requests.

You can check **api/app/Middleware/CorsMiddleware.php** and **api/bootstrap/app.php**.

This is so far about the API. Now let's continue with the Angular application.


## Angular
### Details
I used Angular2 for TypeScript.

The application consists of one component where I display a simple form where you can enter the address and below the form
there will be displayed two maps - Google Map and OpenStreetMap. 

Also, I populate the input field of the form with a default address.

For the two maps I used iframes because I considered it a simple approach without the need to import additional packages.

*Note: For higher versions of Angular I would use [AGM](https://angular-maps.com) and [Leaflet](https://leafletjs.com).* 

### Requirements
* Node.js and npm installed [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation
Open the folder below:
```
cd /PATH-TO-YOUR-PROJECT-FOLDER/angular/
```

Install all dependencies:
```
npm install
```

and run the Angular application.
```
npm start
```

The terminal will inform you about the URL to access the application though your web browser. For example (in your case it might be different):
```
http://localhost:3000
```

### Additionional
If you want the Angular application to keep running in the background then use [**forever**](https://github.com/foreversd/forever).

Example commands:
```
cd /PATH-TO-YOUR-PROJECT-FOLDER/angular/
npm install forever -g
forever start -c "npm start" ./
forever list
``` 

On the screen you will see the path to the log file generated by **forever** after the execution of the commands above. 
Open it. It should contain the exact URL you have to use to access the Angular application.

If you want to the process:
```
forever list
forever stop PID
``` 

*Note: Replace PID with one corresponding to the running process.*