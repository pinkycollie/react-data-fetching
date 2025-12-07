export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Simulated data store
let todosStore: Todo[] = [
  { id: 1, title: 'Learn React Query', completed: false },
  { id: 2, title: 'Build visual demo', completed: false },
  { id: 3, title: 'Master optimistic updates', completed: false },
  { id: 4, title: 'Understand caching strategies', completed: false },
];

let postsStore: Post[] = [
  { id: 1, title: 'Getting Started with React Query', body: 'React Query is a powerful data fetching library...', userId: 1 },
  { id: 2, title: 'Understanding Caching', body: 'Caching is crucial for performance...', userId: 1 },
  { id: 3, title: 'SWR vs React Query', body: 'Both libraries offer similar features...', userId: 2 },
];

let usersStore: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith' },
];

// Global settings for simulation
let globalLatency = 500;
let globalFailureRate = 0;

export const mockApiSettings = {
  setLatency: (ms: number) => {
    globalLatency = ms;
  },
  setFailureRate: (rate: number) => {
    globalFailureRate = rate;
  },
  getLatency: () => globalLatency,
  getFailureRate: () => globalFailureRate,
};

// Simulate network delay and potential failure
const simulateNetwork = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, globalLatency));
  
  if (Math.random() < globalFailureRate) {
    throw new Error('Simulated network error');
  }
};

// Mock API functions
export const mockApi = {
  // Todos
  getTodos: async (): Promise<Todo[]> => {
    await simulateNetwork();
    return [...todosStore];
  },
  
  getTodo: async (id: number): Promise<Todo> => {
    await simulateNetwork();
    const todo = todosStore.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    return { ...todo };
  },
  
  toggleTodo: async (id: number): Promise<Todo> => {
    await simulateNetwork();
    const index = todosStore.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Todo not found');
    
    todosStore[index] = {
      ...todosStore[index],
      completed: !todosStore[index].completed,
    };
    return { ...todosStore[index] };
  },
  
  addTodo: async (title: string): Promise<Todo> => {
    await simulateNetwork();
    const newTodo = {
      id: Math.max(...todosStore.map(t => t.id), 0) + 1,
      title,
      completed: false,
    };
    todosStore.push(newTodo);
    return { ...newTodo };
  },
  
  deleteTodo: async (id: number): Promise<void> => {
    await simulateNetwork();
    todosStore = todosStore.filter(t => t.id !== id);
  },
  
  // Posts
  getPosts: async (): Promise<Post[]> => {
    await simulateNetwork();
    return [...postsStore];
  },
  
  getPost: async (id: number): Promise<Post> => {
    await simulateNetwork();
    const post = postsStore.find(p => p.id === id);
    if (!post) throw new Error('Post not found');
    return { ...post };
  },
  
  // Users
  getUsers: async (): Promise<User[]> => {
    await simulateNetwork();
    return [...usersStore];
  },
  
  getUser: async (id: number): Promise<User> => {
    await simulateNetwork();
    const user = usersStore.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return { ...user };
  },
};
