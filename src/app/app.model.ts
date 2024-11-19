export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface Task {
  id: string;
  name: string;
  projecName: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedToUser: string;
  assignerToUserId: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}
