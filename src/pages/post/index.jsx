import Link from 'next/link'
import { GetServerSideProps } from 'next'
import axios from 'axios';
import {prisma} from  '@/lib/prisma'
import PostList from './postList'

const Post = ({posts}) => {
   
  
    return (

        <>
        <h1>Post Page</h1>
        <li>
        <Link href="/">Home Us</Link>
      </li>
      {JSON.stringify(posts)}
      <PostList />
     
        </>
    )
}

export default Post;

export const getStaticProps = async () => {
  const posts = await prisma.post.findMany({
          'select':{
            'id':true,
            'title':true,
            'content':true
          }
        });
   
    return { props: { posts } }
  }
  


