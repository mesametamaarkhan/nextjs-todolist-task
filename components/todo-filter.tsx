'use client';

import { TodoFilter } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TodoFilterProps {
	filter: TodoFilter;
	onChange: (value: TodoFilter) => void;
	counts: {
		all: number;
		active: number;
		completed: number;
	};
}

export function TodoFilters({ filter, onChange, counts }: TodoFilterProps) {
	return (
		<Tabs
			value={filter}
			onValueChange={(value) => onChange(value as TodoFilter)}
			className="w-full mb-6"
		>
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="all" className="relative">
					All
					{counts.all > 0 && (
						<span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
							{counts.all}
						</span>
					)}
				</TabsTrigger>
				<TabsTrigger value="active">
					Active
					{counts.active > 0 && (
						<span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
							{counts.active}
						</span>
					)}
				</TabsTrigger>
				<TabsTrigger value="completed">
					Completed
					{counts.completed > 0 && (
						<span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
							{counts.completed}
						</span>
					)}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}