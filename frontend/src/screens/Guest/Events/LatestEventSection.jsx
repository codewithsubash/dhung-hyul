import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import LatestEventCard from "./components/LatestEventCard";
import { useLazyGetPublicEventListQuery } from "../../../store/services/publicApi";
import CardSkeleton from "../Blog/components/CardSkeleton";
const LatestEventSection = () => {
  const page = 1;
  const perPage = 10;

  const [
    listEvents,
    { data: eventList, isLoading: loadingEvents, isFetching: fetchingEvents },
  ] = useLazyGetPublicEventListQuery();

  React.useEffect(() => {
    listEvents({
      page,
      limit: perPage,
    });
  }, [page, perPage, listEvents]);

  return (
    <div className="relative min-h-screen py-16 px-5 flex flex-col items-center  overflow-hidden">
      <div className="mb-12 mr-[763px]">
        <p className="text-teal-600 font-medium mb-3">Latest Events</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Key Upcoming Events <br /> You Won't Want to Miss
        </h2>
      </div>

      {/* Decorative blurred shapes */}
      <div className="absolute top-[-100px] left-[-80px] w-72 h-72 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-80px] right-[-100px] w-96 h-96  rounded-full filter blur-3xl opacity-20"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  max-w-9xl mx-auto px-4 md:px-6 lg:px-8">
        {loadingEvents || fetchingEvents
          ? Array.from({ length: eventList?.data?.length }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : eventList?.data?.map((event, index) => (
              <LatestEventCard key={event.slug} eventList={event} />
            ))}
      </div>
    </div>
  );
};

export default LatestEventSection;
