import { CarouselItem } from '../types/members'

export const CAROUSEL_ITEMS: CarouselItem[] = [
  // First carousel strip - moves right to left
  { type: 'image', src: "/images/lafayette5.jpg", caption: "Lafayette Square Contract Team", strip: 1, order: 1 },
  { type: 'image', src: "/images/edan-goat.jpeg", caption: "PM Edan plotting our W vs Codebase", strip: 1, order: 2 },
  { type: 'video', src: "/videos/mdb-video.MP4", caption: "MDB Picnic at the Glade", strip: 1, order: 3 },
  { type: 'image', src: "/images/table1.JPEG", caption: "MDB Banquet Dinner", strip: 1, order: 4 },
  { type: 'image', src: "/images/mdb-ride.jpg", caption: "Riding the Superman at Six Flags", strip: 1, order: 5 },
  { type: 'image', src: "/images/car2.JPEG", caption: "MDB in Hawaii, Kevin's Car", strip: 1, order: 6 },
  { type: 'image', src: "/images/stpat.JPEG", caption: "St. Patty's Day!", strip: 1, order: 7 },
  { type: 'image', src: "/images/wnc.jpg", caption: "Wine and Cheese Night!", strip: 1, order: 8 },
  { type: 'image', src: "/images/noah-goat.JPEG", caption: "Noah, 2024-25 President", strip: 1, order: 9 },
  { type: 'image', src: "/images/jefflineage5.jpg", caption: "Jeff's Lineage - MDB Legacy", strip: 1, order: 10 },
  { type: 'image', src: "/images/newbies.JPEG", caption: "Newbie Hike!", strip: 1, order: 11 },

  // Second carousel strip - moves left to right
  { type: 'image', src: "/images/mdb-goats.JPEG", caption: "MDB LShip GOATs.", strip: 2, order: 1 },
  { type: 'video', src: "/videos/mdb-goal.MP4", caption: "GOOOOOOOOOOOOOOOOOOOOOL", strip: 2, order: 2 },
  { type: 'image', src: "/images/8ball.JPEG", caption: "8-Ball, Jai taking the L against Riana", strip: 2, order: 3 },
  { type: 'image', src: "/images/wbn1.JPEG", caption: "Welcome Back Night", strip: 2, order: 4 },
  { type: 'image', src: "/images/circuit7.jpg", caption: "Circuit Contract Team", strip: 2, order: 5 },
  { type: 'image', src: "/images/table3.JPEG", caption: "MDB Banquet Dinner", strip: 2, order: 6 },
  { type: 'image', src: "/images/mdb-hawaii.JPG", caption: "MDB HAWAII RETREAT SPRING 2025", strip: 2, order: 7 },
  { type: 'image', src: "/images/car1.JPEG", caption: "MDB in Hawaii, Preston's Car", strip: 2, order: 8 },
  { type: 'image', src: "/images/mdb5 2.jpg", caption: "Mobile Developers of Berkeley", strip: 2, order: 9 },
  { type: 'image', src: "/images/pms2.jpg", caption: "Project Manager Team Spring 2025", strip: 2, order: 10 },
  { type: 'image', src: "/images/6flags-selfie.jpg", caption: "MDB Selfie @The Joker", strip: 2, order: 11 },

  // Third carousel strip - moves right to left
  { type: 'video', src: "/videos/gitlit.mp4", caption: "Git Lit? Got Lit.", strip: 3, order: 1 },
  { type: 'image', src: "/images/soccer-w.jpg", caption: "MDB supporting our IM Soccer Team", strip: 3, order: 2 },
  { type: 'image', src: "/images/tp-over.jpg", caption: "Post Newbie Presentations ft. Mo", strip: 3, order: 3 },
  { type: 'image', src: "/images/wbn2.JPEG", caption: "Welcome Back Night ", strip: 3, order: 4 },
  { type: 'image', src: "/images/sur7.jpg", caption: "Sur Contract Team", strip: 3, order: 5 },
  { type: 'image', src: "/images/mdb-newnite.JPG", caption: "Newbie Night <3", strip: 3, order: 6 },
  { type: 'image', src: "/images/mdb-6flags.jpeg", caption: "MDB @Six Flags", strip: 3, order: 7 },
  { type: 'image', src: "/images/car3.JPEG", caption: "MDB in Hawaii, Mike's Car", strip: 3, order: 8 },
  { type: 'image', src: "/images/edan-pair.jpg", caption: "Edan and his Little Alp", strip: 3, order: 9 },
  { type: 'image', src: "/images/table2.JPEG", caption: "MDB Banquet Dinner", strip: 3, order: 10 }
]

// Helper functions to get items by strip
export const getCarouselItemsByStrip = (stripNumber: 1 | 2 | 3): CarouselItem[] => {
  return CAROUSEL_ITEMS
    .filter(item => item.strip === stripNumber)
    .sort((a, b) => a.order - b.order)
}

export const getCarouselStrip1 = () => getCarouselItemsByStrip(1)
export const getCarouselStrip2 = () => getCarouselItemsByStrip(2)
export const getCarouselStrip3 = () => getCarouselItemsByStrip(3)

// Carousel configuration
export const CAROUSEL_CONFIG = {
  strip1: {
    direction: 'left' as const,
    speed: 60
  },
  strip2: {
    direction: 'right' as const,
    speed: 60
  },
  strip3: {
    direction: 'left' as const,
    speed: 60
  }
}
