import { RatingValues } from './ratings';
import { Course } from './course';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MockDataServiceService {

  constructor(private httpClient: HttpClient) { }
  private REST_API_SERVER = 'http://localhost:3000';

  getCourses() {
    return this.httpClient.get<Course[]>(`${this.REST_API_SERVER}/courses`);
  }

  getCourse(cName: string) {
    return this.httpClient.get<Course>(`${this.REST_API_SERVER}/courses/${cName}`);
  }

  addRating( itemToAdd, id: string) {
    this.httpClient.put<Course>(`${this.REST_API_SERVER}/courses/${id}`, itemToAdd).subscribe(
      res => {
        console.log('received ok response from patch request');
      },
      error => {
        console.error('There was an error during the request');
        console.log(error);
      });
  }

  deleteCourse(course: Course): Observable<{}> {
    return this.httpClient.delete<Course>(`${this.REST_API_SERVER}/courses/${course.id}`);
  }

  addCourse(course: Course): Observable<{}> {
    return of(this.httpClient.post<Course>(`${this.REST_API_SERVER}/courses`, course).subscribe( res => {
       console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      } ));
    }
}
