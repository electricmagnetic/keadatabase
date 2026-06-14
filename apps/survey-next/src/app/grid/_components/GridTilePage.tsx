import { getGridTileById } from "@/app/_components/grid/helpers";
import { SelectedGridTilesMap } from "@/app/_components/grid/SelectedGridTilesMap";
import type { GridTileId } from "@/app/_components/grid/types";
import { GridTileAnalysis } from "./GridTileAnalysis";
import { SurveyHours } from "./SurveyHours";

interface GridTilePageProps {
  id: GridTileId;
}

/**
 * Presents a nicely formatted page for a given grid tile.
 */
export function GridTilePage({ id }: GridTilePageProps) {
  const gridTile = getGridTileById(id);

  if (!gridTile) {
    return <div className="alert alert-danger">Invalid grid tile: {id}</div>;
  }

  const tileData = gridTile.properties;

  return (
    <div>
      <section className="grid-block grid-details">
        <div className="grid-details__details">
          <h2>Details</h2>
          <div>
            <div className="grid-tile panel">
              <img
                src={tileData.get_large_image}
                alt={`Map grid tile ${id}`}
                className="img-fluid img-thumbnail mb-3"
              />
            </div>
            <div className="grid-attributes">
              <dl>
                <dt>
                  Southwest <small>NZTM</small>
                </dt>
                <dd>
                  {tileData.min.coordinates[0]}, {tileData.min.coordinates[1]}
                </dd>
                <dt>
                  Northeast <small>NZTM</small>
                </dt>
                <dd>
                  {tileData.max.coordinates[0]}, {tileData.max.coordinates[1]}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="grid-details__analysys">
          <h2>Analysis</h2>
          <GridTileAnalysis id={id} />
        </div>
      </section>

      <section className="grid-block grid-map">
        <h2>Map</h2>
        <SelectedGridTilesMap
          gridTileIds={[id]}
          showNeighbours
          height="600px"
        />
      </section>

      <section className="grid-block grid-hours">
        <h2>
          Recent Hours <small>(last 25)</small>
        </h2>
        <SurveyHours gridTile={id} pageSize={25} swapGridTileSurvey />
      </section>
    </div>
  );
}
