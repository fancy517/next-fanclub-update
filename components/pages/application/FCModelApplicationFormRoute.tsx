'use client'

import LocalizationString from '@/components/common/LocalizationString'
import '@/styles/pages/application_form.scss'
import { useState } from 'react'
import ManualVeirficationForm from './ManualVeirficationForm'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCModelApplicationFormRoute({
  children,
  className,
  ...rest
}: Props) {
  const [skip, setSkip] = useState(false)

  return (
    <div
      id="m_model_application_form_route"
      className={`${className ?? ''}`}
      {...rest}
    >
      {skip ? (
        <ManualVeirficationForm />
      ) : (
        <div className="page-content">
          <div className="current-page-wrapper">
            <div className="current-page">
              <span>
                <LocalizationString>
                  Verified User Application
                </LocalizationString>
              </span>
            </div>
          </div>
          <div className="page-description verification">
            <div className="dark-blue-1">
              Fansly utilizes an authentication service for identity
              verification to speed up our application processing. Once you have
              successfully completed the identity verification process with our
              authentication partner, you will gain access to the Fansly
              Application Form. <br />
              The identity used must match with the application and your payment
              details.
            </div>
            <div className="flex-row">
              <div className="btn solid-blue flex-0 large margin-top-3">
                Start Verification
              </div>
            </div>
            <div className="dark-blue-1 margin-top-4 font-size-sm">
              If you have an issue completing your verification through our
              third party provider, you may opt to skip this step.
              <br /> Skipping this step may result in an increased processing
              time for your application and is only recommended if you are
              unable to complete the verification step.
            </div>
            <div className="flex-row">
              <div
                className="btn flex-0 margin-top-3"
                onClick={() => setSkip(true)}
              >
                Skip Third Party Verification
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
