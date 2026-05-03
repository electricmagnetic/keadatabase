export default function Error({ message }: { message?: string }) {
  return (
    <div>
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
}
