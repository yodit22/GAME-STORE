import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import requests from "../Js/requests";
import axios from "../Js/axios";
import Filters from "./Filters";
import Search from "./Search";
import { useContextGlobally } from "./StateProvider";

const API_KEY = import.meta.env.VITE_API_KEY;

function Collector() {
  const { setAllGames, toogle } = useContextGlobally();

  useEffect(() => {
    const fetchData = async () => {
      //   const response = await axios.get(
      //     `/games?key=${API_KEY}&dates=2022-01-01,2023-01-01`
      //   );

      const responses = await Promise.all(
        requests.map((request) => axios.get(request.url))
      );
      let concatenatedData = [];

      responses.forEach((response) => {
        let newData = response.data.results;

        concatenatedData = [...concatenatedData, ...newData];
      });
      setAllGames(concatenatedData);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-800  to-red-950 overflow-hidden  ">
      {toogle && <Sidebar />}
      <Search />
      <Filters />
    </div>
  );
}

export default Collector;
