import * as fs from 'fs';
import * as faker from 'faker';

const defaultFileName = './out/courses.json';
const recordsCount = 3;

export type Course = {
    _id: string;
    name: string;
    description: string;
    startDateTime: number;
    endDateTime: number;
    isActive: boolean;
};

export function generateCourses(): Promise<Course[]> {
    const fileName = process.argv[2] || defaultFileName;
    const courses: Course[] = [];
    console.log('[Courses] Start generating');

    for (let i = 0; i < recordsCount; i++) {
        const name = `RS Course 2018 #${i + 1}`;
        courses.push({
            _id: faker.helpers.slugify(name.toLowerCase()), // _id
            name, // name
            description: faker.lorem.sentences(3), // description
            startDateTime: new Date(`2018-${i + 1}-01`).getTime(), // startDateTime
            endDateTime: new Date(`2018-${i + 3}-01`).getTime(), // endDateTime
            isActive: true, // isActive
        });
    }
    return new Promise(success => {
        const jsonString = JSON.stringify(courses, undefined, 2);
        fs.writeFileSync(fileName, jsonString);
        console.info(`[Courses] Successfully generated ${recordsCount} records and saved to ${fileName}`);
        success(courses);
    });
}
