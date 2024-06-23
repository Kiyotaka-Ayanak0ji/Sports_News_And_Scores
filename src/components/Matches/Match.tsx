import { useState } from 'react'
import RefreshButton from './Refresh';
import LikeButton from './LikeButton';
import { toast } from 'react-toastify';
import { Dialog , DialogPanel ,DialogTitle , Button } from '@headlessui/react';
import { Match } from '../../types/matches';

const MatchCard:React.FC = (props) => {

	let liked = localStorage.getItem("likedMatches")??"[]";
	
	const res = Array(JSON.parse(liked));

	const { id , title , location , score ,teams } = props;
	
	const [isloading,setIsLoading] = useState(false);
	
	const [isMatchOpen,setMatchOpen] = useState(false);

	const handleMatch = (match:Match) => {
		return(
			<Dialog onClose={() => setMatchOpen(false)} open={isMatchOpen} as="div" className="relative z-10 focus:outline-none w-screen h-screen bg-neutral-400">
				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className="flex min-h-full items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
						<DialogTitle as="h3" className="text-base/7 font-xl text-black">
							{match.name}
						</DialogTitle>
							<div className='bg-amber-500/50 flex-col w-full h-full text-left'>
								<span className='flex p-2'>
									<p className='font-bold absolute left text-base'>
										{match.teams[0].name}
									</p>
									<p className='absolute right-0 font-light text-sm'>
										{match.score[teams[0].name]}
									</p>
								</span>
								<span className='flex p-2'>
									<p className='font-bold absolute left text-base'>
										{match.teams[1].name}
									</p>
									<p className='absolute right-0 font-light text-sm'>
										{match.score[teams[1].name]}
									</p>
								</span>
							</div>

							<div className="absolute right-0 bottom-0 mt-4 items-center justify-center">
								<Button
								className="rounded-md bg-blue-500 hover:bg-blue-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
								onClick={() => setMatchOpen(false)}
								>
								Close
								</Button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		)
	}

	const handleLikes = (id:number) => {
		//Set loading as true...
		if(res.includes(id)){
			res.splice(id,1);
		}
		else{
			res.push(id);
		}
		localStorage.setItem("likedMatches",JSON.stringify(res));
		toast.info("Added liked match",{
			position: "top-right",
			theme: "colored",
			delay: 5000,
			pauseOnFocusLoss: false,
			pauseOnHover: false,
			progress: undefined,
			closeOnClick: true,
			draggable: true
		})
	}

	const handleRefresh = () => {
		
		//Set loading true and then false after 2s delay..
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		},2000);

		//Stimulate a 2s delay...
	}

	return (

		<div className='flex-col font-mono w-2/12 h-full dark:text-neutral-500 text-black bg-gray-500 dark:bg-zinc-600 items-center justify-between rounded-none border-2 border-stone-700'>
			<span className='flex-row justify-stretch'>
				<h3 
					onClick={handleMatch(id)}
					className='absolute left-0 text-black mt-2 mb-1'>
					{title}
				</h3>
				
				<div className='flex-auto absolute right-0'>
					<LikeButton onClick={() => handleLikes(id)} />
				</div>

				<div className='flex-auto absolute right-0'>
					<RefreshButton onClick={() => handleRefresh} isLoading={isloading} />
				</div>

			</span>

			<p className='text-sm font-light text-neutral-400'>
				{location}
			</p>

			<span className='inline-flex'>
				<p className='items-start text-base font-bold text-black'>
					{teams[0].name}
				</p>
				<p className='items-end text-base text-neutral-500'>
					{score[teams[0].name]}
				</p>
			</span>
			<span className='inline-flex'>
				<p className='items-start text-base font-bold text-black'>
					{teams[1].name}
				</p>
				<p className='items-end text-base text-neutral-500'>
					{score[teams[1].name]}
				</p>
			</span>
		</div>
	)
}

export default MatchCard;