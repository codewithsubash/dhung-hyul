import React, { useState } from "react";
import { Calendar, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetPublicEventDetailQuery } from "../../../../store/services/publicApi";
import { Box } from "@mui/material";
import ReactHtmlParser from "html-react-parser";
import BlogDetailSkeleton from "../../Blog/components/BlogDetailSkeleton";

const EventDetailBody = () => {
  const [email, setEmail] = useState("");
  const { slug } = useParams();
  const {
    data: eventDetail,
    isLoading: loadingEvents,
    isFetching: fetchingEvents,
  } = useGetPublicEventDetailQuery(slug);

  const handleReserve = () => {
    if (email) {
      console.log("Reserved with email:", email);
      alert("Reservation submitted!");
      setEmail("");
    }
  };

  if (loadingEvents || fetchingEvents) return <BlogDetailSkeleton />;

  return (
    <div className="relative">
      <div className="relative w-full h-[400px] md:h-[480px] rounded-b-3xl overflow-hidden">
        <img
          src={eventDetail?.image?.secureUrl}
          alt={eventDetail?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {eventDetail?.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:items-start">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-12">
            <div
              sx={{ color: "#374151", lineHeight: 1.7 }}
              className="rich-text-content"
            >
              {ReactHtmlParser(eventDetail?.description)}
            </div>
          </div>

          {/* Sidebar - Right Column (Sticky) */}
          <div className="lg:col-span-1 sticky top-8">
            <div className=" space-y-6">
              {/* Event Details Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Event Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Date:</p>
                      <p className="text-gray-900 font-medium">
                        September 15, 2023
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Location:</p>
                      <p className="text-gray-900 font-medium">
                        123 Example Street
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reserve a Spot Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Reserve a Spot
                </h3>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleReserve}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                  >
                    Reserve
                  </button>
                </div>
              </div>

              {/* Follow Us Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailBody;
