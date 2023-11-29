import FCAccountAvatar from '@/components/common/account/FCAccountAvatar'
import FCAccountMedia from '@/components/common/account/FCAccountMedia'
import FCAccountUsername from '@/components/common/account/FCAccountUsername'
import { mockMedias } from '@/mock/medias'
import { mockCreatorAccounts } from '@/mock/users'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCMediaOfferSuggestionTagRoute({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={`fc-media-offer-suggestion-tag-route ${className ?? ''}`}
      {...rest}
    >
      {/* Tag Header */}
      <div className="flex-row tag-header">
        <div className="tag-image flex-0">
          <div className="tag-img-placeholder">
            <i className="fa-light fa-hashtag"></i>
          </div>
        </div>
        <div className="flex-col flex-1 tag-text">
          <div className="semi-bold font-size-xxl hashtag-letter-spacing">
            #glasses
          </div>
          <div className="dark-blue-1 margin-top-1"> 3.6M Views </div>
        </div>
      </div>

      <div className="spacer" style={{ height: 0 }}></div>

      {/* Gallery Rows */}
      {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className="gallery-row">
          {[1, 2, 3, 4].map((_, index) => (
            <div className="render-container" key={index}>
              <div className="media-header sm-mobile-hidden">
                <FCAccountAvatar account={mockCreatorAccounts[0]} />
                <div className="flex-col margin-left-text">
                  <FCAccountUsername
                    account={mockCreatorAccounts[0]}
                    maxLength={12}
                    showColumn={true}
                  />
                </div>
              </div>
              <FCAccountMedia
                data={mockMedias[0]}
                className="grid-media-item pointer"
              />
              <div className="media-footer sm-mobile-hidden">
                <div className="post-text">This is default post text</div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* Gallery Rows End */}

      <div className="spacer" style={{ height: 0 }}></div>
    </div>
  )
}
