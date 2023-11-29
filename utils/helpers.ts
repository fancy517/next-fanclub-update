export const abbrString = (s: string, maxLength: number) => {
  if (s.length <= maxLength) {
    return s
  }

  return s.substring(0, maxLength) + '...'
}

export const fileToDataUri = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (!event.target) reject()
      else resolve(event.target.result)
    }
    reader.readAsDataURL(file)
  })

export const formatDate = (date: Date | null): string => {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US').format(date)
}

export const copy2clipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
