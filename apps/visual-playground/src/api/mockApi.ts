import http from './http';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface MockApiConfig {
  latency: number; // milliseconds
  failureRate: number; // 0-1
  useExternal: boolean;
  pollInterval: number; // milliseconds
}

class MockApiClass {
  private config: MockApiConfig = {
    latency: 500,
    failureRate: 0,
    useExternal: false,
    pollInterval: 0,
  };

  private mockTodos: Todo[] = [
    { id: 1, title: 'Learn React Query', completed: false, userId: 1 },
    { id: 2, title: 'Build a demo app', completed: false, userId: 1 },
    { id: 3, title: 'Master data fetching', completed: true, userId: 1 },
  ];

  private mockPosts: Post[] = [
    { id: 1, title: 'First Post', body: 'This is the first post content', userId: 1 },
    { id: 2, title: 'Second Post', body: 'This is the second post content', userId: 1 },
    { id: 3, title: 'Third Post', body: 'This is the third post content', userId: 1 },
  ];

  public requestLog: Array<{ timestamp: number; url: string; status: 'pending' | 'success' | 'error'; data?: any }> = [];

  setConfig(newConfig: Partial<MockApiConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): MockApiConfig {
    return { ...this.config };
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private shouldFail(): boolean {
    return Math.random() < this.config.failureRate;
  }

  private logRequest(url: string, status: 'pending' | 'success' | 'error', data?: any) {
    this.requestLog.push({
      timestamp: Date.now(),
      url,
      status,
      data,
    });
    // Keep only last 50 logs
    if (this.requestLog.length > 50) {
      this.requestLog.shift();
    }
  }

  async getTodos(): Promise<Todo[]> {
    const url = '/api/todos';
    this.logRequest(url, 'pending');
    
    try {
      await this.delay(this.config.latency);
      
      if (this.shouldFail()) {
        this.logRequest(url, 'error');
        throw new Error('Simulated API error');
      }

      let todos: Todo[];
      if (this.config.useExternal) {
        const response = await http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10');
        todos = response.data;
      } else {
        todos = this.mockTodos;
      }

      this.logRequest(url, 'success', todos);
      return todos;
    } catch (error) {
      this.logRequest(url, 'error');
      throw error;
    }
  }

  async getPosts(): Promise<Post[]> {
    const url = '/api/posts';
    this.logRequest(url, 'pending');
    
    try {
      await this.delay(this.config.latency);
      
      if (this.shouldFail()) {
        this.logRequest(url, 'error');
        throw new Error('Simulated API error');
      }

      let posts: Post[];
      if (this.config.useExternal) {
        const response = await http.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
        posts = response.data;
      } else {
        posts = this.mockPosts;
      }

      this.logRequest(url, 'success', posts);
      return posts;
    } catch (error) {
      this.logRequest(url, 'error');
      throw error;
    }
  }

  async toggleTodo(id: number): Promise<Todo> {
    const url = `/api/todos/${id}`;
    this.logRequest(url, 'pending');
    
    try {
      await this.delay(this.config.latency);
      
      if (this.shouldFail()) {
        this.logRequest(url, 'error');
        throw new Error('Simulated API error');
      }

      const todoIndex = this.mockTodos.findIndex((t) => t.id === id);
      if (todoIndex === -1) {
        throw new Error('Todo not found');
      }

      this.mockTodos[todoIndex] = {
        ...this.mockTodos[todoIndex],
        completed: !this.mockTodos[todoIndex].completed,
      };

      const updatedTodo = this.mockTodos[todoIndex];
      this.logRequest(url, 'success', updatedTodo);
      return updatedTodo;
    } catch (error) {
      this.logRequest(url, 'error');
      throw error;
    }
  }

  clearLogs() {
    this.requestLog = [];
  }
}

export const mockApi = new MockApiClass();
