import { FormEvent, useContext, useRef } from "react"
import { UserContext } from "../contexts/UserProvider";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API;

export default function MakePost() {

  const { user } = useContext(UserContext)
  const postField = useRef<HTMLInputElement>(null)

  async function handlePostData(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    const res = await fetch(`${baseApiUrl}/publish-post`,{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({body: postField.current!.value})
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <form onSubmit={handlePostData}>
      <label>Make Post: 
        <input type="text" placeholder="What's on your mind" ref={postField} required />
      </label>
      <button>Post</button>
    </form>
  )
}
