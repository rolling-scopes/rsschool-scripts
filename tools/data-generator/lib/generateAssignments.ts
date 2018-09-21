import * as fs from 'fs';
import * as faker from 'faker';

import { User } from './generateUsers';
import { Course } from './generateCourses';
import { Task } from './generateTasks';

const defaultFileName = './out/assignments.json';

export enum AssignmentStatus {
    Assigned = 'Assigned',
    ReadyForReview = 'ReadyForReview',
    Rejected = 'Rejected',
    Checked = 'Checked',
}

export type Assignment = {
    assignmentRepo?: string;
    checkDate?: number;
    completeDate?: number;
    courseId: string;
    deadlineDate: number;
    mentorComment?: string;
    mentorId?: string;
    score: number;
    status: AssignmentStatus;
    studentComment?: string;
    studentId: string;
    taskId: string;
};

export function generateAssignments(
    students: User[],
    mentors: User[],
    courses: Course[],
    tasks: Task[],
): Promise<Assignment[]> {
    const fileName = process.argv[2] || defaultFileName;

    console.log('[Assignments] Start generating');
    const result = students.reduce((acc: any, student) => {
        return [
            ...acc,
            ...courses.reduce((acc: any, course) => {
                const mentorId = faker.random.arrayElement(mentors)._id;
                return [
                    ...acc,
                    ...tasks.filter(task => task.courseId === course._id).map(task => ({
                        assignmentRepo: '',
                        checkDate: 0,
                        completeDate: 0,
                        courseId: course._id,
                        deadlineDate: 0,
                        mentorComment: '',
                        mentorId: mentorId,
                        score: 0,
                        status: '',
                        studentComment: '',
                        studentId: student._id,
                        taskId: task._id,
                    })),
                ];
            }, []),
        ];
    }, []);

    return new Promise(success => {
        const jsonString = JSON.stringify(result, undefined, 2);
        fs.writeFileSync(fileName, jsonString);
        console.info(`[Assignments] Successfully generated ${result.length} records and saved to ${fileName}`);
        success(result);
    });
}
