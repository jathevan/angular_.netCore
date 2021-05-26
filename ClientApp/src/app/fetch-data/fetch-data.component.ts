import { Component, Inject, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent {
  term: string;

  @Input() searchedWord: string; 
  public fieldsData: DataField[];
  private _dialogFunc: DialogComponent;
  displayedColumns: string[] = ['id','name', 'defaultPriceConcessionName','price'];

  constructor(public dialog: MatDialog ,http: HttpClient, @Inject('BASE_URL') baseUrl: string, dialogFunc: DialogComponent) {
    this._dialogFunc=dialogFunc;
    http.get<DataField[]>(baseUrl + 'GetData').subscribe(result => {
      this.fieldsData = result;
      console.log(this.fieldsData)
    }, error => console.error(error));
  }
  openDialog(id: any,defaultPriceConcessionID: any) {
    this._dialogFunc.openDialog(id,defaultPriceConcessionID);
  }
}

interface DataField {
  id: number;
  name: string;
  itemCategory: string;
  active: boolean;
  defaultPriceConcessionName: string
  defaultPriceConcessionID: number;
}
