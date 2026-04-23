import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../auth';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CourseClassService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  registerCourseClass(data: any) {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/course/class/register";
    return this.http.post(url, data, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  updateCourseClass(data: any) {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/course/class/update";
    return this.http.post(url, data, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  removeCourseClass(courseClass_id: string) {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = `${URL_SERVICIOS}/course/class/remove/${courseClass_id}`;
    return this.http.delete(url, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  listCourseClasses(courseSection_id?: string) {
    this.isLoadingSubject.next(true);
    let params = new HttpParams();
    if (courseSection_id) {
      params = params.set('courseSection_id', courseSection_id);
    }
    const headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/course/class/list";
    return this.http.get(url, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  uploadVideoVimeo(videoData: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/course/class/upload/vimeo";
    console.log(url);
    console.log(videoData);
    return this.http.post(url, videoData, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }
}
