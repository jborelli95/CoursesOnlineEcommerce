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

  configAll() {
    this.isLoadingSubject.next(true)
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    let url = URL_SERVICIOS + "/courses/config_all";
    return this.http.get(url, {
      headers: headers
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  getCourseInfo(course_id: string) {
    this.isLoadingSubject.next(true)
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    let url = `${URL_SERVICIOS}/courses/get/${course_id}`;
    return this.http.get(url, {
      headers: headers
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  registerCourse(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/courses/register";
    console.log(url);
    console.log(data);
    return this.http.post(url, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  listCourses(search: any = null, state: any = null) {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'token': this.authservice.token });
    let link = "?T=";

    if (search) {
      link += "&search=" + search;
    }

    if (state) {
      link += "&state=" + state;
    }

    const URL = URL_SERVICIOS + "/courses/list" + link;

    return this.http.get(URL, {
      headers: headers
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  updateCourse(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/courses/update";
    return this.http.post(url, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  removeCourse(course_id: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = `${URL_SERVICIOS}/courses/remove/${course_id}`;
    return this.http.delete(url, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  uploadVideoVimeo(videoData: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'token': this.authservice.token });
    const url = URL_SERVICIOS + "/courses/upload/video";
    console.log(url);
    console.log(videoData);
    return this.http.post(url, videoData, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }
}
