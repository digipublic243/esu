"use client";
import React, { useState, useEffect } from "react";
import { RequestHandler } from "@/src/utils/api";
import Loader from "@/src/components/atoms/loader";

interface DataObject {
  [key: string]: string | number | DataObject | Array<any>;
}

interface DataFetcherProps {
  endpoint: string;
  title: string;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ endpoint, title }) => {
  const requestHandler = new RequestHandler();
  const [data, setData] = useState<DataObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const transformData = (
    obj: DataObject,
    parentKey: string = ""
  ): DataObject => {
    const result: DataObject = {};
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (Array.isArray(value)) {
        result[newKey] = value;
      } else if (typeof value === "object" && value !== null) {
        Object.assign(result, transformData(value as DataObject, newKey));
      } else {
        result[newKey] = value;
      }
    });
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestHandler.get({
          method: "GET",
          path: endpoint,
        });
        const transformedData = transformData(response.data);
        setData(transformedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const renderData = (data: DataObject | null) => {
    if (!data) return null;

    return Object.entries(data).map(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          <fieldset
            key={key}
            className="border-[0.5px] m-2.5 p-2.5 border-gray-400 rounded-md"
          >
            <legend className="text-lg font-medium text-primary mt-4">
              {key}
            </legend>
            <ul className="list-inside pl-6">
              {value.map((item, index) => (
                <li key={index} className="text-gray-600 mb-2">
                  {typeof item === "object"
                    ? renderData(item as DataObject)
                    : item}
                </li>
              ))}
            </ul>
          </fieldset>
        );
      }

      if (typeof value === "object" && value !== null) {
        return (
          <fieldset
            key={key}
            className="border-[0.5px] m-2.5 p-2.5 border-gray-400 rounded-md"
          >
            <legend className="text-lg font-medium text-primary mt-4">
              {"        "} {key}
            </legend>
            {renderData(value as DataObject)}
          </fieldset>
        );
      } else {
        return (
          <p
            key={key}
            className="border-[0.5px] m-2.5 p-2.5 border-gray-400 rounded-md"
          >
            <strong>{key}</strong>: {value}
          </p>
        );
      }
    });
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3 className="text-xl font-medium text-primary">
        {title || "Visualisation des donnée"}
      </h3>
      <div className="max-h-screen overflow-y-auto pl-8">
        {renderData(data)}
      </div>
    </div>
  );
};

export default DataFetcher;
