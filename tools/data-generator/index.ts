import {
    generateCourses,
    generateUsers,
    generateCourseStudents,
    generateCourseMentors,
    generateTasks,
    generateAssignments,
} from './lib';

const startTime = Date.now();

console.info('Run generators');

Promise.all([generateCourses(), generateUsers(), generateTasks()]).then(([courses, users, tasks]) => {
    const students = users.filter(user => user.role === 'student');
    const mentors = users.filter(user => user.role === 'mentor');
    return Promise.all([
        generateCourseStudents(students, courses),
        generateCourseMentors(mentors, courses),
        generateAssignments(students, mentors, courses, tasks),
    ]).then(() => console.info(`Done in ${Date.now() - startTime}ms`), () => console.error('Fail'));
});
