import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import teacherReducer from "./teacher";
import sectionReducer from "./section";
import classReducer from "./class";
import subjectReducer from "./subject";
import actualsubjectReducer from "./actualsubject";
import assignteacherReducer from "./assignteacherdata"
import storedclassReducer from "./storedclass";
import studentReducer from "./student"
import examsReducer from "./exams"
import reportReducer from "./report"

export default configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,
    section: sectionReducer,
    class: classReducer,
    subject: subjectReducer,
    actualsubject: actualsubjectReducer,
    storedclass: storedclassReducer,
    assignteacherdata: assignteacherReducer,
    student: studentReducer,
    exams: examsReducer,
    report: reportReducer,
  },
});
