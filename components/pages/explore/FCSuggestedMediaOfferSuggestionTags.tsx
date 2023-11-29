import Link from 'next/link'

type Props = {
  children?: React.ReactNode
  className?: string
  tags: Array<string>
  [x: string]: any
}

export default function FCSuggestedMediaOfferSuggestionTags({
  children,
  className,
  tags,
  ...rest
}: Props) {
  return (
    <div
      className={`fc-suggested-media-offer-suggestion-tags ${className ?? ''}`}
      {...rest}
    >
      <div className="tag-suggestion-container">
        <div className="tags flex-row flex-wrap">
          {tags.map((tag, i) => (
            <Link
              href={`/explore/tag/${tag}`}
              className="bubble text-decoration-none"
              key={i}
              style={{ color: 'inherit' }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
