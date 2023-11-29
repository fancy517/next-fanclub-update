'use client'

import FCSideBarRight from '@/components/common/sidebar/FCSideBarRight'
import FCWalletBalance from '@/components/wallet/FCWalletBalance'
import FCSuggestionsSideBarNew from '../feed/FCSuggestionsSideBarNew'
import FCPost from '@/components/common/feed/FCPost'
import FCPostCreation from '@/components/post/FCPostCreation'
import { useState, useEffect } from 'react'
import { mockPosts } from '@/mock/posts'
import { useAuth } from '@/contexts/auth'
import { AnonymousUser } from '@/mock/users'
import { TPost } from '@/types/media'
import React from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  postId: string
  [x: string]: any
}

export default function FCPostRoute({
  children,
  className = '',
  postId,
  ...rest
}: Props) {
  const [postData, setPostData] = useState<TPost>(mockPosts[0])
  const { user } = useAuth()

  useEffect(() => {
    console.log(user)
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getonepost?postid=${postId}&loginuser=${user?.userName || ""}`, {
        method: "GET",
      })
      const responseData = await response.json()
      setPostData(responseData)
    }

    fetchData();
  }, [])

  console.log("FCPostRoute", postData)
  return (
    <div id="m_post_route" className={`${className}`} {...rest}>
      <div className="post-header sm-mobile-visible">
        <div className="post-header-left">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="post-header-center">
          <span className="bold">Post</span>
        </div>
        <div className="post-header-right">
          <div className="balance-dropdown">
            {/* <FCWalletBalance
              balanceOnly
              className="balance-component noselect pointer"
            /> */}
            <div className="dropdown-list width-19"></div>
          </div>
        </div>
      </div>

      {/* page content */}
      <div className="page-content">
        <div className="post-wrapper">
          <div className="post-content-wrapper">
            <FCPost className="feed-item" data={postData} isModal={true} />
            <FCPostCreation
              displayMode={3}
              className="border-color"
              account={user ?? AnonymousUser}
              parentid={postId}
            // reply
            // embedded
            />
            <div className="post-replies"></div>
          </div>

          <FCSideBarRight>
            <FCSuggestionsSideBarNew className="feed-suggestions" />
          </FCSideBarRight>
        </div>
      </div>
    </div>
  )
}
