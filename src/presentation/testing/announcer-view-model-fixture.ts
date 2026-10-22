import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

/** Shared test data for presentation components. */
export const announcerViewModelFixture: AnnouncerViewModel = {
  name: "Carlos Artur",
  headline: "Locutor e radialista",
  tagline: "A voz que faz a cidade parar para ouvir.",
  bio: ["Bio"],
  services: [
    { name: "Carro de som", description: "Chamadas de rua.", quoteHref: "https://wa.me/1" },
    { name: "Spot comercial", description: "Spots que vendem.", quoteHref: "https://wa.me/2" },
    { name: "Vinheta", description: "Assinaturas de marca.", quoteHref: "https://wa.me/3" },
  ],
  yearsOfExperience: 20,
  experienceLabel: "+20 anos no rádio",
  photo: { src: "/images/carlos-artur.jpg", alt: "Carlos Artur no estúdio" },
  whatsapp: { href: "https://wa.me/5519997355358", display: "(19) 99735-5358" },
  socialLinks: [
    {
      network: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/carlosarturlocutor/",
    },
  ],
  stations: [
    { name: "Massa FM", current: true, period: "Atualmente" },
    { name: "Band FM", current: false, period: "2010–2018" },
    { name: "Rádio Difusora", current: false },
  ],
};
