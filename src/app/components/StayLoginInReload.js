"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { clearUser, setUser } from "@/Redux/userSlice";
import { BASE_URL } from "@/constants/apiUrl";

export default function StayLoginInReload() {
  const dispatch = useDispatch();

  useEffect(() => {
    // AbortController is a built-in browser API that lets you cancel fetch/axios requests if the component unmounts
    //  or if you no longer need the request.
    const controller = new AbortController();

    (async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
          signal: controller.signal, // cancelable
        });

        const user = res?.data?.data?.user;
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(clearUser()); // no user found
        }
      } catch (err) {
        if (axios.isCancel(err)) return; // ignore canceled
        dispatch(clearUser());
      }
    })();

    return () => controller.abort(); // cleanup
  }, [dispatch]);

  return null;
}
