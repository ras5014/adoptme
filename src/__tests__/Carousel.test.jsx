import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Carousel } from "../components/Carousel";

test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = await carousel.findByTestId("hero");
  expect(hero.src).toContain(images[0]);
  carousel.unmount();
});
