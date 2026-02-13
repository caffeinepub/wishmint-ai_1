import { usePageMeta } from '../hooks/usePageMeta';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '../content/faqs';

export default function FaqPage() {
  usePageMeta({
    title: 'FAQ - WishMint AI',
    description: 'Frequently asked questions about WishMint AI',
  });

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Find answers to common questions about WishMint AI
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
