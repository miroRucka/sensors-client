import {Injectable} from "angular2/core";
import {Inject} from "angular2/core";
import {Http, Headers, HTTP_PROVIDERS, Response} from 'angular2/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService {
    private temperature:String;
    private humidity:String;
    private http:Http;

    constructor(@Inject(Http)http:Http) {
        this.temperature = "22.85";
        this.humidity = "43.6";
        this.http = http;
    }

    getTemperature():String {
        return this.temperature;
    }

    getHumidity():String {
        return this.humidity;
    }

    getSensorsData():Observable<Response> {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'c3VzbGlrOmJ1Ym8=');
        return this.http.get('api/sensors/last', {
            headers: headers
        });

    }
}