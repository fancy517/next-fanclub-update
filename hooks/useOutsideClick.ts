import { MutableRefObject, RefObject, useEffect, useRef } from 'react'

export default function useOutsideClick(
  trigger: RefObject<HTMLElement>,
  target: RefObject<HTMLElement>,
  cb: () => void,
  triggerOnInsideClick = true,
) {
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (!trigger.current || !target.current) {
        return
      }

      if (trigger.current.contains(e.target as Node)) {
        return
      }

      if (!target.current.contains(e.target as Node)) {
        cb()
      } else if (triggerOnInsideClick) {
        cb()
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [trigger, target])
}
