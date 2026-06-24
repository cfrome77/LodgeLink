import { Cookie, Info, ShieldCheck } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-8">Cookie & Storage Policy</h1>

      <div className="prose prose-lg dark:prose-invert text-foreground space-y-8">
        <div className="bg-khaki/30 border-2 border-khaki-dark rounded-3xl p-8 flex items-start gap-6">
          <Cookie className="text-scout-green shrink-0" size={40} />
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight m-0 mb-2">How we use storage</h2>
            <p className="text-muted font-bold m-0">
              LodgeMaster Companion does not use traditional tracking cookies. Instead, we use modern browser storage technologies to provide a fast, offline-capable experience.
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <Info className="text-scout-green" size={24} />
            Data Storage Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border mt-4">
              <thead>
                <tr className="bg-surface">
                  <th className="border border-border px-4 py-3 text-left font-black uppercase tracking-widest text-xs">Technology</th>
                  <th className="border border-border px-4 py-3 text-left font-black uppercase tracking-widest text-xs">Key/Name</th>
                  <th className="border border-border px-4 py-3 text-left font-black uppercase tracking-widest text-xs">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-sm text-muted font-bold">
                <tr>
                  <td className="border border-border px-4 py-3">LocalStorage</td>
                  <td className="border border-border px-4 py-3"><code>theme</code></td>
                  <td className="border border-border px-4 py-3">Remembers your preference for Light or Dark mode.</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3">IndexedDB</td>
                  <td className="border border-border px-4 py-3"><code>LodgeMasterCompanionDB</code></td>
                  <td className="border border-border px-4 py-3">Stores all event details, attendee lists, and check-in statuses.</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3">Cache API</td>
                  <td className="border border-border px-4 py-3"><code>nextjs-cache</code></td>
                  <td className="border border-border px-4 py-3">Speeds up application loading and navigation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-scout-green" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight m-0">No Third-Party Cookies</h2>
          </div>
          <p className="text-muted font-medium">
            We do not use any third-party cookies for advertising, analytics, or social media tracking. Your browser data is used exclusively to make this application functional and performant for your local session.
          </p>
        </section>

        <section className="bg-surface border-2 border-border rounded-2xl p-6">
          <h2 className="text-xl font-black uppercase tracking-tight mb-4">Management</h2>
          <p className="text-sm text-muted font-bold">
            You can manage or delete this data at any time through your browser's Developer Tools (Application tab) or by clearing your browser cache and site data.
          </p>
        </section>
      </div>
    </div>
  );
}
