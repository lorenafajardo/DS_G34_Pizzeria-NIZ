import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { ProductModel } from '../models/product-model'; 
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = '';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(`${(this.url)}/products`);
  }

  SaveRecord(data: ProductModel): Observable<ProductModel>{
    return this.http.post<ProductModel>(
      `${(this.url)}/products`, {
        name: data.name
      });
  }

  SearchRecord(id: number): Observable<ProductModel>{
    return this.http.get<ProductModel>(`${(this.url)}/products/${id}`)
  }

  EditRecord(data: ProductModel): Observable<ProductModel>{
    return this.http.put<ProductModel>(
      `${(this.url)}/categories/${data.id}`,{
        id: data.id,
        name: data.name
      });
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete(
      `${(this.url)}/categories/${id}`);
  }
}
