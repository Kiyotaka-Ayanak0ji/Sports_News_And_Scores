import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Article } from "../../context/articles/types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useParams, useNavigate } from "react-router";

export default function ArticleId() {
  const [article, setArticle] = useState<Article>({
    id: 0,
    title: "",
    summary: "",
    content: "",
    thumbnail: "",
    date: new Date().toDateString(),
    sport: {
      id: 0,
      name: "",
    },
    teams: [],
  });

  let navigate = useNavigate();
  let {articleId} = useParams();
  console.log("articleId in Article.tsx: ", articleId);
  
  useEffect(() => {
    fetchArticle(articleId);
  }, [articleId]);

  const fetchArticle = async (id: string | undefined) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const data = await response.json();

      setArticle(data);
      console.log("article in fetch : ", article);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  
  const [,setIsOpen] = useState(false);
  
  function closeModal() {
    setIsOpen(false);
    navigate("../");
  }

  return (
    <Transition show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
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
            {/* <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" /> */}
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
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
            <div className="inline-block items-center w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="font-xl text-stone-900 text-lg leading-6"
              >
                {article.title}
              </Dialog.Title>
              <div className='flex w-full h-4/5'>
                <img src={article.thumbnail} alt='bad-img' className='ml-3 mr-3 h-20 w-11/12 rounded-md lg:rounded-none'/>
                <p className="flex mt-2 text-sm/6 text-white/50">
                  {article.content}
                </p>
              </div>
              <button
                onClick={() => {
                  closeModal();
                }}
                id="readToggle"
                style={{ marginLeft: "300px" }}
                className="inline-flex justify-center rounded-md border border-transparent hover:bg-blue-600/50 bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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