'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CarouselItem } from '../../types/members'
import { uploadImage, uploadVideo, getImageUrl, getVideoUrl } from '../../../utils/supabase'

interface EditCarouselItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (id: string, updates: Partial<CarouselItem> & { newMediaFile?: File }) => void
  item: { type: 'carousel', item: CarouselItem } | null
}

export default function EditCarouselItemModal({ isOpen, onClose, onSubmit, item }: EditCarouselItemModalProps) {
  const [type, setType] = useState<'image' | 'video'>('image')
  const [caption, setCaption] = useState('')
  const [strip, setStrip] = useState<1 | 2 | 3>(1)
  const [order, setOrder] = useState(1)
  const [newMediaFile, setNewMediaFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [mediaUrl, setMediaUrl] = useState<string>('')

  // Update form when item changes
  useEffect(() => {
    if (item?.item) {
      setType(item.item.type)
      setCaption(item.item.caption)
      setStrip(item.item.strip)
      setOrder(item.item.order)
      setNewMediaFile(null)
      setError('')
      
      // Generate media URL for preview
      const generateMediaUrl = async () => {
        try {
          if (item.item.type === 'image' && item.item.image_path) {
            const url = await getImageUrl(item.item.image_path)
            setMediaUrl(url)
          } else if (item.item.type === 'video' && item.item.video_path) {
            const url = await getVideoUrl(item.item.video_path)
            setMediaUrl(url)
          } else {
            setMediaUrl('')
          }
        } catch (err) {
          console.error('Failed to generate media URL:', err)
          setMediaUrl('')
        }
      }
      
      generateMediaUrl()
    }
  }, [item])

  const getMediaUrl = (item: CarouselItem, type: 'image' | 'video'): string => {
    if (type === 'video') {
      if (item.video_path) {
        // Use the src directly if it's already a full URL, otherwise construct it
        if (item.src && (item.src.startsWith('http://') || item.src.startsWith('https://'))) {
          return item.src
        }
        // For now, return the src as is - the parent component will handle URL construction
        return item.src
      }
      return item.src
    } else {
      if (item.image_path) {
        // Use the src directly if it's already a full URL, otherwise construct it
        if (item.src && (item.src.startsWith('http://') || item.src.startsWith('https://'))) {
          return item.src
        }
        // For now, return the src as is - the parent component will handle URL construction
        return item.src
      }
      return item.src
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!item?.item?.id) {
      setError('No item to edit')
      return
    }

    if (!caption.trim()) {
      setError('Please enter a caption')
      return
    }

    setUploading(true)
    setError('')

    try {
      const updates: Partial<CarouselItem> & { newMediaFile?: File } = {
        caption: caption.trim(),
        strip,
        order
      }

      // If there's a new media file, upload it first
      if (newMediaFile) {
        let uploadResult
        if (type === 'image') {
          uploadResult = await uploadImage(newMediaFile)
          updates.image_path = uploadResult.path
          updates.video_path = undefined // Clear video path if switching to image
        } else {
          uploadResult = await uploadVideo(newMediaFile)
          updates.video_path = uploadResult.path
          updates.image_path = undefined // Clear image path if switching to video
        }
        updates.src = uploadResult.path
        updates.newMediaFile = newMediaFile
      }

      // If type changed, update the type and clear the opposite path
      if (type !== item.item.type) {
        updates.type = type
        if (type === 'image') {
          updates.video_path = undefined
        } else {
          updates.image_path = undefined
        }
      }

      onSubmit(item.item.id, updates)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (type === 'image' && !file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      if (type === 'video' && !file.type.startsWith('video/')) {
        setError('Please select a video file')
        return
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }

      setNewMediaFile(file)
      setError('')
    }
  }

  if (!isOpen || !item?.item) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Carousel Item</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Media Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="image"
                  checked={type === 'image'}
                  onChange={(e) => setType(e.target.value as 'image' | 'video')}
                  className="mr-2"
                />
                Image
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="video"
                  checked={type === 'video'}
                  onChange={(e) => setType(e.target.value as 'image' | 'video')}
                  className="mr-2"
                />
                Video
              </label>
            </div>
          </div>

          {/* Strip Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carousel Strip
            </label>
            <select
              value={strip}
              onChange={(e) => setStrip(Number(e.target.value) as 1 | 2 | 3)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue"
            >
              <option value={1}>Top Strip (Right to Left)</option>
              <option value={2}>Middle Strip (Left to Right)</option>
              <option value={3}>Bottom Strip (Right to Left)</option>
            </select>
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order
            </label>
            <input
              type="number"
              min="1"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue"
              placeholder="Enter a caption for this item..."
            />
          </div>

          {/* Current Media Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current {type === 'image' ? 'Image' : 'Video'}
            </label>
            <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
              {mediaUrl ? (
                type === 'image' ? (
                  <Image 
                    src={mediaUrl}
                    alt="Current media" 
                    width={400}
                    height={128}
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <video 
                    src={mediaUrl}
                    className="w-full h-32 object-cover rounded"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                )
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Loading media preview...</p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Current file: {item.item.image_path || item.item.video_path || item.item.src}
              </p>
            </div>
          </div>

          {/* New Media File Upload (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New {type === 'image' ? 'Image' : 'Video'} File (Optional)
            </label>
            <input
              type="file"
              accept={type === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to keep current file. {type === 'image' ? 'PNG, JPG, GIF' : 'MP4, MOV, AVI'} up to 10MB
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !caption.trim()}
              className="flex-1 px-4 py-2 bg-mdb-blue text-white rounded-md hover:bg-mdb-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? 'Updating...' : 'Update Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
