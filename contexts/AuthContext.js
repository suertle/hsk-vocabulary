import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const router = useRouter()
  console.log(router)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
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
      { loading ? null : children }
    </AuthContext.Provider>
  )
}
