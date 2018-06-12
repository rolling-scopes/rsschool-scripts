import * as fs from 'fs';
import * as csvStringify from 'csv-stringify';
import * as faker from 'faker';

const defaultFileName = './out/courses.csv';
const recordsCount = 3;

export function generateCourses() {
    const fileName = process.argv[2] || defaultFileName;
    const users: string[][] = [['_id', 'name', 'description', 'startDateTime', 'endDateTime', 'isActive']];
    console.log('[Courses] Start generating');
    for (let i = 0; i < recordsCount; i++) {
        const name = `RS Course 2018 #${i + 1}`;
        users.push([
            faker.helpers.slugify(name.toLowerCase()), // _id
            name, // name
            faker.lorem.sentences(3), // description
            new Date(`2018-${i + 1}-01`).getTime().toString(), // startDateTime
            new Date(`2018-${i + 3}-01`).getTime().toString(), // endDateTime
            String(true), // isActive
        ]);
    }
    return new Promise((success, reject) => {
        csvStringify(users, (err, output) => {
            if (err != null) {
                reject(err);
                return;
            }
            fs.writeFileSync(fileName, output);
            console.info(`[Courses] Successfully generated ${recordsCount} records and saved to ${fileName}`);
            success(output);
        });
    });
}
