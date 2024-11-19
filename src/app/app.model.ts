export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface Task {
  id: string;
  title: string;
  projectName: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
}

export interface NewTask {
  title: string;
  projectName: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
}
