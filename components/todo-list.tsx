'use client';

import { useEffect, useState } from 'react';
import { TodoItem } from './todo-item';
import { useTodos } from '@/hooks/use-todos';
import { TodoForm } from './todo-form';
import { TodoFilters } from './todo-filter';
import { EmptyState } from './ui/empty-state';
import { Button } from './ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ClipboardList, Trash2 } from 'lucide-react';

const TodoList = () => {
	const {
		todos,
		filter,
		setFilter,
		addTodo,
		toggleTodo,
		deleteTodo,
		clearCompleted,
		totalTodos,
		activeTodos,
		completedTodos,
	} = useTodos();

	const [mounted, setMounted] = useState(false);

	// Prevent hydration issues
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="max-w-md w-full mx-auto"
		>
			<div className="mb-6 text-center">
				<h1 className="text-2xl font-bold tracking-tight mb-1">My Tasks</h1>
				<p className="text-sm text-muted-foreground">
					Keep track of your tasks and stay organized
				</p>
			</div>

			<TodoForm onSubmit={addTodo} />

			<TodoFilters
				filter={filter}
				onChange={setFilter}
				counts={{
					all: totalTodos,
					active: activeTodos,
					completed: completedTodos,
				}}
			/>

			{todos.length === 0 ? (
				<EmptyState
					title={filter === 'all' ? "No tasks yet" : `No ${filter} tasks`}
					description={filter === 'all'
						? "Add a new task to get started"
						: `There are no ${filter} tasks to display`
					}
					icon={filter === 'completed'
						? <Check className="h-12 w-12 text-muted-foreground" />
						: <ClipboardList className="h-12 w-12 text-muted-foreground" />
					}
				/>
			) : (
				<>
					<div className="space-y-1">
						<AnimatePresence>
							{todos.map((todo) => (
								<TodoItem
									key={todo.id}
									todo={todo}
									onToggle={toggleTodo}
									onDelete={deleteTodo}
								/>
							))}
						</AnimatePresence>
					</div>

					{completedTodos > 0 && (
						<div className="mt-6 flex justify-end">
							<Button
								variant="outline"
								size="sm"
								onClick={clearCompleted}
								className="text-xs"
							>
								<Trash2 className="mr-1 h-3 w-3" />
								Clear completed
							</Button>
						</div>
					)}
				</>
			)}
		</motion.div>
	);
};

export default TodoList;