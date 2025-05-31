import { Tabs } from "@/components/ui/tabs";
import { Button } from "./ui/button";

export default function TabsDemo() {
  const tabs = [
    {
      title: "Mobile app",
      value: "mobile-app",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p className="whitespace-nowrap">Mobile App</p>
          <p className="line-clamp-2 text-gray-200 text-base font-normal my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi
            illo, voluptatibus, deserunt eveniet iure consequuntur repellat
            dolorum nisi voluptas nostrum harum, ut libero enim soluta accusamus
            voluptates? Ut, culpa.
          </p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Desktop App",
      value: "desktop-app",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p className="whitespace-nowrap">Desktop App</p>
          <p className="line-clamp-2 text-gray-200 text-base font-normal my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi
            illo, voluptatibus, deserunt eveniet iure consequuntur repellat
            dolorum nisi voluptas nostrum harum, ut libero enim soluta accusamus
            voluptates? Ut, culpa.
          </p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Website",
      value: "website",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p className="whitespace-nowrap">Website</p>
          <p className="line-clamp-2 text-gray-200 text-base font-normal my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi
            illo, voluptatibus, deserunt eveniet iure consequuntur repellat
            dolorum nisi voluptas nostrum harum, ut libero enim soluta accusamus
            voluptates? Ut, culpa.
          </p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Saas",
      value: "saas",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p className="whitespace-nowrap">Saas</p>
          <p className="line-clamp-2 text-gray-200 text-base font-normal my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi
            illo, voluptatibus, deserunt eveniet iure consequuntur repellat
            dolorum nisi voluptas nostrum harum, ut libero enim soluta accusamus
            voluptates? Ut, culpa.
          </p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Autre",
      value: "autre",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Autre</p>
          <p className="line-clamp-2 text-gray-200 text-base font-normal my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi
            illo, voluptatibus, deserunt eveniet iure consequuntur repellat
            dolorum nisi voluptas nostrum harum, ut libero enim soluta accusamus
            voluptates? Ut, culpa.
          </p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[35rem] md:h-[45rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-10 mb-20">
      <h3 className="text-5xl max-sm:text-3xl font-bold mx-auto">
        Nos projets
      </h3>
      <p className="my-5  mx-auto text-gray-500  text-center">
        Voici nos dernières réalisations qui met en évidence notre expertise sur
        les projets client
      </p>
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      <img
        src="/blog-placeholder-2.jpg"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover bg-gray-300 object-center h-[75%]  absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-inherit dark:from-inherit/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
      <div
        className={
          "mx-auto bg-inherit dark:bg-inherit w-fit absolute bottom-8 inset-x-0"
        }
      >
        <Button className="w-full bg-transparent  text-white bg-secondary rounded-full text-lg p-5">
          Voir le projet
        </Button>
      </div>
    </>
  );
};
