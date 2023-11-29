import { mockPosts } from '@/mock/posts'
import FCMediaOfferSuggestionsTimelinePost from '../feed/FCMediaOfferSuggestionsTimelinePost'
import FCPost from '../feed/FCPost'
import { useEffect, useState } from 'react'
import { TPost } from '@/types/media'
import { AuthContext, useAuth } from '@/contexts/auth'
import { useModalMeta } from '@/contexts/modal'

type Props = {
  children?: React.ReactNode
  className?: string
  suggestions?: string
  username?: string
  selecttag?: string
  [x: string]: any
}

export default function FCTimeline({
  children,
  className,
  suggestions,
  username,
  selecttag,
  ...rest
}: Props) {

  // const [responseData, setResponseData] = useState(Object)
  const [userpostData, setUserPostData] = useState<TPost[]>([])
  const { user } = useAuth()
  const { push } = useModalMeta()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username === "Anonymous") return
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/userpost?username=${username}&loginuser=${user?.userName}&parentid=0&selecttag=${selecttag}`, {
          method: "GET",
        });
        const responseData = await response.json();
        if (selecttag != "")
          console.log(responseData)
        setUserPostData(responseData);
      } catch (error) {
      }
    }

    fetchData()
  }, [username, selecttag]);

  const clickingPost = (postdata: TPost) => () => {
    console.log("postdata", postdata)
    // push({ id: 'postdetail', data: { postdata: postdata }})
    window.open(window.location.origin + "/post/" + postdata.id, "_blank")
    console.log(window.location.origin)
  }

  return (
    <div className={`fc-timeline ${className ?? ''}`} {...rest}>
      {suggestions && <FCMediaOfferSuggestionsTimelinePost />}

      {userpostData?.map((item, index) => (
        <FCPost key={index} className="feed-item" data={item} onClick={clickingPost(item)} />
      ))}
    </div>
  )
}
