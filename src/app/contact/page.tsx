import {
  Mail,
  FileCode,
  Globe,
  MessageSquare,
  Bug,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-5xl">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-muted font-bold mb-8">
            Have questions or need assistance? We're here to help the Order of
            the Arrow community.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-scout-green p-3 rounded-2xl text-white shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-1">
                  Email
                </h3>
                <p className="text-muted font-bold break-all">
                  chris@chrisfrome.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-scout-green p-3 rounded-2xl text-white shrink-0">
                <FileCode size={24} />
              </div>
              <div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-1">
                  Developer
                </h3>
                <p className="text-muted font-bold">
                  Chris Frome
                  <br />
                  Frederick Chapter
                  <br />
                  Amangamek-Wipit Lodge 470
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-scout-green p-3 rounded-2xl text-white shrink-0">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-1">
                  Open Source
                </h3>
                <p className="text-muted font-bold">
                  github.com/cfrome77/LodgeLink
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-surface border-2 border-border rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mb-8">
              Get In Touch
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a
                href="mailto:chris@chrisfrome.com?subject=Bug Report - LodgeLink"
                className="p-6 bg-background border border-border rounded-2xl hover:border-scout-green transition-colors group cursor-pointer"
              >
                <Bug
                  className="text-scout-green mb-4 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <h3 className="font-black text-foreground uppercase tracking-wider mb-2">
                  Report a Bug
                </h3>
                <p className="text-sm text-muted font-bold">
                  Found an issue with check-ins or exports? Let us know.
                </p>
              </a>
              <a
                href="mailto:chris@chrisfrome.com?subject=Feature Request - LodgeLink"
                className="p-6 bg-background border border-border rounded-2xl hover:border-scout-green transition-colors group cursor-pointer"
              >
                <HelpCircle
                  className="text-scout-green mb-4 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <h3 className="font-black text-foreground uppercase tracking-wider mb-2">
                  Feature Request
                </h3>
                <p className="text-sm text-muted font-bold">
                  Have an idea to make the companion even better?
                </p>
              </a>
              <a
                href="mailto:chris@chrisfrome.com?subject=General Support - LodgeLink"
                className="p-6 bg-background border border-border rounded-2xl hover:border-scout-green transition-colors group cursor-pointer md:col-span-2"
              >
                <MessageSquare
                  className="text-scout-green mb-4 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <h3 className="font-black text-foreground uppercase tracking-wider mb-2">
                  General Support
                </h3>
                <p className="text-sm text-muted font-bold">
                  Need help with setup, ingestion, or LodgeLink reporting?
                </p>
              </a>
            </div>

            <p className="text-center text-xs text-muted font-black uppercase tracking-widest">
              Our volunteer team typically responds within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
