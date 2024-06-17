import React, { useState } from "react";
import { News } from "../../types/articles";
import { useNewsState } from "../../context/news/context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchPreferences } from "../../context/user/actions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTeamState } from "../../context/teams/context";
import { Team } from "../../types/matches";
import { isAuth } from "../dashboard/Settings";
import { toast } from "react-toastify";

interface Props {
  filter: string;
  sortType: string;
}

interface UserPreferences{
  SelectedSports: string[],
  SelectedTeams: string[]
}

interface Data {
  preferences: UserPreferences,
  errors? : string
}

export default function ArticleList(props: Props) {
  const state: any = useNewsState();
  const { isLoading, isError, errorMessage } = state;
  
  let { news } = state;

  const [newsState, setNewsState] = useState(news);
  const [likedNews, setLikeNewsState] = useState<number[]>([]);

  const teamState: any = useTeamState();
  const { teams } = teamState;

  if (props.sortType && props.sortType !== "Sort By: ") {
    if (props.sortType === "Date") {
      news = news.sort((a: News, b: News) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if (props.sortType === "Title") {
      news = news.sort((a: News, b: News) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (props.sortType === "Sport Type") {
      news = news.sort((a: News, b: News) => {
        if (a.sport.name < b.sport.name) {
          return -1;
        }
        if (a.sport.name > b.sport.name) {
          return 1;
        }
        return 0;
      });
    } else if (props.sortType === "Favourites") {
      const likesArticles = localStorage.getItem("likeArticles");
      if (likesArticles) {
        const likesArticlesArray = JSON.parse(likesArticles);
        news = news.filter((newsItem: News) => {
          return likesArticlesArray.includes(newsItem.id);
        });
      }
    }
  }

  const applyFilter = (newsToSort: News[]) => {
    if (props.sortType === "Date") {
      return newsToSort.sort((a: News, b: News) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if (props.sortType === "Title") {
      return newsToSort.sort((a: News, b: News) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (props.sortType === "Sport Type") {
      return newsToSort.sort((a: News, b: News) => {
        if (a.sport.name < b.sport.name) {
          return -1;
        }
        if (a.sport.name > b.sport.name) {
          return 1;
        }
        return 0;
      });
    } else if (props.sortType === "Favourites") {
      const likesArticles = localStorage.getItem("likeArticles");
      if (likesArticles) {
        const likesArticlesArray = JSON.parse(likesArticles);
        return newsToSort.filter((newsItem: News) => {
          return likesArticlesArray.includes(newsItem.id);
        });
      }
    }
  };

  const [ isopen , setIsOpen ] = useState(false); 

  const settingNewsState = async () => {
    if (isAuth) {
      const data:Data = fetchPreferences();
      if (data && !data?.errors) {
        if (Object.keys(data?.preferences).length) {
          if (props.filter) {
            setNewsState([]);
            let filterNews: any[] = [];

            let filterBySport = news.filter((newsItem: any) => {
              return newsItem.sport.name === props.filter;
            });

            const teamsForSelectedSport = teams.filter((team: Team) => {
              return team.plays === props.filter;
            });

            if (
              teamsForSelectedSport.some((team: Team) => {
                return data.preferences.SelectedTeams.includes(team.name);
              })
            ) {
              teamsForSelectedSport.forEach((team: Team) => {
                if (data?.preferences?.SelectedTeams.includes(team.name)) {
                  filterBySport.forEach((newsItem: any) => {
                    if (
                      newsItem.teams.some((teamObj: any) => {
                        return teamObj.name === team.name;
                      })
                    ) {
                      filterNews.push(newsItem);
                    }
                  });
                }
              });
            } else {
              filterNews.push(...filterBySport);
            }
            if (props.sortType && props.sortType !== "Sort By: ") {
              setNewsState(applyFilter([...new Set(filterNews)]));
            } else {
              setNewsState([...new Set(filterNews)]);
            }
          } else {
            if (
              data?.preferences?.SelectedSports.length &&
              data?.preferences?.SelectedTeams.length
            ) {
              let filterNews: any[] = [];
              data?.preferences?.SelectedSports.forEach((sport: string) => {
                let filterNewsBySport = news.filter((newsItem: any) => {
                  return newsItem.sport.name === sport;
                });

                const teamsForSelectedSport = teams.filter((team: Team) => {
                  return team.plays === sport;
                });

                if (
                  teamsForSelectedSport.some((team: Team) => {
                    return data.preferences.SelectedTeams.includes(team.name);
                  })
                ) {
                  teamsForSelectedSport.forEach((team: Team) => {
                    if (data?.preferences?.SelectedTeams.includes(team.name)) {
                      filterNewsBySport.forEach((newsItem: any) => {
                        if (
                          newsItem.teams.some((teamObj: any) => {
                            return teamObj.name === team.name;
                          })
                        ) {
                          filterNews.push(newsItem);
                        }
                      });
                    }
                  });
                } else {
                  filterNews.push(...filterNewsBySport);
                }
              });
              if (props.sortType && props.sortType !== "Sort By: ") {
                setNewsState(applyFilter([...new Set(filterNews)]));
              } else {
                setNewsState([...new Set(filterNews)]);
              }
            } else if (data?.preferences?.SelectedSports.length) {
              setNewsState(
                news.filter((newsItem: any) => {
                  return data?.preferences.SelectedSports.includes(
                    newsItem.sport.name
                  );
                })
              );
            } else if (data?.preferences?.SelectedTeams.length) {
              let filterNews: any[] = [];
              news.forEach((newsItem: any) => {
                newsItem.teams.forEach((team: any) => {
                  if (data.preferences.SelectedTeams.includes(team.name)) {
                    filterNews.push(newsItem);
                  }
                });
              });
              setNewsState(filterNews);
            } else {
              setNewsState(news);
            }
          }
        } else {
          if (props.filter) {
            setNewsState(
              news.filter((newsItem: any) => {
                return newsItem.sport.name === props.filter;
              })
            );
          } else {
            setNewsState(news);
          }
        }
      } else {
        if (props.filter) {
          setNewsState(
            news.filter((newsItem: any) => {
              return newsItem.sport.name === props.filter;
            })
          );
        } else {
          setNewsState(news);
        }
      }
    } else {
      if (props.filter) {
        setNewsState(
          news.filter((newsItem: any) => {
            return newsItem.sport.name === props.filter;
          })
        );
      } else {
        setNewsState(news);
      }
    }
  };

  const handleLikes = (id: number) => {
    if (likedNews.length === 0){
      setLikeNewsState([id]);
    }
    else if(!likedNews.includes(id)){
      const idx = likedNews.indexOf(id);
      (idx > -1)? likedNews.splice(idx,1):"";
    }
    else{
      likedNews.push(id);
    }
    localStorage.setItem("likedNews",JSON.stringify(likedNews));
  }

  const getFormatedDate = (date: string) => {
    const newDate = new Date(date);
    const formatDate = newDate.toDateString();
    return `${formatDate}`;
  };

  useEffect(() => {
    settingNewsState();
    const liked = localStorage.getItem("likeArticles");
    if (liked) {
      setLikeNewsState(JSON.parse(liked));
    }
  }, [isopen, isLoading, props]);

  if (news.length === 0 && isLoading) {
    return (
      <span>
        <p className="text-l text-stone-600">
          Loading...
        </p>
        <progress value={10} aria-busy={false}/>
      </span>      
    );
  }

  if (isError) {
    toast.error(`${errorMessage}`);
  }

  if (
    (localStorage.getItem("likeArticles") == null || newsState?.length === 0) &&
    props.sortType === "Favourites"
  ) {
    return (
      <span className="ml-8 dark:text-white dark:bg-gray-700">
        No favourite news for selection
      </span>
    );
  }

  if (newsState?.length === 0) {
    return (
      <div>
        <progress value={10} aria-busy={true} />
        <p className="text-center mt-2">Searching for Articles</p>
        <p className="font-bold text-center mx-2">OR</p>
        <p className="text-center">No Article for this Selection</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto dark:bg-gray-700 h-[75vh] relative bottom-0">
      {!isLoading &&
        newsState?.map((newsItem: News) => {
          return (
            <div
              aria-busy={false}
              key={newsItem.id}
              className="flex justify-between w-full px-4 my-2"
            >
              <div className="border rounded-md w-full dark:hover:bg-gray-600 hover:bg-slate-200 duration-100 transition-colors dark:bg-gray-800 bg-white flex justify-between items-center">
                <div className="px-4">
                  <div className="flex mt-3 justify-between">
                    <p className="text-gray-700 dark:text-white">
                      {newsItem.sport.name}
                    </p>
                    <button
                      className="mx-2"
                      onClick={() => handleLikes(newsItem.id)}
                    >
                      {likedNews.includes(newsItem.id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 47.5 47.5"
                          id="heart"
                          className="h-6 w-6 text-red-500 duration-250 cursor-pointer"
                        >
                          <g
                            clipPath="url(#a)"
                            transform="matrix(1.25 0 0 -1.25 0 47.5)"
                          >
                            <path
                              fill="#dd2e44"
                              d="M3.067 25.68c0 8.799 12.184 12.06 15.933 1.874 3.749 10.186 15.933 6.925 15.933-1.874C34.933 16.12 19 3.999 19 3.999S3.067 16.12 3.067 25.68"
                            ></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          id="heart"
                          className="h-6 w-6"
                        >
                          <path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  <h2 className="my-1 dark:text-white text-gray-800 text-2xl font-bold">
                    {newsItem.title}
                  </h2>
                  <div className="flex">
                    {newsItem.teams.length !== 0 ? (
                      <span className="font-bold mr-2">Team : </span>
                    ) : (
                      ""
                    )}
                    <span>
                      {newsItem.teams
                        .map((item: any) => {
                          return ` ${item.name} `;
                        })
                        .join(" Vs ")}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-gray-100">
                    {newsItem.summary.substring(0, 200)}...
                  </p>
                  <div className="flex justify-between my-1">
                    <p className="font-bold text-gray-500">
                      {getFormatedDate(newsItem.date?.substring(0, 10))}
                    </p>
                    <Link to={`/articles/${newsItem.id}`}>
                      <p className="underline hover:text-blue-600 transiton duration-400">
                        Read more...
                      </p>
                    </Link>{" "}
                  </div>
                </div>

                <div className="w-4/12">
                  <img
                    src={newsItem.thumbnail}
                    alt="thumbnail"
                    className="ml-auto h-48 w-48"
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
