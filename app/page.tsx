import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Campers of your dreams</h1>
      <h2>You can find everything you want in our catalog</h2>
      <Link href="/campers">View Now</Link>
    </div>
  );
}
