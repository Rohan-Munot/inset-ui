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
      text_1: "Intern",
      text_2: "May, 2025",
      card_contents: (
        <div className="w-full h-full bg-accent min-h-24 rounded-b-xl"></div>
      ),
    },
    {
      title: "Development",
      text_1: "Junior",
      text_2: "June, 2025",
      card_contents: (
        <div className="w-full h-full bg-accent min-h-24 rounded-b-xl"></div>
      ),
    },
    {
      title: "Optimization",
      text_1: "Senior",
      text_2: "July, 2025",
      card_contents: (
        <div className="w-full h-full bg-accent min-h-24 rounded-b-xl"></div>
      ),
    },
    {
      title: "Configuration",
      text_1: "Lead",
      text_2: "Aug, 2025",
      card_contents: (
        <div className="w-full h-full bg-accent min-h-24 rounded-b-xl"></div>
      ),
    },
    {
      title: "Launch",
      text_1: "Customer",
      text_2: "Sep, 2025",
      card_contents: (
        <div className="w-full h-full bg-accent min-h-24 rounded-b-xl"></div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl font-semibold gap-2 bg-background">
      {/* <StatefulButton state={buttonState}>Default</StatefulButton> */}
      <Roadmap roadmapSteps={roadmapStepsData} />
    </div>
  );
}
