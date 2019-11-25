import { Comment } from './comment';

export interface CourseTeacher {
    teacher: Teacher;
    commentCategories: Section[];
}

export interface Teacher {
    id: string;
    name: string;
    image: string;
    teacherCard: TeacherCard;
    degree: string;
}

export interface TeacherCard {
    phone: number;
    email: string;
    homePage: string;
}
export interface Section {
    category: string;
    comments: Comment[];
}
