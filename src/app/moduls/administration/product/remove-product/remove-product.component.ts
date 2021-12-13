import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';
import { ListProductComponent } from '../list-product/list-product.component';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {
   id: string = "";
   name: string ="";
   constructor(private router: Router, 
             private service: ProductService,
             private route: ActivatedRoute) { 
   }
   ngOnInit(): void {
     this.SearchRecord();
   }
   SearchRecord(){
     let id = parseInt(this.route.snapshot.params["id"]);
     this.service.SearchRecord(id).subscribe({
       next:(data:ProductModel) =>{
         if(data.id && data.name){
           this.id = data.id;
           this.name = data.name;
         }
       }
     });
   }
 
   RemoveRecord(){
     let id = parseInt(this.route.snapshot.params["id"]);
     this.service.RemoveRecord(id).subscribe({
       next:(data: ListProductComponent)=>{
         this.router.navigate(["/administration/product-list"]);
       },
       error:(err:any)=>{
         console.log(err);
       }
     })
   }
 
 }
 