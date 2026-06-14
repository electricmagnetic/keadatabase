import Link from "next/link";

type GridTileCardsProps = {
  gridTileIds: string[];
};

export default function GridTileCards({ gridTileIds }: GridTileCardsProps) {
  if (gridTileIds.length === 0) {
    return <p className="text-muted">No recently surveyed tiles found.</p>;
  }

  return (
    <div className="cards">
      {gridTileIds.map((gridTileId) => (
        <div key={gridTileId} className="card">
          <Link href={`/grid/${gridTileId}`} className="panel fade-hover">
            <figure>
              <img
                src={`https://geo.keadatabase.nz/tiles/${gridTileId}.png`}
                alt="Map grid tile"
              />
              <figcaption>
                <i className="fa-fw fas fa-map-marker-alt"></i>
                {gridTileId}
              </figcaption>
            </figure>
          </Link>
        </div>
      ))}
    </div>
  );
}
