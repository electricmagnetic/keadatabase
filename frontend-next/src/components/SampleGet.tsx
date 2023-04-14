import { useQuery } from "react-query";

const SampleGet = () => {
  const query = useQuery<any, Error> ([
    "birds",
  ]);

  if (query.error) return <span>Error</span>;
  if (query.isLoading || !query.data) return <span>Loading</span>;

  const birds = query.data.results.results;

  return (
    <div>
      <h2>Birds</h2>
      {birds.map(bird => <span key={bird.slug}>{bird.name}</span>)}
    </div>
  );
};

export default SampleGet;