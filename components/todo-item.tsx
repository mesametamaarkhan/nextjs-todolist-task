'use client';

import { useState } from 'react';
import { Todo } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Delay actual deletion for animation
    setTimeout(() => onDelete(todo.id), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      layout
      className={cn(
        "transition-all duration-300",
        isDeleting && "opacity-0 scale-95"
      )}
    >
      <Card className="mb-3 overflow-hidden">
        <CardContent className="p-4 flex items-start gap-3">
          <Checkbox 
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div
              className={cn(
                "text-base font-medium leading-none transition-all duration-200",
                todo.completed && "text-muted-foreground line-through"
              )}
            >
              {todo.title}
            </div>
            {todo.description && (
              <div className={cn(
                "mt-2 text-sm text-muted-foreground",
                todo.completed && "line-through opacity-70"
              )}>
                {todo.description}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}