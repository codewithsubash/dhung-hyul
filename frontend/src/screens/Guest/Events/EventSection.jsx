import React from "react";
import EventCard from "./components/EventCard";
import { useLazyGetPublicEventListQuery } from "../../../store/services/publicApi";
import { Link } from "react-router-dom";

const EventSection = () => {
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

  const isLoading = loadingEvents || fetchingEvents;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-5 md:px-10">
      {/* Width Container */}
      <div className="max-w-9xl mx-auto">
        {/* Shared Padding */}
        <div className="px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p className="text-teal-600 font-medium mb-3">Featured Events</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Key Upcoming Events <br /> You Won't Want to Miss
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE (Large Card or Skeleton) */}
            {isLoading ? (
              <div className="lg:row-span-2">
                <EventCardSkeleton size="large" />
              </div>
            ) : (
              eventList?.data?.length > 0 && (
                <div className="lg:row-span-2">
                  <EventCard event={eventList?.data[0]} size="large" />
                </div>
              )
            )}

            {/* RIGHT SIDE (Two Small Cards) */}
            <div className="flex flex-col gap-9">
              {isLoading ? (
                <>
                  <EventCardSkeleton size="small" />
                  <EventCardSkeleton size="small" />
                </>
              ) : (
                <>
                  {eventList?.data?.[1] && (
                    <EventCard event={eventList.data[1]} size="small" />
                  )}
                  {eventList?.data?.[2] && (
                    <EventCard event={eventList.data[2]} size="small" />
                  )}
                </>
              )}
            </div>
          </div>

          {/* More Events Button */}
          <Link
            to="/events"
            className="mt-12 flex justify-start cursor-pointer w-fit"
          >
            <button className="px-8 py-3 cursor-pointer bg-green-800 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition">
              More Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventSection;

const EventCardSkeleton = ({ size = "small" }) => {
  const isLarge = size === "large";

  return (
    <div
      className={`bg-white rounded-2xl shadow-md overflow-hidden animate-pulse ${
        isLarge ? "h-[380px]" : "h-[180px]"
      }`}
    >
      {/* Image area */}
      <div className={`${isLarge ? "h-2/3" : "h-full"} bg-gray-300`} />

      {isLarge && (
        <div className="p-5 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      )}
    </div>
  );
};
