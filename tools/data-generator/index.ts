import { generateCourses, generateUsers } from './lib';

const startTime = Date.now();

console.info('Run generators');

Promise.all([generateCourses(), generateUsers()]).then(
    () => console.info(`Done in ${Date.now() - startTime}ms`),
    () => console.error('Fail'),
);
