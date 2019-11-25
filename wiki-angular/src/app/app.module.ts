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



@NgModule({
   declarations: [
      AppComponent,
      TopnavComponent,
      CoursesListComponent,
      CourseInListComponent,
      CourseDetailsComponent,
      HomePageComponent,
      RateCourseComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
}
