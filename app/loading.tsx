export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4 py-16">
      <div className="seed-card rounded-seed p-6 text-center">
        <div className="mx-auto mb-4 size-12 animate-pulse rounded-full bg-forest-700" />
        <p className="font-display text-2xl font-black text-forest-900">
          Gathering the farm shelf...
        </p>
      </div>
    </div>
  );
}
