import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text">
      Discover <span className="p-2 text-m">👀</span> 
        <br className="max-md:hidden"/>
        <span className="blue_gradient head_subtext"> AI Powered Prompts </span>
      </h1>
      <div className="w-2/3 mt-4 border-t pt-4 border-indigo-400 text-center">
        <p>
          <strong>Reactive Prompts</strong> is a contemporary, open-source AI prompting tool designed for exploring, generating, and exchanging creative prompts in today&apos;s world.
        </p>
      </div>

      <Feed />
    </section>
  );
}
