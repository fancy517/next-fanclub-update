import LocalizationString from '@/components/common/LocalizationString'
import Link from 'next/link'
import { countries, months } from './data'
import XDCheckbox from '@/components/common/xd/XDCheckbox'
import XDRadio from '@/components/common/xd/XDRadio'
import FCButtonNew from '@/components/common/button/FCButtonNew'
import { useRef, useState } from 'react'
import XDDropdown from '@/components/common/xd/XDDropdown'
import { useAuth } from '@/contexts/auth'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

const getAdultYears = () => {
  let years = []
  const thisyear = new Date().getFullYear()
  for (let i = 0; i < 30; i++) {
    years.push(thisyear - 18 - i)
  }
  return years
}

export default function ManualVeirficationForm({
  children,
  className,
  ...rest
}: Props) {
  const [postExplicitContent, setPostExplicitContent] = useState("no")
  const [noExpiration, setNoExpiration] = useState(false)
  const [agree, setAgree] = useState(false)
  const adultYears = getAdultYears()
  const { user } = useAuth()
  const [years, setYears] = useState("-1")
  const [month, setMonth] = useState("-1")
  const [day, setDay] = useState("-1")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("Afghanistan")
  const [state, setState] = useState("")
  const [zipcode, setZipCode] = useState("")
  const [twitter, setTwitter] = useState("")
  const [instagram, setInstagram] = useState("")
  const [website, setWebsite] = useState("")
  const [documenttype, setDocumentType] = useState("")

  const [file_Front, setFileFront] = useState<File>()
  const [file_Back, setFileBack] = useState<File>()
  const [file_Handwitten, setFileHandWitten] = useState<File>()
  const [file_Video, setFileVideo] = useState<File>()
  const fileFront = useRef<HTMLInputElement | null>(null)
  const fileBack = useRef<HTMLInputElement | null>(null)
  const fileHandwritten = useRef<HTMLInputElement | null>(null)
  const fileVideo = useRef<HTMLInputElement | null>(null)
  const onUploadFront = () => { fileFront.current?.click() }
  const onUploadBack = () => { fileBack.current?.click() }
  const onUploadHandwritten = () => { fileHandwritten.current?.click(); }
  const onUploadVideo = () => { fileVideo.current?.click() }
  const validate = () => {
    if (firstname === "") {
      toast.warning("Please enter first name")
      return false
    } else if (lastname === "") {
      toast.warning("Please enter last name")
      return false
    } else if (years === undefined) {
      toast.warning("Please enter birth year")
      return false
    } else if (month === undefined) {
      toast.warning("Please enter birth month")
      return false
    } else if (day === undefined) {
      toast.warning("Please enter birth day")
      return false
    } else if (address === "") {
      toast.warning("Please enter address")
      return false
    } else if (city === "") {
      toast.warning("Please enter city")
      return false
    } else if (state === "") {
      toast.warning("Please enter state")
      return false
    } else if (zipcode === "") {
      toast.warning("Please enter zip/postal code")
      return false
    } else if (file_Front === undefined || file_Back === undefined || file_Handwitten === undefined) {
      toast.warning("Please select required photo")
      return false
    } else if (documenttype === "" || documenttype === undefined) {
      toast.warning("Please select document type")
      return false
    }
    return true
  }
  const onClickYes = async () => {
    if (!user) {
      toast.info("Please sign in again")
      return
    }
    if (validate() === false) {
      return
    }
    try {
      var formdata = new FormData();

      formdata.append("username", user.userName)
      formdata.append("firstname", firstname)
      formdata.append("lastname", lastname)
      formdata.append("birthday", month + " " + day + ", " + years)
      formdata.append("address", address)
      formdata.append("city", city)
      formdata.append("country", country)
      formdata.append("state", state)
      formdata.append("zipcode", zipcode)
      formdata.append("twitter", twitter)
      formdata.append("instagram", instagram)
      formdata.append("website", website)
      formdata.append("document_type", documenttype)
      formdata.append("files", file_Front ? file_Front : new File([], ""))
      formdata.append("files", file_Back ? file_Back : new File([], ""))
      formdata.append("files", file_Handwitten ? file_Handwitten : new File([], ""))
      file_Video && formdata.append("files", file_Video)
      formdata.append("explicit_content", postExplicitContent)

      // for (var pair of formdata.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]); 
      // }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/submit_applications`, {
        method: "POST",
        body: formdata
      })
      const responsedata = await response.json()
      if (responsedata === "success") {
        toast.success("Your application has been submitted")
        window.location.href = "/"
        return
      } else if (responsedata === "exist") {
        toast.error("You have already submitted your application")
        return
      }
      else {
        toast.error("Error Occured!")
        return
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="page-content">
      <div className="current-page-wrapper">
        <div className="current-page">
          <span>
            <LocalizationString>Verified User Application</LocalizationString>
          </span>
        </div>
      </div>
      <div className="page-description">
        <LocalizationString>
          Please provide us with information about yourself for verification,
          once verified you&apos;ll be able to get your creator account started!
        </LocalizationString>
      </div>
      <div className="collapse-section">
        <div className="section-header">
          <div className="section-title"> Fansly Profile </div>
        </div>
        <div className="section-content flex-col">
          <div>
            fansly.com/{user?.userName} (
            <Link href="/settings/account" className="pointer">
              change username
            </Link>
            )
          </div>
        </div>
      </div>
      <div className="collapse-section">
        <div className="section-header">
          <div className="section-title">
            <LocalizationString>Personal Information</LocalizationString>
          </div>
        </div>
        <div className="section-content flex-col">
          <div className="flex-row">
            <div className="input-container">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    // autocomplete="given-name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>First/Given Name</LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g. John</LocalizationString>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-container">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    // autocomplete="family-name"
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>Last Name</LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g. Doe</LocalizationString>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-row flex-sm-col">
            <div className="flex-col flex-1 input-container">
              <XDDropdown
                className="flex-row flex-align-center dropdown-trigger select-method"
                placeholder="Select Birth Year"
                data={adultYears}
                renderer={(v) => v}
                onSelect={(id: string) => { setYears(id) }}
              />
            </div>
            <div className="flex-col flex-1 input-container">
              <XDDropdown
                className="flex-row flex-align-center dropdown-trigger select-method"
                placeholder="Select Birth Month"
                data={months}
                renderer={(v) => { return v }}
                onSelect={(id: string) => { setMonth(id) }}
              />
            </div>
            <div className="flex-col flex-1 input-container">
              <XDDropdown
                className="flex-row flex-align-center dropdown-trigger select-method"
                placeholder="Select Birth Day"
                data={[...Array(31).keys()]}
                renderer={(v) => ('0' + v).slice(-2)}
                onSelect={(id: string) => { setDay(id) }}
              />
            </div>
          </div>
          <div className="flex-row">
            <div className="input-container double-width">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    value={address}
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    // autocomplete="street-address"
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>Address</LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>
                      e.g. 1234 Fansly Street
                    </LocalizationString>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-row">
            <div className="input-container">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    // autocomplete="address-level2"
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>City</LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g. Austin</LocalizationString>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-container">
              <div className="input-content">
                <div className="material-input">
                  <select
                    name="country"
                    // autocomplete="country-name"
                    required={true}
                    className="form-select notranslate"
                    value={country}
                    id="country"
                    onChange={(e) => { setCountry(e.target.value); }}
                  >
                    {countries.map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                  <div className="label">
                    <LocalizationString>Country</LocalizationString>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-row">
            <div className="input-container">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    // autocomplete="address-level1"
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>State/Province</LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g. Texas</LocalizationString>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-container">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    id="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipCode(e.target.value)}
                    // autocomplete="postal-code"
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>
                      ZIP Code/Postal Code
                    </LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g. 12345</LocalizationString>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-section">
        <div className="section-header">
          <div className="section-title">
            <LocalizationString>Social Media</LocalizationString>
          </div>
        </div>
        <div className="section-content flex-col">
          <div className="flex-row">
            <div className="input-container double-width">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    id="twitter"
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>Twitter (Optional)</LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g.</LocalizationString>
                    https://twitter.com/fansly
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-row">
            <div className="input-container double-width">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    id="instagram"
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>
                      Instagram (Optional)
                    </LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g.</LocalizationString>
                    https://www.instagram.com/fansly
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-row">
            <div className="input-container double-width">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    id="website"
                    className="ng-untouched ng-pristine ng-invalid"
                    onChange={(e) => setWebsite(e.target.value)}
                    value={website}
                  />
                  <div className="label">
                    <LocalizationString>Website (Optional)</LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g.</LocalizationString>
                    https://fansly.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex-row">
            <div className="input-container double-width">
              <div className="input-content">
                <div className="material-input">
                  <input
                    type="text"
                    required={true}
                    className="ng-untouched ng-pristine ng-invalid"
                  />
                  <div className="label">
                    <LocalizationString>
                      Model Referral Code (Optional)
                    </LocalizationString>
                  </div>
                  <div className="placeholder">
                    <LocalizationString>e.g.</LocalizationString>
                    fansly
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="collapse-section">
        <div className="section-header">
          <div className="section-title">
            <LocalizationString>Documentation</LocalizationString>
          </div>
        </div>
        <div>
          <LocalizationString>
            In order to process your application, we require the following files
            from you:
          </LocalizationString>
        </div>
        <ul>
          <li>
            <LocalizationString>
              A picture of the front of your national ID document.
            </LocalizationString>
          </li>
          <li>
            <LocalizationString>
              A picture of the back of your national ID document.
            </LocalizationString>
          </li>
          <li>
            <LocalizationString>
              A picture of you holding up your ID together with a hand written
              note as shown in the example below.
            </LocalizationString>
          </li>
          <li>
            <LocalizationString>
              A video recording of you confirming your Fansly application,
              please show your ID from both sides in your video by turning it
              around while keeping both the ID and your face clearly visible in
              the frame. Make sure to either verbally mention at least your full
              name, Fansly and todays date or show your hand written note from
              the previous step in the video.
            </LocalizationString>
          </li>
        </ul>
        <div className="flex-row flex-center documentation flex-sm-col">
          <div className="flex-col document-info">
            <span className="bold red-1">
              *
              <LocalizationString>
                Example Photo of holding the ID
              </LocalizationString>
            </span>
            <span className="font-size-sm red-1">
              <LocalizationString>
                Please include the handwritten note, we will not process your
                application otherwise.
              </LocalizationString>
            </span>
            <img src="/images/avatar2.jpg" className="flex-align-self-center" />
          </div>
          <div className="flex-col document-container">
            <div>
              <span className="bold">
                *
                <LocalizationString>
                  Rules, please read for fast approval
                </LocalizationString>
              </span>
              <br />
              <LocalizationString>Image must be clear</LocalizationString>
              <br />
              <LocalizationString>
                Your ID must be fully in frame
              </LocalizationString>
              <br />
              <LocalizationString>Must be in color</LocalizationString>
              <br />
              <LocalizationString>
                Text must be clearly visible
              </LocalizationString>
              <br />
              <LocalizationString>
                Background must be minimal
              </LocalizationString>
              <br />
              <LocalizationString>
                Image should not be edited, resized or rotated
              </LocalizationString>
              <br />
              <LocalizationString>
                Image files must be .png or .jpg
              </LocalizationString>
              <br />
              <LocalizationString>Must be under 7MB in size</LocalizationString>
              <br />
              <LocalizationString>
                ID must be valid and not expired
              </LocalizationString>
              <br />
              <LocalizationString>
                Facial verification is required so the face must be clear
              </LocalizationString>
              <br />
              <LocalizationString>
                Follow the video instructions as mentioned above.
              </LocalizationString>
              <br />
            </div>
            <XDDropdown
              className="flex-row flex-align-center dropdown-trigger select-method"
              data={['Passport', 'Driver License', 'National ID Card']}
              placeholder="Select Document Type"
              renderer={(v) => <LocalizationString>{v}</LocalizationString>}
              onSelect={(id: string) => { setDocumentType(id) }}
            />

            <div className="btn add-photo-btn" onClick={onUploadFront}>
              <input
                multiple={false}
                type="file"
                ref={fileFront}
                accept="image/png, image/jpeg, image/webp, image/gif"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFileFront(e.currentTarget.files ? e.currentTarget.files[0] : new File([], "xxx"));
                }}
                style={{ display: 'none' }}
              />
              <span>
                {file_Front ? (
                  <img
                    src={URL.createObjectURL(file_Front)}
                    width="150"
                  />
                ) : (
                  <LocalizationString>
                    Add photo of your ID with the edges visible
                  </LocalizationString>
                )}
              </span>
              <i className="fas fa-plus" ></i>
            </div>
            <div className="btn add-photo-btn" onClick={onUploadBack}>
              <input
                multiple={false}
                type="file"
                ref={fileBack}
                accept="image/png, image/jpeg, image/webp, image/gif"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFileBack(e.currentTarget.files ? e.currentTarget.files[0] : new File([], "xxx"));
                }}
                style={{ display: 'none' }}
              />
              <span>
                {file_Back ? (
                  <img
                    src={URL.createObjectURL(file_Back)}
                    width="150"
                  />
                ) : (
                  <LocalizationString>
                    Add photo of the back side of your ID if applicable
                  </LocalizationString>
                )}
              </span>
              <i className="fas fa-plus" ></i>
            </div>
            <div className="btn add-photo-btn" onClick={onUploadHandwritten}>
              <input
                multiple={false}
                type="file"
                ref={fileHandwritten}
                accept="image/png, image/jpeg, image/webp, image/gif"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFileHandWitten(e.currentTarget.files ? e.currentTarget.files[0] : new File([], "xxx"));
                }}
                style={{ display: 'none' }}
              />
              <span>
                {file_Handwitten ? (
                  <img
                    src={URL.createObjectURL(file_Handwitten)}
                    width="150"
                  />
                ) : (
                  <LocalizationString>
                    Add photo of you holding your ID and a handwritten note
                  </LocalizationString>
                )}
              </span>
              <i className="fas fa-plus" ></i>
            </div>
            <div className="btn add-photo-btn" onClick={onUploadVideo}>
              <input
                multiple={false}
                type="file"
                ref={fileVideo}
                accept="video/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFileVideo(e.currentTarget.files ? e.currentTarget.files[0] : new File([], "xxx"));
                }}
                style={{ display: 'none' }}
              />
              <span>
                {file_Video ? (
                  <video
                    src={URL.createObjectURL(file_Video)}
                    width="320"
                    height="240"
                    controls
                  />
                ) : (
                  <LocalizationString>
                    Add a video of yourself holding your ID and the verification
                    sign, as mentioned above
                  </LocalizationString>
                )}
              </span>
              <i className="fas fa-plus" ></i>
            </div>
            <div className="flex-col documentation-input">
              <div className="flex-row input-title">
                <LocalizationString>ID Expirational Date</LocalizationString>
              </div>
              <div className="flex-row">
                <div className="input-content">
                  <input
                    type="date"
                    placeholder="Expiration Date"
                    className="ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div className="checkbox-container flex-row flex-align-center noselect">
                  <XDCheckbox
                    className="checkbox"
                    selected={noExpiration}
                    onClick={() => setNoExpiration(!noExpiration)}
                  />
                  <LocalizationString>No expiration Date</LocalizationString>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-section">
        <div className="section-header">
          <div className="section-title">
            <LocalizationString>Content</LocalizationString>
          </div>
        </div>
        <div className="section-content flex-col explicit-content-container">
          <div className="flex-row margin-top-4 content-title">
            <LocalizationString>
              Posting Explicit Content (Sexual and/or Pornographic)? (Optional)
            </LocalizationString>
          </div>
          <div className="flex-row margin-4 content-inputs">
            <XDRadio
              value="yes"
              selected={postExplicitContent == "yes"}
              onClick={() => setPostExplicitContent("yes")}
            />
            <XDRadio
              value="no"
              selected={postExplicitContent == "no"}
              onClick={() => setPostExplicitContent("no")}
            />
            <XDRadio
              value="maybe"
              selected={postExplicitContent == "maybe"}
              onClick={() => setPostExplicitContent("maybe")}
            />
          </div>
        </div>
      </div>
      <div className="collapse-section">
        <div className="section-header">
          <div className="section-title">
            <LocalizationString>Checklist</LocalizationString>
          </div>
        </div>
        <div className="section-content flex-col explicit-content-container">
          <div className="dark-blue-1">
            <LocalizationString>
              To make sure your application gets processed in a timely manner,
              please confirm the steps below. If done incorrect, we will require
              you to reupload the photos which can cause delay in acceptance.
            </LocalizationString>
          </div>
          <ul>
            <li>
              <LocalizationString>
                All the information on the ID is CLEARLY readable in BOTH
                images.
              </LocalizationString>
            </li>
            <li>
              <LocalizationString>
                The picture of you holding your ID has a handwritten note on it
                that says &quot;for fansly&quot; with today&apos;s date like in
                the example provided.
              </LocalizationString>
            </li>
            <li>
              <LocalizationString>
                A video recording of you confirming your Fansly application,
                please show your ID from both sides in your video by turning it
                around while keeping both the ID and your face clearly visible
                in the frame. Make sure to either verbally mention at least your
                full name, Fansly and todays date or show your hand written note
                from the previous step in the video.
              </LocalizationString>
            </li>
          </ul>
        </div>
      </div>
      <div className="collapse-section">
        <div className="section-header">
          <div className="section-title"> Terms of Service </div>
        </div>
        <div className="section-content flex-col explicit-content-container">
          <div className="dark-blue-1">
            By checking the box you agree to have read and understood the
            <a href="/tos" target="_blank">
              Terms of Service
            </a>
            . Violation of the ToS may result in account suspension.
          </div>
          <div className="margin-top-1 flex-row flex-align-center noselect">
            <XDCheckbox
              className="checkbox margin-right-text"
              selected={agree}
              onClick={() => setAgree(!agree)}
            />
            I agree with the
            <a href="/tos" target="_blank" className="margin-left-text">
              ToS
            </a>
          </div>
        </div>
      </div>
      <div className="tooltip submit-tooltip flex-align-center">
        <FCButtonNew
          buttonContent={
            <div className={"btn solid-blue large submit-button " + (agree === true ? "" : "disabled")}>
              <LocalizationString>Submit/Update Application</LocalizationString>
            </div>
          }
          confirmationContent={
            <div className="flex-row margin-top-1">
              Your current username is {user?.userName} and your profile will be
              available at fansly.com/{user?.userName}. If this is not the name you
              want, please change your username in your settings before
              submitting the application.
            </div>
          }
          cb={(status: string) => { if (status === "yes") onClickYes() }}
        />
      </div>
    </div>
  )
}
