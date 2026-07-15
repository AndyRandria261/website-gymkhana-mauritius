import golfImg from "@/assets/sport-golf.jpg";
import heroGolf from "@/assets/hero-golf-course.jpg";
import tennisImg from "@/assets/sport-tennis.png";
import heroTennis from "@/assets/hero-tennis-grass.jpg";
import squashImg from "@/assets/sport-squash.jpg";
import fitnessImg from "@/assets/sport-fitness.jpg";
import poolImg from "@/assets/sport-pool.jpg";
import venueImg from "@/assets/venue-events.jpg";
import historyImg from "@/assets/history-archive.jpg";
import diningImg from "@/assets/dining-brasserie.jpg";

export type Photo = { src: string; alt: string };
export type Album = {
  slug: string;
  title: string;
  description: string;
  photos: Photo[];
};

export const ALBUMS: Album[] = [
  {
    slug: "golf-tournament",
    title: "Golf Tournament",
    description: "Championship rounds and prize-givings on the 1844 course.",
    photos: [
      { src: golfImg, alt: "The MGC course at sunrise" },
      { src: heroGolf, alt: "The MGC golf course at golden hour" },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    description: "Tennis, squash, fitness and swimming across the estate.",
    photos: [
      { src: tennisImg, alt: "Detail of a grass tennis court at MGC" },
      {
        src: heroTennis,
        alt: "Freshly cut grass tennis court with mountains in the background",
      },
      { src: squashImg, alt: "Interior of an MGC squash court" },
      { src: fitnessImg, alt: "Fitness centre interior with cardio equipment" },
      { src: poolImg, alt: "MGC outdoor swimming pool surrounded by palm trees" },
    ],
  },
  {
    slug: "entertainment-activities",
    title: "Entertainment & Activities",
    description: "Members' evenings, functions and private events.",
    photos: [{ src: venueImg, alt: "Event set-up at the Club" }],
  },
  {
    slug: "memories",
    title: "Memories",
    description: "Archive photographs from across the club's history.",
    photos: [{ src: historyImg, alt: "Archive photograph of the MGC members" }],
  },
  {
    slug: "club-evolution",
    title: "Club Evolution",
    description: "The clubhouse and grounds through the years.",
    photos: [{ src: diningImg, alt: "The Brasserie dining room" }],
  },
];

export function getAlbum(slug: string) {
  return ALBUMS.find((a) => a.slug === slug);
}
