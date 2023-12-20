import { useState, useEffect } from "react";
import Games from "./Games";
import Loading from "./Loading";
import importedData from "../Js/importedData";
import { useContextGlobally } from "./StateProvider";

function GameMain() {
  const { tag, genersData } = importedData;
  const { filterdData, filter, allGames, gameTitle } = useContextGlobally();
  const [order, setOrder] = useState("");

  useEffect(() => {
    //Listen for changes in the 'order' state
    if (order == "nameAscending") {
      filter(filterdData, "name", "Ascending");
      //Apply filter with ascending order by name
    } else if (order == "nameDescending") {
      filter(filterdData, "name", "Descending");
      //Apply filter with descending order by name
    } else if (order == "dateAscending") {
      filter(filterdData, "date", "Ascending");
      //Apply filter with ascending order by date
    } else if (order == "dateDescending") {
      filter(filterdData, "date", "Descending");
      //Apply filter with descending order by date
    } else if (order == "popularityAscending") {
      filter(filterdData, "popularity", "Ascending");
      //Apply filter with ascending order by popularity
    } else if (order == "popularityDescending") {
      filter(filterdData, "popularity", "Descending");
      //Apply filter with descending order by popularity
    } else if (order == "ratingAscending") {
      filter(filterdData, "rate", "Ascending");
      //Apply filter with ascending order by rate(seems like it should be by rating)
    } else if (order == "ratingDescending") {
      filter(filterdData, "rate", "Descending");
      //Apply filter with descending order by rate(seems like it should be by rating)
    } else {
      return;
    }
  }, [order]);

  return (
    <>
      {/* Title Wrapper  */}
      <div className="flex container pt-20 mt-7 md:mt-0  items-center  mx-auto text-center md:text-start w-[85%] md:w-full  ml-[8%] md:ml-10 mb-1 md:mb-3  ">
        <h1 className="text-2xl  md:text-6xl font-bold text-white  ">
          <div className="text-3xl md:text-6xl py-1 px-2 md:px-5 font-bold rounded-full   text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 ">
            {gameTitle} Games
          </div>
        </h1>
        <div className="text-xs  md:text-lg opacity-80  pt-2 md:pt-5   text-slate-400">
          ({filterdData?.length} games)
        </div>
      </div>

      {/* Filter and sorting options */}
      <div className="  container  gap-2 mx-auto w-[90%]  box-border  flex  md:w-96 justify-center md:justify-start  md:ml-10">
        {/* Platform filter */}
        <select
          name="platform"
          id=""
          className="bg-slate-800 hover:cursor-pointer text-white text-[12px] md:text-[14px] bg-gradient-to-r from-blue-500 to-blue-800 w-28 md:w-32  h-9  rounded-full pl-5 transform transition-transform duration-300 hover:scale-110 "
          onChange={(e) => filter(allGames, "platform", e.target.value)} //apply filter by platform when selected
        >
          {/* Platform options */}
          <option className="hidden">Platform</option>
          <option value="PC">PC</option>
          <option value="PlayStation 4">Playstation</option>
          <option value="Xbox One">Xbox</option>
          <option value="iOS">iOS</option>
          <option value="Android">Android</option>
          <option value="Linux">Linux</option>
          <option value="Nintendo Switch">Nintendo</option>
        </select>

        {/* Order by filter */}
        <select
          name="platform"
          id=""
          className="bg-slate-800 hover:cursor-pointer text-white text-[12px]  bg-gradient-to-r from-blue-500 to-blue-800 w-28 md:w-32  h-9  rounded-full pl-5 md:text-[14px] transform transition-transform duration-300 hover:scale-110"
          onChange={(e) => setOrder(e.target.value)}
        >
          {/* Order by options */}
          <option className="hidden" value="">
            Order By
          </option>
          <option value="nameAscending">Name A-Z</option>
          <option value="nameDescending">Name Z-A</option>
          <option value="dateAscending">Date ↑</option>
          <option value="dateDescending">Date ↓</option>
          <option value="popularityAscending">Popularity ↑</option>
          <option value="popularityDescending">Popularity ↓</option>
          <option value="ratingAscending">Rating ↑</option>
          <option value="ratingDescending">Rating ↓</option>
        </select>
      </div>

      {/* Filter by tag */}
      <div className=" text-white  overflow-x-scroll md:overflow-hidden  ">
        <div className="w-full  md:w-screen mx-auto  md:flex    justify-center">
          <div className=" overflow-x-scroll md:overflow-hidden md:my-5   md:w-[22%] lg:w-[14%]  flex md:block ">
            <div className="text-white   text-xl font-medium flex gap-4 items-center ml-3 py-1 px-5 w-full  rounded-full   ">
              <div>Geners</div>
              <div className="w-9 ">
                <img src={tag} alt="" />
              </div>
            </div>
            {genersData?.map((single) => {
              return (
                <div
                  key={single.name}
                  className=" transition hover:cursor-pointer hover:scale-105  flex items-center text-center  justify-center md:justify-start  pr-3 pl-5  mx-3 my-3 space-y-1  rounded-full"
                  onClick={(e) =>
                    filter(allGames, "gener", single.gener, single.name)
                  }
                >
                  <div className="flex  w-[55px]">
                    <div className="text-3xl ">{single.emoji}</div>
                  </div>

                  <div className="pb-3 ">{single.name}</div>
                </div>
              );
            })}
          </div>
          <div className="w-full  md:my-5 flex justify-center md:w[80%] overflow-hidden  pb-5 mb-5">
            {filterdData?.length >= 1 ? <Games /> : <Loading />}
          </div>
        </div>
      </div>
    </>
  );
}

export default GameMain;
