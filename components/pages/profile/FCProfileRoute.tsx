'use client'

import FCSideBarRight from '@/components/common/sidebar/FCSideBarRight'
import FCAccountSubscriptionPlans from '@/components/common/subscription/FCAccountSubscriptionPlans'
import FCUserVaultAlbumDisplay from '../../common/vault/FCUserVaultAlbumDisplay'
import LocalizationString from '@/components/common/LocalizationString'
import ProfileHeader from './ProfileHeader'
import ProfileDescriptionText from './ProfileDescriptionText'
import FCProfileTimelineRoute from './FCProfileTimelineRoute'
import { mockPosts } from '@/mock/posts'
import FCPostAttachment from '@/components/common/feed/FCPostAttachment'

import { useState, useEffect } from 'react'
import FCProfileMediaOffersRoute from './FCProfileMediaOffersRoute'
import FCProfileFollowersRoute from './FCProfileFollowersRoute'
import FCProfileFollowingRoute from './FCProfileFollowingRoute'
import { TAccount } from '@/types/account'
import { mockUser } from '@/mock/users'
import { useAuth } from '@/contexts/auth'

type Props = {
  children?: React.ReactNode
  className?: string
  tabId: number
  account: string
  [x: string]: any
}

const dummyBubbles = [
  `abc`,
  `def`,
  `dsdef`,
  `dd34ef`,
  `de342f`,
  `de234f`,
]

export default function FCProfileRoute({
  children,
  className,
  account,
  tabId,
  ...rest
}: Props) {
  const [tab, setTab] = useState(tabId)
  const { user } = useAuth()
  const [isReloading, SetIsReloading] = useState(false)
  const [userTags, setUserTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [invalidPage, setInvalidPage] = useState(true)
  const [userprofile, setUserprofile] = useState<TAccount>({
    userID: "0",
    displayName: "",
    userName: "Anonymous",
    availability: "online",
    avatarUrl: "",
    bannerUrl: "",
    location: "",
    verified: false,
    userType: "user",
    likes: 0,
    followers: 0,
    aboutme: "",
    twitterurl: "",
    instagramurl: "",
    tiktokurl: "",
  })

  const selectTag = (index: number, tag: string) => () => {
    if (index === 0)
      setSelectedTag(""), setSelectedIndex(0)
    else setSelectedTag(tag), setSelectedIndex(index)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile?username=${encodeURIComponent(account)}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }

        const responseData = await response.json();
        if (responseData === "failed") {
          setInvalidPage(true)
        } else {
          setInvalidPage(false)
        }
        const _user: TAccount = {
          userID: responseData?.userid || "0",
          displayName: responseData?.displayname || responseData.name,
          userName: responseData?.name || "Anonymous",
          availability: responseData?.status || "online",
          avatarUrl: responseData?.avatar || "",
          bannerUrl: responseData?.userBanner || "",
          location: responseData?.location || "",
          verified: Boolean(responseData?.verified || "false"),
          // admin: Boolean(responseData?.admin || "false"),
          likes: parseInt(responseData?.likes || "0"),
          followers: parseInt(responseData?.followers || "0"),
          aboutme: responseData?.aboutme || "",
          twitterurl: responseData?.link_twitter,
          instagramurl: responseData?.link_instagram,
          tiktokurl: responseData?.link_tiktok
        }

        setUserprofile(_user)
      } catch (error) {
        console.log(error);
      }
    }

    const fetchTags = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/gettags?username=${encodeURIComponent(account)}`, {
          method: "GET",
        });
        const responseData = await response.json();
        console.log(responseData)
        const _tags: string[] = responseData.split(',')
        const _tags1 = _tags.filter((str) => str !== '')
        setUserTags(["All", ...[...new Set(_tags1)].sort()])
      } catch (error) {
        console.log(error);
      }
    }

    fetchTags();
    fetchData();
  }, [isReloading]);

  if (invalidPage) {
    return (
      <div id="m_profile_route" className={`${className ?? ''}`} {...rest}>
        <div className='page-content' style={{ textAlign: "center", color: "#637395", fontWeight: "bold" }}>
          <div className='invalid-page' style={{ fontSize: "4em", color: "#2699f7", marginBottom: "5px" }}>
            <i className='fa fal fa-telescope'></i>
          </div>
          This profile or page does not exist.<br></br>

          <span>Click <a href="/">here</a> to go to the home page</span>
        </div>
      </div>
    )
  } else {
    return (
      <div id="m_profile_route" className={`${className ?? ''}`} {...rest}>
        <div className="page-content">
          <div className="profile-wrapper">
            <div className="profile-content-wrapper">
              <ProfileHeader account={userprofile} cb={() => { SetIsReloading(!isReloading) }} />
              <div className="profile-description-text">
                <span>
                  {userprofile.aboutme || "About me"}
                </span>
              </div>

              <div className="location">
                <span>
                  <i className="fa-fw fas fa-location-dot"></i>
                </span>
                {userprofile.location || ""}
              </div>

              {tab > 1 && user?.userID != userprofile.userID && <FCAccountSubscriptionPlans account={userprofile} />}
              <FCUserVaultAlbumDisplay />

              <div className="tab-nav-wrapper">
                <div className="tab-nav-items border-color">
                  {tab < 2 ? (
                    <>
                      <div
                        className={`tab-nav-item  ${tab == 0 && 'selected'}`}
                        onClick={() => setTab(0)}
                      >
                        <LocalizationString>Followers</LocalizationString>
                      </div>
                      <div
                        className={`tab-nav-item ${tab == 1 && 'selected'}`}
                        onClick={() => setTab(1)}
                      >
                        <LocalizationString>Following</LocalizationString>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`tab-nav-item2 flex-1 ${tab == 2 && 'selected'
                          }`}
                        onClick={() => setTab(2)}
                      >
                        <LocalizationString>Posts</LocalizationString>
                      </div>
                      <div
                        className={`tab-nav-item2 flex-1 ${tab == 3 && 'selected'
                          }`}
                        onClick={() => setTab(3)}
                      >
                        <LocalizationString>Media</LocalizationString>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex-row bubble-wrap">
                  {userTags.map((b, i) => (
                    <div
                      className={"bubble xd-drag-ignore " + (i === selectedIndex ? 'active' : '')}
                      key={i}
                      onClick={selectTag(i, b)}
                    >
                      {b}
                    </div>
                  ))}
                </div>

                <div className="tab-content">
                  {tab == 0 && <FCProfileFollowersRoute />}
                  {tab == 1 && <FCProfileFollowingRoute account={userprofile} />}
                  {tab == 2 && <FCProfileTimelineRoute username={userprofile.userName} selecttag={selectedTag} />}
                  {tab == 3 && <FCProfileMediaOffersRoute />}
                </div>
              </div>
            </div>

            {/* <FCSideBarRight>
              {tab > 1 && (
                <div className="profile-media-gallery">
                  {mockPosts
                    .filter((v, index) => index < 6)
                    .map((post, i) => (
                      <FCPostAttachment
                        className="media-gallery-item"
                        key={i}
                        data={post.Attachment}
                        size="small"
                      />
                    ))}
                </div>
              )}
            </FCSideBarRight> */}
          </div>
        </div>
      </div>
    )
  }
}
