import { RatingValues } from './ratings';
import { Teacher, CourseTeacher } from './teacher';
import { of } from 'rxjs';

export enum CourseTypes {
    Lecture,
    Exercise,
    Lab,
    Project
}

export interface Course {
    id: string;
    name: string;
    ects: number;
    semester: number;
    maxStudents: number;
    courseForm: CourseTypes;
    ratings: RatingValues[];
    description: string;
    image: string;
    courseTeachers: CourseTeacher[];
    enrolledStudents: string[];
}
export interface CourseToBeAdded {
    name: string;
    ects: number;
    semester: number;
    maxStudents: number;
    courseForm: CourseTypes;
    ratings: RatingValues[];
    description: string;
    image: string;
    courseTeachers: CourseTeacher[];
    enrolledStudents: string[];
}
