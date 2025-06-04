import { Tabs } from "@/components/ui/tabs";
import { Button } from "./ui/button";
type TabContent = {
  title: string;
  value: string;
  heading: string;
  description: string;
  buttonLabel: string;
};

type TabsDemoProps = {
  sectionTitle: string;
  sectionDescription: string;
  tabs: TabContent[];
};

export default function TabsDemo({
  sectionTitle,
  sectionDescription,
  tabs,
}: TabsDemoProps) {
  const formattedTabs = tabs.map(
    ({ title, value, heading, description, buttonLabel }) => ({
      title,
      value,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 max-sm:p-5 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900 content">
          <p className="whitespace-nowrap">{heading}</p>
          <p className="line-clamp-2 text-gray-200 text-base font-normal my-5">
            {description}
          </p>
          <DummyContent buttonLabel={buttonLabel} />
        </div>
      ),
    })
  );

  return (
    <div className="h-[35rem] md:h-[45rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start mt-10 mb-20">
      <h3 className="text-5xl max-sm:text-3xl font-bold mx-auto">
        {sectionTitle}
      </h3>
      <p className="my-5 mx-auto text-gray-500 text-center">
        {sectionDescription}
      </p>
      <Tabs tabs={formattedTabs} />
    </div>
  );
}

const DummyContent = ({ buttonLabel }: { buttonLabel: string }) => {
  return (
    <>
      <img
        src="/blog-placeholder-2.jpg"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover bg-gray-300 object-center h-[75%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-inherit dark:from-inherit/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
      <div className="mx-auto dark:bg-inherit w-fit absolute bottom-8 inset-x-0">
        <Button className="w-full text-white bg-secondary rounded-full text-lg p-5">
          {buttonLabel}
        </Button>
      </div>
    </>
  );
};
