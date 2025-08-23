export interface BaseMember {
  id?: string
  name: string
  title: string
  image: string
  image_path?: string // Supabase storage path
  created_at?: string
  updated_at?: string
}

export interface ExecMember extends BaseMember {
  // Executive-specific properties can be added here
}

export interface Member extends BaseMember {
  // General member properties can be added here
  calendly?: string
}

export interface ProjectManager extends BaseMember {
  // Project manager specific properties can be added here
}

// Carousel management types
export interface CarouselItem {
  id?: string
  type: 'image' | 'video'
  src: string
  caption: string
  strip: 1 | 2 | 3 // Which carousel strip this item belongs to
  order: number // Order within the strip
  image_path?: string // Supabase storage path for images
  video_path?: string // Supabase storage path for videos
  created_at?: string
  updated_at?: string
}

export interface CarouselStrip {
  id: number
  name: string
  description: string
  direction: 'left' | 'right' // Movement direction
}
