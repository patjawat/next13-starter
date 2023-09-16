import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { Button } from '@nextui-org/button';
import { Card, CardBody, Input } from "@nextui-org/react";
import { GetServerSideProps } from 'next'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link'

import {prisma} from   '@/lib/prisma'
import router from "next/router";

interface Posts{
  posts: {
    id: string
    title: string
    content: string
  }[]
}

interface Post {
  id: string
  'title': string,
  'content': string
}

  const Home = ({posts}: Posts) => {

  const [form, setForm] = useState<Post>({ id: '',title: '', content: '' });

  const { data: session } = useSession()


  const refreshData = () => {
    router.replace(router.asPath)
  }
  
  async function create(data: Post) {
    await axios.post('http://localhost:3000/api/posts/create', data).then(async ()=>{
      await setForm({ id : '',title: '', content: '' });
      await refreshData()
    });
    console.log('create');

  }

  async function update() {
    console.log('update');
    
    await axios.put(`http://localhost:3000/api/posts/${form.id}`,form).then(async ()=>{
      await setForm({ id : '',title: '', content: '' });
      await refreshData()
    });
  }


  async function deletePost(id: string) {
      await axios.delete(`http://localhost:3000/api/posts/${id}`);
      await router.replace(router.asPath)
      

  }
  const handelSubmit = async (data: Post) => {
    try {
      if(form.id ==''){
        await create(data);
      }else{
        await update()
      }
    } catch (error) {
      console.log('Error creating');

    }
  }
  return (
    <div>


{session && (
        <>
            {/* Signed in as {session.user.email} <br /> */}
        <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      {!session && (
        <>
        Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
 <li>
        <Link href="/post">About Us</Link>
      </li>

    <section className="bg-gray-50 flex justify-center">
     <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">

          <form onSubmit={(e) => {
            e.preventDefault()
            handelSubmit(form)
          }}>
           
           <div className="flex flex-col gap-5">

              <Input type="text" label="Enter Title" name="title" value={form.title} onChange={e => { setForm({ ...form, title: e.target.value }) }} />
         
              <Input type="text" label="Enter Content" name="content" value={form.content} onChange={e => { setForm({ ...form, content: e.target.value }) }} />

           </div>
              <div className="flex justify-center mt-5">
                <Button className="item" type="submit">{form.id == '' ? 'save' : 'update'}</Button>
              </div>
        
          </form>
            </div>
          
              </section>
              <ul>
            {posts.map(post => (
              <li key={post.id} className="border-b border-gray-600 p-2">
             <div className="flex justify-between">
             <div className="flex-1">
               <h3 className="font-bold">{post.title}</h3>
               <p className="text-sm">{post.content}</p>
             </div>
             <button onClick={() => setForm({title: post.title, content: post.content, id: post.id})} className="bg-blue-500 mr-3 px-3 text-white rounded">Update</button>
             <button onClick={() => deletePost(post.id)} className="bg-red-500 px-3 text-white rounded">X</button>
           </div>
           </li>
              ))}
          </ul>
              </div>
  );
}

export default Home;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await prisma.post.findMany({
    'select':{
      'id':true,
      'title':true,
      'content':true
    }
  });

  return {
    props: {
      posts
    }
  }
}
