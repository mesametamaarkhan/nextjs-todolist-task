import { TodoList } from '@/components/todo-list';

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto py-8 px-4 md:px-0">
        <TodoList />
      </div>
    </main>
  );
}