export interface TaskData {
  id: number;
  taskTitle: string;
  description: string;
  assignedTo: string;
  completed: boolean;
}

export const taskData: TaskData[] = [
  {
    id: 1,
    taskTitle: 'Task 1',
    description: 'Description for Task 1',
    assignedTo: 'John Doe',
    completed: true,
  },
  {
    id: 2,
    taskTitle: 'Task 2',
    description: 'Description for Task 2',
    assignedTo: 'Jane Doe',
    completed: false,
  },
  {
    id: 3,
    taskTitle: 'Task 3',
    description: 'Description for Task 3',
    assignedTo: 'John Doe',
    completed: true,
  },
  {
    id: 4,
    taskTitle: 'Task 4',
    description: 'Description for Task 4',
    assignedTo: 'Bob Lee',
    completed: false,
  },
  {
    id: 5,
    taskTitle: 'Task 5',
    description: 'Description for Task 5',
    assignedTo: 'Jack Smith',
    completed: true,
  },
];
