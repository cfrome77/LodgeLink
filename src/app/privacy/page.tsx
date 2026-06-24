export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-lg dark:prose-invert text-foreground space-y-6">
        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight">Data Ownership</h2>
          <p className="text-muted font-bold">Your data belongs to you.</p>
          <p>
            LodgeMaster Companion is an offline-first application. All event and attendee data you import or create is stored locally in your browser's IndexedDB. We do not transmit your scouting data to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight">Local Storage</h2>
          <p>
            We use your browser's LocalStorage only to persist UI preferences, such as your light/dark mode selection. No personally identifiable information (PII) is stored in LocalStorage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight">Third-Party Services</h2>
          <p>
            This application does not use third-party tracking or analytics scripts. Your activity remains private and local to your device.
          </p>
        </section>
      </div>
    </div>
  );
}
