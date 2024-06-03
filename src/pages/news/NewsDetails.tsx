import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Listbox, DialogTitle, DialogPanel, TransitionChild } from "@headlessui/react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNewsArticle } from "../../context/news/actions";
import { useNewsDispatch, useNewsState } from "../../context/news/context";
import { toast } from "react-toastify";
import { News } from "../../types/articles";

const NewsDetails = () => {
  
  let [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  let navigate = useNavigate();
  
  const dispatch = useNewsDispatch();
  const { articleID } = useParams();

  const id = Number(articleID);
  const news:News = fetchNewsArticle(dispatch,id);
  
  const [isError, setIsError] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string>("");

  function closeModal() {
    setIsOpen(false);
    navigate("../");
  }

  useEffect(() => {
    try{
      fetchNewsArticle(dispatch,id);
    }
    catch(error){
      setErrorMsg("Error fetching news articles !");
      console.log(error);
    }
  }, [articleID]);

  const getFormatedDate = (date: any) => {
    const newDate = new Date(date);
    const formatDate = newDate.toDateString();
    return `${formatDate}`;
  };

  if (isError) {
    toast.error(`${errorMsg}`);
    throw new Error(`${errorMsg}`);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative w-11/12 z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-600 p-6 text-left align-middle shadow-xl transition-all">
                    {isLoading ? (
                      <progress value={10} aria-busy={true} />
                    ) : (
                      <>
                        <DialogTitle
                          aria-busy={false}
                          as="h3"
                          className="text-xl text-left border-b border-gray-600 dark:border-gray-200 pb-2 font-bold leading-6 text-gray-900 dark:text-white"
                        >
                          {news.title}
                        </DialogTitle>
                        <div className="mt-2">
                          <img
                            src={news.thumbnail}
                            className="w-full h-56"
                            alt="thumbnail"
                          />

                          <div className="flex justify-between">
                            <p className="mt-2 text-md">
                              <span className="font-bold">Sport Catagory : </span>{" "}
                              {news.sport.name}
                            </p>{" "}
                            <p className="mt-2 text-md">
                              <span className="font-bold">End At : </span>
                              {getFormatedDate(news?.date?.substring(0, 10))}
                            </p>
                          </div>

                          <div className="flex relative my-2 items-center">
                            <span className="items-start absolute left-0 font-bold text-lg mr-2">
                                {news?.teams[0].name} 
                            </span>
                            <span className="items-start absolute left-0 font-bold text-lg mr-2">
                                {news?.teams[1].name} 
                            </span>
                          </div>

                          <div>
                            <p className="my-2 text-sm h-56 overflow-y-auto">
                              <span className="font-bold text-lg">
                                {news?.summary}
                              </span>
                              {news?.content}
                            </p>
                          </div>
                          <button
                            onClick={closeModal}
                            className="transition ease-in-out duration-300 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Close
                          </button>
                        </div>
                      </>
                    )}
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewsDetails;
