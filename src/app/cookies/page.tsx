export default function CookiesPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-8">Cookies</h1>
      <div className="prose prose-lg dark:prose-invert text-foreground space-y-6">
        <p className="text-xl text-muted font-bold">
          We use only essential cookies and local storage to make this app work.
        </p>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight">Essential Storage</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Theme Preference:</strong> Stored in <code>localStorage</code> to remember your choice between Light and Dark mode.</li>
            <li><strong>Database:</strong> Stored in <code>IndexedDB</code> to save your events and attendee data locally on your device.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight">No Tracking</h2>
          <p>
            We do not use any tracking cookies, advertising cookies, or third-party analytics cookies.
          </p>
        </section>
      </div>
    </div>
  );
}
