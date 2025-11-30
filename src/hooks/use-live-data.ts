'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export interface Metrics {
  totalRevenue: number
  unitsAvailable: number
  occupancyRate: number
  customerSatisfaction: number
  projectsActive: number
  employeeCount: number
  marketShare: number
  leadConversion: number
  lastUpdated: string
}

export interface Initiative {
  id: string
  name: string
  progress: number
  status: 'on-track' | 'ahead' | 'behind' | 'planning'
}

export interface Activity {
  type: string
  message: string
  time: string
}

export interface Alert {
  id: number
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  priority: 'low' | 'medium' | 'high'
}

export interface LiveData {
  metrics: Metrics
  initiatives: Initiative[]
  recentActivity: Activity[]
  alerts: Alert[]
}

export function useLiveData(refreshInterval: number = 30000) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<LiveData>(
    '/api/data',
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
    }
  )

  return {
    data,
    isLoading,
    isValidating,
    isError: !!error,
    error,
    refresh: () => mutate(),
  }
}

export function useMetrics(refreshInterval: number = 30000) {
  const { data, isLoading, isValidating, refresh } = useLiveData(refreshInterval)

  return {
    metrics: data?.metrics,
    isLoading,
    isValidating,
    refresh,
  }
}

export function useInitiatives(refreshInterval: number = 60000) {
  const { data, isLoading, isValidating, refresh } = useLiveData(refreshInterval)

  return {
    initiatives: data?.initiatives,
    isLoading,
    isValidating,
    refresh,
  }
}
