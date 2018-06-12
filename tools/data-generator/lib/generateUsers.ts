import * as fs from 'fs';
import * as csvStringify from 'csv-stringify';
import * as faker from 'faker';

const cities = ['minsk', 'brest', 'gomel', 'grodna', 'mogilev', 'vitebsk', 'other'];
const defaultFileName = './out/users.csv';
const recordsCount = 1000;

export function generateUsers() {
    const fileName = process.argv[2] || defaultFileName;
    const users: string[][] = [
        [
            '_id',
            'role',
            'isAdmin',
            'profile.firstName',
            'profile.lastName',
            'profile.githubId',
            'profile.city',
            'profile.email',
        ],
    ];
    console.log('[Students] Start generating');
    for (let i = 0; i < recordsCount; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const githubId = faker.internet.userName().toLowerCase();
        users.push([
            githubId,
            faker.random.arrayElement(['mentor', 'student', 'student', 'student', 'student', 'student']),
            String(false),
            firstName,
            lastName,
            githubId,
            faker.random.arrayElement(cities),
            faker.internet.email(firstName, lastName),
        ]);
    }
    return new Promise((success, reject) => {
        csvStringify(users, (err, output) => {
            if (err != null) {
                reject(err);
                return;
            }
            fs.writeFileSync(fileName, output);
            console.info(`[Students] Successfully generated ${recordsCount} records and saved to ${fileName}`);
            success(output);
        });
    });
}
