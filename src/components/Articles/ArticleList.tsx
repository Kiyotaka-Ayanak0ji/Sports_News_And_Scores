import { useArticlesState } from "../../context/articles/context";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import { usePreferencesState, usePreferencesDispatch } from '../../context/preferences/context'
import { fetchPreferences } from '../../context/preferences/action'
import { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Article } from "../../context/articles/types";
import { toast } from 'react-toastify';

export default function ArticleList(){
  const articleDispatch = useArticlesDispatch();
  useEffect(() => {
    fetchArticles(articleDispatch);
  }, [articleDispatch]);

  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  const preferenceDispatch = usePreferencesDispatch();
  
  useEffect(() => {
    fetchPreferences(preferenceDispatch);
  }, [preferenceDispatch]);

  const preferencesState = usePreferencesState();
  const { preferences } = preferencesState;

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("Sort By: Date");
  
  const authenticated = !!localStorage.getItem("authToken");
  
  var categories = [
    "All",
    "Basketball",
    "American Football",
    "Rugby",
    "Field Hockey",
    "Table Tennis",
    "Cricket"
  ];

  const sortCategories = [
    "Sort By: Date",
    "Sort By: Title",
  ];

  let filtered;
   if(selectedCategory === "All" ){
    filtered = articles;
   }else{
    filtered = articles.filter((article : any) => {
      return article.sport.name === selectedCategory;
    })
  }

  let sortedArticles = filtered;

  let fav = articles.filter((article : Article) => {
    if(article.teams.length !== 0){
      let ans1 = preferences.preferences.selectedTeams.includes(article.teams[0].name || article.teams[1].name)
      let ans2 = (article.teams.length > 1) ? preferences.preferences.selectedTeams.includes(article.teams[1].name) : false
      let ans3 = preferences.preferences.selectedSports.includes(article.sport.name)
      return ans1 || ans2 || ans3
    }
  })

  const preferredSport = preferences.preferences.selectedSports
  const preferredTeams = preferences.preferences.selectedTeams  
  if(authenticated){
    var favSportCategories = ["All", ...preferredSport]
    var favTeamCategories = ["All", ...preferredTeams]
  }else{
    var favSportCategories = ["All"]
    var favTeamCategories = ["All"]
  }

  const [selectedFavSportCategory, setSelectedFavSportCategory] = useState("All");
  const [selectedFavTeamCategory, setSelectedFavTeamCategory] = useState("All");

  let filteredfav;
  if(selectedFavSportCategory === "All" && selectedFavTeamCategory === "All"){
    filteredfav = fav;
  }else if(selectedFavSportCategory === "All" && selectedFavTeamCategory !== "All"){
    filteredfav = fav.filter((article : Article) => {
      if(article.teams.length === 1){
        return article.teams[0].name === selectedFavTeamCategory
      }else{
        return article.teams[0].name === selectedFavTeamCategory || article.teams[1].name === selectedFavTeamCategory
      }
    })
  }else if(selectedFavSportCategory !== "All" && selectedFavTeamCategory === "All"){
    filteredfav = fav.filter((article : Article) => {
      return article.sport.name === selectedFavSportCategory;
    })
  }
  else{
    filteredfav = fav.filter((article : Article) => {
      if(article.teams.length === 1){
        return article.teams[0].name === selectedFavTeamCategory && article.sport.name === selectedFavSportCategory
      }else{
        return (article.teams[0].name === selectedFavTeamCategory || article.teams[1].name === selectedFavTeamCategory) && article.sport.name === selectedFavSportCategory
      }
    })
  }

  const handleFavSportCategoryChange = (category:any) => {
    setSelectedFavSportCategory(category);
  };

  const handleFavTeamCategoryChange = (category:any) => {
    setSelectedFavTeamCategory(category);
  };

  if(selectedSort === "Sort By: Date"){
    sortedArticles = filtered.sort((a: any, b: any) => {
      return a.date - b.date;
    })
  }else if(selectedSort === "Sort By: Title"){
    sortedArticles = filtered.sort((a: any, b: any) => {
      return a.title.localeCompare(b.title);
    })
  }

  const handleSortChange = (sort:any) => {
    setSelectedSort(sort);
  }


  const handleCategoryChange = (category:any) => {
    setSelectedCategory(category);
    console.log("Selected Category in handle: ", category);
  };

  if (articles.length === 0 && isLoading) {
    return(
      <div className="flex items-center justify-center">
        <p className="text-center justify-center">
          Loading...
        </p>
        <progress className="transition ease-linear" value={10} aria-busy={true} />
      </div>
    )
  }

  if (isError) {
    toast.error(errorMessage,{
      pauseOnHover: false,
      theme: "colored",
      delay: 5000,
      progress: undefined,
      hideProgressBar: false,
      pauseOnFocusLoss: true,
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const getFormattedDate = (d:string) => {

    const date = d.slice(0,10);

    const year = d.slice(0,4);
    
    const month = Number(date[5]+date[6]);

    const date_val = date[8]+date[9];

    const mapping:Record<number,string> = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec"
    }

    return date_val + ' ' + mapping[month] + ' ' + year;
  }

  const [,setIsOpen] = useState(false);

  return (
    <div className="container auto flex gap-12">
      <div className="flex justify-end w-11/12 mx-auto my-2">
        <select 
        className={"container flex-col overflow-scroll"}>
          <div className={'border-2 border-amber-400'}>
            {categories.map((category) => (
              <option
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={
                  category === selectedCategory
                    ? "active bg-slate-400 hover:bg-slate-500 rounded-lg"
                    : "p-2 rounded-md bg-blue-300 hover:bg-blue-500"
                }
              >
                {category}
              </option>
            ))}
          </div>
        </select>
        <select 
        className="justify-between py-2 px-5 text-stone-600 bg-slate-400 rounded-lg">
          <div className={'border-2 border-amber-400'}>
            {sortCategories.map((sortCategory) => (
              <option
              key={sortCategory}
              onClick={() => handleSortChange(sortCategory)}
                className={
                  sortCategory === selectedSort
                    ? "active bg-slate-500 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                    : "p-2 rounded-md hover:bg-gray-400 dark:hover:bg-blue-400 bg-slate-800"
                }
              >
                {sortCategory}
              </option>
            ))}
          </div>
        </select>
        <div className="bg-slate-300 rounded-lg mx-2 p-3 text-stone-900">
          <FunnelIcon className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col overflow-y-scroll max-h-[525px] grid-cols-2 gap-2 p-2 lg:grid container mx-auto rounded-lg bg-orange-200">
        {filtered.length === 0 && !isLoading && (
          <div className="flex items-center justify-center">
            <p className="text-center justify-center">
              Loading...
            </p>
            <progress className="transition ease-linear" value={10} aria-busy={true} />
          </div>
        )}
        {sortedArticles.map((article: Article) => {
          return (
            <div className="flex-auto flex justify-center">
              <div className="max-w-sm rounded shadow-lg flex-auto">
                <img
                  className="flex items-center justify-center h-48 w-full object-cover"
                  src={article.thumbnail}
                  alt="Article thumbnail"
                />

                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {article.title}
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {getFormattedDate(article.date)}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {article.sport.name}
                    </span>
                  </div>
                  
                  <p className="p-2 text-gray-700 text-base">
                    {article.summary}
                  </p>

                  <Link to={(authenticated) ? `/account/articles/${article.id}` : `/view/articles/${article.id}`}>
                    <button
                      id="readToggle"
                      onClick={() => setIsOpen(true)}
                      className="mt-2 flex text-center rounded-md border border-transparent bg-blue-600 px-2 py-1 mr-2 text-sm 
                      font-medium text-cyan-400 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Read More...
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    <div className="w-2/12 mx-auto my-0">
        {/* Favourites */}
        
        <h1 className="text-gray-900 text-center font-bold text-3xl">
          Favourites
        </h1>

        <label className="text-gray-700 text-base">
          Sport: 
        </label>
        
        <select
          value={selectedFavSportCategory}
          onChange={(e) => handleFavSportCategoryChange(e.target.value)}
          className="justify-between py-2 px-5 text-stone-600 bg-slate-400 rounded-lg"
        >
          {favSportCategories.map((category1) => (
            <option
              key={category1}
              onClick={() => handleFavSportCategoryChange(category1)}
              className={
                category1 === selectedFavSportCategory
                  ? "active bg-slate-500 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                  : "p-2 rounded-md hover:bg-gray-400 dark:hover:bg-blue-400"
              }
            >
              {category1}
            </option>
          ))}
        </select>
        <label className="text-gray-700 text-base">
          Team: 
        </label>

        <select
          value={selectedFavTeamCategory}
          onChange={(e) => handleFavTeamCategoryChange(e.target.value)}
          className="justify-between py-2 px-5 text-amber-400/90 bg-grey-400 rounded-lg"
        >
          {favTeamCategories.map((category2) => (
            <option
              key={category2}
              onClick={() => handleFavTeamCategoryChange(category2)}
              className={
                category2 === selectedFavTeamCategory
                  ? "active bg-slate-500 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                  : "p-2 rounded-md hover:bg-gray-400 dark:hover:bg-blue-400 bg-slate-800"
              }
            >
              {category2}
            </option>
          ))}
        </select>
      </div>

    <div className="flex-col overflow-y-scroll max-h-[510px] gap-2 p-2 lg:grid container mx-auto rounded-lg bg-zinc-500">
      {filteredfav.length === 0 && !isLoading && (
          <span>No articles available</span>
        )}
        {filteredfav.map((article: any) => {
          return (
            <div className='flex-row dark:bg-zinc-600 dark:text-cyan-400 text-neutral-700 bg-white shadow-lg shadow-slate-400'>
              <div className='mt-2 mb-2 w-11/12 h-40'>
                <h2 className='absolute left-0 flex text-lg font-bold text-black'>
                  {article.title}
                </h2>
                <p className='flex absolute left-0 text-base text-slate-500'>
                  {article.summary.substring(0,200)}
                </p>
                <p className='absolute left-0 flex font-light text-sm'>
                  {article.sport.name}
                  {getFormattedDate(article.date)}
                </p>
                <a
                  onClick={() => setIsOpen(false)} 
                  className="inline-flex rounded-md border border-transparent bg-blue-600 px-2 py-1 mr-2 text-sm 
                  font-medium text-cyan-400 hover:bg-blue-500 
                  focus:outline-none focus-visible:ring-2 
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Read More...
                </a>
              </div>
              
              <div className='absolute right-0 h-auto w-auto'>
                <img 
                  src={article.thumbnail} 
                  alt='bad-img' 
                  className='h-14 w-10'/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}