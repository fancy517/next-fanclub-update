'use client'

import { useEffect, useState } from 'react'
import LocalizationString from './LocalizationString'

type Props = {
  children?: React.ReactNode
  className?: string
  innerClassname: string
  onClick?: () => void
  [x: string]: any
}

export default function FCThemeController({
  children,
  className,
  innerClassname,
  onClick,
  ...rest
}: Props) {
  const [thememode, setThemeMode] = useState("")
  useEffect(() => {
    const theme = window.localStorage.getItem('theme')
    setThemeMode(theme ? theme : "dark-theme")
  }, [])
  const switchTheme = () => {
    const theme = window.localStorage.getItem('theme')
    if (theme === "dark-theme") {
      window.localStorage.setItem('theme', "bright-theme")
    } else window.localStorage.setItem('theme', "dark-theme")

    const item = document.getElementsByTagName('html').item(0)
    if (item) {
      if (item.className == 'bright-theme') {
        item.className = 'dark-theme'
      } else {
        item.className = 'bright-theme'
      }
    }

    onClick && onClick()
  }
  console.log(window.localStorage.getItem('theme'))
  return (
    <div className="fc-theme-controller">
      <div className={innerClassname} onClick={switchTheme}>
        {window.localStorage.getItem('theme') === "bright-theme" ? (
          <i className="fa-fw fal fa-moon"></i>
        ) : (
          <i className="fa-fw fal fa-lightbulb-on"></i>
        )}
        <span className="bright-theme-only">
          <LocalizationString>Dark Mode</LocalizationString>
        </span>
        <span className="dark-theme-only">
          <LocalizationString>Light Mode</LocalizationString>
        </span>
      </div>
    </div>
  )
}
