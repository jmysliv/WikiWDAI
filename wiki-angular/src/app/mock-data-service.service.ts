import { RatingValues } from './ratings';
import { Course } from './course';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


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

  addRating( rating: 1 | 2 | 3 | 4 | 5, studentId: string, id: string) {
    const data = {rating: '{rating}', studentId: '{studentId}'};
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.REST_API_SERVER}/courses/${id}/ratings`, JSON.stringify(data)).subscribe(res => {
        resolve(res);
        console.log(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
      });
  }


    deleteHero(course: Course): Observable<{}> {
      return this.httpClient.delete<Course>(`${this.REST_API_SERVER}/courses/${course.id}`);
    }

}
