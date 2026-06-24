import { ShieldCheck, HardDrive, EyeOff, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-8">Privacy & Data Security</h1>

      <div className="bg-scout-green/5 border-2 border-scout-green/20 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-scout-green text-white p-6 rounded-2xl shadow-lg">
          <ShieldCheck size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Our Privacy Promise</h2>
          <p className="text-muted font-bold text-lg">
            LodgeMaster Companion was designed from the ground up to respect the privacy of scouts and scouters. Your data never leaves your device.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 text-foreground">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <HardDrive className="text-scout-green" size={24} />
            <h2 className="text-xl font-black uppercase tracking-tight">Local-Only Storage</h2>
          </div>
          <div className="space-y-4 text-muted font-medium">
            <p>
              When you import a CSV or create an attendee, that information is stored in your browser's <strong>IndexedDB</strong> using Dexie.js. This is a local database that stays on your physical computer.
            </p>
            <p>
              We do not have a central database, and we do not have access to your event records, attendee lists, or health form status.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <EyeOff className="text-scout-green" size={24} />
            <h2 className="text-xl font-black uppercase tracking-tight">No Tracking</h2>
          </div>
          <div className="space-y-4 text-muted font-medium">
            <p>
              We do not use Google Analytics, Facebook Pixels, or any other third-party tracking scripts. We don't want to know how you use the app—we just want it to work for you.
            </p>
            <p>
              Your IP address is not logged, and your session is not recorded.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-scout-green" size={24} />
            <h2 className="text-xl font-black uppercase tracking-tight">PII Handling</h2>
          </div>
          <div className="space-y-4 text-muted font-medium">
            <p>
              We allow you to track sensitive fields like <strong>Health Form Status</strong>. Because this data is stored locally, it is your responsibility to secure your device and ensure you are following BSA Youth Protection and digital privacy policies.
            </p>
          </div>
        </section>

        <section className="bg-surface border-2 border-border rounded-2xl p-6">
          <h2 className="text-xl font-black uppercase tracking-tight mb-4">How to Clear Data</h2>
          <p className="text-sm text-muted font-bold mb-4">
            To completely remove all data from LodgeMaster Companion:
          </p>
          <ol className="text-sm text-muted font-bold space-y-2 list-decimal pl-4">
            <li>Open your browser settings</li>
            <li>Go to "Privacy and Security"</li>
            <li>Select "Clear browsing data"</li>
            <li>Ensure "Cookies and other site data" is checked</li>
            <li>Click "Clear data"</li>
          </ol>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted font-black uppercase tracking-widest">Last Updated: May 2024</p>
      </div>
    </div>
  );
}
