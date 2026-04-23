import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'app-full-example',
    templateUrl: './full-example.component.html',
    styleUrls: ['./full-example.component.scss'],
})
export class FullExampleComponent implements OnInit {
    // Olympic Winners Dataset
    olympicRowData$ = new BehaviorSubject<any[]>([]);
    olympicColumnDefs: ColDef[] = [
        { headerName: 'Athlete', field: 'athlete', width: 150, sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Age', field: 'age', width: 100, sortable: true, filter: 'agNumberColumnFilter', type: 'numericColumn' },
        { headerName: 'Country', field: 'country', width: 120, sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Year', field: 'year', width: 100, sortable: true, filter: 'agNumberColumnFilter', type: 'numericColumn' },
        { headerName: 'Sport', field: 'sport', width: 130, sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Gold', field: 'gold', width: 80, sortable: true, filter: 'agNumberColumnFilter', type: 'numericColumn' },
        { headerName: 'Silver', field: 'silver', width: 80, sortable: true, filter: 'agNumberColumnFilter', type: 'numericColumn' },
        { headerName: 'Bronze', field: 'bronze', width: 80, sortable: true, filter: 'agNumberColumnFilter', type: 'numericColumn' },
        { headerName: 'Total', field: 'total', width: 80, sortable: true, filter: 'agNumberColumnFilter', type: 'numericColumn' },
    ];
    olympicGridApi: any;

    // Car Data (for quick reference)
    carRowData$ = new BehaviorSubject<any[]>([]);
    carColumnDefs: ColDef[] = [
        { headerName: 'Make', field: 'make', width: 120, sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Model', field: 'model', width: 130, sortable: true, filter: 'agTextColumnFilter' },
        {
            headerName: 'Price', field: 'price', width: 120, sortable: true, filter: 'agNumberColumnFilter', type: 'numericColumn',
            valueFormatter: (params: any) => '$' + params.value?.toLocaleString()
        },
    ];
    carGridApi: any;

    defaultColDef: ColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true,
    };

    selectedDataset: string = 'olympic';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetchOlympicData();
        this.fetchCarData();
    }

    fetchOlympicData() {
        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .subscribe({
                next: (data) => {
                    console.log('Olympic data loaded:', data.length, 'rows');
                    this.olympicRowData$.next(data);
                },
                error: (err) => console.error('Failed to fetch Olympic data', err),
            });
    }

    fetchCarData() {
        this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-data.json')
            .subscribe({
                next: (data) => {
                    console.log('Car data loaded:', data.length, 'rows');
                    this.carRowData$.next(data);
                },
                error: (err) => console.error('Failed to fetch Car data', err),
            });
    }

    // Olympic Controls
    onOlympicGridReady(params: GridReadyEvent) {
        this.olympicGridApi = params.api;
        params.api.sizeColumnsToFit();
    }

    clearOlympicFilters() {
        this.olympicGridApi?.setFilterModel(null);
    }

    filterOlympicByCountry(country: string) {
        const filterModel = {
            country: {
                filterType: 'text',
                type: 'contains',
                filter: country,
            },
        };
        this.olympicGridApi?.setFilterModel(filterModel);
    }

    sortOlympicByGoldDesc() {
        this.olympicGridApi?.applyColumnState({
            state: [{ colId: 'gold', sort: 'desc' }],
        });
    }

    // Car Controls
    onCarGridReady(params: GridReadyEvent) {
        this.carGridApi = params.api;
        params.api.sizeColumnsToFit();
    }

    clearCarFilters() {
        this.carGridApi?.setFilterModel(null);
    }

    sortCarByPrice() {
        this.carGridApi?.applyColumnState({
            state: [{ colId: 'price', sort: 'asc' }],
        });
    }

    switchDataset(dataset: string) {
        this.selectedDataset = dataset;
    }
}
