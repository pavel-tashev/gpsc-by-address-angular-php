"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_1 = require("./app");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.model = new app_1.App('bulevard Vitosha 4, Sofia, Bulgaria');
        this.http = http;
    }
    //coordinates = [];
    AppComponent.prototype.onSubmit = function (event) {
        event.preventDefault();
        this.displayGpsc(this.model.address, 'googlemaps');
        this.displayGpsc(this.model.address, 'openstreetmap');
    };
    AppComponent.prototype.displayGpsc = function (address, endpoint) {
        this.http.get('https://taskapi.peoplegogo.com/geocode/' + endpoint + '?address=' + address)
            .map(function (response) { return response.json(); })
            .subscribe(function (coordinates) {
            //this.coordinates[endpoint] = coordinates;
            //console.log(this.coordinates);
            console.log(coordinates);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app.component.html',
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map