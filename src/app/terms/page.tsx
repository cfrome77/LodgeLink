export default function TermsPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      <h1 className="text-4xl font-black text-foreground uppercase tracking-tight mb-8">Terms of Service</h1>
      <div className="prose prose-lg dark:prose-invert text-foreground space-y-6">
        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight">1. Usage</h2>
          <p>
            LodgeMaster Companion is provided as-is for the benefit of scouting organizations. It is a tool designed to assist in data preparation for LodgeMasterChapter Chapter Event Reports.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight">2. Disclaimer</h2>
          <p>
            This application is not an official product of the Boy Scouts of America or the Order of the Arrow. It is a companion tool developed by volunteers for the scouting community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight">3. Responsibility</h2>
          <p>
            Users are responsible for ensuring the accuracy and confidentiality of the data they manage within the application. Always follow Youth Protection and privacy guidelines when handling scout data.
          </p>
        </section>
      </div>
    </div>
  );
}
