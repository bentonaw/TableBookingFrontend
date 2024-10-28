import { useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Reservation() {
	const [formData, setFormData] = useState({
		partySize: '',
		date: '',
		timeSlotId: '',
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
	});

	const API_URL = 'https://localhost:7043/';
	const [timeSlots, setTimeSlots] = useState([]);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	// New state to track form progress
	const [showDateSection, setShowDateSection] = useState(false);
	const [showTimeSection, setShowTimeSection] = useState(false);
	const [showPersonalInfo, setShowPersonalInfo] = useState(false);

	const fetchTimeSlots = async (date, partySize) => {
		try {
			const response = await axios.get(`${API_URL}api/reservation/timeslots`, {
				params: { date, partySize },
			});
			setTimeSlots(response.data);
			setShowTimeSection(true);
		} catch (err) {
			setError('Failed to load time slots: ' + err.message);
			setTimeSlots([]);
			setShowTimeSection(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Handle date selection
		if (name === 'date' && value) {
			fetchTimeSlots(value, formData.partySize);
			setShowTimeSection(true);
		}
	};

	const handlePartySizeSelect = (size) => {
		setFormData((prev) => ({
			...prev,
			partySize: size,
			// Reset subsequent fields
			date: '',
			timeSlotId: '',
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
		}));
		setShowDateSection(true);
		setShowTimeSection(false);
		setShowPersonalInfo(false);
	};

	const handleTimeSlotSelect = (event) => {
		setFormData({ ...formData, timeSlotId: event.target.value });
		setShowPersonalInfo(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setLoading(true);

		try {
			const reservationData = {
				timeSlotId: parseInt(formData.timeSlotId),
				nrOfSeats: parseInt(formData.partySize),
				reservationDate: formData.date,
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				phoneNumber: formData.phoneNumber,
			};

			await axios.post(
				`${API_URL}api/reservation/`,
				reservationData
			);
			setSuccess(
				'Reservation created successfully! Your table has been automatically assigned.'
			);
			// Reset form and progress
			setFormData({
				partySize: '',
				date: '',
				timeSlotId: '',
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
			});
			setShowDateSection(false);
			setShowTimeSection(false);
			setShowPersonalInfo(false);
		} catch (err) {
			setError(
				err.response?.data ||
					'Failed to create reservation. The requested time slot might be fully booked.'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-2xl mx-auto p-6'>
			<h2 className='text-2xl font-bold mb-6'>Make a Reservation</h2>

			{error && (
				<Alert variant='destructive' className='mb-4'>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{success && (
				<Alert className='mb-4'>
					<AlertDescription>{success}</AlertDescription>
				</Alert>
			)}

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className='space-y-4'>
					<h3 className='text-lg font-medium'>Select your party size:</h3>
					<div className='grid grid-cols-4 gap-2'>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
							<Button
								key={size}
								type='button'
								variant={formData.partySize === size ? 'default' : 'outline'}
								onClick={() => handlePartySizeSelect(size)}
							>
								{size} {size === 1 ? 'guest' : 'guests'}
							</Button>
						))}
					</div>
				</div>

				{showDateSection && (
					<div className='space-y-4 animate-fadeIn'>
						<div>
							<Label htmlFor='date'>Select a date</Label>
							<Input
								type='date'
								id='date'
								name='date'
								value={formData.date}
								onChange={handleInputChange}
								min={new Date().toISOString().split('T')[0]}
								required
							/>
						</div>
					</div>
				)}

				{showTimeSection && (
					<div className='space-y-4 animate-fadeIn'>
						<div>
							<Label htmlFor='timeSlotId'>Select a time</Label>
							<select
								id='timeSlotId'
								name='timeSlotId'
								value={formData.timeSlotId}
								onChange={handleTimeSlotSelect}
								className='w-full p-2 border rounded'
								required
							>
								<option value=''>Select a time</option>
								{timeSlots.map((slot) => (
									<option key={slot.timeSlotId} value={slot.timeSlotId}>
										{slot.startTime} - {slot.endTime}
									</option>
								))}
							</select>
						</div>
					</div>
				)}

				{showPersonalInfo && (
					<div className='space-y-4 animate-fadeIn'>
						<div>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								type='text'
								id='firstName'
								name='firstName'
								value={formData.firstName}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								type='text'
								id='lastName'
								name='lastName'
								value={formData.lastName}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div>
							<Label htmlFor='phoneNumber'>Phone Number</Label>
							<Input
								type='tel'
								id='phoneNumber'
								name='phoneNumber'
								value={formData.phoneNumber}
								onChange={handleInputChange}
								required
							/>
						</div>

						<Button type='submit' className='w-full' disabled={loading}>
							{loading ? 'Creating Reservation...' : 'Make Reservation'}
						</Button>
					</div>
				)}
			</form>
		</div>
	);
}
