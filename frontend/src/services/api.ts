import type { WritingMode } from '../types/writing'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export interface RewriteResponse {
  result: string
  mode: WritingMode
  model: string
}

export interface ApiErrorResponse {
  error?: {
    code?: string
    message?: string
    requestId?: string
  }
}

function sanitizeErrorMessage(rawMessage: string): string {
  if (!rawMessage) return 'An unexpected error occurred.'

  // Try parsing direct JSON object
  try {
    const parsed = JSON.parse(rawMessage) as { error?: { message?: string } }
    if (parsed?.error?.message) {
      return parsed.error.message
    }
  } catch {
    // Not direct JSON
  }

  // Try matching JSON substring within raw error string
  const jsonMatch = rawMessage.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as { error?: { message?: string } }
      if (parsed?.error?.message) {
        return parsed.error.message
      }
    } catch {
      // Ignore parsing errors
    }
  }

  return rawMessage
}

export async function rewriteText(text: string, mode: WritingMode): Promise<RewriteResponse> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/rewrite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, mode }),
    })
  } catch {
    throw new Error('Unable to connect to the writing service. Please check your internet connection or try again later.')
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    throw new Error('Received an invalid response from the server.')
  }

  if (!response.ok) {
    const errorBody = data as ApiErrorResponse
    const rawMessage = errorBody?.error?.message || `Request failed with status ${response.status}`
    throw new Error(sanitizeErrorMessage(rawMessage))
  }

  return data as RewriteResponse
}
