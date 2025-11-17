import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-brand-brown mb-8 font-heading">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-6">Page Not Found</h2>
        <p className="text-xl text-brand-muted mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-brand-brown hover:bg-brand-orange text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors duration-300 shadow-lg uppercase tracking-wide"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
