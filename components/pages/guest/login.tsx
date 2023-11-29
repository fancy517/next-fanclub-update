import { useState } from 'react'

interface Props {
  onSwitch: () => void
  onLogin: (cred: any) => void
}

export default function Page({ onSwitch, onLogin }: Props) {
  const [email, setEmail] = useState('user1@mail.com')
  const [password, setPassword] = useState('123')

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (email == '' || password == '') {
      return
    }

    onLogin({ email, password })
  }

  return (
    <div className="w-100">
      <input
        type="text"
        className="fc-input d-block"
        placeholder="Email or username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="fc-input d-block"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <a href="#" onClick={onSwitch} className="mt-3 mb-3 d-block">
        Forgot password?
      </a>

      <button className="fc-btn block w-100" onClick={onClick}>
        Sign in
      </button>

      <p>
        Don&apos;t have an account?{' '}
        <a href="#" onClick={onSwitch}>
          Sign up now
        </a>
      </p>
    </div>
  )
}
