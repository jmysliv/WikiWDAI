import mongoose from 'mongoose'
import {
    createCourse,
    findById,
    findAll,
    updateCourse,
    deleteCourse
} from '../models/course.model';
import CourseModel from '../models/course.model'

export const insertCourse = (req, res) => {
    const course = new CourseModel(req.body);
    course.save().then((result) => {
        res.status(201).send({
            id: result._id
        });
    });

};

export const getCourseByID = (req, res) => {
    CourseModel.findById(req.params.id).then((result) => {
        res.status(200).send(result.getUnifiedCourse());
    });
};

export const getCourses = (req, res) => {
    CourseModel.find().then((result) => {
        res.status(200).send(result.map(course => course.getUnifiedCourse()));
    });
};

export const putCourse = (req, res) => {
    CourseModel.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}

export const deleteCourseById = (req, res) => {
    CourseModel.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send(result);
    })
}