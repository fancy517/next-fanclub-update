import FCMediaOfferSuggestionsBrowser from '../../common/media/FCMediaOfferSuggestionsBrowser'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCMediaOfferSuggestionsRoute({
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <div className={`fc-media-offer-suggestions-route ${className}`} {...rest}>
      <FCMediaOfferSuggestionsBrowser />
    </div>
  )
}
