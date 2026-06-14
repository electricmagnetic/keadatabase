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
    <div className="grid-card">
      {!hideImage && (
        <img
          src={tileData.get_large_image}
          alt={`Map grid tile ${id}`}
          className="card-img-top"
        />
      )}
      <div className="grid-card__body">
        <h2 className="grid-card__title">
          <i className="fas fa-map-marker-alt"></i>
          {addLink ? <Link href={`/grid/${id}`}>{id}</Link> : id}
        </h2>
        {!hideDetails && (
          <dl>
            <div>
              <dt>
                SW <small>NZTM</small>
              </dt>
              <dd>
                {tileData.min.coordinates[0]}, {tileData.min.coordinates[1]}
              </dd>
            </div>
            <div>
              <dt>
                NE <small>NZTM</small>
              </dt>
              <dd>
                {tileData.max.coordinates[0]}, {tileData.max.coordinates[1]}
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
