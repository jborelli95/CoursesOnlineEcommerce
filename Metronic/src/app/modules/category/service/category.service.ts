import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  registerCategory(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/categories/register";
    return this.http.post(url, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  updateCategory(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/categories/update";
    return this.http.post(url, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  removeCategory(category_id: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = `${URL_SERVICIOS}/categories/remove/${category_id}`;
    return this.http.delete(url, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  listCategories(search: any = null, state:any = null) {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'token': this.authservice.token });
    let link = "?T=";

    if (search) {
      link += "&search=" + search;
    }

    if(state){
      link += "&state=" + state;
    }

    const URL = URL_SERVICIOS + "/categories/list" + link;
    console.log(URL);
   return this.http.get(URL, {
      headers: headers
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

}
