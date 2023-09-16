import { NextPage } from "next";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import Router from 'next/router';
import loadConfig from "next/dist/server/config";
const DashboardProtected: NextPage = (): JSX.Element => {
  const {status, data} = useSession();
  
  useEffect(() => {
    if(status === "unauthenticated") Router.replace('/auth/signin')
  }, [status])
  
  if(status === "authenticated") {
    return <div>This page is protected for special people.</div>
  }
return <h1>loading</h1>;
}
export default Protected;