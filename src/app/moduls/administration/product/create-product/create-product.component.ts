import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model'; 
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  get GetForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  CreateForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  SaveRecord(){
    let model = new ProductModel();
    let name = this.GetForm['name'].value;
    this.productService.SaveRecord(model).subscribe({
      next:(data:ProductModel)=>{
        console.log("Guardando");
        this.router.navigate(["administration/list-product"]);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
