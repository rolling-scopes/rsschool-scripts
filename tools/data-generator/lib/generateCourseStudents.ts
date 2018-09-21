import * as fs from 'fs';
import { Course } from './generateCourses';
import { User } from './generateUsers';

const defaultFileName = './out/coursestudents.json';

export type CourseStudent = {
    userId: string;
    courseId: string;
    isActive: boolean;
    city: string;
    mentors: any[];
    englishLevel: string;
};

export function generateCourseStudents(students: User[], courses: Course[]): Promise<CourseStudent[]> {
    const fileName = process.argv[2] || defaultFileName;

    console.log('[Course Students] Start generating');
    const result: CourseStudent[] = students.reduce<CourseStudent[]>((acc, student) => {
        return acc.concat(
            courses.map(course => {
                return {
                    userId: student._id,
                    courseId: course._id,
                    city: student.profile.city,
                    isActive: true,
                    mentors: [],
                    englishLevel: student.profile.englishLevel,
                };
            }),
        );
    }, []);

    return new Promise(success => {
        const jsonString = JSON.stringify(result, undefined, 2);
        fs.writeFileSync(fileName, jsonString);
        console.info(`[Course Students] Successfully generated ${result.length} records and saved to ${fileName}`);
        success(result);
    });
}
