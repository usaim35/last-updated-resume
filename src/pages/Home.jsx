import Hero from "../sections/Hero";
import Work from "../sections/Work";
import Journey from "../sections/Journey";
import Stack from "../sections/Stack";
import Demo from "../sections/Demo";
import Freelance from "../sections/Freelance";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Journey />
      <Stack />
      <Demo />
      <Freelance />
      <Contact />
    </main>
  );
}