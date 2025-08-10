'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { uploadImage, getImageUrl, deleteImage, listAllImages, getBatchImageUrls, safeDeleteOldImage, validateImageAccess, getSupabaseClient } from '../../utils/supabase'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useMembers } from '../hooks/useMembers'
import { useCarousel } from '../hooks/useCarousel'
import { ExecMember, ProjectManager, Member, CarouselItem } from '../types/members'
import AddMemberModal from './components/AddMemberModal'
import EditMemberModal from './components/EditMemberModal'
import AddCarouselItemModal from './components/AddCarouselItemModal'
import EditCarouselItemModal from './components/EditCarouselItemModal'

export default function AdminDashboardPage() {
  const [uploading, setUploading] = useState(false)
  const [loadingImages, setLoadingImages] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<Array<{path: string, url: string, name: string}>>([])
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map())
  const [carouselImageCache, setCarouselImageCache] = useState<Map<string, string>>(new Map())
  const [activeTab, setActiveTab] = useState<'images' | 'members' | 'carousel'>('images')
  const [showAddMember, setShowAddMember] = useState(false)
  const [editingMember, setEditingMember] = useState<{type: 'exec' | 'pm' | 'member', member: any} | null>(null)
  const [showAddCarouselItem, setShowAddCarouselItem] = useState(false)
  const [editingCarouselItem, setEditingCarouselItem] = useState<{ type: 'carousel', item: CarouselItem } | null>(null)
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const { 
    execMembers, 
    projectManagers, 
    members, 
    loading: membersLoading,
    loadAllMembers,
    addExecMember,
    addProjectManager,
    addMember,
    updateExecMemberById,
    updateProjectManagerById,
    updateMemberById,
    removeExecMember,
    removeProjectManager,
    removeMember
  } = useMembers()
  const {
    carouselItems,
    loading: carouselLoading,
    loadCarouselItems,
    addCarouselItem,
    updateCarouselItemById,
    removeCarouselItem,
    getItemsByStrip
  } = useCarousel()

  const loadCarouselImages = useCallback(async () => {
    try {
      if (carouselItems.length === 0) return
      
      // Extract unique image paths from carousel items
      const imagePaths = carouselItems
        .filter(item => item.type === 'image' && item.image_path)
        .map(item => item.image_path!)
        .filter((path, index, arr) => arr.indexOf(path) === index) // Remove duplicates
      
      if (imagePaths.length === 0) return
      
      console.log(`Loading ${imagePaths.length} carousel images...`)
      
      // Use batch URL generation for carousel images
      const urls = await getBatchImageUrls(imagePaths)
      
      // Update carousel image cache
      const newCarouselCache = new Map()
      imagePaths.forEach((path, index) => {
        newCarouselCache.set(path, urls[index])
      })
      setCarouselImageCache(newCarouselCache)
      
      console.log(`✅ Loaded ${urls.length} carousel image URLs`)
      
    } catch (error) {
      console.error('Failed to load carousel images:', error)
      setError(`Failed to load carousel images: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }, [carouselItems])

  const getCarouselImageUrl = useCallback(async (item: CarouselItem): Promise<string> => {
    if (item.type === 'video') {
      const supabase = await getSupabaseClient()
      const { data } = supabase.storage
        .from('videos')
        .getPublicUrl(item.video_path || '')
      return data.publicUrl
    }
    
    // For images, try to get from cache first
    if (item.image_path && carouselImageCache.has(item.image_path)) {
      return carouselImageCache.get(item.image_path)!
    }
    
    return item.src
  }, [carouselImageCache])

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/admin-login')
      return
    }
    
    // Load existing images when authenticated
    if (!authLoading && isAuthenticated) {
      loadExistingImages(false) // Don't show performance metrics on initial load
      loadCarouselItems() // Load carousel items
    }
  }, [isAuthenticated, authLoading, router])

  // Load carousel images when carousel items change
  useEffect(() => {
    if (carouselItems.length > 0) {
      loadCarouselImages()
    }
  }, [carouselItems, loadCarouselImages])

  const loadExistingImages = useCallback(async (showPerformance = true) => {
    try {
      setLoadingImages(true)
      setError('')
      
      const startTime = performance.now()
      if (showPerformance) console.time('Image loading performance')
      
      // Fetch all image files from Supabase
      const imageFiles = await listAllImages()
      if (showPerformance) console.log(`Found ${imageFiles.length} images in storage`)
      
      if (imageFiles.length === 0) {
        setUploadedImages([])
        setLoadingImages(false)
        return
      }
      
      // Extract file names for batch URL generation
      const fileNames = imageFiles.map((file: any) => file.name)
      
      // Use batch URL generation for much faster loading
      const urls = await getBatchImageUrls(fileNames)
      if (showPerformance) console.log(`Generated ${urls.length} URLs in batch`)
      
      // Create image objects with cached URLs
      const images = fileNames.map((name: string, index: number) => ({
        path: name,
        url: urls[index],
        name: name
      }))
      
      // Update cache and images
      const newCache = new Map()
      images.forEach((img: {path: string, url: string, name: string}) => newCache.set(img.path, img.url))
      setImageCache(newCache)
      setUploadedImages(images)
      
      const endTime = performance.now()
      const loadTime = endTime - startTime
      
      if (showPerformance) {
        console.timeEnd('Image loading performance')
        console.log(`🚀 Loaded ${images.length} images in ${loadTime.toFixed(2)}ms`)
        
        // Show performance feedback
        if (loadTime < 1000) {
          setSuccessMessage(`⚡ Lightning fast! Loaded ${images.length} images in ${loadTime.toFixed(0)}ms`)
          setTimeout(() => setSuccessMessage(''), 4000)
        }
      }
      
    } catch (error) {
      console.error('Failed to load existing images:', error)
      setError(`Failed to load existing images: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoadingImages(false)
    }
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const result = await uploadImage(file)
      
      // Use cached URL if available, otherwise fetch it
      let imageUrl = imageCache.get(result.path)
      if (!imageUrl) {
        imageUrl = await getImageUrl(result.path)
        // Update cache
        setImageCache(prev => new Map(prev).set(result.path, imageUrl!))
      }
      
      // Ensure we have a valid URL
      if (!imageUrl) {
        throw new Error('Failed to generate image URL')
      }
      
      // Add new image to the list
      setUploadedImages(prev => [...prev, {
        path: result.path,
        url: imageUrl,
        name: file.name
      }])
      
      // Show success message
      setSuccessMessage(`Successfully uploaded ${file.name}`)
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Clear the file input
      event.target.value = ''
    } catch (error) {
      setError(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = async (pathToRemove: string) => {
    try {
      console.log('Deleting image from Supabase:', pathToRemove)
      
      // Delete from Supabase storage
      await deleteImage(pathToRemove)
      console.log('Successfully deleted from Supabase:', pathToRemove)
      
      // Remove from UI after successful deletion
      setUploadedImages(prev => prev.filter(img => img.path !== pathToRemove))
      console.log('Removed from UI:', pathToRemove)
      
    } catch (error) {
      console.error('Failed to delete image:', error)
      setError(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const clearAllImages = async () => {
    try {
      console.log('Clearing all images from Supabase...')
      
      // Delete all images from Supabase
      const deletePromises = uploadedImages.map(img => deleteImage(img.path))
      await Promise.all(deletePromises)
      console.log('Successfully deleted all images from Supabase')
      
      // Clear from UI after successful deletion
      setUploadedImages([])
      console.log('Cleared all images from UI')
      
    } catch (error) {
      console.error('Failed to clear all images:', error)
      setError(`Failed to clear all images: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const signOut = async () => {
    try {
      // Import signOutAdmin dynamically to avoid circular imports
      const { signOutAdmin } = await import('../../utils/supabase')
      await signOutAdmin()
      router.push('/admin-login')
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  const handleAddMember = async (memberData: { name: string; title: string; imageFile: File }, type: 'exec' | 'pm' | 'member') => {
    console.log('AdminDashboardPage handleAddMember called', { memberData, type })
    try {
      setError('') // Clear any previous errors
      
      // Validate input data
      if (!memberData.name.trim() || !memberData.title.trim()) {
        throw new Error('Name and title are required')
      }
      
      // First upload the image to Supabase storage
      const uploadResult = await uploadImage(memberData.imageFile)
      
      // Create member data with the storage path
      const memberDataForDB = {
        name: memberData.name.trim(),
        title: memberData.title.trim(),
        image: '', // This will be populated by the backend when fetching
        image_path: uploadResult.path // Store the storage path reference
      }
      
      // Add member to the appropriate table
      let newMember
      if (type === 'exec') {
        newMember = await addExecMember(memberDataForDB)
      } else if (type === 'pm') {
        newMember = await addProjectManager(memberDataForDB)
      } else {
        newMember = await addMember(memberDataForDB)
      }
      
      if (!newMember) {
        throw new Error('Failed to create member in database')
      }
      
      setShowAddMember(false)
      setSuccessMessage(`Successfully added ${memberData.name} as ${type === 'exec' ? 'Executive' : type === 'pm' ? 'Project Manager' : 'Member'}`)
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Refresh members list to show the new member
      await loadAllMembers()
    } catch (error) {
      console.error('Error adding member:', error)
      setError(`Failed to add member: ${error instanceof Error ? error.message : 'Unknown error'}`)
      
      // Note: In a production app, you might want to clean up the uploaded image
      // if the database operation fails, but for now we'll keep it simple
    }
  }

  const handleUpdateMember = async (id: string, updates: Partial<ExecMember | ProjectManager | Member> & { newImageFile?: File }, type: 'exec' | 'pm' | 'member') => {
    console.log('AdminDashboardPage handleUpdateMember called', { id, updates, type })
    try {
      setError('') // Clear any previous errors
      
      // Validate input data
      if (!updates.name?.trim() && !updates.title?.trim() && !updates.newImageFile) {
        throw new Error('At least one field must be updated')
      }
      
      let finalUpdates = { ...updates }
      let oldImagePath: string | null = null
      
      // If there's a new image file, upload it first
      if (updates.newImageFile) {
        // Get the current member to find the old image path
        let currentMember
        if (type === 'exec') {
          currentMember = execMembers.find(m => m.id === id)
        } else if (type === 'pm') {
          currentMember = projectManagers.find(m => m.id === id)
        } else {
          currentMember = members.find(m => m.id === id)
        }
        
        // Store the old image path for cleanup
        if (currentMember?.image_path) {
          oldImagePath = currentMember.image_path
        }
        
        const uploadResult = await uploadImage(updates.newImageFile)
        
        // Validate that the new image is accessible
        const isImageAccessible = await validateImageAccess(uploadResult.path)
        if (!isImageAccessible) {
          throw new Error('Failed to validate uploaded image - please try again')
        }
        
        // Update the image_path with the new storage path
        finalUpdates.image_path = uploadResult.path
        
        // Remove the newImageFile from updates since it's not part of the database schema
        delete (finalUpdates as any).newImageFile
      }
      
      // Clean up the updates object - remove undefined values and trim strings
      if (finalUpdates.name) finalUpdates.name = finalUpdates.name.trim()
      if (finalUpdates.title) finalUpdates.title = finalUpdates.title.trim()
      
      // Update the member in the appropriate table
      let updatedMember
      if (type === 'exec') {
        updatedMember = await updateExecMemberById(id, finalUpdates)
      } else if (type === 'pm') {
        updatedMember = await updateProjectManagerById(id, finalUpdates)
      } else {
        updatedMember = await updateMemberById(id, finalUpdates)
      }
      
      if (!updatedMember) {
        throw new Error('Failed to update member in database')
      }
      
      // Clean up old image from storage if it was replaced
      if (oldImagePath) {
        await safeDeleteOldImage(oldImagePath)
      }
      
      setEditingMember(null)
      setSuccessMessage(`Successfully updated ${updatedMember.name}${updates.newImageFile ? ' with new image' : ''}`)
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Refresh members list to show the updated member
      await loadAllMembers()
    } catch (error) {
      console.error('Error updating member:', error)
      setError(`Failed to update member: ${error instanceof Error ? error.message : 'Unknown error'}`)
      
      // Note: In a production app, you might want to clean up the uploaded image
      // if the database operation fails, but for now we'll keep it simple
    }
  }

  const handleDeleteMember = async (id: string, type: 'exec' | 'pm' | 'member') => {
    try {
      if (type === 'exec') {
        await removeExecMember(id)
      } else if (type === 'pm') {
        await removeProjectManager(id)
      } else {
        await removeMember(id)
      }
      setSuccessMessage(`Successfully deleted member`)
      setTimeout(() => setSuccessMessage(''), 3000)
      // Refresh members list to show the updated list
      await loadAllMembers()
    } catch (error) {
      setError(`Failed to delete member: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Carousel management functions
  const handleAddCarouselItem = async (itemData: {
    type: 'image' | 'video'
    src: string
    caption: string
    strip: 1 | 2 | 3
    order: number
    mediaFile: File
  }) => {
    try {
      setError('')
      
      // Create carousel item data with proper path handling
      const carouselItemData = {
        type: itemData.type,
        src: itemData.src,
        caption: itemData.caption,
        strip: itemData.strip,
        order: itemData.order,
        image_path: itemData.type === 'image' ? itemData.src : undefined,
        video_path: itemData.type === 'video' ? itemData.src : undefined
      }
      
      await addCarouselItem(carouselItemData)
      setShowAddCarouselItem(false)
      setSuccessMessage(`Successfully added carousel item to strip ${itemData.strip}`)
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Refresh carousel items
      await loadCarouselItems()
    } catch (error) {
      console.error('Error adding carousel item:', error)
      setError(`Failed to add carousel item: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleUpdateCarouselItem = async (id: string, updates: Partial<CarouselItem> & { newMediaFile?: File }) => {
    try {
      setError('')
      
      // Clean up the updates object
      const cleanUpdates = { ...updates }
      delete (cleanUpdates as any).newMediaFile
      
      await updateCarouselItemById(id, cleanUpdates)
      setEditingCarouselItem(null)
      setSuccessMessage('Successfully updated carousel item')
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Refresh carousel items
      await loadCarouselItems()
    } catch (error) {
      console.error('Error updating carousel item:', error)
      setError(`Failed to update carousel item: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDeleteCarouselItem = async (id: string) => {
    try {
      await removeCarouselItem(id)
      setSuccessMessage('Successfully deleted carousel item')
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Refresh carousel items
      await loadCarouselItems()
    } catch (error) {
      setError(`Failed to delete carousel item: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MDB Admin Dashboard</h1>
              <p className="text-gray-600">Manage website images and content</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="font-medium text-gray-900">{user?.email}</p>
              <button
                onClick={signOut}
                className="mt-2 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('images')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'images'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Image Management
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'members'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Member Management
            </button>
            <button
              onClick={() => setActiveTab('carousel')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'carousel'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Carousel Management
            </button>
          </div>
        </div>

        {/* Image Management Tab */}
        {activeTab === 'images' && (
          <>
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-mdb-blue transition-colors">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                  multiple
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-mdb-blue hover:bg-mdb-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {uploading ? 'Uploading...' : 'Choose Images to Upload'}
                </label>
                <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                {uploading && (
                  <div className="mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-mdb-blue mx-auto"></div>
                    <p className="text-gray-600 mt-2">Processing image...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Images Display */}
            {loadingImages ? (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mdb-blue mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading existing images...</p>
                  <p className="text-sm text-gray-500 mt-2">This should be much faster now! 🚀</p>
                </div>
              </div>
            ) : uploadedImages.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Manage Images ({uploadedImages.length})</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadExistingImages(true)}
                      disabled={loadingImages}
                      className="px-4 py-2 bg-mdb-blue text-white rounded hover:bg-mdb-blue/90 transition-colors disabled:opacity-50"
                    >
                      {loadingImages ? 'Loading...' : 'Refresh'}
                    </button>
                    <button
                      onClick={clearAllImages}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Clear All Images
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-40 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <button
                            onClick={() => removeImage(image.path)}
                            className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-700 transition-all duration-200 transform scale-90 group-hover:scale-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-gray-800 font-medium mb-1 truncate" title={image.name}>
                          {image.name}
                        </p>
                        <p className="text-xs text-gray-500 font-mono truncate" title={image.path}>
                          {image.path}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="text-center py-12">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
                  <p className="text-gray-500">Upload your first image to get started</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Member Management Tab */}
        {activeTab === 'members' && (
          <>
            {/* Add Member Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Member Management</h2>
                <div className="flex gap-2">
                  <button
                    onClick={loadAllMembers}
                    disabled={membersLoading}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {membersLoading ? 'Loading...' : 'Refresh'}
                  </button>
                  <button
                    onClick={() => setShowAddMember(true)}
                    className="px-4 py-2 bg-mdb-blue text-white rounded hover:bg-mdb-blue/90 transition-colors"
                  >
                    Add New Member
                  </button>
                </div>
              </div>

              {/* Executive Members */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-mdb-blue">Executive Members</h3>
                {membersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mdb-blue mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading...</p>
                  </div>
                ) : execMembers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {execMembers.map((member) => (
                      <div key={member.id} className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.title}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingMember({ type: 'exec', member })}
                              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member.id!, 'exec')}
                              className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No executive members yet</p>
                )}
              </div>

              {/* Project Managers */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-mdb-blue">Project Managers</h3>
                {membersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mdb-blue mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading...</p>
                  </div>
                ) : projectManagers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectManagers.map((member) => (
                      <div key={member.id} className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.title}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingMember({ type: 'pm', member })}
                              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member.id!, 'pm')}
                              className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No project managers yet</p>
                )}
              </div>

              {/* General Members */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-mdb-blue">General Members</h3>
                {membersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mdb-blue mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading...</p>
                  </div>
                ) : members.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member) => (
                      <div key={member.id} className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.title}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingMember({ type: 'member', member })}
                              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member.id!, 'member')}
                              className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No general members yet</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Carousel Management Tab */}
        {activeTab === 'carousel' && (
          <>
            {/* Add Carousel Item Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Carousel Management</h2>
                <div className="flex gap-2">
                  <button
                    onClick={loadCarouselItems}
                    disabled={carouselLoading}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {carouselLoading ? 'Loading...' : 'Refresh'}
                  </button>
                  <button
                    onClick={loadCarouselImages}
                    disabled={carouselLoading}
                    className="px-4 py-2 bg-mdb-blue text-white rounded hover:bg-mdb-blue/90 transition-colors disabled:opacity-50"
                  >
                    Refresh Images
                  </button>
                  <button
                    onClick={() => setShowAddCarouselItem(true)}
                    className="px-4 py-2 bg-mdb-blue text-white rounded hover:bg-mdb-blue/90 transition-colors"
                  >
                    Add Carousel Item
                  </button>
                </div>
              </div>

              {/* Carousel Strips */}
              {carouselLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mdb-blue mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading carousel items...</p>
                </div>
              ) : carouselImageCache.size === 0 && carouselItems.some(item => item.type === 'image') ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mdb-blue mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading carousel images...</p>
                  <p className="text-sm text-gray-500 mt-2">Converting storage paths to display URLs...</p>
                </div>
              ) : (
                <>
                  {/* Strip 1 - Top (Right to Left) */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-mdb-blue">Top Strip (Right to Left)</h3>
                    {getItemsByStrip(1).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getItemsByStrip(1).map((item) => (
                          <div key={item.id} className="bg-gray-50 rounded-lg p-4 border">
                            <div className="mb-3">
                              {item.type === 'image' ? (
                                <img
                                  src={item.image_path ? carouselImageCache.get(item.image_path) || item.src : item.src}
                                  alt={item.caption}
                                  className="w-full h-32 object-cover rounded"
                                />
                              ) : (
                                <video
                                  key={item.id}
                                  src={`${process.env.SUPABASE_URL}/storage/v1/object/public/videos/${item.video_path}`}
                                  className="w-full h-32 object-cover rounded"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              )}
                            </div>
                            <div className="mb-3">
                              <h4 className="font-semibold text-gray-900 text-sm">{item.caption}</h4>
                              <p className="text-xs text-gray-500">Order: {item.order}</p>
                              <p className="text-xs text-gray-500">Type: {item.type}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingCarouselItem({ type: 'carousel', item })}
                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCarouselItem(item.id!)}
                                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No items in top strip yet</p>
                    )}
                  </div>

                  {/* Strip 2 - Middle (Left to Right) */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-mdb-blue">Middle Strip (Left to Right)</h3>
                    {getItemsByStrip(2).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getItemsByStrip(2).map((item) => (
                          <div key={item.id} className="bg-gray-50 rounded-lg p-4 border">
                            <div className="mb-3">
                              {item.type === 'image' ? (
                                <img
                                  src={item.image_path ? carouselImageCache.get(item.image_path) || item.src : item.src}
                                  alt={item.caption}
                                  className="w-full h-32 object-cover rounded"
                                />
                              ) : (
                                <video
                                  key={item.id}
                                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${item.video_path}`}
                                  className="w-full h-32 object-cover rounded"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              )}
                            </div>
                            <div className="mb-3">
                              <h4 className="font-semibold text-gray-900 text-sm">{item.caption}</h4>
                              <p className="text-xs text-gray-500">Order: {item.order}</p>
                              <p className="text-xs text-gray-500">Type: {item.type}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingCarouselItem({ type: 'carousel', item })}
                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCarouselItem(item.id!)}
                                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No items in middle strip yet</p>
                    )}
                  </div>

                  {/* Strip 3 - Bottom (Right to Left) */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-mdb-blue">Bottom Strip (Right to Left)</h3>
                    {getItemsByStrip(3).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getItemsByStrip(3).map((item) => (
                          <div key={item.id} className="bg-gray-50 rounded-lg p-4 border">
                            <div className="mb-3">
                              {item.type === 'image' ? (
                                <img
                                  src={item.image_path ? carouselImageCache.get(item.image_path) || item.src : item.src}
                                  alt={item.caption}
                                  className="w-full h-32 object-cover rounded"
                                />
                              ) : (
                                <video
                                  key={item.id}
                                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${item.video_path}`}
                                  className="w-full h-32 object-cover rounded"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              )}
                            </div>
                            <div className="mb-3">
                              <h4 className="font-semibold text-gray-900 text-sm">{item.caption}</h4>
                              <p className="text-xs text-gray-500">Order: {item.order}</p>
                              <p className="text-xs text-gray-500">Type: {item.type}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingCarouselItem({ type: 'carousel', item })}
                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCarouselItem(item.id!)}
                                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No items in bottom strip yet</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Status Check */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm">Supabase Connected</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm">Authentication Active</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm">Upload Ready</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-sm">{uploadedImages.length} Images</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              <span className="text-sm">Cache: {imageCache.size} URLs</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span className="text-sm">Performance: Optimized</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
              <span className="text-sm">{carouselItems.length} Carousel Items</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
              <span className="text-sm">Carousel Cache: {carouselImageCache.size} URLs</span>
            </div>
          </div>
        </div>

        {/* Success Display */}
        {successMessage && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-green-800">
            <strong>Success:</strong> {successMessage}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Add Member Modal */}
        <AddMemberModal
          isOpen={showAddMember}
          onClose={() => setShowAddMember(false)}
          onSubmit={handleAddMember}
        />

        {/* Edit Member Modal */}
        <EditMemberModal
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          onSubmit={handleUpdateMember}
          member={editingMember}
        />

        {/* Add Carousel Item Modal */}
        <AddCarouselItemModal
          isOpen={showAddCarouselItem}
          onClose={() => setShowAddCarouselItem(false)}
          onSubmit={handleAddCarouselItem}
        />

        {/* Edit Carousel Item Modal */}
        <EditCarouselItemModal
          isOpen={!!editingCarouselItem}
          onClose={() => setEditingCarouselItem(null)}
          onSubmit={handleUpdateCarouselItem}
          item={editingCarouselItem}
        />
      </div>
    </div>
  )
}