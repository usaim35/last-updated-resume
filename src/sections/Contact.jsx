import Reveal from "../components/Reveal";
import { site } from "../data/site";
import { Mail, Phone, Pin } from "../components/Icons";

export default function Contact() {
  return (
    <section id="contact" className="bg-white px-6 py-28 text-ti-900 md:py-36">
      <Reveal className="text-center">
        <h2 className="font-head text-4xl font-bold tracking-tight md:text-7xl">Got a project in mind?</h2>
        <p className="mx-auto mt-6 max-w-xl font-round leading-relaxed text-ti-600 md:text-lg">
          Tell me what you are building. I will reply with ideas and a clear plan, not a sales pitch.
        </p>
        <a href={`mailto:${site.email}`} className="mt-10 inline-block rounded-full border border-ti-900/20 px-10 py-5 font-semibold tracking-[0.15em] transition hover:border-crimson hover:bg-crimson hover:text-white">
          SAY HELLO
        </a>
        <div className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4 text-ti-600">
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-crimson"><Mail />{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-crimson"><Phone />{site.phone}</a>
          <span className="flex items-center gap-3"><Pin />{site.location}</span>
        </div>
      </Reveal>
    </section>
  );
}