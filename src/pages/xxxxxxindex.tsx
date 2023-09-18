import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { Button } from '@nextui-org/button';
import { Card, CardBody, Input } from "@nextui-org/react";
import { GetServerSideProps } from 'next'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link'
import { BsArrowLeftShort,BsSearch } from 'react-icons/bs'
import { AiFillEnvironment } from 'react-icons/ai'
import { BiSolidDashboard } from 'react-icons/bi'
import { prisma } from '@/lib/prisma'
import router from "next/router";

interface Posts {
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

const Home = ({ posts }: Posts) => {

  const [open, setOpen] = useState(true);
  const [form, setForm] = useState<Post>({ id: '', title: '', content: '' });

const Menus = [
  {title:'Dashboard'},
  {title:'Pages'},
  {title:'Media',scaping: true},
  {
    title:'Projects',
    submenu: true,
    submenuItems:[
      {title:'submenu 1'},
      {title:'submenu 2'},
      {title:'submenu 3'},
    ]
  },
  {title:'Post'},
  {title:'Product'},
];

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: Post) {
    await axios.post('http://localhost:3000/api/posts/create', data).then(async () => {
      await setForm({ id: '', title: '', content: '' });
      await refreshData()
    });
    console.log('create');

  }

  async function update() {
    console.log('update');

    await axios.put(`http://localhost:3000/api/posts/${form.id}`, form).then(async () => {
      await setForm({ id: '', title: '', content: '' });
      await refreshData()
    });
  }


  async function deletePost(id: string) {
    await axios.delete(`http://localhost:3000/api/posts/${id}`);
    await router.replace(router.asPath)


  }
  const handelSubmit = async (data: Post) => {
    try {
      if (form.id == '') {
        await create(data);
      } else {
        await update()
      }
    } catch (error) {
      console.log('Error creating');

    }
  }
  return (
    <div className="flex">
      <div className={`bg-slate-700 h-screen p-5  ${open ? "w-72" : "w-20"} pt-8 duration-300 relative`}>
        <BsArrowLeftShort onClick={() => setOpen(!open)} className={`bg-white text-3xl rounded-full absolute -right-3 top-9 border ${open && "rotate-180"}`} />
        <div className="inline-flex">
          <AiFillEnvironment className="bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2" />

          <h1 className={`text-white ml-1 duration-300 ${!open && "scale-0"}`}>MyApp</h1>
        </div>
        <div className={`flex items-center bg-gray-500 py-2 mt-6 rounded-md ${!open ? "px-2.5" : "px-4"}`}>
          <BsSearch  className={`text-lg text-white block float-left ${open && "mr-2"}`}/>
          <input type="text" className={`text-base bg-transparent text-white w-full focus:outline-none ml-2 ${!open && "hidden"}`} placeholder="" />
        </div>
<ul className="mt-2"></ul>
        {Menus.map((menu , index) => (
    
          <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white`}>
            <span className={`text-2xl block float-left`}><BiSolidDashboard /></span>
            <span>{menu.title}</span>
          </li>
        
        ))}
      </div>
      <div className="p-10">
        <h1>Home page</h1>
      </div>
    </div>
  );
}

export default Home;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await prisma.post.findMany({
    'select': {
      'id': true,
      'title': true,
      'content': true
    }
  });

  return {
    props: {
      posts
    }
  }
}
