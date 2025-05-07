import React from 'react';
import { ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon = <ClipboardList className="h-12 w-12 text-muted-foreground" />,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center",
      className
    )}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}