import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SessionData } from '../models/sesion-data.models';
import { GeneralData} from '../config/general-data';


@Injectable({
   providedIn: 'root'
})
export class SecurityService {
   sessionDataS: BehaviorSubject<SessionData> = new BehaviorSubject<SessionData>(new SessionData());
   url: string = GeneralData.ADMIN_USERS_URL;

   constructor(
      private http: HttpClient, 
      private localStarage: LocalStorageService
      ) { 
         this.IsActiveSession()
      }

   IsActiveSession() {
      let data = localStorage.getItem("session-data");
      if (data) {
         let objectData: SessionData = JSON.parse(data);
         objectData.isLoggedIn = true;
         this.RefreshSessionData(objectData);
      }
   }

   RefreshSessionData(data: SessionData) {
      this.sessionDataS.next(data);
   }

   GetSessionStatus() {
      return this.sessionDataS.asObservable();
   }

   Login(email: string, password: string): Observable<SessionData> {
      return this.http.post<SessionData>(`${this.url}/login`, {
         correo: email,
         password: password,
   },{
      headers:new HttpHeaders({})
   });

  }

VerifiedToken(): Observable<boolean>{
   let token_user = this.localStarage.GetToken();
   if(token_user == ""){
      return of(false);
   }
   return this.http.post<boolean>(`${this.url}/token-validator`,{
      token: token_user
   });
 }
}


