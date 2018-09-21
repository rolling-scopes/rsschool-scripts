import * as fs from 'fs';
import * as faker from 'faker';
import { Course } from './generateCourses';
import { User } from './generateUsers';

const defaultFileName = './out/coursementors.json';

export type CourseMentor = {
    userId: string;
    courseId: string;
    isActive: boolean;
    city: string;
    mentees: any[];
    menteeCapacity: number;
};

export function generateCourseMentors(mentors: User[], courses: Course[]) {
    const fileName = process.argv[2] || defaultFileName;

    console.log('[Course Mentors] Start generating');
    const result: CourseMentor[] = mentors.reduce<CourseMentor[]>((acc, mentor) => {
        return acc.concat(
            courses.map(course => {
                return {
                    userId: mentor._id,
                    courseId: course._id,
                    city: mentor.profile.city,
                    isActive: true,
                    menteeCapacity: faker.random.number(5) + 5,
                    mentees: [],
                };
            }),
        );
    }, []);

    return new Promise(success => {
        const jsonString = JSON.stringify(result, undefined, 2);
        fs.writeFileSync(fileName, jsonString);
        console.info(`[Course Mentors] Successfully generated ${result.length} records and saved to ${fileName}`);
        success(result);
    });
}
