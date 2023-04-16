import { render, screen, cleanup } from "@testing-library/react";
import { Navbar } from "../index";

test("should render Navbar component", () => {
  render(<Navbar />);
  const navbarElement = screen.getByTestId("a");
  expect(navbarElement).toBeInTheDocument();
  // log the rendered component to the console for debugging purposes
  // console.log(navbarElement.outerHTML);
});

// test("test", () => {
//   expect(true).toBe(false);
// });
