import { Shield, Zap, Globe, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-foreground uppercase tracking-tight mb-4 italic">About LodgeLink</h1>
        <p className="text-xl text-muted font-bold max-w-2xl mx-auto">
          Streamlining event management for the Order of the Arrow, one check-in at a time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-3xl font-black text-foreground uppercase tracking-tight mb-6">The Problem</h2>
          <div className="space-y-4 text-lg text-muted font-medium">
            <p>
              Scouting events often happen in environments where technology takes a backseat—campgrounds, remote cabins, and outdoor arenas. Managing attendance in these locations usually involves messy paper lists or fragile spreadsheets that require a constant internet connection.
            </p>
            <p>
              When it comes time to report these events in LodgeMaster, leaders are often left with hours of manual data entry, cleaning up inconsistent names, and fixing formatting errors.
            </p>
          </div>
        </div>
        <div className="bg-surface border-2 border-border rounded-3xl p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-foreground uppercase tracking-tight mb-6">Our Solution</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-scout-green/10 text-scout-green p-1 rounded-lg mt-1"><Zap size={20} /></div>
              <p className="font-bold text-foreground">Offline-First Design: Check-in scouts anywhere, no Wi-Fi required.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-scout-green/10 text-scout-green p-1 rounded-lg mt-1"><Shield size={20} /></div>
              <p className="font-bold text-foreground">Data Integrity: Built-in validation ensures LodgeMaster-ready exports.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-scout-green/10 text-scout-green p-1 rounded-lg mt-1"><Globe size={20} /></div>
              <p className="font-bold text-foreground">Privacy Centric: Your data stays on your device, never in the cloud.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-16">
        <h2 className="text-3xl font-black text-foreground uppercase tracking-tight mb-8 text-center">Core Values</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-khaki text-scout-green w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-khaki-dark">
              <Users size={32} />
            </div>
            <h3 className="text-lg font-black text-foreground uppercase tracking-wider mb-2">Community</h3>
            <p className="text-sm text-muted font-bold">Built by Arrowmen, for Arrowmen. We listen to the needs of Lodge leaders.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-khaki text-scout-green w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-khaki-dark">
              <Zap size={32} />
            </div>
            <h3 className="text-lg font-black text-foreground uppercase tracking-wider mb-2">Efficiency</h3>
            <p className="text-sm text-muted font-bold">Minimize admin time so you can focus on the program and the scouts.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-khaki text-scout-green w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-khaki-dark">
              <Shield size={32} />
            </div>
            <h3 className="text-lg font-black text-foreground uppercase tracking-wider mb-2">Security</h3>
            <p className="text-sm text-muted font-bold">Total local control over your attendance records and scout information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
