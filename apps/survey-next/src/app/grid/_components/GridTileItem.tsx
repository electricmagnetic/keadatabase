import { getGridTileById } from "@/app/_components/grid/helpers";
import type { GridTileId } from "@/app/_components/grid/types";

interface GridTileItemProps {
  id: GridTileId;
}

/**
 * Presents a nicely formatted list item for a given grid tile.
 */
export function GridTileItem({ id }: GridTileItemProps) {
  const gridTile = getGridTileById(id);

  if (!gridTile) {
    return <div className="alert alert-danger">Invalid grid tile: {id}</div>;
  }

  const tileData = gridTile.properties;

  return (
    <div className="card mb-1">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <img
              src={tileData.get_large_image}
              alt={`Map grid tile ${id}`}
              className="img-fluid"
            />
          </div>
          <div className="col-md-9">
            <h2 className="card-title">{id}</h2>
            <div className="card-text">
              <dl>
                <div className="row">
                  <div className="col-6">
                    <dt>
                      SW <small>NZTM</small>
                    </dt>
                    <dd>
                      {tileData.min.coordinates[0]},{" "}
                      {tileData.min.coordinates[1]}
                    </dd>
                  </div>
                  <div className="col-6">
                    <dt>
                      NE <small>NZTM</small>
                    </dt>
                    <dd>
                      {tileData.max.coordinates[0]},{" "}
                      {tileData.max.coordinates[1]}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
