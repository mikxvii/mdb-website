'use client'

import React, { useState, useEffect } from 'react'
import { CarouselItem } from '../../types/members'
import { uploadImage, uploadVideo } from '../../../utils/supabase'

interface AddCarouselItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (itemData: {
    type: 'image' | 'video'
    src: string
    caption: string
    strip: 1 | 2 | 3
    order: number
    mediaFile: File
  }) => void
}

export default function AddCarouselItemModal({ isOpen, onClose, onSubmit }: AddCarouselItemModalProps) {
  const [type, setType] = useState<'image' | 'video'>('image')
  const [caption, setCaption] = useState('')
  const [strip, setStrip] = useState<1 | 2 | 3>(1)
  const [order, setOrder] = useState(1)
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setType('image')
      setCaption('')
      setStrip(1)
      setOrder(1)
      setMediaFile(null)
      setError('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!mediaFile) {
      setError('Please select a media file')
      return
    }
    
    if (!caption.trim()) {
      setError('Please enter a caption')
      return
    }

    setUploading(true)
    setError('')

    try {
      // Upload the media file
      let uploadResult
      if (type === 'image') {
        uploadResult = await uploadImage(mediaFile)
      } else {
        uploadResult = await uploadVideo(mediaFile)
      }

      // Create the carousel item data with proper path handling
      const itemData = {
        type,
        src: uploadResult.path,
        caption: caption.trim(),
        strip,
        order,
        image_path: type === 'image' ? uploadResult.path : undefined,
        video_path: type === 'video' ? uploadResult.path : undefined,
        mediaFile
      }

      onSubmit(itemData)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload media')
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

      setMediaFile(file)
      setError('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Add Carousel Item</h2>
        
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

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'image' ? 'Image' : 'Video'} File
            </label>
            <input
              type="file"
              accept={type === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue"
            />
            <p className="text-xs text-gray-500 mt-1">
              {type === 'image' ? 'PNG, JPG, GIF' : 'MP4, MOV, AVI'} up to 10MB
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
              disabled={uploading || !mediaFile || !caption.trim()}
              className="flex-1 px-4 py-2 bg-mdb-blue text-white rounded-md hover:bg-mdb-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? 'Uploading...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
