import { Mail, MapPin, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-8">Contact</h1>
      <div className="bg-surface border-2 border-border rounded-3xl p-8 space-y-8">
        <div className="flex items-start gap-4">
          <div className="bg-scout-green p-3 rounded-2xl text-white">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-foreground uppercase tracking-wider mb-1">Email</h3>
            <p className="text-muted font-bold">support@lodgemastercompanion.example.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-scout-green p-3 rounded-2xl text-white">
            <MapPin size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-foreground uppercase tracking-wider mb-1">Location</h3>
            <p className="text-muted font-bold">Lodge Headquarters - Section NE-1</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-scout-green p-3 rounded-2xl text-white">
            <Globe size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-foreground uppercase tracking-wider mb-1">Github</h3>
            <p className="text-muted font-bold">github.com/lodgemaster-companion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
