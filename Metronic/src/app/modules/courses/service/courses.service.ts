import { Injectable } from '@angular/core';
import { AuthService } from '../../auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  configAll(){
    this.isLoadingSubject.next(true)
    let headers = new HttpHeaders({'token': this.authservice.token});
    let url = URL_SERVICIOS + "/courses/config_all";
    return this.http.get(url, {
      headers: headers
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }
}
