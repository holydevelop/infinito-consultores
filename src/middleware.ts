export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile/:path*",
  "/proposal/:path*","/historial/:path*","/jobs/:path*"],
};
