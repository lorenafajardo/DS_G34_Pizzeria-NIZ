import { Component, OnInit } from '@angular/core';  
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service'; 

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private service: ProductService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  get GetForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next:(data:ProductModel) =>{
        this.GetForm['id'].setValue(data.id);
        this.GetForm['name'].setValue(data.name);
      }
    })
  }

  SaveRecord(){
    let model = new ProductModel();
    model.id =  this.GetForm['id'].value;
    model.name =  this.GetForm['name'].value;
    this.service.EditRecord(model).subscribe({
      next:(data: ProductModel)=>{
        console.log(data);
        this.router.navigate(["/parameters/category-list"]);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}

