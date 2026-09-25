import { Header } from "./sections/header";
import { Hero } from "./sections/hero";
import { Work } from "./sections/work";
import { Experience } from "./sections/experience";
import { Recognition } from "./sections/recognition";
import { Contact } from "./sections/contact";
import { MotionRoot } from "./sections/motion-root";

export function Portfolio() {
  return (
    <MotionRoot>
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Recognition />
        <Contact />
      </main>
    </MotionRoot>
  );
}
