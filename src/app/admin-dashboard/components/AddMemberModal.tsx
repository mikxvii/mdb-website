'use client'

import React, { useState } from 'react'
import { ExecMember, ProjectManager, Member } from '../../types/members'
import MemberDB from '../../components/MemberDB'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (memberData: { name: string; title: string; imageFile: File }, type: 'exec' | 'pm' | 'member') => Promise<void>
}

export default function AddMemberModal({ isOpen, onClose, onSubmit }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    imageFile: null as File | null
  })
  const [memberType, setMemberType] = useState<'exec' | 'pm' | 'member'>('member')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleSubmit = async () => {
    console.log('AddMemberModal handleSubmit called', { formData, memberType })
    if (!formData.name.trim() || !formData.title.trim() || !formData.imageFile) {
      console.log('Validation failed', { name: formData.name.trim(), title: formData.title.trim(), imageFile: !!formData.imageFile })
      return
    }

    setIsSubmitting(true)
    try {
      // TypeScript knows imageFile is not null here due to the check above
      await onSubmit({ ...formData, imageFile: formData.imageFile! }, memberType)
      // Reset form
      setFormData({ name: '', title: '', imageFile: null })
      setMemberType('member')
      setPreviewUrl('')
    } catch (error) {
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
      setFormData(prev => ({ ...prev, imageFile: file }))
      
      // Create preview URL
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
    onClose()
  }

  // Check if we have enough data to show preview
  const canShowPreview = formData.name.trim() && formData.title.trim() && previewUrl

  console.log('AddMemberModal render:', { isOpen, formData, memberType })
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add New Member</h2>
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
                {/* Member Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setMemberType('exec')}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        memberType === 'exec'
                          ? 'bg-mdb-blue text-white border-mdb-blue'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-mdb-blue'
                      }`}
                    >
                      Executive
                    </button>
                    <button
                      type="button"
                      onClick={() => setMemberType('pm')}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        memberType === 'pm'
                          ? 'bg-mdb-blue text-white border-mdb-blue'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-mdb-blue'
                      }`}
                    >
                      Project Manager
                    </button>
                    <button
                      type="button"
                      onClick={() => setMemberType('member')}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        memberType === 'member'
                          ? 'bg-mdb-blue text-white border-mdb-blue'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-mdb-blue'
                      }`}
                    >
                      Member
                    </button>
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

                {/* Image Upload Field */}
                <div>
                  <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-mdb-blue transition-colors">
                    <input
                      type="file"
                      id="imageFile"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="imageFile"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mdb-blue hover:bg-mdb-blue/90 transition-colors"
                    >
                      Choose Image File
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
                      This is how your member will appear:
                    </p>
                  </div>
                  
                  {/* MemberDB Preview */}
                  <MemberDB
                    name={formData.name}
                    title={formData.title}
                    image={previewUrl}
                    size="large"
                    className="transform-none hover:scale-100 hover:translate-x-0"
                  />
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Member Type: <span className="font-medium text-mdb-blue">
                        {memberType === 'exec' ? 'Executive' : memberType === 'pm' ? 'Project Manager' : 'Member'}
                      </span>
                    </p>
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
                  <p className="text-gray-500">Enter the member's name, title, and upload an image to see how they'll appear on the website.</p>
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
                console.log('Add Member button clicked!')
                console.log('Button state:', { isSubmitting, name: formData.name.trim(), title: formData.title.trim(), imageFile: !!formData.imageFile })
                handleSubmit()
              }}
              disabled={isSubmitting || !formData.name.trim() || !formData.title.trim() || !formData.imageFile}
              className="flex-1 px-4 py-2 bg-mdb-blue text-white rounded-md hover:bg-mdb-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
