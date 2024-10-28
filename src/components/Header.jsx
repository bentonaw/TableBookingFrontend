import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Header() {

	return (
		<header className='border-b'>
			<div className='container px-4 h-12 flex items-center justify-between'>
				<div className='flex items-center'>Snacks</div>
				<Button variant='outline'>
					<Link to='/'>home</Link>
				</Button>

				<div className='ml-auto'>
					<Button variant='outline'>Login</Button>
				</div>
				<div className='ml-auto'>
					<Button variant='outline'>
						<Link to='/reservation'>Reservation</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
