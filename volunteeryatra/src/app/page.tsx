"use client";

import Search from "../../components/SearchBar/Search";
import {
  get_opportunities,
  query_opportunities,
} from "../../lib/apis/opportunities/Opportunity";

import { useEffect, useState } from "react";
import { Opportunity } from "../../interfaces/interfaces";
import Card from "../../components/Opportunity/Card";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/Error/ErrorMessage";
export default function Home() {
  const [data, setData] = useState<Array<Opportunity>>([]);
  const [search, setSearch] = useState("");
  const [cacheSearch, setCacheSearch] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetch_opportunities = async () => {
    setLoading(true);
    const { success, data, error }: any = await get_opportunities();
    if (success) setData(data);
    else setError(error);
    setLoading(false);
  };

  const query = async () => {
    setLoading(true);

    if (cacheSearch[search]) {
      setData(cacheSearch[search]);
      console.log("cached result");
      setLoading(false);
      return;
    }

    const { success, data, error }: any = await query_opportunities(search);

    console.log(data);
    if (success) {
      setData(data);
      setCacheSearch((prev) => ({ ...prev, [search]: data }));
    } else {
      setError(error);
    }

    console.log("req made");
    setLoading(false);
  };

  useEffect(() => {
    fetch_opportunities();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => query(), 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="text-3xl text-green-600">
      <div className="body flex flex-col relative">
        <div className="search my-20 ">
          <Search setSearch={setSearch} />
          {data.length == 0 && (
            <div className="text-center text-black my-10">Nothing Matched!</div>
          )}
          {error && <ErrorMessage message={error} />}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap flex-col justify-center gap-10 m-auto md:px-10  md:flex-row  ">
            {data.map((data) => (
              <Card
                title={data.title}
                description={data.description}
                created_at={data.created_at}
                id={data.id}
                skills={data.skills}
                key={data.id}
                images={data.images}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
