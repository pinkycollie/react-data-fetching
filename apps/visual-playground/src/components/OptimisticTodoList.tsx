import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi, type Todo } from '../api/mockApi';
import type { NetworkEvent } from './NetworkLane';

interface OptimisticTodoListProps {
  onNetworkEvent: (event: NetworkEvent) => void;
}

export default function OptimisticTodoList({ onNetworkEvent }: OptimisticTodoListProps) {
  const queryClient = useQueryClient();

  // Fetch todos
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const requestId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const startTime = Date.now();

      onNetworkEvent({
        id: requestId,
        type: 'request',
        timestamp: startTime,
        endpoint: 'todos',
      });

      try {
        const data = await mockApi.getTodos();
        const duration = Date.now() - startTime;
        onNetworkEvent({
          id: requestId,
          type: 'response',
          timestamp: Date.now(),
          endpoint: 'todos',
          duration,
        });
        return data;
      } catch (error) {
        onNetworkEvent({
          id: requestId,
          type: 'error',
          timestamp: Date.now(),
          endpoint: 'todos',
        });
        throw error;
      }
    },
  });

  // Toggle todo mutation with optimistic update
  const toggleMutation = useMutation({
    mutationFn: async (todoId: number) => {
      const requestId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const startTime = Date.now();

      onNetworkEvent({
        id: requestId,
        type: 'request',
        timestamp: startTime,
        endpoint: `toggle-todo-${todoId}`,
      });

      try {
        const data = await mockApi.toggleTodo(todoId);
        const duration = Date.now() - startTime;
        onNetworkEvent({
          id: requestId,
          type: 'response',
          timestamp: Date.now(),
          endpoint: `toggle-todo-${todoId}`,
          duration,
        });
        return data;
      } catch (error) {
        onNetworkEvent({
          id: requestId,
          type: 'error',
          timestamp: Date.now(),
          endpoint: `toggle-todo-${todoId}`,
        });
        throw error;
      }
    },
    // Optimistic update
    onMutate: async (todoId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // Optimistically update the cache
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        if (!old) return old;
        return old.map((todo) =>
          todo.id === todoId
            ? { ...todo, completed: !todo.completed }
            : todo
        );
      });

      // Return context with the previous value
      return { previousTodos };
    },
    // On error, roll back to the previous value
    onError: (err, _todoId, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('Failed to toggle todo:', err);
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleToggle = (todoId: number) => {
    toggleMutation.mutate(todoId);
  };

  return (
    <div className="optimistic-todo-list">
      <h3>✅ Optimistic Updates Demo</h3>
      
      <div className="todo-info">
        <p>
          Click on any todo to toggle its status. The UI updates immediately
          (optimistic update) and reverts if the server request fails.
        </p>
      </div>

      {isLoading ? (
        <div className="loading">Loading todos...</div>
      ) : (
        <div className="todos">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''} ${
                toggleMutation.isPending ? 'updating' : ''
              }`}
              onClick={() => handleToggle(todo.id)}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {}}
                className="todo-checkbox"
              />
              <span className="todo-title">{todo.title}</span>
              {toggleMutation.isPending && (
                <span className="todo-status">⏳</span>
              )}
            </div>
          ))}
        </div>
      )}

      {toggleMutation.isError && (
        <div className="error-message">
          ❌ Failed to toggle todo. The change has been reverted.
        </div>
      )}

      <div className="optimistic-explainer">
        <h4>How it works:</h4>
        <ol>
          <li>✅ UI updates immediately when you click (optimistic)</li>
          <li>📡 Request sent to server in the background</li>
          <li>
            {toggleMutation.isError
              ? '❌ Server responded with error → UI rolled back'
              : '✅ Server confirms → UI stays updated'}
          </li>
        </ol>
      </div>
    </div>
  );
}
