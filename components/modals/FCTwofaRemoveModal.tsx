'use client'

import '@/styles/modals/base.scss'
import LocalizationString from '../common/LocalizationString'
import FCButton from '../common/button/FCButton'
import { useState } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
}

export default function FCTwofaRemoveModal({ className }: Props) {
  const [stage, setStage] = useState(0)

  return (
    <div className={`fc-twofa-remove-modal fc-modal-base ${className ?? ''}`}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Remove 2FA</LocalizationString>
          </div>
          <div className="actions">
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className={classNames('modal-content', { hidden: stage != 0 })}>
          <div className="dark-blue-1 font-size-sm">
            <LocalizationString>
              To disable your 2fa, please type in your password and
              authenticator code. If you lost your authenticator, please contact
              support.
            </LocalizationString>
          </div>
          <div className="material-input margin-top-2">
            <input
              type="password"
              required={true}
              className="ng-touched ng-dirty ng-valid"
            />
            <div className="label">
              <LocalizationString>Password</LocalizationString>
            </div>
            <div className="placeholder">
              <LocalizationString>Enter Password</LocalizationString>
            </div>
          </div>
          <div className="material-input margin-top-2">
            <input
              type="text"
              required={true}
              className="ng-touched ng-dirty ng-valid"
            />
            <div className="label">
              <LocalizationString>Authenticator Code</LocalizationString>
            </div>
            <div className="placeholder">
              <LocalizationString>Enter Authenticator Code</LocalizationString>
            </div>
          </div>
        </div>
        <div className={classNames('modal-content', { hidden: stage != 1 })}>
          <div className="dark-blue-1 flex-col flex-align-center">
            <div className="flex-row flex-justify-center margin-bottom-1">
              <i
                className="fa-fw fal fa-circle-check fa-4x"
                style={{ color: 'var(--blue-1)' }}
              ></i>
            </div>
            <div className="dark-blue-1 flex-row flex-align-center flex-wrap">
              <div className="margin-right-1">
                <LocalizationString>
                  Authenticator has been successfully removed
                </LocalizationString>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer flex-row flex-justify-end">
          <FCButton className="btn solid-blue margin-right-1">
            <LocalizationString>Remove</LocalizationString>
          </FCButton>
        </div>
      </div>
    </div>
  )
}
