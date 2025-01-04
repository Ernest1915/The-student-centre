import { useMutation } from "@tanstack/react-query";
import {
  createUserAccount,
  SignInAccount,
  SignOutAccount,
} from "../appwrite/api";
import { INewUser } from "@/types";
import { useState, useEffect } from "react";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      SignInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: SignOutAccount,
  });
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", updateMatches);
    updateMatches();
    return () => mediaQueryList.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};
