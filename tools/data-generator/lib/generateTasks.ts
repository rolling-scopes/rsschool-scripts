import * as fs from 'fs';
import * as faker from 'faker';

const defaultFileName = './out/tasks.json';
const recordsCount = 3;

enum TaskType {
    CodeJam = 'Code Jam',
    Task = 'Task',
    Test = 'Test',
    Interview = 'Interview',
}

enum WhoChecks {
    Mentor = 'Mentor',
    RandomMentor = 'Random Mentor',
    Trainer = 'Trainer',
    Duolingo = 'Duolingo',
    Codecademy = 'Codecademy',
    Codewars = 'Codewars',
    WithoutChecking = 'Without Checking',
    ExternalPerson = 'External Person',
    UnitTest = 'Unit Test',
}

export type Task = {
    _id: string;
    title: string;
    type: TaskType;
    startDateTime: number;
    endDateTime: number;
    whoChecks: WhoChecks;
    urlToDescription: string;
    studentCommentTemplate?: string;
    mentorCommentTemplate?: string;
    courseId: string;
};

export function generateTasks(): Promise<Task[]> {
    const fileName = process.argv[2] || defaultFileName;
    let tasks: Task[] = [];
    const taskTitles = ['Markup', 'JS Core Interview', 'Final Game', 'Match Game'];
    console.log('[Tasks] Start generating');

    for (let i = 0; i < recordsCount; i++) {
        const courseId = `RS Course 2018 #${i + 1}`;
        tasks = tasks.concat(
            taskTitles.map(title => ({
                _id: faker.random.uuid(),
                title: title,
                type: faker.random.arrayElement(Object.values(TaskType)),
                startDateTime: new Date(`2018-${i + 1}-01`).getTime(),
                endDateTime: new Date(`2018-${i + 3}-01`).getTime(),
                whoChecks: WhoChecks.Mentor,
                urlToDescription: 'https://gitter.im/rolling-scopes-school/announcements',
                courseId: faker.helpers.slugify(courseId.toLowerCase()),
            })),
        );
    }
    return new Promise(success => {
        const jsonString = JSON.stringify(tasks, undefined, 2);
        fs.writeFileSync(fileName, jsonString);
        console.info(
            `[Tasks] Successfully generated ${recordsCount * taskTitles.length} records and saved to ${fileName}`,
        );
        success(tasks);
    });
}
