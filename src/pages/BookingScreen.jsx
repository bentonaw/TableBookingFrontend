import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const formSchema = z.object({
	firstname: z
		.string()
		.min(2, {
			message: 'First name must be at least 2 characters.',
		})
		.max(50),
	lastname: z.string().min(2).max(50),
});

export default function BookingScreen() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
		},
	});

	const onSubmit = (values) => {
		console.log(values);
	};

	const [timeslots, setTimeslots] = useState([]);

	async function GetTimeslotsList() {
		try {
			const response = await axios.get(
				'https://localhost:7043/api/Reservation/Timeslots'
			);
			setTimeslots(response.data);
		} catch (error) {
			console.log('Error fetching timeslots: ', error);
		}
	}

	useEffect(() => {
		GetTimeslotsList();
	}, []);

	return (
		<>
			<h1>BookingScreen</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='firstname'
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder='First Name' {...field} />
								</FormControl>
								<FormDescription>This is your first name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastname'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder='Last Name' {...field} />
								</FormControl>
								<FormDescription>This is your last name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
			<ul>
				{timeslots.map(timeslot => (
					<li key={timeslot.timeslotId}>
						{timeslot.startTime} - {timeslot.endTime}
					</li>
				))}	
			</ul>
		</>
	);
}
