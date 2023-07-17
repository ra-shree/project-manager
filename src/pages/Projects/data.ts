interface ProjectData {
  projectName: string;
  projectManager: string;
  createdAt: string;
  lastUpdated: string;
  status: string;
  href?: string;
}

export const projectData: ProjectData[] = [
  {
    projectName: 'Project A',
    projectManager: 'John Doe',
    createdAt: '2023-01-15T09:30:00Z',
    lastUpdated: '2023-07-10T14:45:00Z',
    status: 'In Progress',
    href: '/projects/1',
  },
  {
    projectName: 'Project B',
    projectManager: 'Jane Smith',
    createdAt: '2023-02-28T11:15:00Z',
    lastUpdated: '2023-07-15T16:20:00Z',
    status: 'Completed',
    href: '/projects/2',
  },
  {
    projectName: 'Project C',
    projectManager: 'Alex Johnson',
    createdAt: '2023-03-10T13:45:00Z',
    lastUpdated: '2023-07-12T10:00:00Z',
    status: 'Draft',
    href: '/projects/3',
  },
  {
    projectName: 'Project D',
    projectManager: 'Sarah Wilson',
    createdAt: '2023-04-05T08:00:00Z',
    lastUpdated: '2023-07-08T17:30:00Z',
    status: 'Paused',
    href: '/projects/4',
  },
  {
    projectName: 'Project E',
    projectManager: 'Michael Brown',
    createdAt: '2023-06-20T16:00:00Z',
    lastUpdated: '2023-07-11T09:15:00Z',
    status: 'In Progress',
    href: '/projects/5',
  },
];
