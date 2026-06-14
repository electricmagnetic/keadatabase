import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { GridTool } from "./GridTool";

export const metadata: Metadata = {
  title: "Grid Map | Kea Survey",
  description:
    "Interactive grid map for the Kea Survey. Grid tiles are 5km by 5km and are at regular intervals on the standard Topo50 map grid.",
};

const DownloadLink = ({
  title,
  filename,
}: {
  title: string;
  filename: string;
}) => {
  return (
    <li>
      <a
        href={`https://geo.keadatabase.nz/grid/${filename}`}
        target="_blank"
        className="download-link"
      >
        <i className="fas fa-file-download"></i>
        Download {title}
      </a>
    </li>
  );
};

export default function GridPage() {
  return (
    <Page.Container>
      <Page.Heading
        subheading={
          <>
            <p>
              Grid tiles are 5km by 5km and are at regular intervals on the
              standard Topo50 map grid.
            </p>
          </>
        }
      >
        Grid Map
      </Page.Heading>

      <GridTool />

      <Page.Section className="page__section--bg-cream desktop-only">
        <h2>Download Grid</h2>
        <p>
          The kea survey grid is based on the{" "}
          <a
            href="https://birdatlas.co.nz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            New Zealand Bird Atlas
          </a>{" "}
          grid tiles.
        </p>
        <p>
          Each kea survey grid tile matches the ID of a bird atlas 10km by 10km
          tile, but has been further divided into four 5km by 5km tiles with one
          of four cardinal marker suffixes (NW/NE/SW/SE).
        </p>
        <div className="grid grid--half">
          <div>
            <h3>Garmin KMZ grids</h3>
            <ul className="download-links">
              <DownloadLink
                title="South Island"
                filename="garmin/SouthIsland.kmz"
              />
              <DownloadLink title="Kahurangi" filename="garmin/Kahurangi.kmz" />
              <DownloadLink
                title="Nelson Lakes &amp; Kaikoura"
                filename="garmin/NelsonLakes-Kaikoura.kmz"
              />
              <DownloadLink
                title="Mid Canterbury"
                filename="garmin/MidCanterbury.kmz"
              />
              <DownloadLink
                title="Aoraki &amp; Franz Josef"
                filename="garmin/Aoraki-Franz.kmz"
              />
              <DownloadLink
                title="Wanaka &amp; North Fiordland"
                filename="garmin/Wanaka-NorthFiordland.kmz"
              />
              <DownloadLink
                title="Wakatipu &amp; Mid Fiordland"
                filename="garmin/Wakatipu-MidFiordland.kmz"
              />
              <DownloadLink
                title="South Fiordland"
                filename="garmin/SouthFiordland.kmz"
              />
            </ul>
            <p>
              These files can be loaded directly onto commonly used Garmin GPS
              models, into the <code>Garmin/CustomMaps</code> folder.
            </p>
          </div>
          <div>
            <h3>Other formats</h3>
            <ul className="download-links">
              <DownloadLink title="GPX" filename="grid_tiles.gpx" />
              <DownloadLink title="GeoJSON" filename="grid_tiles.geojson" />
            </ul>
          </div>
        </div>
      </Page.Section>
    </Page.Container>
  );
}
