import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { ProductModel } from 'src/app/models/product-model'; 
import { ProductService } from 'src/app/services/product.service'; 


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})

export class ListProductComponent implements OnInit {
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: ProductModel[] = [];

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: ProductModel[]) =>{
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}
