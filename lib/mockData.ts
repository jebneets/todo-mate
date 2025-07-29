export interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  color: 'blue' | 'purple' | 'yellow' | 'pink' | 'green';
}

export interface TaskListData {
  id: string;
  name: string;
  icon: string | null;
  tasks: Task[];
}

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfj.',
    time: '10:30 AM - 12:00 PM',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Work on Branding',
    description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfj.',
    time: '10:30 AM - 12:00 PM',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Make a Report for client',
    description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfj.',
    time: '10:30 AM - 12:00 PM',
    color: 'yellow',
  },
  {
    id: 4,
    title: 'Create a planer',
    description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfj.',
    time: '10:30 AM - 12:00 PM',
    color: 'pink',
  },
  {
    id: 5,
    title: 'Create Treatment Plan',
    description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfj.',
    time: '10:30 AM - 12:00 PM',
    color: 'green',
  },
];

export const taskLists: TaskListData[] = [
  {
    id: 'projects',
    name: 'Projects',
    icon: 'fas fa-project-diagram',
    tasks: [
      {
        id: 101,
        title: 'Review quarterly reports',
        description: 'Analyze Q3 performance metrics and prepare summary for stakeholders.',
        time: '9:00 AM - 11:00 AM',
        color: 'blue',
      },
      {
        id: 102,
        title: 'Update project timeline',
        description: 'Adjust milestones based on recent client feedback and resource availability.',
        time: '2:00 PM - 3:30 PM',
        color: 'purple',
      },
      {
        id: 103,
        title: 'Schedule team meeting',
        description: 'Coordinate with all team members for weekly sync and project updates.',
        time: '4:00 PM - 4:30 PM',
        color: 'green',
      },
      {
        id: 104,
        title: 'Finalize budget proposal',
        description: 'Complete cost analysis and submit final budget for next quarter.',
        time: '10:00 AM - 12:00 PM',
        color: 'yellow',
      },
    ],
  },
  {
    id: 'personal',
    name: 'Personal',
    icon: 'fas fa-user',
    tasks: [
      {
        id: 201,
        title: 'Buy groceries',
        description: 'Get ingredients for dinner party this weekend. Check pantry first.',
        time: '6:00 PM - 7:00 PM',
        color: 'green',
      },
      {
        id: 202,
        title: 'Schedule dentist appointment',
        description: 'Book routine cleaning and checkup for next month.',
        time: 'Any time',
        color: 'blue',
      },
      {
        id: 203,
        title: 'Call mom',
        description: 'Check in and discuss plans for upcoming family gathering.',
        time: '7:00 PM - 8:00 PM',
        color: 'pink',
      },
      {
        id: 204,
        title: 'Plan weekend trip',
        description: 'Research destinations and book accommodation for mini vacation.',
        time: 'Weekend',
        color: 'purple',
      },
    ],
  },
  {
    id: 'work',
    name: 'Work',
    icon: 'fas fa-briefcase',
    tasks: [
      {
        id: 301,
        title: 'Respond to emails',
        description: 'Clear inbox and respond to all pending client communications.',
        time: '8:00 AM - 9:00 AM',
        color: 'blue',
      },
      {
        id: 302,
        title: 'Complete performance review',
        description: 'Finish self-assessment and submit before deadline.',
        time: '1:00 PM - 3:00 PM',
        color: 'yellow',
      },
      {
        id: 303,
        title: 'Attend training session',
        description: 'Join online workshop on new project management tools.',
        time: '11:00 AM - 12:00 PM',
        color: 'purple',
      },
    ],
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'fas fa-shopping-cart',
    tasks: [
      {
        id: 401,
        title: 'Buy new laptop',
        description: 'Research and purchase replacement for work computer.',
        time: 'This week',
        color: 'blue',
      },
      {
        id: 402,
        title: 'Order office supplies',
        description: 'Restock printer paper, pens, and other essentials.',
        time: 'Any time',
        color: 'green',
      },
      {
        id: 403,
        title: 'Get birthday gift for Sarah',
        description: 'Find something nice for her 30th birthday next week.',
        time: 'Before Friday',
        color: 'pink',
      },
    ],
  },
];
