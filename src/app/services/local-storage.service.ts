import { Injectable } from '@angular/core';
import { SessionData } from '../models/sesion-data.models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveSessionData(data:SessionData): boolean{
   let saved = localStorage.getItem("sesion-data");
   // No hay que almacenar la información del usuario, porque ya existe
   if(saved){
      return false
   }else{
      // Si hay que almacenar la información del usuario, porque NO existe
      let stringData = JSON.stringify(data);
      localStorage.setItem("session-data", stringData);
      return true;
   }
  }

  RemoveSessionData(){
   localStorage.removeItem("session-data");
  }

  GetToken(): string{
   let saved = localStorage.getItem("session-data");
   if (saved){
      let data = JSON.parse(saved);
      return data.token;
   }
      return "";
  }
}
