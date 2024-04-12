import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Spinner,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Form() {
  const [startDate, setStartDate] = useState(new Date());
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
    }
  }, [response]);
  const formik = useFormik({
    initialValues: {
      calendar: new Date(),
      time: null,
      numberOfGuests: null,
      name: null,
      phoneNumber: null,
    },
    onSubmit: (data) => submit("test.com", data),
    validationSchema: Yup.object({
      time: Yup.string().required("Required"),
      numberOfGuests: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
          message: "Invalid phone number",
          excludeEmptyString: false,
        }),
    }),
  });

  const { values, touched } = formik;

  const errors = formik.errors;
  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <VStack p={10} alignItems="center" background="#FBDABB">
      <Box p={6} rounded="md" w="%">
        {values && (
          <form onSubmit={formik.handleSubmit} style={{ background: "white" }}>
            <Heading as="h1" id="reservation-section">
              Make a Reservation
            </Heading>
            <VStack spacing={4}>
              <FormControl
                isInvalid={touched.calendar && errors.calendar ? true : false}
              >
                <FormLabel fontSize="lg" fontWeight="bold" htmlFor="calendar">
                  Date
                </FormLabel>
                <DatePicker
                  className="calendar-box"
                  selected={values.calendar}
                  {...formik.getFieldProps("calendar")}
                  onChange={(date) => formik.setFieldValue("calendar", date)}
                  id="calendar"
                  name="calendar"
                />
                <FormErrorMessage>{errors.calendar}</FormErrorMessage>
              </FormControl>{" "}
              <FormControl
                isInvalid={touched.time && errors.time ? true : false}
              >
                <FormLabel fontSize="lg" fontWeight="bold" htmlFor="time">
                  Time
                </FormLabel>
                <Input
                  {...formik.getFieldProps("time")}
                  id="time"
                  name="time"
                  type="time"
                />
                <FormErrorMessage>{errors.time}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  touched.numberOfGuests && errors.numberOfGuests ? true : false
                }
              >
                <FormLabel
                  fontSize="lg"
                  fontWeight="bold"
                  htmlFor="numberOfGuests"
                >
                  Number of Guests
                </FormLabel>
                <Input
                  {...formik.getFieldProps("numberOfGuests")}
                  id="numberOfGuests"
                  name="numberOfGuests"
                  type="number"
                />
                <FormErrorMessage>{errors.numberOfGuests}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={touched.name && errors.name ? true : false}
              >
                <FormLabel fontSize="lg" fontWeight="bold" htmlFor="name">
                  Name
                </FormLabel>
                <Input
                  {...formik.getFieldProps("name")}
                  id="name"
                  name="name"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  touched.phoneNumber && errors.phoneNumber ? true : false
                }
              >
                <FormLabel
                  fontSize="lg"
                  fontWeight="bold"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </FormLabel>
                <Input
                  {...formik.getFieldProps("phoneNumber")}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                />
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                width="full"
                fontSize="lg"
                fontWeight="bold"
                style={{ background: "#495E57", color: "#fff" }}
              >
                {isLoading ? <Spinner /> : "Make Reservation"}
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    </VStack>
  );
}

export default Form;
