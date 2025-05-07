'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
	title: z.string().min(1, 'Task title is required'),
	description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface TodoFormProps {
	onSubmit: (title: string, description?: string) => void;
}

const TodoForm = ({ onSubmit }: TodoFormProps) => {
	const [showDescription, setShowDescription] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	});

	const handleSubmit = (values: FormValues) => {
		onSubmit(values.title, values.description);
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mb-8">
				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input
										placeholder="Add a new task..."
										{...field}
										className="border-primary/20 focus:border-primary"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" size="icon">
						<PlusCircle className="h-5 w-5" />
					</Button>
				</div>

				<div className="flex items-center">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="px-0 text-xs text-muted-foreground hover:text-foreground"
						onClick={() => setShowDescription(!showDescription)}
					>
						{showDescription ? (
							<>
								<ChevronUp className="mr-1 h-3 w-3" />
								Hide description
							</>
						) : (
							<>
								<ChevronDown className="mr-1 h-3 w-3" />
								Add description
							</>
						)}
					</Button>
				</div>

				<AnimatePresence>
					{showDescription && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
						>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												placeholder="Add details about your task..."
												className="resize-none min-h-[80px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</form>
		</Form>
	);
};

export { TodoForm };