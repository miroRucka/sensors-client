import {bootstrap} from 'angular2/platform/browser';
import {Component, Injectable, Inject, Pipe} from "angular2/core";
import {DataService} from "./dataService";
import {HTTP_PROVIDERS, Response} from "angular2/http";
import {OnDestroy} from "angular2/core";
import internal = require("assert");

@Pipe({name: 'unicodeToDate'})
export class UnicodeToDatePipe {
    transform(value:string, args:string[]):any {
        return new Date(value);
    }
}

@Component({
    selector: 'sensors-app',
    templateUrl: 'template/app.html',
    pipes: [UnicodeToDatePipe]
})
class SensorsApp implements OnDestroy {

    sensorData:any;

    private interval:Number = 1000 * 60 * 5;

    private timeout:any;

    constructor(@Inject(DataService)dataService:DataService) {
        console.log('start application..');
        this.getData(dataService);
    }

    private getData(dataService:DataService):void {
        let self = this;
        dataService.getSensorsData().subscribe((res:Response) => {
            this.sensorData = res.json()[0];
            console.log('data->', this.sensorData);
        });
        this.timeout = setTimeout(function () {
            self.getData(dataService);
        }, this.interval);
    };

    ngOnDestroy():any {
        if (this.timeout != null) {
            clearImmediate(this.timeout);
        }
    }
}

bootstrap(SensorsApp, [DataService, HTTP_PROVIDERS]);