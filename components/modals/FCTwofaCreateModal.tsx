'use client'

import '@/styles/modals/twofa_create.scss'
import LocalizationString from '../common/LocalizationString'
import FCButton from '../common/button/FCButton'
import { useModalMeta } from '@/contexts/modal'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import QRCode from 'react-qr-code'
import { useAuth } from '@/contexts/auth'

type Props = {
  className?: string
  data: {
    flag?: number // 1 is for enable, 2 is for disable
    cb?: (status: string) => void
  }
}

export default function FCTwofaCreateModal({ className, data }: Props) {
  const { cb } = data
  const { flag } = data
  const { pop } = useModalMeta()
  const [stage, setStage] = useState(0)
  const [showCode, setShowCode] = useState(false)
  const [code, setCode] = useState("")
  const [qr_token, setQRToken] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    if (flag === 1) {
      setStage(0)
    } else if (flag === 2) {
      setStage(3)
    }
  }, [flag])

  useEffect(() => {
    if (stage === 1) {
      getqrcode()
    }
  }, [stage])

  const getqrcode = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/generate_2fa?username=${user?.userName}`)
      const responsedata = await response.json()
      setCode(responsedata)
    } catch (error) {

    }
  }

  const onCreate2FA = () => {
    setStage(1)
  }
  const toggleShowCode = () => {
    setShowCode(!showCode)
  }

  const onVerify = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/otp_verify?username=${user?.userName}&otptoken=${qr_token}&qrcode=${code}`)
      const responsedata = await response.json()
      if (responsedata === "success") {
        setStage(2)
        cb && cb("enabled")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onDisableFactor = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/otp_disable?username=${user?.userName}&otptoken=${qr_token}`)
      const responsedata = await response.json()
      if (responsedata === "success") {
        pop()
        cb && cb("disabled")
        // window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`fc-twofa-create-modal ${className ?? ''}`}>
      <div className="modal">
        <div className="modal-header">
          <div className="title flex-1">
            <LocalizationString>Set Up 2FA</LocalizationString>
          </div>
          <div className="actions" onClick={pop}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className={classNames('flex-col', { hidden: stage != 0 })}>
            <div className="dark-blue-1 margin-bottom-2 font-size-sm">
              <LocalizationString>
                To enable the 2FA please click on the create button below and
                scan the QR code with your favorite authenticator app. If
                scanning the QR code does not work, you can manually enter the
                private key by clicking the show private key button after
                creating the 2FA.
              </LocalizationString>
            </div>
            <div
              className="btn outline-dark-blue flex-align-self-start large"
              onClick={onCreate2FA}
            >
              <LocalizationString>Create 2FA QR code</LocalizationString>
            </div>
          </div>
          <div className={classNames('flex-col', { hidden: stage != 1 })}>
            <div className="flex-align-self-center qr-container">
              <div style={{ background: '#d6dce8', padding: 10 }}>
                <QRCode value={code} size={200} level="Q" bgColor="#d6dce8" />
              </div>
            </div>

            <div className="font-size-sm dark-blue-1 flex-align-self-center margin-1">
              <LocalizationString className="margin-right-text">
                Cant use the QR code? Click
              </LocalizationString>
              <a className="margin-right-text pointer" onClick={toggleShowCode}>
                <LocalizationString>here</LocalizationString>
              </a>
              <LocalizationString>
                to display the manual code.
              </LocalizationString>
            </div>

            {showCode && (
              <div className="font-size-sm dark-blue-1 flex-align-self-center font-size-sm break-words">
                {code}
              </div>
            )}

            <div className="bold margin-top-1">
              <LocalizationString>
                Enter 2FA code from your app below to verify
              </LocalizationString>
            </div>

            <div className="material-input margin-top-2">
              <input
                // autocomplete="one-time-code"
                type="text"
                required={true}
                value={qr_token}
                onChange={(e) => setQRToken(e.target.value)}
                className="ng-untouched ng-pristine ng-invalid"
              />
              <div className="placeholder"> XXX XXX </div>
              <div className="label">
                <LocalizationString>Enter your 2FA code</LocalizationString>
              </div>
            </div>
            <div className="input-group margin-bottom-2 margin-top-text font-size-sm"></div>
          </div>

          {stage == 2 && (
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
                    2FA is now enabled and protecting your account!
                  </LocalizationString>
                </div>
              </div>
            </div>
          )}
          <div className={classNames('flex-col', { hidden: stage != 3 })}>
            <div className="bold margin-top-1">
              <LocalizationString>
                Enter 2FA code from your app below to verify
              </LocalizationString>
            </div>

            <div className="material-input margin-top-2">
              <input
                // autocomplete="one-time-code"
                type="text"
                required={true}
                value={qr_token}
                onChange={(e) => setQRToken(e.target.value)}
                className="ng-untouched ng-pristine ng-invalid"
              />
              <div className="placeholder"> XXX XXX </div>
              <div className="label">
                <LocalizationString>Enter your 2FA code</LocalizationString>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer flex-row margin-top-1 flex-justify-end">
          {stage < 2 || stage === 3 && (
            <div className="btn margin-right-1" onClick={() => pop()}>
              <LocalizationString>Cancel</LocalizationString>
            </div>
          )}
          <FCButton
            className={classNames('btn solid-blue', { hidden: stage != 1 })}
            onClick={onVerify}
          >
            Verify
          </FCButton>
          <FCButton
            className={classNames('btn solid-blue', { hidden: stage != 3 })}
            onClick={onDisableFactor}
          >
            Verify
          </FCButton>
        </div>
      </div>
    </div>
  )
}
