import { AlertTriangle, FileText, Scale, UserCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-8">
        Terms of Service
      </h1>

      <div className="prose prose-lg dark:prose-invert text-foreground space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-scout-green" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight m-0">
              1. Agreement to Terms
            </h2>
          </div>
          <p className="text-muted font-medium">
            By accessing or using LodgeLink, you agree to be bound by these
            Terms of Service. If you do not agree to all of these terms, do not
            use the application. This tool is provided for free to the scouting
            community.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="text-scout-green" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight m-0">
              2. User Responsibilities
            </h2>
          </div>
          <p className="text-muted font-medium">You are responsible for:</p>
          <ul className="text-muted font-medium list-disc pl-6 space-y-2">
            <li>
              Maintaining the confidentiality of any data you import into the
              application.
            </li>
            <li>
              Ensuring that your use of the application complies with all Boy
              Scouts of America (BSA) and Order of the Arrow (OA) policies,
              including Youth Protection Guidelines.
            </li>
            <li>
              Verifying the accuracy of data before importing it into
              LodgeMaster or other official systems.
            </li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-scout-green" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight m-0">
              3. Disclaimer of Warranties
            </h2>
          </div>
          <p className="text-muted font-medium italic bg-surface p-6 rounded-2xl border-2 border-border">
            "LodgeLink is provided 'as is' and 'as available' without any
            warranties of any kind, either express or implied. We do not
            guarantee that the application will be error-free or that the data
            exported will be perfectly compatible with all versions of
            LodgeMaster."
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Scale className="text-scout-green" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight m-0">
              4. Limitation of Liability
            </h2>
          </div>
          <p className="text-muted font-medium">
            In no event shall the volunteer developers or Section NE-1 be liable
            for any damages (including, without limitation, damages for loss of
            data or profit) arising out of the use or inability to use the
            materials on LodgeLink.
          </p>
        </section>

        <section className="pt-8 border-t border-border">
          <p className="text-sm text-muted font-black uppercase tracking-widest text-center">
            Last Updated: June 2026
          </p>
        </section>
      </div>
    </div>
  );
}
