import { useState, useEffect } from "react";
import { lending } from "../models/Lending";
import { today } from "../ui/pages/admin/dateFormat";

export const useLending = () => {

  const [formData, setFormData] = useState<lending>(
    {
      uid: "",
      isbn: "",
      checkoutDate: today(),
      returnDate: today(),
    });

  useEffect(() => {
    console.log("a")
  }, []);

  return { formData };
};
