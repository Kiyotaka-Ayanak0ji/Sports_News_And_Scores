import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINT } from '../../config/constants'
import { Match } from '../../context/matches/types.ts'
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MatchId() {
  const [match,setMatch] = useState<Match>({
    id: 0,
    sportName: '',
    location: '',
    startsAt: '',
    teams: [],
    score: {},
    story: '',
    playingTeam: 0,
    isRunning: false,
    endsAt: '',
    name: ''
  });

  const {matchId} = useParams();
  useEffect(()=>{
    fetchMatch(matchId);
  }, [matchId]);

  const fetchMatch = async (id : string | undefined) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matche');
      }

      const data = await response.json();

      setMatch(data)
      console.log(match);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  }

  const navigate = useNavigate();
  const [, setOpenRead] = useState(false);
  function closeModal() {
    setOpenRead(false);
    navigate("../");
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child as={Fragment}>

            
            <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {match.name}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {match.location}
                </p>
                <p className="text-sm text-gray-500">
                  {match.sportName}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {match.startsAt.slice(0,10)}
                </p>
                {match.teams.length > 0 && match.teams.map((team, index) => (
              <div key={index} className='flex justify-between'>
                <p className='font-semibold'>{team.name}</p>
                <p className='font-semibold'>{match.score[team.name]}</p>
              </div>
            ))}
                <div className="flex flex-col my-2">
                  <div className="flex justify-between mt-1">
                    {/* <p className="font-semibold">{match.teams[0].name}</p>
                    <p className="font-semibold">{match.score[match.teams[0].name]}</p> */}
                  </div>
                  <div className="flex justify-between">
                    {/* <p className="font-semibold">{match.teams[1].name}</p>
                    <p className="font-semibold">{match.score[match.teams[1].name]}</p> */}
                  </div>
                </div>
                <p className="text-gray-700 text-base">{match.story}</p>
                <br />
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

// <Transition appear show={true} as={Fragment}>
//       <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
//         <div className="min-h-screen px-4 text-center">
//           <Transition.Child as={Fragment}>
//             <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
//           </Transition.Child>

//           {/* This element is to trick the browser into centering the modal contents. */}
//           <span className="inline-block h-screen align-middle" aria-hidden="true">
//             &#8203;
//           </span>
//           <Transition.Child as={Fragment}>
//             <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//               <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                 {match.name}
//               </Dialog.Title>
//               <div className="mt-2">
//                 <p className="text-sm text-gray-500">
//                   {match.location}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {match.sportName}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Date: {match.startsAt.slice(0,10)}
//                 </p>
//                 <div className="flex flex-col my-2">
//                   <div className="flex justify-between mt-1">
//                     {/* <p className="font-semibold">{match.teams[0].name}</p>
//                     <p className="font-semibold">{match.score[match.teams[0].name]}</p> */}
//                   </div>
//                   <div className="flex justify-between">
//                     {/* <p className="font-semibold">{match.teams[1].name}</p>
//                     <p className="font-semibold">{match.score[match.teams[1].name]}</p> */}
//                   </div>
//                 </div>
//                 <p className="text-gray-700 text-base">{match.story}</p>
//                 <br />
//               </div>
//               <div className="mt-4">
//                 <button
//                   type="button"
//                   className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>