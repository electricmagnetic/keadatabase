"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  ObservationsFilterSchema,
  type ObservationsFilters,
} from "./validations";
import { getValuesFromSearchParam, searchParamsAsObject } from "./helpers";

import Page from "@/app/_components/layout/Page";

export default function ObservationsQueryBuilder() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ObservationsFilters>({
    resolver: zodResolver(ObservationsFilterSchema),
    defaultValues: getValuesFromSearchParam<ObservationsFilters>(
      searchParams,
      ObservationsFilterSchema,
    ),
  });

  const onSubmit: SubmitHandler<ObservationsFilters> = (data) => {
    const params = new URLSearchParams({
      ...searchParamsAsObject(searchParams),
      ...data,
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Page.Section background="light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="form-control" {...register("sighting_type")} />
        {errors.sighting_type ? errors.sighting_type.message : null}
        <input className="form-control" {...register("status")} />
        {errors.status ? errors.status.message : null}
        <button type="submit">Submit</button>
      </form>
    </Page.Section>
  );
}
