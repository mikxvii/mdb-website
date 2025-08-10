'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  getExecMembers, 
  getProjectManagers, 
  getMembers,
  createExecMember,
  createProjectManager,
  createMember,
  updateExecMember,
  updateProjectManager,
  updateMember,
  deleteExecMember,
  deleteProjectManager,
  deleteMember
} from '../../utils/supabase'
import { ExecMember, ProjectManager, Member } from '../types/members'

// Simple in-memory cache
const memberCache = new Map<string, { data: any; timestamp: number }>()

export const useMembers = () => {
  const [execMembers, setExecMembers] = useState<ExecMember[]>([])
  const [projectManagers, setProjectManagers] = useState<ProjectManager[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadAllMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Check cache first (5 minute cache)
      const cacheKey = 'all-members'
      const cached = memberCache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
        setExecMembers(cached.data.exec)
        setProjectManagers(cached.data.pm)
        setMembers(cached.data.mem)
        setLoading(false)
        return
      }
      
      const [exec, pm, mem] = await Promise.all([
        getExecMembers(),
        getProjectManagers(),
        getMembers()
      ])
      
      // Cache the results
      memberCache.set(cacheKey, {
        data: { exec, pm, mem },
        timestamp: Date.now()
      })
      
      setExecMembers(exec)
      setProjectManagers(pm)
      setMembers(mem)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load members')
      console.error('Error loading members:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllMembers()
  }, [])

  // Memoized results for better performance
  const memoizedExec = useMemo(() => execMembers, [execMembers])
  const memoizedPM = useMemo(() => projectManagers, [projectManagers])
  const memoizedMembers = useMemo(() => members, [members])

  const addExecMember = async (member: Omit<ExecMember, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newMember = await createExecMember(member)
      setExecMembers(prev => [...prev, newMember])
      return newMember
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add exec member')
      throw err
    }
  }

  const addProjectManager = async (member: Omit<ProjectManager, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newMember = await createProjectManager(member)
      setProjectManagers(prev => [...prev, newMember])
      return newMember
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add project manager')
      throw err
    }
  }

  const addMember = async (member: Omit<Member, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newMember = await createMember(member)
      setMembers(prev => [...prev, newMember])
      return newMember
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add member')
      throw err
    }
  }

  const updateExecMemberById = async (id: string, updates: Partial<ExecMember>) => {
    try {
      const updatedMember = await updateExecMember(id, updates)
      setExecMembers(prev => prev.map(m => m.id === id ? updatedMember : m))
      return updatedMember
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update exec member')
      throw err
    }
  }

  const updateProjectManagerById = async (id: string, updates: Partial<ProjectManager>) => {
    try {
      const updatedMember = await updateProjectManager(id, updates)
      setProjectManagers(prev => prev.map(m => m.id === id ? updatedMember : m))
      return updatedMember
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project manager')
      throw err
    }
  }

  const updateMemberById = async (id: string, updates: Partial<Member>) => {
    try {
      const updatedMember = await updateMember(id, updates)
      setMembers(prev => prev.map(m => m.id === id ? updatedMember : m))
      return updatedMember
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update member')
      throw err
    }
  }

  const removeExecMember = async (id: string) => {
    try {
      await deleteExecMember(id)
      setExecMembers(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove exec member')
      throw err
    }
  }

  const removeProjectManager = async (id: string) => {
    try {
      await deleteProjectManager(id)
      setProjectManagers(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove project manager')
      throw err
    }
  }

  const removeMember = async (id: string) => {
    try {
      await deleteMember(id)
      setMembers(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove member')
      throw err
    }
  }

  return {
    execMembers: memoizedExec,
    projectManagers: memoizedPM,
    members: memoizedMembers,
    loading,
    error,
    loadAllMembers,
    addExecMember,
    addProjectManager,
    addMember,
    updateExecMemberById,
    updateProjectManagerById,
    updateMemberById,
    removeExecMember,
    removeProjectManager,
    removeMember,
    clearCache: () => memberCache.clear()
  }
}
