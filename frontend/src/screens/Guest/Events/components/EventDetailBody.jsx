import React from "react";
import { Calendar, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useCreateEventRegistrationAndUserMutation,
  useGetPublicEventDetailQuery,
} from "../../../../store/services/publicApi";
import ReactHtmlParser from "html-react-parser";
import BlogDetailSkeleton from "../../Blog/components/BlogDetailSkeleton";
import { toast } from "react-toastify";

const EventDetailBody = () => {
  const { slug } = useParams();
  const {
    data: eventDetail,
    isLoading: loadingEvents,
    isFetching: fetchingEvents,
  } = useGetPublicEventDetailQuery(slug);

  const [createEvent, { isLoading: creatingEvent }] =
    useCreateEventRegistrationAndUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createEvent({
        name: data.name,
        email: data.email,
        phone: data.phone,
        event: eventDetail?._id,
      }).unwrap();

      toast.success("Registration successful!.");
      reset();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error?.data?.message ||
          "Failed to register for the event. Please try again."
      );
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
            <div className="rich-text-content text-gray-700 leading-relaxed">
              {ReactHtmlParser(eventDetail?.description || "")}
            </div>
          </div>

          {/* Sidebar - Right Column (Sticky) */}
          <div className="lg:col-span-1 sticky top-8">
            <div className="space-y-6">
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
                        {eventDetail?.date
                          ? new Date(eventDetail.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "September 15, 2023"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Location:</p>
                      <p className="text-gray-900 font-medium">
                        {eventDetail?.location || "123 Example Street"}
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <input
                        type="tel"
                        placeholder="Enter your phone"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: "Invalid phone number (10-15 digits)",
                          },
                        })}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />

                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={creatingEvent}
                      className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {creatingEvent ? "Reserving..." : "Reserve"}
                    </button>
                  </div>
                </form>
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
