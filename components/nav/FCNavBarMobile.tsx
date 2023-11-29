import Link from 'next/link'

type Props = {
  children?: React.ReactNode
  [x: string]: any
}

const navLinks = [
  {
    href: '/',
    icon: <i className="fa-fw fal fa-house-window bottom-menu-icon-size"></i>,
  },
  {
    href: '/explore',
    icon: (
      <i className="fa-fw fal fa-magnifying-glass bottom-menu-icon-size"></i>
    ),
  },
  {
    href: '/messages',
    icon: <i className="fa-fw fal fa-envelope bottom-menu-icon-size"></i>,
  },
  {
    href: '/notifications',
    icon: <i className="fa-fw fal fa-bell bottom-menu-icon-size"></i>,
  },
]

export default function FCNavBarMobile({ children, ...rest }: Props) {
  return (
    <div className="fc-nav-bar-mobile sm-mobile-visible">
      {navLinks.map((navLink, index) => (
        <Link key={index} href={navLink.href} className="nav-bar-item">
          {navLink.icon}
          {index == 2 && <div className="notification-badge">1</div>}
        </Link>
      ))}
    </div>
  )
}
