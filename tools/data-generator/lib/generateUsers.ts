import * as fs from 'fs';
import * as faker from 'faker';

const cities = ['minsk', 'brest', 'gomel', 'grodna', 'mogilev', 'vitebsk', 'other'];
const englishLevels = ['a1', 'a1+', 'a2', 'a2+', 'b1', 'b1+', 'b2', 'b2+', 'c1', 'c1+', 'c2', 'c2+'];
const defaultFileName = './out/users.json';
const recordsCount = 1000;

export type User = {
    _id: string;
    role: string;
    isAdmin: boolean;
    profile: {
        firstName: string;
        lastName: string;
        githubId: string;
        city: string;
        englishLevel: string;
        email: string;
    };
};

export function generateUsers(): Promise<User[]> {
    const fileName = process.argv[2] || defaultFileName;
    const users: User[] = [];
    console.log('[Students] Start generating');
    for (let i = 0; i < recordsCount; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const githubId = faker.internet.userName().toLowerCase();
        users.push({
            _id: githubId,
            role: faker.random.arrayElement(['mentor', 'student', 'student', 'student', 'student', 'student']),
            isAdmin: false,
            profile: {
                firstName,
                lastName,
                githubId,
                city: faker.random.arrayElement(cities),
                englishLevel: faker.random.arrayElement(englishLevels),
                email: faker.internet.email(firstName, lastName),
            },
        });
    }
    return new Promise(success => {
        const jsonString = JSON.stringify(users, undefined, 2);
        fs.writeFileSync(fileName, jsonString);
        console.info(`[Students] Successfully generated ${recordsCount} records and saved to ${fileName}`);
        success(users);
    });
}
