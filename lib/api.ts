const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullname: string
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface ApiError {
  message: string
  code: number
  details?: any
}

class ApiClient {
  private baseUrl: string
  private accessToken: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setAccessToken(token: string | null) {
    this.accessToken = token
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`
    }

    console.log("[v0] Making API request to:", url)

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.log("[v0] Error response:", errorData)
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Success response:", data)
      return data
    } catch (error) {
      console.error("[v0] Fetch error:", error)
      throw error
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async register(userData: RegisterRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async refreshToken(): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/refresh", {
      method: "POST",
    })
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, new_password: newPassword }),
    })
  }

  async googleLogin(idToken: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/google-login", {
      method: "POST",
      body: JSON.stringify({ id_token: idToken }),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
