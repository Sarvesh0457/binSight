import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect /rewards, /dashboard, and /smartbins routes
        if (req.nextUrl.pathname.startsWith("/rewards") || 
            req.nextUrl.pathname.startsWith("/dashboard") ||
            req.nextUrl.pathname.startsWith("/smartbins")) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: '/auth/login',
    },
  }
);

export const config = {
  matcher: [
    "/rewards/:path*",
    "/dashboard/:path*",
    "/smartbins/:path*",
  ],
};
