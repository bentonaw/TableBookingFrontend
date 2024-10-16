import { Button } from '@/components/ui/button';

export default function Header() {

	return (
		<header className='border-b'>
			<div className='container px-4 h-12 flex items-center justify-between'>
				<div className='flex items-center'>
					Snacks
				</div>

				<div className='ml-auto'>
					<Button
						variant='outline'>
						Login
					</Button>
				</div>
			</div>
		</header>
	);
}
