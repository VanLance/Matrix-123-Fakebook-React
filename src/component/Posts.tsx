import { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { UserContext } from '../contexts/UserProvider';
import Spinner from 'react-bootstrap/esm/Spinner';

const baseApiUrl = import.meta.env.VITE_APP_BASE_API;

export default function Posts({ username }: { username: string }) {
  const [posts, setPosts] = useState<Array<Postable> | null>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${baseApiUrl}/user-posts/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
      } else window.alert('Failed Call');
    })();
  }, [username]);

  return (
    <>
      <h2>Posts</h2>
      <>
        {posts === null ? (
          <Spinner animation="border" variant="info" />
        ) : posts.length === 0 ? (
          <p>User has made no posts</p>
        ) : (
          [...posts].reverse().map((post: Postable, i: number) => {
            return <Post post={post} key={i} />;
          })
        )}
      </>
    </>
  );
}
