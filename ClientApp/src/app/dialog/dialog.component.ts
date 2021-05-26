import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  apiData: any;
  private _http:HttpClient;
  private _baseUrl:string;
  displayedColumns: string[] = ['id'];
   newItems = {};
  constructor(public dialog: MatDialog ,http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this._http=http;
    this._baseUrl = baseUrl;
    
  }

  ngOnInit() {
  }
  openDialog(id: any,defaultPriceConcessionID: any) {
    const dialogRef = this.dialog.open(DialogComponent,{
      height: '450px',
      width: '800px',
    });
    let params = new HttpParams({fromObject:{id:id,conId:defaultPriceConcessionID}});
    
    dialogRef.afterOpened().subscribe(result=>{
      this._http.get((this._baseUrl + 'GetItemData'),{params: params}).subscribe(result => {
        this.apiData = result;
        this.newItems = this.groupByType(this.apiData);
        console.log(this.apiData);
      }, error => console.error(error));
    });
  }
  groupByType(array): {} {
    return array.reduce((r, a) => {
        r[a.type] = r[a.type] || [];
        r[a.type].push(a);
        return r;
      }, Object.create(null));
    }
}
interface ItemPriceGroups{
  priceType:string;
  priceGroups: priceGroup;
  priceTypeId:number;
}
interface priceGroup{
  id:string;
  name:string;
}
interface ItemData{
  itemPriceGroups:ItemPriceGroups[],
  nameOnReport:string;
  name:string;
}
interface InitialData{
  isError: string;
}
