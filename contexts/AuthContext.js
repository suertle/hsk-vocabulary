import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      router.push('/login')
    } catch (err) {
      console.log('Error: logout', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}
