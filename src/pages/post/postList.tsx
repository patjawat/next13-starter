import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {prisma} from  '@/lib/prisma';
import { useState, useEffect } from 'react'



  // export async function getServerSideProps() {


const PostList = (props) =>{

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)



    return (
        <>

    {/* <ul>{posts && posts.map((item) => <p key={item.id}>{item.title}</p>)}</ul> */}
    {/* {posts?.map((post) => (
            <div key={post.id} className="post">
             <p>{post.id}</p>
            </div>
          ))} */}
        
    {JSON.stringify(props)}
        </>
    )
}

export default PostList;

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
  