import { Card, CardContent } from '@/components/ui/card';

export default function MainPage() {
	return (
		<div className='flex items-center justify-center h-full bg-background'>
			<Card className='w-[350px]'>
				<CardContent className='flex items-center justify-center p-6'>
					<h1 className='text-2xl font-bold text-center'>
						Welcome to...
					</h1>
				</CardContent>
			</Card>
		</div>
	);
}