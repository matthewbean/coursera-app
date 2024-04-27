import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import App from "./App";

test("Contains make a reservation", () => {
  render(<App />);
  const linkElement = screen.getByText(/Make a Reservation/i);
  expect(linkElement).toBeInTheDocument();
});

test("check if redering inputs", () => {
  render(<App />);
  const calendarInput = screen.getByText("Date");
  const timeInput = screen.getByText("Time");
  const numberInput = screen.getByText("Number of Guests");
  const nameInput = screen.getByText("Name");
  const phoneInput = screen.getByText("Phone Number");
  const submitInput = screen.getByText("Make Reservation");
  expect(calendarInput).toBeInTheDocument();
  expect(numberInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(timeInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(submitInput).toBeInTheDocument();
});

test("check if clicking submit will show 'Required'", async () => {
  render(<App />);
  const submitButton = screen.getByText("Make Reservation");

  // Simulate a click on the button
  fireEvent.click(submitButton);
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Check if there are 4 required texts
  const required = screen.getAllByText("Required");
  expect(required.length).toBe(4);
});

test("Add text to the inputs and submitt", async () => {
  render(<App />);

  const timeInput = screen.getByPlaceholderText("Time");
  const numberInput = screen.getByPlaceholderText("Number of Guests");
  const nameInput = screen.getByPlaceholderText("Name");
  const phoneInput = screen.getByPlaceholderText("Phone Number");
  const submitInput = screen.getByText("Make Reservation");
  // Add text to inputs

  fireEvent.change(timeInput, { target: { value: "14:30" } });
  fireEvent.change(numberInput, { target: { value: "4" } });
  fireEvent.change(nameInput, { target: { value: "Joe Smith" } });
  fireEvent.change(phoneInput, { target: { value: "5555555555" } });
  //submit
  fireEvent.click(submitInput);

  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Check if successfully submitted
  const done = screen.getByText("You're good to go!");
  expect(done).toBeInTheDocument();
});
