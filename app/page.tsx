"use client";
import Roadmap from "@/components/roadmap/roadmap";

export default function Home() {
  // const [buttonState, setButtonState] = useState<
  //   "default" | "loading" | "success" | "error" | "warning"
  // >("default");
  // const states = ["default", "loading", "success", "error", "warning"];

  // useEffect(() => {
  //   let current = 0;
  //   setButtonState(states[current] as typeof buttonState);
  //   const interval = setInterval(() => {
  //     current = (current + 1) % states.length;
  //     setButtonState(states[current] as typeof buttonState);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);
  const roadmapStepsData = [
    {
      title: "Planning",
      description: "Define goals & strategy",
      card_contents: <div>Hello World</div>,
    },
    {
      title: "Development",
      description: "Build core features",
      card_contents: <div>Hello World</div>,
    },
    {
      title: "Optimization",
      description: "Performance & testing",
      card_contents: <div>Hello World</div>,
    },
    {
      title: "Configuration",
      description: "Setup & integration",
      card_contents: <div>Hello World</div>,
    },
    {
      title: "Launch",
      description: "Deploy & celebrate",
      card_contents: <div>Hello World</div>,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl font-semibold gap-2 bg-background">
      {/* <StatefulButton state={buttonState}>Default</StatefulButton> */}
      <Roadmap roadmapSteps={roadmapStepsData} />
    </div>
  );
}
