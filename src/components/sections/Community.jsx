import Reveal from '../Reveal';
import { ButtonLink, Section } from '../ui';
import { WhatsAppIcon } from '../icons';

const photos = ['/codegeeks/1.jpg', '/codegeeks/2-fixed.jpg', '/codegeeks/3.jpg', '/codegeeks/4.jpg'];

// ponytail: each row is the photo list rotated by one, not Math.random(). A random order differs between
// the server and the browser, which caused React's hydration warning and made the photos jump on load.
const rows = [0, 1, 2].map((r) => [...photos.slice(r), ...photos.slice(0, r)]);

export default function Community() {
    return (
        <Section id="community" index={5} name="community" meta="co-founder" title="Codegeeks Community">
            <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-muted">
                    Co-founder of <strong className="text-fg">Codegeeks</strong>, a thriving coding community where
                    developers connect, learn, and build together.
                </p>
                <ButtonLink href="https://whatsapp.com/channel/0029Vb6t1WcDZ4LUSuMSo62S" variant="secondary" className="self-start sm:self-auto">
                    <WhatsAppIcon size={16} /> Join Now
                </ButtonLink>
            </Reveal>

            {/* Decorative tilted photo marquee. Pauses on hover; stops for visitors who prefer reduced motion. */}
            <Reveal
                index={1}
                aria-hidden="true"
                className="marquee -mx-6 mt-8 overflow-hidden py-12 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [perspective:1500px]"
            >
                <div className="flex flex-col gap-4 [transform:rotateX(35deg)_rotateZ(-20deg)]">
                    {rows.map((row, r) => (
                        <div
                            key={r}
                            className="marquee-track flex w-max gap-4"
                            style={{ '--marquee-duration': `${30 + r * 5}s`, '--marquee-direction': r % 2 ? 'reverse' : 'normal' }}
                        >
                            {/* Two identical halves, so sliding by -50% loops seamlessly */}
                            {[...row, ...row, ...row, ...row].map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    width={240}
                                    height={170}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-[170px] w-[240px] shrink-0 rounded-xl border border-line object-cover"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </Reveal>
        </Section>
    );
}
