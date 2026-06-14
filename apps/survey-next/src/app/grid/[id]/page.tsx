import { type Metadata } from "next";
import { notFound } from "next/navigation";

import Page from "@/app/_components/ui/Page";
import { getGridTileById } from "@/app/_components/grid/helpers";
import { GridTilePage } from "../_components/GridTilePage";
import type { PageWithParams } from "shared/next/types";

export async function generateMetadata({
  params,
}: PageWithParams): Promise<Metadata> {
  const paramsData = await params;
  const id = paramsData.id as string;

  return {
    title: `${id} (Grid Tile) | Kea Survey`,
    description: `Details for grid tile ${id}`,
  };
}

export default async function GridDetailPage({ params }: PageWithParams) {
  const paramsData = await params;
  const id = paramsData.id as string;

  const gridTile = getGridTileById(id);

  if (!gridTile) {
    notFound();
  }

  return (
    <Page.Container>
      <Page.Heading>Grid Tile {id}</Page.Heading>
      <Page.Section>
        <GridTilePage id={id} />
      </Page.Section>
    </Page.Container>
  );
}
