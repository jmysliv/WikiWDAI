import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseInListComponent } from './course-in-list/course-in-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RateCourseComponent } from './rate-course/rate-course.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course/add-course.component';
import { FilterCourseComponent } from './filter-course/filter-course.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
   declarations: [
      AppComponent,
      TopnavComponent,
      CoursesListComponent,
      CourseInListComponent,
      CourseDetailsComponent,
      HomePageComponent,
      RateCourseComponent,
      AddCommentComponent,
      AddCourseComponent,
      FilterCourseComponent,
      SearchPipePipe,
      LoginComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
}
