import FeedItemMeta from './item/FeedItemMeta'
import FCPostAttachment from './FCPostAttachment'
import { TPost } from '@/types/media'
import FCAccountAvatar from '../account/FCAccountAvatar'
import FCTipGoal from './FCTipGoal'
import { useModalMeta } from '@/contexts/modal'
import { useAuth } from '@/contexts/auth'
import { toast } from 'react-toastify'
import { useState, useEffect, MouseEventHandler } from 'react'
import { stringify } from 'querystring'


type Props = {
  children?: React.ReactNode
  className?: string
  data: TPost
  isModal?: boolean
  isReply?: boolean
  [x: string]: any
}

export default function FCPost({
  children,
  className = '',
  data: postData,
  isModal,
  isReply,
  ...rest
}: Props) {
  const [cntlike, setCntlike] = useState(parseInt(postData.likes_cnt))
  const [isliked, setIsLiked] = useState(postData.is_liked === "1" ? true : false)
  const [heartclass, setHeartclass] = useState(isliked ? "fa" : "fal")
  const [reply, setReply] = useState(false)
  const isSingle = postData.Attachment.Medias.length <= 1
  const { push, pop } = useModalMeta()
  const [tagslist, setTagslist] = useState<string[]>([])
  const [commentslist, setCommentsList] = useState<TPost[]>([])
  const showReplyModal = (event: any) => {
    event.stopPropagation();
    if (user?.userName === "Anonymous" || user?.userName === undefined) {
      toast.warning("You are not logged in")
      return
    }
    push({ id: 'postcreate', data: { reply: true, parentid: postData.id } })
  }

  const showTipModal = (event: any) => {
    event.stopPropagation();

    push({
      id: 'createtip', data: {
        account: postData.Creator,
        tip_type: "POST",
        postid: postData.id,
      }
    })
  }

  const { user } = useAuth()

  useEffect(() => {
    setCntlike(parseInt(postData.likes_cnt))
    setIsLiked(postData.is_liked === "1" ? true : false)
    setHeartclass(postData.is_liked === "1" ? "fa" : "fal")
    const fetchData = async () => {
      const _taglist: string[] = []
      for (var i = 0; i < postData.Attachment.Medias.length; i++) {
        const tags = postData.Attachment.Medias[i].tags
        if (tags === "" || tags === null || tags === undefined) continue
        const _reuslt = tags.split(",")
        _reuslt.map((tag) => {
          _taglist.push(tag)
        })
      }
      setTagslist([...new Set(_taglist)])
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/userpost?username=&loginuser=${user?.userName}&parentid=${postData.id}`, {
          method: "GET",
        })
        const responseData = await response.json()
        if (isModal === true)
          setCommentsList(responseData)
      } catch (err) {
        console.log(err)
        return null
      }
    }

    fetchData();

  }, [postData])


  const onFavourite = async (event: any) => {
    event.stopPropagation();
    const postid = postData.id
    const username = user?.userName
    if (username === undefined)
      toast.warning("Please login to add to liked posts")
    else if (postData.Creator.userName === username)
      toast.info("You can't like your own post")
    else {
      const senddata = { postid, username }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/likepost`, {
          method: "POST",
          body: JSON.stringify(senddata)
        })
        const responseData = await response.json()
        if (responseData === "add") {
          setCntlike(cntlike + 1)
          setIsLiked(true)
          setHeartclass("fa")
          toast.success("successfully added")
        } else if (responseData === "remove") {
          setCntlike(cntlike - 1)
          setIsLiked(false)
          setHeartclass("fal")
          toast.success("Removed from liked posts")
        } else {
          toast.error("Error Occured")
        }
      } catch (error) {
        toast.error("Error Occured")
        console.log(error)
      }
    }
  }

  const preventEvent = (event: any) => {
    event.stopPropagation();
  }

  return (
    <div className={`fc-post ${className}`} {...rest}>
      <div className="feed-item-content border-color">
        <div className="feed-item-meta-wrapper">
          <div className="flex-row">
            <div className="feed-item-avatar" onClick={preventEvent}>
              <FCAccountAvatar className="avatar" account={postData.Creator} />
            </div>
            <FeedItemMeta account={postData.Creator} create_date={postData.publish_date} postid={postData.id} postdata={postData} />
          </div>

          <div className="feed-item-description pre-wrap text-fansly-white">
            {postData.description}
            <div className='feed-item-tags' style={{ display: 'flex' }}>
              {tagslist.map((tag, i) => (
                <div className='' key={i} style={{ color: '#2699f7', margin: '10px' }}>#{tag}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={`feed-item-preview ${isSingle && 'single-preview'}`}>
          {isSingle ? (
            <FCPostAttachment
              className="feed-item-preview-media"
              data={postData.Attachment}
            />
          ) : (
            <div className="feed-item-preview-media-list">
              <FCPostAttachment
                className="feed-item-preview-media"
                data={postData.Attachment}
              />
            </div>
          )}
        </div>

        {/* <div className="flex-col tip-goal-container">
          <FCTipGoal />
        </div> */}

        <div className="feed-item-stats">
          <div
            className="feed-item-stat comments custom-hover-trigger"
            onClick={showReplyModal}
          >
            <div className="icon-container custom-hover-effect">
              <i className="fa-fw fal fa-comment"></i>
            </div>
            {postData.comments_cnt}
          </div>
          <div className="feed-item-stat likes custom-hover-trigger">
            <div className="icon-container red custom-hover-effect" onClick={onFavourite}>
              <i className={"fa-fw " + heartclass + " fa-heart"}></i>
            </div>
            {cntlike}
          </div>
          <div
            className="feed-item-stat custom-hover-trigger tips"
            onClick={showTipModal}
          >
            <div className="icon-container green custom-hover-effect">
              <i className="fa-fw fal fa-dollar-sign"></i>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
        {/* Comments list */}
        <div className="reply_post" style={{ padding: '10px 0 10px 80px' }}>
          {commentslist.map((comment, i) => (
            <FCPost key={i} data={comment} isModal={isModal} />
          ))}
        </div>
      </div>
    </div>
  )
}
