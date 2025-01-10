import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMarketNews } from "../controller/controller";
import { useNavigate } from "react-router-dom";

export default function News() {
  const [news, setNews] = useState();
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const marketNews = await getMarketNews();
      const recentNewsSorted = marketNews.response.sort((a, b) => b.id - a.id);
      const mostRecentNews = recentNewsSorted;
      setNews(mostRecentNews);
      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading) <h1> return Loading . . . </h1>;

  return (
    <div>
      <Navbar />
      News
      {console.log(news)}
      <ul>
        {news &&
          news.map((news, index) => (
            <li
              key={index}
              className={`text-left ${
                index % 2 === 0 ? " bg-sky-50 " : "bg-white"
              } hover:font-bold m-2`}
            ><a href={news.url}>

              {new Date(news.datetime).toLocaleTimeString() +
                " " +
                news.headline}
                </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
