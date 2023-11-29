'use client'

import classNames from 'classnames'
import { useState } from 'react'

type Props = {
  amount?: number
}

export default function BalanceDropdown() {
  const [open, setOpen] = useState(false)

  const onclick = () => {
    setOpen(!open)
  }

  return (
    <div className={classNames('balance-dropdown', { 'dropdown-open': open })}>
      <div className="balance-component noselect pointer" onClick={onclick}>
        <div>
          <span>$</span>0
        </div>
      </div>
      <div className="dropdown-list width-19">
        <AppWalletBalanceShop />
      </div>
    </div>
  )
}

function AppWalletBalanceShop() {
  return (
    <div className="wallet-balance-shop">
      <div className="flex-row gem-purchase-option">
        <div className="gem-amount">$10 Wallet Balance</div>
        <div className="flex-col">
          <div className="btn outline-dark-blue purchase-btn fixed-width-button">
            {' '}
            $10{' '}
          </div>
        </div>
      </div>
      <div className="flex-row gem-purchase-option">
        <div className="gem-amount">$25 Wallet Balance</div>
        <div className="flex-col">
          <div className="btn outline-dark-blue purchase-btn fixed-width-button">
            {' '}
            $25{' '}
          </div>
        </div>
      </div>
      <div className="flex-row gem-purchase-option">
        <div className="gem-amount">$50 Wallet Balance</div>
        <div className="flex-col">
          <div className="btn outline-dark-blue purchase-btn fixed-width-button">
            {' '}
            $50{' '}
          </div>
        </div>
      </div>
      <div className="flex-row gem-purchase-option">
        <div className="gem-amount">$100 Wallet Balance</div>
        <div className="flex-col">
          <div className="btn outline-dark-blue purchase-btn fixed-width-button">
            {' '}
            $100{' '}
          </div>
        </div>
      </div>
      <div className="flex-row gem-purchase-option">
        <div className="gem-amount">$500 Wallet Balance</div>
        <div className="flex-col">
          <div className="btn outline-dark-blue purchase-btn fixed-width-button">
            {' '}
            $500{' '}
          </div>
        </div>
      </div>
    </div>
  )
}
