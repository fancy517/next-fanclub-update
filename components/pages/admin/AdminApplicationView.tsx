import Image from 'next/image'
import passportImg from '@/public/images/avatar1.jpg'
import FCButtonNew from '@/components/common/button/FCButtonNew'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  children?: React.ReactNode
  className?: string
  username?: string
  [x: string]: any
}

export default function AdminApplicationView({
  children,
  className = '',
  username,
  ...rest
}: Props) {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [birthday, setBirthday] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [twitter, setTwitter] = useState("")
  const [instagram, setInstagram] = useState("")
  const [website, setWebsite] = useState("")
  const [document_type, setDocumentType] = useState("")
  const [explicit_content, setExplicitContent] = useState("")
  const [file_front, setFileFront] = useState("")
  const [file_back, setFileBack] = useState("")
  const [file_handwritten, setFileHandwritten] = useState("")
  const [file_video, setFileVideo] = useState("")

  const onRejectApplication = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/rejectapplication?username=${username}`)
      const responsedata = await response.json()
      if (responsedata === "success") {
        toast.success("Rejected Application")
      }
      else {
        toast.error("Error Occured")
      }
    } catch (error) {
      toast.error("Error Occured")
      console.error(error)
    }
  }

  const onAcceptApplication = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/acceptapplication?username=${username}`)
      const responsedata = await response.json()
      if (responsedata === "success") {
        toast.success("Accepted Application")
      }
      else {
        toast.error("Error Occured")
      }
    } catch (error) {
      toast.error("Error Occured")
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getapplication?username=${username}`)
      const responseData = await response.json()
      console.log(responseData)
      setFirstname(responseData.firstname)
      setLastname(responseData.lastname)
      setBirthday(responseData.birthday)
      setAddress(responseData.address)
      setCity(responseData.city)
      setState(responseData.state)
      setCountry(responseData.country)
      setZipcode(responseData.zipcode)
      setTwitter(responseData.twitter)
      setInstagram(responseData.instagram)
      setWebsite(responseData.website)
      setDocumentType(responseData.document_type)
      setExplicitContent(responseData.explicit_content)
      setFileFront(responseData.file_front)
      setFileBack(responseData.file_back)
      setFileHandwritten(responseData.file_handwritten)
      setFileVideo(responseData.file_video)
    }
    fetchdata()
  }, [username])
  return (
    <div className={`admin-application-view ${className}`} {...rest}>
      <table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{firstname}</td>
          </tr>

          <tr>
            <td>Last Name</td>
            <td>{lastname}</td>
          </tr>

          <tr>
            <td>Birthday</td>
            <td>{birthday}</td>
          </tr>

          <tr>
            <td>Address</td>
            <td>{address}</td>
          </tr>

          <tr>
            <td>City</td>
            <td>{city}</td>
          </tr>

          <tr>
            <td>Country</td>
            <td>{country}</td>
          </tr>

          <tr>
            <td>State</td>
            <td>{state}</td>
          </tr>

          <tr>
            <td>Zip Code</td>
            <td>{zipcode}</td>
          </tr>

          <tr>
            <td>Twitter</td>
            <td>{twitter}</td>
          </tr>

          <tr>
            <td>Instagram</td>
            <td>{instagram}</td>
          </tr>

          <tr>
            <td>Website</td>
            <td>{website}</td>
          </tr>

          <tr>
            <td>Referral Code</td>
            <td>{ }</td>
          </tr>

          <tr>
            <td>Document Type</td>
            <td>{document_type}</td>
          </tr>

          <tr>
            <td>Posting Explicit Content</td>
            <td>{explicit_content}</td>
          </tr>
        </tbody>
      </table>

      <div className="margin-top-3">
        <h3>Front</h3>

        <img
          src={file_front === "" ? "" : `${process.env.NEXT_PUBLIC_SERVER_URL}/public/` + file_front}
          width="100%"
        />
      </div>

      <div className="margin-top-3">
        <h3>Backside</h3>
        <img
          src={file_back === "" ? "" : `${process.env.NEXT_PUBLIC_SERVER_URL}/public/` + file_back}
          width="100%"
        />
      </div>

      <div className="margin-top-3">
        <h3>Photo of holding ID and a handwritten note</h3>
        <img
          src={file_handwritten === "" ? "" : `${process.env.NEXT_PUBLIC_SERVER_URL}/public/` + file_handwritten}
          width="100%"
        />
      </div>
      {file_video && (
        <div className='margin-top-3'>
          <h3>video of holding ID and the verification sign</h3>
          <video
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/public/` + file_video}
            width="100%"
            controls
          />
        </div>
      )}

      <div className="margin-top-3 flex-row">
        <FCButtonNew
          buttonContent={
            <div className="btn large outline-blue margin-right-3">Accept</div>
          }
          confirmationContent={
            <div className="flex-row margin-top-1">
              Do you want to accept this application?
            </div>
          }
          cb={(status: string) => {
            if (status === "yes") {
              onAcceptApplication()
            }
          }}
        />
        <FCButtonNew
          buttonContent={
            <div className="btn large outline-red margin-right-3">Reject</div>
          }
          confirmationContent={
            <div className="flex-row margin-top-1">
              Do you want to reject this application?
            </div>
          }
          cb={(status: string) => {
            if (status === "yes") {
              onRejectApplication()
            }
          }}
        />
      </div>
    </div>
  )
}
