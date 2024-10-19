import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { accordionData } from "@/constants/DataManager";

const Faq = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col gap-4 mt-5 w-full py-[83.92px]"
    >
      {accordionData.map((item) => (
        <AccordionItem
          value={item.id}
          key={item.id}
          className="max-w-[917.5px] mb-5"
        >
          <AccordionTrigger className="lg:text-[22px]  font-medium leading-[28px] text-army_green">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="  lg:text-lg font-normal  leading-[30px] text-[#6F6C90] pt-[19px]">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Faq;
