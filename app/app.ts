import {bootstrap} from 'angular2/platform/browser';
import {Component, Injectable, Inject, Pipe} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {DataService} from "./dataService";
import {HTTP_PROVIDERS, Response} from "angular2/http";
import {OnDestroy} from "angular2/core";
import internal = require("assert");
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Pipe({name: 'unicodeToDate'})
export class UnicodeToDatePipe {
    transform(value:string, args:string[]):any {
        return new Date(value);
    }
}

@Pipe({name: 'digits'})
export class Digits {
    transform(value:number, args:string[]):any {
        return value != null ? value.toFixed(2) : value;
    }
}


@Component({
    selector: 'line-chart-demo',
    template: `<div class="row">
    <div class="col-md-6">
        <base-chart class="chart"
                    [data]="lineChartData"
                    [labels]="lineChartLabels"
                    [options]="lineChartOptions"
                    [series]="lineChartSeries"
                    [colours]="lineChartColours"
                    [legend]="lineChartLegend"
                    [chartType]="lineChartType"
                    (chartHover)="chartHovered($event)"
                    (chartClick)="chartClicked($event)"></base-chart>
    </div>
    <div class="col-md-6" style="margin-bottom: 10px;">
        <table class="table table-responsive table-condensed">
            <tr>
                <th *ngFor="#label of lineChartLabels">{{label}}</th>
            </tr>
            <tr *ngFor="#d of lineChartData">
                <td *ngFor="#label of lineChartLabels; #j=index">{{d && j && d[j]}}</td>
            </tr>
        </table>
        <button (click)="randomize()">CLICK</button>
    </div>
</div>`,
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class LineChartDemo {

    constructor() {
        console.log('line demo');
    }

    // lineChart
    private lineChartData:Array<any> = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [18, 48, 77, 9, 100, 27, 40]
    ];
    private lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    private lineChartSeries:Array<any> = ['Series A', 'Series B', 'Series C'];
    private lineChartOptions:any = {
        animation: false,
        responsive: true,
        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
    };
    private lineChartColours:Array<any> = [
        { // grey
            fillColor: 'rgba(148,159,177,0.2)',
            strokeColor: 'rgba(148,159,177,1)',
            pointColor: 'rgba(148,159,177,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            fillColor: 'rgba(77,83,96,0.2)',
            strokeColor: 'rgba(77,83,96,1)',
            pointColor: 'rgba(77,83,96,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(77,83,96,1)'
        },
        { // grey
            fillColor: 'rgba(148,159,177,0.2)',
            strokeColor: 'rgba(148,159,177,1)',
            pointColor: 'rgba(148,159,177,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(148,159,177,0.8)'
        }
    ];
    private lineChartLegend:boolean = true;
    private lineChartType:string = 'Line';

    private randomize() {
        let _lineChartData = [];
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = [];
            for (let j = 0; j < this.lineChartData[i].length; j++) {
                _lineChartData[i].push(Math.floor((Math.random() * 100) + 1));

            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    chartClicked(e:any) {
        console.log(e);
    }

    chartHovered(e:any) {
        console.log(e);
    }

}

@Component({
    selector: 'sensors-app',
    templateUrl: 'template/app.html',
    pipes: [UnicodeToDatePipe, Digits],
    directives:[LineChartDemo]
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