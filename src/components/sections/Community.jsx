import Reveal from '../Reveal';
import { ButtonLink, Section } from '../ui';
import { WhatsAppIcon } from '../icons';
import PhotoDeck from '../fx/PhotoDeck';

const photos = ['/codegeeks/1.jpg', '/codegeeks/2-fixed.jpg', '/codegeeks/3.jpg', '/codegeeks/4.jpg'];

export default function Community() {
    return (
        <Section id="community" index={5} name="community" meta="co-founder" title="Codegeeks Community">
            <div className="grid items-center gap-10">
                <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-md text-muted">
                        Co-founder of <strong className="text-fg">Codegeeks</strong>, a thriving coding community where
                        developers connect, learn, and build together.
                    </p>
                    <ButtonLink href="https://whatsapp.com/channel/0029Vb6t1WcDZ4LUSuMSo62S" variant="secondary" className="self-start sm:self-auto">
                        <WhatsAppIcon size={16} /> Join Now
                    </ButtonLink>
                </Reveal>
                <Reveal index={1}>
                    <PhotoDeck photos={photos} />
                </Reveal>
            </div>
        </Section>
    );
}
