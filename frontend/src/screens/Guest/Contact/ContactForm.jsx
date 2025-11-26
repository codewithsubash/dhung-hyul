import React from "react";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";

import { Box, Button, Divider, Grid } from "@mui/material";
import {
  EmailOutlined,
  LocalPhoneOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import BaseTextField from "../../../components/Shared/Base/BaseTextField";
import { formHookInputHelper } from "../../../utils/formHookInputHelper";
import { useSubmitContactFormMutation } from "../../../store/services/publicApi";

const INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

export const ContactForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: INITIAL_STATE,
  });

  const [contactFormSubmission] = useSubmitContactFormMutation();

  const handleContactFormSubmission = async (data) => {
    try {
      const response = await contactFormSubmission(data).unwrap();
      toast.success(response.message);
      reset(INITIAL_STATE);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div id="contactUs" className="bg-white pt-16 pb-16">
      {/* ================= HEADER SECTION ================= */}
      <Grid container spacing={6} className="max-w-7xl mx-auto px-4">
        <Grid item size={{ xs: 12, md: 6 }}>
          <p className="text-green-700 font-semibold mb-2">Let's Talk</p>

          <h1 className="text-[42px] font-extrabold leading-tight mb-4">
            Reach Out, Lend a Hand, <br /> or Light the Way Forward
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
            in eros elementum tristique. Duis cursus, mi quis viverra ornare.
          </p>

          {/* FORM */}
          <Grid container spacing={3}>
            <Grid item size={{ xs: 12 }}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Please provide a Name.",
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    required
                    fullWidth
                    label="Name"
                    placeholder="Enter your name"
                  />
                )}
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please provide Email Address.",
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    required
                    fullWidth
                    label="Email"
                    placeholder="Enter your email"
                  />
                )}
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Please provide Phone number.",
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    required
                    fullWidth
                    type="phone"
                    label="Phone"
                    placeholder="Enter phone number"
                  />
                )}
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Controller
                name="subject"
                control={control}
                rules={{
                  required: "Please provide subject.",
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    required
                    fullWidth
                    label="Subject"
                    placeholder="Enter subject"
                  />
                )}
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Controller
                name="message"
                control={control}
                rules={{
                  required: "Please provide a message.",
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    required
                    fullWidth
                    multiline
                    rows={5}
                    label="Message"
                    placeholder="How can we help?"
                  />
                )}
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#1B5E20",
                  "&:hover": { backgroundColor: "#134A17" },
                  px: 2,
                  py: 1,
                }}
                onClick={handleSubmit(handleContactFormSubmission)}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={0} // hidden on xs
          md={1} // width for md
          className="hidden md:flex justify-center"
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "rgba(27, 94, 32, 0.5)" }} // green with 50% opacity
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 5 }}>
          <p className="text-green-700 font-semibold mb-2">Our Details</p>

          <h2 className="text-3xl font-bold mb-6">
            Prefer to Contact Us Directly?
          </h2>

          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>

          <div className="space-y-6">
            <div>
              <p className="font-semibold mb-1">Email Us</p>
              <a
                className="text-green-800 underline"
                href="mailto:info@harbour.org"
              >
                info@harbour.org
              </a>
            </div>

            <div>
              <p className="font-semibold mb-1">Give Us a Call</p>
              <p className="text-green-800">+64 21 123 4567</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Find Us</p>
              <p className="text-green-800">
                123 Sample St, Wellington 6011 NZ
              </p>
            </div>
          </div>
        </Grid>
      </Grid>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6629.60449385628!2d150.999155!3d-33.817416!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129b62de430155%3A0x31c971356777b5ed!2sGatewayX%20Technologies!5e0!3m2!1sen!2sph!4v1719500375010!5m2!1sen!2sph"
          allowFullScreen=""
          loading="lazy"
          title="googleMap"
          className="w-full h-[420px] rounded-lg"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
};
