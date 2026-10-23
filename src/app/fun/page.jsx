import { PageHeader } from '@/components/ui';
import FunTabs from './FunTabs';

export const metadata = {
    title: 'Fun Side of Me',
    description: 'Music, books, hobbies, favorite tools, and fun facts.',
};

export default function FunPage() {
    return (
        <div className="pb-20">
            <PageHeader href="/fun" title="Fun Side of Me" />
            <FunTabs />
            <figure className="mt-14 rounded-2xl bg-surface p-8 text-center sm:p-10">
                <blockquote className="text-2xl leading-snug font-bold">
                    "Work hard, play harder. Balance is the key to sustainable creativity."
                </blockquote>
            </figure>
        </div>
    );
}
