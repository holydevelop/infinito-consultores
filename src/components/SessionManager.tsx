"use client"

import { setUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { decryptJwt } from "@/utils/jwtManage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionManager({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch()

  useEffect(() => {
    const sessionData = async () => {
      try {
        const { iat, ...user } = await decryptJwt(session?.user?.access_token);
        dispatch(setUser(user))
      } catch (error) {
        return null
      }
    };

    if (session) {
      sessionData();
    }
  }, [session,dispatch]); // Usa [session] para activar el efecto cuando cambie la sesión

  return children;
}