export default function HowToApply({ email }) {
  return (
    <section aria-labelledby="how-to-apply" className="mt-10 max-w-2xl border-y border-line py-6">
      <h2 id="how-to-apply" className="font-serif text-2xl font-bold text-ink">
        How to apply
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-ink">
        There are no open jobs at the moment. You can still send us your CV and a short letter about
        yourself. We keep every application and contact you when a matching job opens.
      </p>
      <ol className="mt-4 list-decimal space-y-1 pl-6 text-ink">
        <li>Write the job you want in the email subject, for example &ldquo;Reporter&rdquo; or &ldquo;Internship&rdquo;.</li>
        <li>Attach your CV as a PDF file.</li>
        <li>For reporting jobs, add links to two or three stories you have written.</li>
      </ol>
      <a
        href={`mailto:${email}`}
        className="mt-5 inline-block bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
      >
        Email your CV to {email}
      </a>
    </section>
  );
}
