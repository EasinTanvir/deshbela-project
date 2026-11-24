import Container from "@/components/common/Container";

export default function AuthCard({ title, intro, children, footer }) {
  return (
    <Container className="my-10 md:my-16">
      <div className="mx-auto max-w-md border border-line px-5 py-8 sm:px-8">
        <header className="border-b-2 border-ink pb-3">
          <h1 className="font-serif text-3xl font-bold leading-tight text-ink">{title}</h1>
          {intro && <p className="mt-2 text-muted">{intro}</p>}
        </header>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 border-t border-line pt-5 text-center text-sm text-muted">{footer}</div>}
      </div>
    </Container>
  );
}
