import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@inset/ui/accordion";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Accordion className="w-full max-w-md" multiple>
        <AccordionItem value="item-a">
          <AccordionTrigger>What is Inset UI?</AccordionTrigger>
          <AccordionContent>
            Inset UI is a React component library featuring tactile aesthetics
            and smooth animations.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-b">
          <AccordionTrigger>Who built Inset UI?</AccordionTrigger>
          <AccordionContent>
            Inset UI is a personal project lovingly crafted for reusability and
            style exploration.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-c">
          <AccordionTrigger>Does Inset UI support dark mode?</AccordionTrigger>
          <AccordionContent>
            Yes, all design tokens and colors automatically adapt to dark mode.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
