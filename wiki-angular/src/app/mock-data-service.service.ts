import { Course } from './course';
import { of } from 'rxjs';
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



}
