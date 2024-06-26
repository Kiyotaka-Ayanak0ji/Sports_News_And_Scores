import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { Match } from "../../context/matches/types.ts";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import RefreshButton from "./Refresh.tsx";

export default function Score() {
  const [match, setMatch] = useState<Match>({
    id: 0,
    sportName: "",
    location: "",
    startsAt: "",
    teams: [],
    score: {},
    story: "",
    playingTeam: 0,
    isRunning: false,
    endsAt: "",
    name: "",
  });

  const { matchId } = useParams();
  useEffect(() => {
    fetchMatch(matchId);
  }, [matchId]);

  const fetchMatch = async (id: string | undefined) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch matche");
      }

      const data = await response.json();

      setMatch(data);
      console.log(match);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const navigate = useNavigate();
  const [, setOpenRead] = useState(false);
  function closeModal() {
    setOpenRead(false);
    navigate("../");
  }

  const [isLoading,setIsLoading] = useState(false);

  const handleRefresh = () => {

		//Set loading true and then false after 2s delay..
		setIsLoading(true);

		//Simulate a 2s delay...
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

	}



  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30" /> */}
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex-col w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-sky-300 shadow-xl shadow-slate-400 rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-slate-900"
              >
                {match.name}
              </Dialog.Title>
              <br />
              <div className="border-2 mx-1 mb-2 rounded-none font-mediumtext-amber-400/35">
                <div className=" flex justify-between w-30">
                  <h3 className="font-bold text-slate-800">
                    {match.sportName}
                  </h3>
                  <RefreshButton onClick={() => handleRefresh()} isLoading = {isLoading} />
                </div>

                <p className="mx-auto p-2 text-sm text-slate-600">
                  {match.location}
                </p>

                <div className="flex-col my-2 p-2 border-stone-400 border-2">
                    <div className="flex-row justify-between mt-1">
                      <p className="flex-initial font-semibold text-base">
                        {match.teams[0].name}
                      </p>
                      <p className="flex-1 font-medium text-base">
                        {match.score[match.teams[0].name]}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-initial font-semibold text-base">
                        {match.teams[1].name}
                      </p>
                      <p className="flex-1 font-medium text-base">
                        {match.score[match.teams[1].name]}
                      </p>
                    </div>
                  </div>
                  <p className="text-black font-semibold text-base">{match.story}</p>
                  <hr className="h-2 bg-stone-900"/>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center p-2 text-sm font-medium transition ease-linear text-cyan-200 bg-blue-500 hover:bg-blue-700 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
