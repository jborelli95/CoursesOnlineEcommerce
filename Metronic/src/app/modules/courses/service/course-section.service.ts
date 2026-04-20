import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../auth';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CourseSectionService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  registerCourseSection(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/course_section/register";
    return this.http.post(url, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  updateCourseSection(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/course_section/update";
    return this.http.post(url, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  removeCourseSection(courseSection_id: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = `${URL_SERVICIOS}/course_section/remove/${courseSection_id}`;
    return this.http.delete(url, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  listCoursesSection(course_id?: string) {
    this.isLoadingSubject.next(true);

    let params = new HttpParams();

    if(course_id){
      params = params.set('course_id', course_id);
    }
    const headers = new HttpHeaders({ 'token': this.authservice.token });
    const URL = URL_SERVICIOS + "/course_section/list";

    return this.http.get(URL, {
      headers: headers,
      params: params
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }
}
