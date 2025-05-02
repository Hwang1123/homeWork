import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  login: (userData) => {
    set({ user: userData })
    localStorage.setItem('user', JSON.stringify(userData))
  },
  logout: () => {
    set({ user: null })
    localStorage.removeItem('user')
  },
  restore: () => {
    const saved = localStorage.getItem('user')
    if (saved) set({ user: JSON.parse(saved) })
  }
}))

export default useAuthStore
