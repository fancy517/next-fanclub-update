import '@/styles/pages/explore.scss'
import FCAccountExploreRoute from './FCAccountExploreRoute'
import FCMediaOfferSuggestionTagRoute from './FCMediaOfferSuggestionTagRoute'
import FCMediaOfferSuggestionsRoute from './FCMediaOfferSuggestionsRoute'

type Props = {
  children?: React.ReactNode
  className?: string
  tagName?: string
  foryou?: boolean
  [x: string]: any
}

export default function FCExploreRoute({
  children,
  className,
  tagName,
  foryou,
  ...rest
}: Props) {
  return (
    <div id="m_explore_route" className={`${className ?? ''}`} {...rest}>
      <div className={`page-content ${foryou && 'for-you-route'}`}>
        {tagName ? (
          <FCMediaOfferSuggestionTagRoute />
        ) : foryou ? (
          <FCMediaOfferSuggestionsRoute />
        ) : (
          <FCAccountExploreRoute />
        )}
      </div>
    </div>
  )
}
