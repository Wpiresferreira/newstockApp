import { useEffect, useState } from "react";
import { getAllCompanies } from "../controller/controller";

export default function SearchCompanies({doSetQuote}) {
  const [allCompanies, setAllCompanies] = useState([]);
  const [isLoadingAllCompanies, setIsLoadingAllCompanies] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterCompanies, setFilterCompanies] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await getAllCompanies();
      if (res.status > 201) {
        setIsLoadingAllCompanies(false);
        return;
      }
      setIsLoadingAllCompanies(false);
      setAllCompanies(res.response);
    }
    getData();
  }, []);

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilterCompanies([]);
    }
    if (searchValue.length > 0) {
      const listSorted = allCompanies.sort((a, b) => {
        if (a.ticker < b.ticker) {
          return -1;
        } else {
          return 1;
        }
      });
      const listFiltered = listSorted.filter(
        (company) =>
          (company.ticker + " " + company.profile.name).substring(
            0,
            searchValue.length
          ) === searchValue.toUpperCase() ||
          company.profile.name
            .substring(0, searchValue.length)
            .toUpperCase() === searchValue.toUpperCase()
      );
      setFilterCompanies(listFiltered ? listFiltered : []);
    }
  }, [searchValue, allCompanies]);

  function handleSearchValueChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSelectButton(e){
console.log(searchValue)
    // doSetQuote()
  }

  return (
    <>
      <div className="flex mt-3 m-2">
        <input
          className="border-2 grow rounded border-black p-2"
          type="text"
          value={searchValue}
          onChange={handleSearchValueChange}
          placeholder="type the ticker"
        ></input>
        <button
          onClick={handleSelectButton}
          className="mx-2 bg-sky-900 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
        >
          <span className="fa fa-plus-circle text-white mr-2"></span>Add
        </button>
      </div>
      <ul className="absolute">
        {filterCompanies.map((company, index) => (
          <li
            key={index}
            className={`text-left ${
              index % 2 === 0 ? " bg-sky-50 " : "bg-white"
            } hover:font-bold `}
            onClick={(e) => {
              handleAddButton(e.target.innerText);
            }}
          >
            {company.ticker + " " + company.profile.name}
          </li>
        ))}
      </ul>
    </>
  );
}
