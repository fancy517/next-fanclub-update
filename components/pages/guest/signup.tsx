import { useState } from 'react'

interface Props {
  onSwitch: () => void
  onSignup: (cred: any) => void
}

export default function Signup({ onSwitch, onSignup }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [username, setUsername] = useState('')

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (
      email == '' ||
      username == '' ||
      password == '' ||
      password != passwordConfirm
    ) {
      return
    }

    onSignup({ email, password, username })
  }

  return (
    <div className="w-full">
      <input
        type="text"
        className="fc-input block"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        className="fc-input block"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="fc-input block"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="fc-input block"
        placeholder="Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button className="fc-btn block w-100 mt-2" onClick={onClick}>
        Sign up
      </button>

      <p>
        Have an account?{' '}
        <a href="#" onClick={onSwitch}>
          Login now
        </a>
      </p>
    </div>
  )
}
