export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-8">About Us</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-xl text-muted font-bold mb-6">
          LodgeMaster Companion was built to simplify the lives of Lodge and Chapter leaders in the Order of the Arrow.
        </p>
        <p className="text-foreground mb-4">
          Our mission is to provide an easy-to-use, offline-first tool for managing event attendance and preparing clean data for LodgeMaster imports. We understand that scouting events can happen in remote locations with limited connectivity, which is why we've designed this tool to work perfectly without an internet connection.
        </p>
        <p className="text-foreground">
          Whether you're checking in hundreds of scouts at a Fall Fellowship or managing a small Chapter meeting, LodgeMaster Companion is here to help you keep your data organized and your reporting accurate.
        </p>
      </div>
    </div>
  );
}
