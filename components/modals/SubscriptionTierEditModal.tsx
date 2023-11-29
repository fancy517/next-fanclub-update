import '@/styles/modals/subscription_tier_edit.scss'
import LocalizationString from '../common/LocalizationString'
import { useModalMeta } from '@/contexts/modal'
import { useEffect, useState } from 'react'
import XDCheckbox from '../common/xd/XDCheckbox'
import { useAuth } from '@/contexts/auth'
import { toast } from 'react-toastify'

type Props = {
  className?: string
  isCreate?: boolean
  data: {
    tierID?: string
    cb: () => void
  }
  [x: string]: any
}

export default function SubscriptionTierEditModal({
  className = '',
  isCreate = false,
  data,
  ...rest
}: Props) {
  const { user } = useAuth()
  const { pop } = useModalMeta()
  const [tab, setTab] = useState(0)
  const onClose = () => pop()
  const { cb } = data

  const validate = () => {
    const hexColorRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    const floatRegex = /^[+]?\d+(\.\d+)?$/;
    if (name === undefined || name === "" || name === " ") return false;
    if (!hexColorRegex.test(color)) return false;
    if (!floatRegex.test(basePrice)) return false;
    return true;
  }
  const onCreate = (index: number) => async () => {
    // cb(title, description)
    if (validate() !== true) {
      toast.warning("Please fill the required fields")
      return;
    }
    try {
      const sendData = {
        tierid: data?.tierID ? data.tierID : "0" || "0",
        username: user?.userName || "",
        tier_name: name,
        tier_color: color,
        base_price: basePrice,
        benefits: benefits.join('\n'),
        tier_child: childTiers.join(','),
        month_two: durations[0][1] === true ? "1" : "0",
        month_three: durations[1][1] === true ? "1" : "0",
        month_six: durations[2][1] === true ? "1" : "0",
        active: "1",
      }
      console.log(sendData)
      if (user) {
        if (index === 1) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/tier/create`, {
            method: "POST",
            body: JSON.stringify(sendData),
          })
          const responseData = await response.json()
          if (responseData === "success") {
            toast.success("Your tier is created")
            cb && cb()
            pop()
          }
          else
            toast.error("Error Occured!")
        } else if (index === 2) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/tier/update`, {
            method: "POST",
            body: JSON.stringify(sendData),
          })
          const responseData = await response.json()
          if (responseData === "success") {
            toast.success("Your tier is updated")
            cb && cb()
            pop()
          }
          else
            toast.error("Error Occured!")
        }
      } else {
        toast.warning("Please sign in and try again")
      }
    } catch (err) {
      console.log(err)
    }

  }

  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [benefits, setBenefits] = useState<string[]>([])
  const [basePrice, setBasePrice] = useState('')
  const [previousTiers, setPreviousTiers] = useState<(string | string)[][]>([])
  const [childTiers, setChildTiers] = useState<string[]>([])
  const [durations, setDurations] = useState<(number | boolean)[][]>([
    [2, false],
    [3, false],
    [6, false],
  ])
  useEffect(() => {
    const fetchTier = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/creator/tier/getone?tierID=${data?.tierID}`)
        const responseData = await response.json()
        console.log(responseData)
        setName(responseData.tier_name)
        setColor(responseData.tier_color)
        setBasePrice(responseData.base_price)
        setBenefits(responseData.tier_benefit?.split('\n') || [])

        const _relatives: (string | string)[][] = []
        responseData.RelativeTiers.map((value: { id: string, tier_name: string }) => {
          _relatives.push([value.id, value.tier_name])
        })
        setPreviousTiers(_relatives)
        setChildTiers(responseData.tier_child?.split(',') || [])
        const _durations: (number | boolean)[][] = [
          [2, responseData.month_two === "0" ? false : true],
          [3, responseData.month_three === "0" ? false : true],
          [6, responseData.month_six === "0" ? false : true],
        ]
        setDurations(_durations)
      } catch (err) {
        console.log(err)
      }
    }
    if (data?.tierID) {
      fetchTier()
    } else {
      // fetchChildren()
    }
  }, [])

  const onClickPlan = (index: number) => () => {
    setDurations(durations.map((v, i) => (i === index ? [v[0], !v[1]] : v)))
  }
  // local variables


  const updateBenefit = (value: string, tgt: number) => {
    setBenefits(benefits.map((v, i) => (i == tgt ? value : v)))
  }
  const addBenefit = () => setBenefits([...benefits, ''])
  const deleteBenefit = (index: number) => () =>
    setBenefits(benefits.filter((_, i) => i != index))


  return (
    <div className={`subscription-tier-edit-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>
              Modify your Subscription tier
            </LocalizationString>
          </div>
          <div className="actions" onClick={onClose}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          <div className="dark-blue-1 font-size-sm margin-bottom-3">
            <LocalizationString>
              Set up your subscription plans, configure your discounts based on
              billing cycle. Discounts are always based off of the first month
              base sub price.
            </LocalizationString>
          </div>

          <div className="tab-nav-wrapper">
            <div className="tab-nav-items border-color width-100">
              <div
                className={`tab-nav-item flex-1 ${tab == 0 && 'selected'}`}
                onClick={() => setTab(0)}
              >
                <LocalizationString>General</LocalizationString>
              </div>
              <div
                className={`tab-nav-item flex-1 ${tab == 1 && 'selected'}`}
                onClick={() => setTab(1)}
              >
                <LocalizationString>Plans/Pricing</LocalizationString>
              </div>
            </div>

            <div className="tab-content">
              {tab == 0 ? (
                <>
                  <div className="margin-top-1 subtitle">
                    Subscription Tier Name
                  </div>
                  <div className="material-input">
                    <input
                      type="text"
                      required={true}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="ng-untouched ng-pristine ng-invalid"
                    />
                    <div className="placeholder">
                      <LocalizationString>Enter Tier title</LocalizationString>
                    </div>
                    <div className="label">
                      <LocalizationString>Tier Title</LocalizationString>
                    </div>
                  </div>

                  <div className="margin-top-2 subtitle">
                    Subscription Tier Color
                  </div>
                  <div className="flex flex-row">
                    <div className="material-input flex-1 margin-right-1">
                      <input
                        type="text"
                        required={true}
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="ng-untouched ng-pristine ng-invalid"
                      />
                      <div className="placeholder">
                        <LocalizationString>
                          Enter Tier color
                        </LocalizationString>
                      </div>
                      <div className="label">
                        <LocalizationString>Tier Color</LocalizationString>
                      </div>
                    </div>
                    <div className="margin-top-3">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ height: '2em' }}
                      />
                    </div>
                  </div>

                  <div className="margin-top-2 subtitle">
                    Subscription Benefits
                  </div>
                  <div className="dark-blue-1 font-size-sm margin-bottom-1">
                    List the benefits that the user will gain by subscribing to
                    this tier.
                  </div>
                  <div className="subscription-tier-benefit-wrapper">
                    {benefits.map((benefit, i) => (
                      <div className="flex flex-row" key={i}>
                        <div className="material-input flex-1 margin-right-1 icon-left">
                          <input
                            type="text"
                            value={benefit}
                            // onChange={e => console.log(e.target.value)}
                            onChange={(e) => updateBenefit(e.target.value, i)}
                            className="ng-untouched ng-pristine ng-invalid"
                          />
                          <div className="placeholder">
                            <LocalizationString>
                              Enter Benefit
                            </LocalizationString>
                          </div>
                          <div className="label">
                            <LocalizationString>Benefit</LocalizationString>
                          </div>
                          <div className="icon-left">
                            <i className="fa-fw fas fa-stars blue-1" />
                          </div>
                        </div>
                        <div
                          className="margin-top-3 flex-row flex-align-center"
                          onClick={deleteBenefit(i)}
                        >
                          <i className="fa-fw fal fa-trash-can red-1 pointer"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="margin-top-2 padding-left-1 padding-right-1">
                    <div
                      className="btn outline-blue margin-top-2 pointer"
                      onClick={addBenefit}
                    >
                      <i className="fa-fw fal fa-plus" /> Add Benefit
                    </div>
                  </div>

                  <div className="margin-top-2 subtitle">Included Tiers</div>
                  <div className="dark-blue-1 font-size-sm margin-bottom-3">
                    <LocalizationString>
                      You can include other Subscription Tiers in this Tier.
                      Subscribers will also gain access to all content posted to
                      these Tiers. Make sure to mention this in your
                      subscription benefits!
                    </LocalizationString>
                  </div>
                  {previousTiers.map((tier, i) => (
                    <div key={i} className="flex flex-row">
                      <XDCheckbox
                        className="margin-right-1"
                        selected={childTiers.includes(tier[0])}
                        onClick={() => {
                          if (childTiers.includes(tier[0])) {
                            setChildTiers(childTiers.filter(value => value !== tier[0]))
                          } else {
                            setChildTiers([...childTiers, tier[0]])
                          }
                        }}
                      />
                      {" " + tier[1]}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="margin-top-2 subtitle">
                    Set your Base subscription Price
                  </div>
                  <div className="flex-row">
                    <div className="flex-1">
                      <div className="material-input icon-left">
                        <input
                          type="text"
                          value={basePrice}
                          onChange={(e) => setBasePrice(e.target.value)}
                          className="ng-untouched ng-pristine ng-invalid"
                        />
                        <div className="placeholder">
                          <LocalizationString>
                            Enter Base Amount
                          </LocalizationString>
                        </div>
                        <div className="label">
                          <LocalizationString>Amount</LocalizationString>
                        </div>
                        <div className="icon-left">
                          <i className="fa-fw fal fa-dollar" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                  <div>
                    {durations.map((duration, i) => (
                      <div key={i} className="flex-col1 margin-top-2">
                        <div className="subtitle">
                          Your {duration[0]} Months Subscription Plan
                        </div>
                        <div className="padding-right-2 padding-left-2 margin-top-1">
                          {duration[1] == true ? (
                            <div className="btn outline-blue" onClick={onClickPlan(i)}>
                              Activated {duration[0]} Months Subscription Plan
                            </div>
                          ) : (
                            <div className="btn outline-red" onClick={onClickPlan(i)}>
                              Disabled {duration[0]} Months Subscription Plan
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* <div className="material-input">
            <input
              type="text"
              required={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="placeholder">
              <LocalizationString>Enter Album title</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>Album Title</LocalizationString>
            </div>
          </div>
          <div className="material-input">
            <input
              type="text"
              required={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="ng-untouched ng-pristine ng-invalid"
            />
            <div className="placeholder">
              <LocalizationString>Enter Description</LocalizationString>
            </div>
            <div className="label">
              <LocalizationString>Album Description</LocalizationString>
            </div>
          </div> */}
        </div>
        <div className="modal-footer margin-top-3 flex-col">
          <div
            className="btn outline-dark-blue margin-right-2"
            onClick={onClose}
          >
            <LocalizationString>Dismiss</LocalizationString>
          </div>
          {isCreate === true ? (
            <div className="btn solid-blue" onClick={onCreate(1)}>
              <LocalizationString>Create</LocalizationString>
            </div>
          ) : (
            <div className="btn solid-blue" onClick={onCreate(2)}>
              <LocalizationString>Update</LocalizationString>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
