import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	// SheetClose,
} from '@/components/ui/sheet';
import { Label, Input } from '@/components/ui/input';

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='border-b'>
			<div className='container px-4 h-12 flex items-center justify-between'>
				<div className='flex items-center'>
					{/* Add a logo or site name here if needed */}
				</div>

				<div className='ml-auto'>
					<Button
						variant='outline'
						onClick={() => {
							setIsOpen(true); // Open the sheet when button is clicked
						}}
					>
						Login
					</Button>

					{/* Sheet component should always be rendered, controlling visibility with props */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant='outline'>Open</Button>
						</SheetTrigger>
						<SheetContent className='w-[100px] sm:w-[540px]'>
							<SheetHeader>
								<SheetTitle>Edit profile</SheetTitle>
								<SheetDescription>
									Make changes to your profile here. Click save when you&apos;re
									done.
								</SheetDescription>
							</SheetHeader>
							<div className='grid gap-4 py-4'>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label htmlFor='name' className='text-right'>
										Name
									</Label>
									<Input
										id='name'
										defaultValue='Pedro Duarte' // Use defaultValue instead of value
										className='col-span-3'
									/>
								</div>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label htmlFor='username' className='text-right'>
										Username
									</Label>
									<Input
										id='username'
										defaultValue='@peduarte' // Use defaultValue instead of value
										className='col-span-3'
									/>
								</div>
							</div>
							{/* <SheetFooter>
								<SheetClose asChild>
									<Button type='submit'>Save changes</Button>
								</SheetClose>
							</SheetFooter> */}
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
