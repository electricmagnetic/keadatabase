"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";

import {
  ObservationsFilterSchema,
  type ObservationsFilters,
} from "./validations";
import { getValuesFromSearchParam, searchParamsAsObject } from "./helpers";

import Page from "@/app/_components/layout/Page";
import FieldSelect from "@/app/_components/form/FieldSelect";

export default function ObservationsQueryBuilder() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<ObservationsFilters>({
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
    <FormProvider {...form}>
      <Page.Section background="light">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-sm">
              <FieldSelect
                label="Sighting Type"
                name="sighting_type"
                options={[{ id: "sighted", name: "Sighted" }]}
              />
            </div>
            <div className="col-sm">
              <FieldSelect
                label="Status"
                name="status"
                options={[{ id: "public", name: "Public" }]}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Page.Section>
    </FormProvider>
  );
}
