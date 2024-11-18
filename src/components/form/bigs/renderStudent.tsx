"use client";
import React, { useState, useEffect } from "react";
import { RequestHandler } from "@/src/app/utils/api";
import Loader from "@/components/atoms/loader";
import DataFetcher from "./renderObject";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface DataObject {
  [key: string]: string | number | DataObject | Array<any>;
}

interface DataFetcherProps {
  endpoint: string;
  title: string;
}

const DataStudent: React.FC<DataFetcherProps> = ({ endpoint, title }) => {
  const requestHandler = new RequestHandler();
  const [data, setData] = useState<DataObject[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<DataObject | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestHandler.get({
          method: "GET",
          path: endpoint,
        });
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const handleCardClick = (data: DataObject) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const handleModalClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === "modalBackground") {
      closeModal();
    }
  };

  const renderCards = (data: DataObject[] | null) => {
    if (!data) return null;

    return data.map((item, index) => {
      const img = item["Img"] as string;
      const lastName = item["LastName"] as string;
      const firstName = item["FirstName"] as string;
      const middleName = item["MiddleName"] as string;
      const sex = item["Sex"] as string;
      const faculty = item["Faculty"] as string;

      const fullName = `${firstName || ""} ${middleName || ""} ${
        lastName || ""
      }`.trim();

      return (
        <div
          key={index}
          className="card bg-white shadow-md rounded-lg p-6 m-4 cursor-pointer hover:shadow-xl transition-all duration-200"
          onClick={() => handleCardClick(item)}
        >
          {img && (
            <Image
              src={img}
              width={500}
              height={500}
              alt="Picture of the author"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border border-gray-200"
            />
          )}
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            {fullName}
          </h3>
          <p className="text-sm text-gray-600 text-center">{sex}</p>
          <p className="text-sm text-gray-600 text-center">{faculty}</p>
        </div>
      );
    });
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {title || "Visualisation des données"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderCards(data)}
      </div>

      {isModalOpen && selectedData && (
        <div
          id="modalBackground"
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center z-50  py-4 "
          onClick={handleModalClick}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-[70%] relative mx-[20px] h-[100%] "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={closeModal}
            >
              <IoClose />
            </button>
            <div className="h-[100%] overflow-hidden">
              <DataFetcher
                title=""
                endpoint="/recipe/activities-sectors-with-recipe"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataStudent;
