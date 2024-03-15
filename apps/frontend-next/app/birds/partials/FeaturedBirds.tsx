import { getBirds } from "../actions";
import { BirdAsCircleBlock } from "../templates";

export default async function FeaturedBirds() {
  const { results: birds } = await getBirds({
    page_size: 4,
    is_featured: true,
    ordering: "random",
  });

  return (
    <div className="row justify-content-center py-3">
      <div className="col-md-10">
        <ul className="list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 justify-content-center">
          {birds.map((bird) => (
            <li className="col" key={bird.slug}>
              <BirdAsCircleBlock bird={bird} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
