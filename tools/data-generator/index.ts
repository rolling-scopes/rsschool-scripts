import { generateCourses, generateUsers, generateCourseStudents, generateCourseMentors } from './lib';

const startTime = Date.now();

console.info('Run generators');

Promise.all([generateCourses(), generateUsers()]).then(([courses, users]) =>
    Promise.all([
        generateCourseStudents(users.filter(user => user.role === 'student'), courses),
        generateCourseMentors(users.filter(user => user.role === 'mentor'), courses),
    ]).then(() => console.info(`Done in ${Date.now() - startTime}ms`), () => console.error('Fail')),
);
