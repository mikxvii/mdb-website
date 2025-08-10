import { createClient } from '@supabase/supabase-js'
import { ExecMember, ProjectManager, Member, CarouselItem } from '../app/types/members'

// Secure approach: Fetch credentials from server-side API
let supabaseClient: any = null

export const getSupabaseClient = async () => {
  if (supabaseClient) return supabaseClient
  
  try {
    const response = await fetch('/api/supabase-config')
    const config = await response.json()
    
    supabaseClient = createClient(config.url, config.key, {
      auth: {
        // Enable automatic session persistence
        persistSession: true,
        // Store session in localStorage (survives browser restarts)
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        // Auto-refresh tokens
        autoRefreshToken: true,
        // Detect session in URL (for OAuth flows)
        detectSessionInUrl: true
      }
    })
    return supabaseClient
  } catch (error) {
    console.error('Failed to fetch Supabase config:', error)
    throw new Error('Unable to initialize Supabase client')
  }
}

// Session state management
let sessionState: {
  user: any;
  loading: boolean;
  error: string | null;
} = {
  user: null,
  loading: true,
  error: null
}

// Session listeners
const sessionListeners = new Set<(state: any) => void>()

// Subscribe to session changes
export const subscribeToSession = (callback: (state: any) => void) => {
  sessionListeners.add(callback)
  
  // Return unsubscribe function
  return () => {
    sessionListeners.delete(callback)
  }
}

// Notify all listeners of session state change
const notifySessionListeners = (state: any) => {
  sessionListeners.forEach(callback => callback(state))
}

// Initialize session and set up listeners
export const initializeSession = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    // Get initial session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      sessionState = { user: null, loading: false, error: error.message }
    } else {
      sessionState = { 
        user: session?.user || null, 
        loading: false, 
        error: null 
      }
    }
    
    // Set up auth state change listener
    supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      console.log('Auth state changed:', event, session?.user?.email)
      
      sessionState = {
        user: session?.user || null,
        loading: false,
        error: null
      }
      
      // Notify all listeners
      notifySessionListeners(sessionState)
    })
    
    // Initial notification
    notifySessionListeners(sessionState)
    
    return sessionState
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    sessionState = { user: null, loading: false, error: errorMessage }
    notifySessionListeners(sessionState)
    return sessionState
  }
}

// Get current session state (synchronous)
export const getSessionState = () => sessionState

// Admin authentication functions
export const signInAdmin = async (email: string, password: string) => {
  const supabase = await getSupabaseClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  
  // Session will be automatically updated via the listener
  return data
}

export const signOutAdmin = async () => {
  const supabase = await getSupabaseClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) throw error
  
  // Session will be automatically updated via the listener
  return true
}

export const getCurrentAdmin = async () => {
  const supabase = await getSupabaseClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) throw error
  return user
}

// Check if user is currently authenticated (synchronous)
export const isAuthenticated = () => {
  return sessionState.user !== null && !sessionState.loading
}

// Get current user (synchronous)
export const getCurrentUser = () => {
  return sessionState.user
}

// Simple image upload
export const uploadImage = async (file: File) => {
  try {
    // Validate file
    if (!file) {
      throw new Error('No file provided')
    }
    
    // Check file size (limit to 10MB for consistency with UI)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB')
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image')
    }
    
    // Validate file name
    if (!file.name || file.name.trim().length === 0) {
      throw new Error('File must have a valid name')
    }
    
    const supabase = await getSupabaseClient()
    
    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`
    
    console.log('Uploading image:', { originalName: file.name, filename, size: file.size, type: file.type })
    
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filename, file)
    
    if (error) {
      console.error('Supabase upload error:', error)
      throw error
    }
    
    if (!data) {
      throw new Error('No data returned from upload')
    }
    
    console.log('Image uploaded successfully:', data.path)
    return data
  } catch (error) {
    console.error('Error in uploadImage function:', error)
    throw error
  }
}

// Video upload function
export const uploadVideo = async (file: File) => {
  try {
    // Validate file
    if (!file) {
      throw new Error('No file provided')
    }
    
    // Check file size (limit to 10MB for consistency with UI)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB')
    }
    
    // Check file type
    if (!file.type.startsWith('video/')) {
      throw new Error('File must be a video')
    }
    
    // Validate file name
    if (!file.name || file.name.trim().length === 0) {
      throw new Error('File must have a valid name')
    }
    
    const supabase = await getSupabaseClient()
    
    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`
    
    console.log('Uploading video:', { originalName: file.name, filename, size: file.size, type: file.type })
    
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(filename, file)
    
    if (error) {
      console.error('Supabase upload error:', error)
      throw error
    }
    
    if (!data) {
      throw new Error('No data returned from upload')
    }
    
    console.log('Video uploaded successfully:', data.path)
    return data
  } catch (error) {
    console.error('Error in uploadVideo function:', error)
    throw error
  }
}

// Get image URL
export const getImageUrl = async (path: string) => {
  try {
    if (!path) {
      console.warn('No image path provided to getImageUrl')
      return ''
    }
    
    const response = await fetch(`/api/supabase-config?path=${encodeURIComponent(path)}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.url) {
      throw new Error('No URL returned from API')
    }
    
    return data.url
  } catch (error) {
    console.error('Failed to get image URL for path:', path, error)
    // Return empty string as fallback - the UI should handle this gracefully
    return ''
  }
}

// List all images from Supabase storage with optimized querying
export const listAllImages = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    // Check if user is authenticated as admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Authentication required: Please log in as admin')
    }
    
    // Use more efficient query with better sorting
    const { data, error } = await supabase.storage
      .from('images')
      .list('', {
        limit: 1000, // Increased limit for better performance
        offset: 0,
        sortBy: { column: 'name', order: 'asc' } // Sort by name for consistent ordering
      })
    
    if (error) {
      console.error('Supabase list error:', error)
      throw error
    }
    
    return data || []
  } catch (error) {
    console.error('Error in listAllImages function:', error)
    throw error
  }
}

// Batch get image URLs for much faster loading
export const getBatchImageUrls = async (paths: string[]) => {
  try {
    if (paths.length === 0) return []
    
    // Use the new batch API endpoint for better performance
    const batchParam = encodeURIComponent(JSON.stringify(paths))
    const response = await fetch(`/api/supabase-config?batch=${batchParam}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.urls || !Array.isArray(data.urls)) {
      throw new Error('Invalid response format from batch API')
    }
    
    return data.urls
  } catch (error) {
    console.error('Error in getBatchImageUrls:', error)
    // Fallback to individual URL generation if batch fails
    try {
      const supabase = await getSupabaseClient()
      const urls = paths.map(path => {
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(path)
        return data.publicUrl
      })
      return urls
    } catch (fallbackError) {
      console.error('Fallback URL generation also failed:', fallbackError)
      throw error
    }
  }
}

// Delete image from Supabase storage (admin only)
export const deleteImage = async (path: string) => {
  try {
    console.log('Attempting to delete image:', path)
    
    const supabase = await getSupabaseClient()
    console.log('Supabase client obtained for deletion')
    
    // Check if user is authenticated as admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Authentication required: Please log in as admin')
    }
    
    console.log('Admin authenticated, proceeding with deletion')
    
    const { data, error } = await supabase.storage
      .from('images')
      .remove([path])
    
    console.log('Delete response:', { data, error })
    
    if (error) {
      console.error('Supabase delete error:', error)
      throw error
    }
    
    console.log('Successfully deleted image from storage:', path)
    return true
  } catch (error) {
    console.error('Error in deleteImage function:', error)
    throw error
  }
}

// Safely delete old image when updating member (with error handling)
export const safeDeleteOldImage = async (oldImagePath: string | null) => {
  if (!oldImagePath) {
    return true
  }
  
  try {
    console.log('Attempting to delete old image:', oldImagePath)
    await deleteImage(oldImagePath)
    console.log('Successfully deleted old image:', oldImagePath)
    return true
  } catch (error) {
    console.warn('Failed to delete old image, but this is not critical:', oldImagePath, error)
    // Don't throw error - this is not critical for the update operation
    return false
  }
}

// Validate that an uploaded image is accessible
export const validateImageAccess = async (path: string): Promise<boolean> => {
  try {
    if (!path) return false
    
    const url = await getImageUrl(path)
    if (!url) return false
    
    // Try to fetch the image to ensure it's accessible
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    console.warn('Image validation failed:', path, error)
    return false
  }
}

// Member management functions
export const getExecMembers = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    const { data, error } = await supabase
      .from('exec_members')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    
    // Extract all image paths that need URLs
    const imagePaths = data
      .filter((member: any) => member.image_path)
      .map((member: any) => member.image_path)
    
    // Batch generate all URLs at once
    let imageUrlMap: Record<string, string> = {}
    if (imagePaths.length > 0) {
      const urls = await getBatchImageUrls(imagePaths)
      imagePaths.forEach((path: string, index: number) => {
        if (path) imageUrlMap[path] = urls[index]
      })
    }
    
    // Apply URLs to members
    const membersWithUrls = data.map((member: any) => ({
      ...member,
      image: member.image_path ? (imageUrlMap[member.image_path] || member.image || '') : (member.image || '')
    }))
    
    return membersWithUrls
  } catch (error) {
    console.error('Failed to fetch exec members:', error)
    throw error
  }
}

export const getProjectManagers = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    const { data, error } = await supabase
      .from('project_managers')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    
    // Extract all image paths that need URLs
    const imagePaths = data
      .filter((member: any) => member.image_path)
      .map((member: any) => member.image_path)
    
    // Batch generate all URLs at once
    let imageUrlMap: Record<string, string> = {}
    if (imagePaths.length > 0) {
      const urls = await getBatchImageUrls(imagePaths)
      imagePaths.forEach((path: string, index: number) => {
        if (path) imageUrlMap[path] = urls[index]
      })
    }
    
    // Apply URLs to members
    const membersWithUrls = data.map((member: any) => ({
      ...member,
      image: member.image_path ? (imageUrlMap[member.image_path] || member.image || '') : (member.image || '')
    }))
    
    return membersWithUrls
  } catch (error) {
    console.error('Failed to fetch project managers:', error)
    throw error
  }
}

export const getMembers = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    
    // Extract all image paths that need URLs
    const imagePaths = data
      .filter((member: any) => member.image_path)
      .map((member: any) => member.image_path)
    
    // Batch generate all URLs at once
    let imageUrlMap: Record<string, string> = {}
    if (imagePaths.length > 0) {
      const urls = await getBatchImageUrls(imagePaths)
      imagePaths.forEach((path: string, index: number) => {
        if (path) imageUrlMap[path] = urls[index]
      })
    }
    
    // Apply URLs to members
    const membersWithUrls = data.map((member: any) => ({
      ...member,
      image: member.image_path ? (imageUrlMap[member.image_path] || member.image || '') : (member.image || '')
    }))
    
    return membersWithUrls
  } catch (error) {
    console.error('Failed to fetch members:', error)
    throw error
  }
}

export const createExecMember = async (member: Omit<ExecMember, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Validate required fields
    if (!member.name?.trim() || !member.title?.trim()) {
      throw new Error('Name and title are required')
    }
    
    const { data, error } = await supabase
      .from('exec_members')
      .insert([{
        name: member.name.trim(),
        title: member.title.trim(),
        image: member.image || '',
        image_path: member.image_path || null
      }])
      .select()
    
    if (error) {
      console.error('Supabase error creating exec member:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from database insert')
    }
    
    return data[0]
  } catch (error) {
    console.error('Failed to create exec member:', error)
    throw error
  }
}

export const createProjectManager = async (member: Omit<ProjectManager, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Validate required fields
    if (!member.name?.trim() || !member.title?.trim()) {
      throw new Error('Name and title are required')
    }
    
    const { data, error } = await supabase
      .from('project_managers')
      .insert([{
        name: member.name.trim(),
        title: member.title.trim(),
        image: member.image || '',
        image_path: member.image_path || null
      }])
      .select()
    
    if (error) {
      console.error('Supabase error creating project manager:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from database insert')
    }
    
    return data[0]
  } catch (error) {
    console.error('Failed to create project manager:', error)
    throw error
  }
}

export const createMember = async (member: Omit<Member, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Validate required fields
    if (!member.name?.trim() || !member.title?.trim()) {
      throw new Error('Name and title are required')
    }
    
    const { data, error } = await supabase
      .from('members')
      .insert([{
        name: member.name.trim(),
        title: member.title.trim(),
        image: member.image || '',
        image_path: member.image_path || null
      }])
      .select()
    
    if (error) {
      console.error('Supabase error creating member:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from database insert')
    }
    
    return data[0]
  } catch (error) {
    console.error('Failed to create member:', error)
    throw error
  }
}

export const updateExecMember = async (id: string, updates: Partial<ExecMember>) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Validate that we have at least one field to update
    if (!updates.name && !updates.title && !updates.image_path) {
      throw new Error('At least one field must be provided for update')
    }
    
    // Clean up the updates object
    const cleanUpdates: any = {}
    if (updates.name) cleanUpdates.name = updates.name.trim()
    if (updates.title) cleanUpdates.title = updates.title.trim()
    if (updates.image_path !== undefined) cleanUpdates.image_path = updates.image_path
    // Don't set image field - it will be populated by the backend when fetching
    
    const { data, error } = await supabase
      .from('exec_members')
      .update(cleanUpdates)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Supabase error updating exec member:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from database update')
    }
    
    return data[0]
  } catch (error) {
    console.error('Failed to update exec member:', error)
    throw error
  }
}

export const updateProjectManager = async (id: string, updates: Partial<ProjectManager>) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Validate that we have at least one field to update
    if (!updates.name && !updates.title && !updates.image_path) {
      throw new Error('At least one field must be provided for update')
    }
    
    // Clean up the updates object
    const cleanUpdates: any = {}
    if (updates.name) cleanUpdates.name = updates.name.trim()
    if (updates.title) cleanUpdates.title = updates.title.trim()
    if (updates.image_path !== undefined) cleanUpdates.image_path = updates.image_path
    // Don't set image field - it will be populated by the backend when fetching
    
    const { data, error } = await supabase
      .from('project_managers')
      .update(cleanUpdates)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Supabase error updating project manager:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from database update')
    }
    
    return data[0]
  } catch (error) {
    console.error('Failed to update project manager:', error)
    throw error
  }
}

export const updateMember = async (id: string, updates: Partial<Member>) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Validate that we have at least one field to update
    if (!updates.name && !updates.title && !updates.image_path) {
      throw new Error('At least one field must be provided for update')
    }
    
    // Clean up the updates object
    const cleanUpdates: any = {}
    if (updates.name) cleanUpdates.name = updates.name.trim()
    if (updates.title) cleanUpdates.title = updates.title.trim()
    if (updates.image_path !== undefined) cleanUpdates.image_path = updates.image_path
    // Don't set image field - it will be populated by the backend when fetching
    
    const { data, error } = await supabase
      .from('members')
      .update(cleanUpdates)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Supabase error updating member:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from database update')
    }
    
    return data[0]
  } catch (error) {
    console.error('Failed to update member:', error)
    throw error
  }
}

export const deleteExecMember = async (id: string) => {
  try {
    const supabase = await getSupabaseClient()
    
    const { error } = await supabase
      .from('exec_members')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Failed to delete exec member:', error)
    throw error
  }
}

export const deleteProjectManager = async (id: string) => {
  try {
    const supabase = await getSupabaseClient()
    
    const { error } = await supabase
      .from('project_managers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Failed to delete project manager:', error)
    throw error
  }
}

export const deleteMember = async (id: string) => {
  try {
    const supabase = await getSupabaseClient()
    
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Failed to delete member:', error)
    throw error
  }
}

// Carousel management functions
export const getCarouselItems = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    const { data, error } = await supabase
      .from('carousel_items')
      .select('*')
      .order('strip', { ascending: true })
      .order('order', { ascending: true })
    
    if (error) throw error
    
    return data || []
  } catch (error) {
    console.error('Failed to fetch carousel items:', error)
    throw error
  }
}

export const createCarouselItem = async (item: Omit<CarouselItem, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Validate required fields
    if (!item.caption?.trim() || !item.src?.trim() || !item.type || !item.strip || !item.order) {
      throw new Error('Caption, source, type, strip, and order are required')
    }
    
    const { data, error } = await supabase
      .from('carousel_items')
      .insert([{
        type: item.type,
        src: item.src.trim(),
        caption: item.caption.trim(),
        strip: item.strip,
        order: item.order,
        image_path: item.image_path || null,
        video_path: item.video_path || null
      }])
      .select()
    
    if (error) {
      console.error('Supabase error creating carousel item:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from database insert')
    }
    
    return data[0]
  } catch (error) {
    console.error('Failed to create carousel item:', error)
    throw error
  }
}

export const updateCarouselItem = async (id: string, updates: Partial<CarouselItem>) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Validate that we have at least one field to update
    if (!updates.caption && !updates.src && !updates.type && !updates.strip && !updates.order && !updates.image_path && !updates.video_path) {
      throw new Error('At least one field must be provided for update')
    }
    
    // Clean up the updates object
    const cleanUpdates: any = {}
    if (updates.caption) cleanUpdates.caption = updates.caption.trim()
    if (updates.src) cleanUpdates.src = updates.src.trim()
    if (updates.type) cleanUpdates.type = updates.type
    if (updates.strip) cleanUpdates.strip = updates.strip
    if (updates.order) cleanUpdates.order = updates.order
    if (updates.image_path !== undefined) cleanUpdates.image_path = updates.image_path
    if (updates.video_path !== undefined) cleanUpdates.video_path = updates.video_path
    
    const { data, error } = await supabase
      .from('carousel_items')
      .update(cleanUpdates)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Supabase error updating carousel item:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from database update')
    }
    
    return data[0]
  } catch (error) {
    console.error('Failed to update carousel item:', error)
    throw error
  }
}

export const deleteCarouselItem = async (id: string) => {
  try {
    const supabase = await getSupabaseClient()
    
    const { error } = await supabase
      .from('carousel_items')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Failed to delete carousel item:', error)
    throw error
  }
}

export const reorderCarouselItems = async (strip: number, newOrder: { id: string, order: number }[]) => {
  try {
    const supabase = await getSupabaseClient()
    
    // Update each item's order
    const updatePromises = newOrder.map(({ id, order }) =>
      supabase
        .from('carousel_items')
        .update({ order })
        .eq('id', id)
    )
    
    const results = await Promise.all(updatePromises)
    
    // Check for errors
    for (const result of results) {
      if (result.error) throw result.error
    }
    
    return true
  } catch (error) {
    console.error('Failed to reorder carousel items:', error)
    throw error
  }
}

// Contact form submission
export const submitContactForm = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to submit contact form')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to submit contact form:', error)
    throw error
  }
}

// Contact submissions management
export const getContactSubmissions = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return data || []
  } catch (error) {
    console.error('Failed to fetch contact submissions:', error)
    throw error
  }
}

export const deleteContactSubmission = async (id: string) => {
  try {
    const supabase = await getSupabaseClient()
    
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return true
  } catch (error) {
    console.error('Failed to delete contact submission:', error)
    throw error
  }
}
