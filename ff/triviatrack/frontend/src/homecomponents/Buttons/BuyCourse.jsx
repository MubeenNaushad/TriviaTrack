import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const BuyCourse = ({ courseId }) => {
  const purchaseCourseHandler = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_BASEURL
        }/purchase/checkout/create-checkout-session`,
        {
          courseId: courseId,
        },
        {
          withCredentials: true,
        }
      );

      const { url } = response.data;

      if (url) {
        window.location.href = url;
      } else {
        alert("Unable to create session");
      }
    } catch (error) {
      console.log("Error postiong", error);
    }
  };

  return (
    <Button onClick={purchaseCourseHandler} classname="w[50%]">
      Purchase Course
    </Button>
  );
};

export default BuyCourse;
