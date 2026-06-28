"use client";

import { useContext } from "react";
import { SessionContext } from "./SessionProvider";

export const useSession = () => useContext(SessionContext);
