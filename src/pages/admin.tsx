import { useSession } from "next-auth/react"

const Admin = () => {
    const session =  useSession()
//       if (session?.user.role === "admin") {
//     return <p>You are an admin, welcome!</p>
//   }

    return(
        <>
        {JSON.stringify(session)}
        Admin
        </>
    )
}

export default Admin;
// export default async  function Page() {
//   const session = await useSession()

//   if (session?.user.role === "admin") {
//     return <p>You are an admin, welcome!</p>
//   }

//   return <p>You are not authorized to view this page!</p>
// }