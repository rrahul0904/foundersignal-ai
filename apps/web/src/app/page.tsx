import ProspectWorkspace from "../components/prospect-workspace";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <nav>
          <strong>FounderSignal</strong>
          <span>Clean-room GTM intelligence</span>
        </nav>
        <div className="heroCopy">
          <p className="eyebrow">PROSPECT INTELLIGENCE</p>
          <h1>Find the right companies and the people who can buy.</h1>
          <p>
            Search high-fit prospects, reveal verified contact details only when needed,
            and keep every result grounded in source quality and freshness.
          </p>
        </div>
      </section>
      <ProspectWorkspace />
    </>
  );
}
