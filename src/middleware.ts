import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "USER",
    },
  }
)

export const config = { matcher: ["/admin","/post"] }

// export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
// }

//     const url = req.url;
//     console.log('xx',url);
// //   return NextResponse.redirect(new URL('/post', req.url))
// return  NextResponse.next();
  
// }
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }

