'use client'

// import "@/styles/pages/guest.scss"
import Image from 'next/image'
import { useState } from 'react'
import Login from './login'
import Signup from './signup'
import logo from '@/public/logo.png'
import { signIn } from 'next-auth/react'

export default function GuestPage() {
  const [showLogin, setShowLogin] = useState(true)

  const switchView = () => {
    setShowLogin(!showLogin)
  }

  const doLogin = async (cred: any) => {
    const response = await signIn('credentials', cred)
    console.log('dologin:', response)
    // console.log('cred', cred)
    // const response = await fetch("/api/auth/login", {
    //     method: "POST",
    //     body: JSON.stringify(cred),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    // console.log(response)
  }

  const doSignup = () => {}

  return (
    <section className="guest-section">
      <div className="logo-section">
        <div className="logo">
          <Image src={logo} alt="logo" />
          <h1 className="logo-text">Fanclub</h1>
        </div>
      </div>
      <div className="form-section">
        {showLogin ? (
          <Login onSwitch={switchView} onLogin={doLogin} />
        ) : (
          <Signup onSwitch={switchView} onSignup={doSignup} />
        )}
      </div>
    </section>
  )
}
