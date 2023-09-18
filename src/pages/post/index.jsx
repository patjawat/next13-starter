import Link from 'next/link'
import { GetServerSideProps } from 'next'
import axios from 'axios';
import {prisma} from  '@/lib/prisma'
import PostList from './postList'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const Post = ({posts}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (

        <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


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
  


