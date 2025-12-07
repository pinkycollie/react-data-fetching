import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi, Todo } from '../api/mockApi';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function OptimisticTodoList() {
  const queryClient = useQueryClient();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`].slice(-10));
  };

  const { data: todos, isLoading, isError, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => mockApi.getTodos(),
  });

  const mutation = useMutation({
    mutationFn: (todoId: number) => mockApi.toggleTodo(todoId),
    onMutate: async (todoId) => {
      addLog(`🔄 Optimistically updating todo ${todoId}`);
      
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // Optimistically update the cache
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        if (!old) return old;
        return old.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
      });

      addLog(`✅ Cache updated optimistically`);

      // Return context with the previous value
      return { previousTodos };
    },
    onError: (_err, todoId, context) => {
      addLog(`❌ Error occurred! Rolling back todo ${todoId}`);
      
      // Rollback to the previous value
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
        addLog(`↩️ Rollback complete`);
      }
    },
    onSuccess: (_data, todoId) => {
      addLog(`✔️ Server confirmed update for todo ${todoId}`);
    },
    onSettled: () => {
      // Always refetch after error or success to sync with server
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleToggle = (todoId: number) => {
    mutation.mutate(todoId);
  };

  useEffect(() => {
    if (todos) {
      addLog(`📦 Todos loaded: ${todos.length} items`);
    }
  }, [todos]);

  return (
    <div>
      <h3>Todo List with Optimistic Updates</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Click on a todo to toggle its completion status. The UI updates immediately (optimistic update),
        then the server request is made. If it fails, the change is rolled back.
      </p>

      {isLoading && (
        <div className="loading-state">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading todos...
          </motion.div>
        </div>
      )}

      {isError && (
        <motion.div
          className="error-state"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </motion.div>
      )}

      {todos && (
        <motion.div
          className="todo-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              onClick={() => handleToggle(todo.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                readOnly
                onClick={(e) => e.stopPropagation()}
              />
              <span className="todo-title">{todo.title}</span>
              {mutation.isPending && mutation.variables === todo.id && (
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-warning)' }}>
                  ⏳ Updating...
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="logs-container">
        <h3>Activity Logs</h3>
        {logs.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            No activity yet
          </div>
        ) : (
          logs.map((log, index) => (
            <motion.div
              key={index}
              className="log-entry"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {log}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
