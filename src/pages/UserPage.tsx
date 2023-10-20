import { useParams } from "react-router-dom";
import Body from "../component/Body";
import Posts from "./Posts";

export default function UserPage() {

  const {username, test} = useParams()
  console.log(username, test)
  return (
    <Body sidebar>
      <h2>{username}'s Page</h2>
      <Posts username={username!}/>
    </Body>
  )
}
