'use client'

import React, { useState, useEffect } from 'react'
import { ExecMember, ProjectManager, Member } from '../../types/members'
import MemberDB from '../../components/MemberDB'

interface EditMemberModalProps {
  isOpen: boolean
  onClose: () => void
  member: { type: 'exec' | 'pm' | 'member'; member: ExecMember | ProjectManager | Member } | null
  onSubmit: (id: string, updates: Partial<ExecMember | ProjectManager | Member> & { newImageFile?: File }, type: 'exec' | 'pm' | 'member') => Promise<void>
}

export default function EditMemberModal({ isOpen, onClose, member, onSubmit }: EditMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    image: ''
  })
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [memberType, setMemberType] = useState<'exec' | 'pm' | 'member'>('member')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.member.name,
        title: member.member.title,
        image: member.member.image
      })
      
      // Use the type from the editingMember state
      setMemberType(member.type)
      
      // Reset new image file and preview
      setNewImageFile(null)
      setPreviewUrl('')
    }
  }, [member])

  const handleSubmit = async () => {
    console.log('EditMemberModal handleSubmit called', { formData, memberType, member, newImageFile })
    if (!member || !formData.name.trim() || !formData.title.trim()) {
      console.log('Validation failed', { member: !!member, name: formData.name.trim(), title: formData.title.trim() })
      return
    }

    setIsSubmitting(true)
    try {
      const updates: Partial<ExecMember | ProjectManager | Member> & { newImageFile?: File } = {
        name: formData.name?.trim() || '',
        title: formData.title?.trim() || ''
      }

      // Only include newImageFile if a new image was selected
      if (newImageFile) {
        console.log('New image file selected:', { 
          name: newImageFile.name, 
          size: newImageFile.size, 
          type: newImageFile.type 
        })
        updates.newImageFile = newImageFile
      }

      console.log('Submitting updates:', updates)
      await onSubmit(member.member.id!, updates, memberType)
      onClose()
    } catch (error) {
      console.error('Error in EditMemberModal handleSubmit:', error)
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImageFile(file)
      
      // Create preview URL for new image
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleClose = () => {
    // Clean up preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl('')
    setNewImageFile(null)
    onClose()
  }

  // Determine which image to show in preview (new image or current image)
  const previewImage = previewUrl || formData.image
  const canShowPreview = formData.name?.trim() && formData.title?.trim() && previewImage

  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Member: {member.member.name}</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <div className="space-y-4">
                {/* Member Type Display (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Type
                  </label>
                  <div className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300">
                    {memberType === 'exec' ? 'Executive' : memberType === 'pm' ? 'Project Manager' : 'Member'}
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue"
                    placeholder="Enter member's full name"
                    required
                  />
                </div>

                {/* Title Field */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title/Role *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue"
                    placeholder="e.g., President, Developer, Designer"
                    required
                  />
                </div>

                {/* Current Image Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      <img
                        src={member.member.image}
                        alt={member.member.name}
                        className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Current profile image</p>
                      <p className="text-xs text-gray-500">This image is currently displayed on the website</p>
                    </div>
                  </div>
                </div>

                {/* New Image Upload Field */}
                <div>
                  <label htmlFor="newImageFile" className="block text-sm font-medium text-gray-700 mb-2">
                    Update Image (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-mdb-blue transition-colors">
                    <input
                      type="file"
                      id="newImageFile"
                      name="newImageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="newImageFile"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mdb-blue hover:bg-mdb-blue/90 transition-colors"
                    >
                      Choose New Image
                    </label>
                    <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  

                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Preview</h3>
              
              {canShowPreview ? (
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 text-center mb-2">
                      {newImageFile ? 'This is how your member will appear after the update:' : 'Current member appearance:'}
                    </p>
                  </div>
                  
                  {/* MemberDB Preview */}
                  <MemberDB
                    name={formData.name}
                    title={formData.title}
                    image={previewImage}
                    size="large"
                    className="transform-none hover:scale-100 hover:translate-x-0"
                  />
                  
                  <div className="mt-4 text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      Member Type: <span className="font-medium text-mdb-blue">
                        {memberType === 'exec' ? 'Executive' : memberType === 'pm' ? 'Project Manager' : 'Member'}
                      </span>
                    </p>
                    {newImageFile && (
                      <p className="text-xs text-mdb-blue font-medium">
                        ✨ New image will be uploaded
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <svg className="mx-auto h-16 w-16 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Fill out the form to see preview</h4>
                  <p className="text-gray-500">Update the member's name, title, or upload a new image to see how they'll appear.</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('Update Member button clicked!')
                handleSubmit()
              }}
              disabled={isSubmitting || !formData.name?.trim() || !formData.title?.trim()}
              className="flex-1 px-4 py-2 bg-mdb-blue text-white rounded-md hover:bg-mdb-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Updating...' : 'Update Member'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
