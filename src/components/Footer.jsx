import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className='py-2 md:px-8 border-t'>
			<div className='container flex flex-col items-center justify-between gap-2 md:h-12 md:flex-row'>
				<p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
					Built by Huan Yang Ooi. All rights reserved.
				</p>
				<nav className='flex items-center space-x-4 text-sm font-medium'>
					<Link
						to='/contact'
						className='transition-colors hover:text-foreground/80 text-foreground/60'
					>
						Contact
					</Link>
					<Link
						to='/about'
						className='transition-colors hover:text-foreground/80 text-foreground/60'
					>
						About
					</Link>
				</nav>
			</div>
		</footer>
	);
}
