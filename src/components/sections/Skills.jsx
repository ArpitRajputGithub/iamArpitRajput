import Reveal from '../Reveal';
import { Section } from '../ui';

// Same 33 skills as before, grouped so a recruiter can scan them in one pass.
const skillGroups = [
    ['Languages', ['JavaScript', 'TypeScript', 'Python', 'C++']],
    ['Frontend & mobile', ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Figma']],
    ['Backend & APIs', ['Node.js', 'Express.js', 'NestJS', 'FastAPI', 'REST APIs', 'GraphQL', 'Better Auth', 'Auth0', 'Firebase Cloud Messaging']],
    ['Databases', ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis']],
    ['Cloud & DevOps', ['AWS', 'Docker', 'Kubernetes', 'Helm', 'GitHub Actions']],
    ['Testing', ['Jest', 'Vitest', 'Testing Library']],
    ['AI', ['ChatGPT API', 'Hugging Face', 'Prompt Engineering']],
];

const total = skillGroups.reduce((n, [, skills]) => n + skills.length, 0);

// Skills as a dependency tree, the way `npm ls` prints packages
export default function Skills() {
    return (
        <Section id="skills" index={2} name="skills" meta={`${total} packages`} title="Skills">
            <Reveal className="rounded-xl border border-line bg-card p-5 font-mono text-sm leading-[1.35] sm:p-6">
                <p className="text-muted">
                    <span className="text-signal">$</span> npm ls --depth=1
                </p>
                <p className="mt-3">arpit@{new Date().getFullYear()}</p>
                <div className="mt-1 grid gap-x-10 sm:grid-cols-2">
                    {skillGroups.map(([group, skills], g) => (
                        <Reveal key={group} index={g} className="mt-2">
                            <p>
                                <span className="whitespace-pre text-line-strong">{g === skillGroups.length - 1 ? '└─ ' : '├─ '}</span>
                                {group.toLowerCase()}
                            </p>
                            <ul>
                                {skills.map((skill, i) => (
                                    <li key={skill} className="group/dep text-muted">
                                        <span className="whitespace-pre text-line-strong">
                                            {g === skillGroups.length - 1 ? '   ' : '│  '}
                                            {i === skills.length - 1 ? '└─ ' : '├─ '}
                                        </span>
                                        <span className="transition-colors duration-150 group-hover/dep:text-signal">{skill.toLowerCase()}</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </Reveal>
        </Section>
    );
}
