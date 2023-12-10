"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import * as z from "zod";

import Alert from "@/app/_components/ui/Alert";

// TODO add more text here

export default function ObservationSuccessAlert() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isSuccess = z.coerce.boolean().parse(searchParams.get("success"));

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- don't need to update the state, just being used to remember the search param before clearing it
  const [showAlert, setShowAlert] = useState(isSuccess);

  useEffect(() => {
    router.replace(pathname, { shallow: true });
  });

  return showAlert ? (
    <Alert title="Kia ora, thanks!" type="success">
      <p>Thanks for reporting your observation.</p>
      <Link className="btn btn-success" href="/report">
        Report Another
      </Link>
    </Alert>
  ) : null;
}
