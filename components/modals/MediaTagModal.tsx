import '@/styles/modals/media_tag_modal.scss'

import { useState, useEffect } from 'react'
import LocalizationString from '../common/LocalizationString'
import { useModalMeta } from '@/contexts/modal'
import { AutoComplete } from "primereact/autocomplete";
import { toast } from 'react-toastify'
type Props = {
  children?: React.ReactNode
  className?: string
  data: {
    tags: string[]
    cb: (s: string[]) => void
  }
  [x: string]: any
}

export default function MediaTagModal({
  children,
  className = '',
  data,
  ...rest
}: Props) {
  const { tags: orgTags, cb } = data
  const { push, pop } = useModalMeta()
  // const [text, setText] = useState('')
  const [value, setValue] = useState('')
  const [items, setItems] = useState<string[]>([])
  const [tagslist, setTags] = useState<string[]>(orgTags)
  const [searchTagslist, setSearchTagslist] = useState<string[]>([])
  const closeModal = () => pop()
  const save = () => {
    cb && cb(tagslist)
    pop()
  }

  const removeTag = (index: number) => () =>
    setTags(tagslist.filter((_, i) => i != index))
  const addTag = (t: string) => {
    t != '' && t != ' ' && !tagslist.some((tagslist) => tagslist == t) && setTags([...tagslist, t])
    setValue('')
  }
  const _addTag = (index: number) => () => {
    const t = searchTagslist[index]
    t != '' && !tagslist.some((tagslist) => tagslist == t) && setTags([...tagslist, t])
  }

  const getTags = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/gettags`)
      const data = await res.json()
      const tags: string[] = data.split(",")
      setSearchTagslist([...new Set(tags)].sort())
    } catch (e) {
      console.log(e)
      toast.error('Failed to fetch tags')
    }
  }

  useEffect(() => {
    getTags()
  }, [])


  // const search = (event) => {
  //   // console.log(event.query);
  //   // setItems([...Array<string>(10).keys()].map(item => String(event.query + '-' + item)));
  //   const filteredArray: string[] = searchTagslist.filter(item => item.includes(event.query))
  //   setItems(filteredArray)
  // }

  return (
    <div className={`media-tag-modal ${className}`} {...rest}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">
            <LocalizationString>Manage Tags</LocalizationString>
          </div>
          <div className="actions" onClick={closeModal}>
            <i className="fa-fw fa fa-xmark pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
        <div className="modal-content">
          {/* <div className="title">Manage Media Tags</div> */}
          <div className="description">Edit media tags</div>

          <div className="tag-container">
            {tagslist.map((tag, i) => (
              <div key={i} className="btn" onClick={removeTag(i)}>
                {tag}
              </div>
            ))}
          </div>

          <div className="material-input">
            {/* <AutoComplete 
              value={value} 
              suggestions={items} 
              completeMethod={search} 
              onChange={(e) => {setValue(e.value); console.log("select", e.value)}}
              placeholder="custom tags"
              onSelect={(e)=>{ console.log("select",e.value); setValue(e.value)}}
              onKeyDown={(e) =>{
                e.key == 'Enter' && addTag(value)
                
                e.key == 'ArrowUp' || e.key == 'ArrowDown'? e.preventDefault() : null
              } }
            /> */}
            <input
              type="text"
              value={value}
              required
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key == 'Enter' && addTag(value)}
            />
            <div className="label">
              <LocalizationString>Custom tag</LocalizationString>
            </div>
            <div className="placeholder">
              <LocalizationString>Press enter to add custom tag</LocalizationString>
            </div>
          </div>

          <div className="tag-container">
            {searchTagslist.map((tag, i) => (
              <div key={i} className="btn" onClick={_addTag(i)}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <div className="btn margin-right-1" onClick={closeModal}>
            <LocalizationString>Close</LocalizationString>
          </div>
          <div className="btn outline-blue" onClick={save}>
            <LocalizationString>Save</LocalizationString>
          </div>
        </div>
      </div>
    </div>
  )
}
