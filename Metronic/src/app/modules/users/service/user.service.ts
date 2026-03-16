import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, retry } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  usersList(search:any = null){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'token': this.authservice.token});
    const URL = URL_SERVICIOS + "/users/list";
    let link = "?T=";

    if(search){
      link += "@search=" + search;
    }

    return this.http.get(URL, {
      headers: headers
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  register(data:any){
    this.isLoadingSubject.next(true);
    const headers =  new HttpHeaders({'token': this.authservice.token});
    const URL = URL_SERVICIOS + "/users/register_admin";
    return this.http.post(URL, { headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  update(data:any){
    this.isLoadingSubject.next(true);
    const headers =  new HttpHeaders({'token': this.authservice.token});
    const URL = URL_SERVICIOS + "/users/update";
    return this.http.post(URL, { headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  remove(user_id:any){
    this.isLoadingSubject.next(true);
    const headers =  new HttpHeaders({'token': this.authservice.token});
    const URL = URL_SERVICIOS + `/users/remove/${user_id}`;
    return this.http.delete(URL, { headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }
}
