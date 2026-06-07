import Link from "next/link";
import { getGridTileById } from "./helpers";
import type { GridTileId } from "./types";

interface GridTileCardProps {
  id: GridTileId;
  hideDetails?: boolean;
  hideImage?: boolean;
  addLink?: boolean;
  onRemove?: (id: GridTileId) => void;
}

export function GridTileCard({
  id,
  hideDetails = false,
  hideImage = false,
  addLink = false,
  onRemove,
}: GridTileCardProps) {
  const gridTile = getGridTileById(id);

  if (!gridTile) {
    return <div className="alert alert-danger">Invalid grid tile: {id}</div>;
  }

  const tileData = gridTile.properties;

  return (
    <div className="card my-3">
      {!hideImage && (
        <img
          src={tileData.get_large_image}
          alt={`Map grid tile ${id}`}
          className="card-img-top"
        />
      )}
      <div className="card-body">
        <h2 className="card-title d-flex justify-content-between align-items-center">
          <span>
            {addLink ? <Link href={`/grid/${id}`}>{id}</Link> : id}
          </span>
          {onRemove && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onRemove(id)}
              aria-label={`Remove ${id}`}
            >
              ×
            </button>
          )}
        </h2>
        {!hideDetails && (
          <div className="card-text">
            <dl className="m-0">
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
        )}
      </div>
    </div>
  );
}
