const { Client } = require('pg');
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const WORDS_COLLECTION = [
  // --- A. Engineering & Technical Thinking ---
  {
    word: "Architecture",
    slug: "architecture",
    shortMeaning: "The fundamental structural choices and blueprints that shape a system's form and long-term viability.",
    personalNote: "Software architecture is not about building walls, but about choosing which decisions are easy to change and which must stand strong.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Systems & Strategy"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Abstraction",
    slug: "abstraction",
    shortMeaning: "The deliberate reduction of complexity by concealing secondary details behind a clean boundary.",
    personalNote: "Great engineering is the art of finding the exact right altitude to think without drowning in implementation noise.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Creativity & Paradox"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Algorithm",
    slug: "algorithm",
    shortMeaning: "A finite, unambiguous sequence of instructions designed to transform inputs into predictable outcomes.",
    personalNote: "Thinking algorithmically turns vague wishes into deterministically solvable milestones.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Asynchrony",
    slug: "asynchrony",
    shortMeaning: "The execution of processes decoupled in time, moving forward without waiting idly on external latency.",
    personalNote: "Life and distributed systems both thrive when you stop blocking on what is not yet ready.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Systems & Strategy"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Automation",
    slug: "automation",
    shortMeaning: "Delegating mechanical, repetitive labor to automated processes to preserve cognitive energy.",
    personalNote: "Never spend human creativity solving what a well-tested deterministic script can run effortlessly.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Ambition & Execution"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Backend",
    slug: "backend",
    shortMeaning: "The underlying computational engine, storage, and logic that powers what the user sees.",
    personalNote: "The invisible foundation bears all the weight. Backend is where integrity is tested in silence.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Concurrency",
    slug: "concurrency",
    shortMeaning: "The composition of independently executing computations that can overlap in execution time.",
    personalNote: "Managing concurrency demands mental hygiene: immutability, clear ownership, and zero hidden shared state.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Consistency",
    slug: "consistency",
    shortMeaning: "Reliable adherence to principles and invariant states across time, scale, and environments.",
    personalNote: "In databases and character alike: consistency builds trust, predictability, and compounding strength.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Growth & Mastery", "Character & Values"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Context",
    slug: "context",
    shortMeaning: "The surrounding environment and circumstances without which raw information is meaningless.",
    personalNote: "Almost every technical argument is a misunderstanding born of unstated context.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Data",
    slug: "data",
    shortMeaning: "Structured observations, measurements, and records of state before interpretation.",
    personalNote: "Intuition suggests hypotheses; data keeps you honest.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 1,
    fontSize: "sm",
    animationStyle: "float-subtle"
  },
  {
    word: "Decoupling",
    slug: "decoupling",
    shortMeaning: "Separating dependencies so components can evolve, fail, and scale without breaking each other.",
    personalNote: "Loose coupling in software permits fearless refactoring; loose coupling in ego permits true learning.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Systems & Strategy"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Determinism",
    slug: "determinism",
    shortMeaning: "The quality of producing identical outcomes given identical inputs and preconditions.",
    personalNote: "Reliability begins by eliminating hidden randomness from your builds, tests, and reasoning.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Philosophy & Existence"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Encapsulation",
    slug: "encapsulation",
    shortMeaning: "Restricting internal access and bundling behavior together with the data it manipulates.",
    personalNote: "Protect the internals so callers only ever rely on commitments, not incidental details.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Engineering",
    slug: "engineering",
    shortMeaning: "The disciplined application of scientific knowledge and trade-offs to build practical solutions.",
    personalNote: "Engineering is not merely writing code; it is crafting dependable artifacts under real-world constraints.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Idempotency",
    slug: "idempotency",
    shortMeaning: "The property where repeating an operation produces the exact same side-effects as running it once.",
    personalNote: "Idempotency is peace of mind across networks: retry fearlessly without creating ghosts.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-gentle"
  },
  {
    word: "Infrastructure",
    slug: "infrastructure",
    shortMeaning: "The underlying substrate, networks, and services that enable higher-order software to exist.",
    personalNote: "You only notice infrastructure when it breaks. High craftsmanship here is quiet and invisible.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Integration",
    slug: "integration",
    shortMeaning: "Bringing disparate pieces into a harmonious, functioning whole with seamless contracts.",
    personalNote: "The hardest bugs hide at the interfaces between systems that were both individually correct.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Latency",
    slug: "latency",
    shortMeaning: "The time delay between the initiation of an action and the appearance of its first effect.",
    personalNote: "Speed is a feature. Low latency respects the user's attention and mortal time.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 1,
    fontSize: "sm",
    animationStyle: "drift-gentle"
  },
  {
    word: "Modularity",
    slug: "modularity",
    shortMeaning: "Designing components with clear boundaries that can be independently understood and replaced.",
    personalNote: "Modularity is the antidote to cognitive overload.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Observability",
    slug: "observability",
    shortMeaning: "The ability to infer the internal states of a complex system solely from its external outputs.",
    personalNote: "If you cannot inspect it in production under stress, you do not truly understand it.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Optimization",
    slug: "optimization",
    shortMeaning: "Refining efficiency without compromising correctness or architectural elegance.",
    personalNote: "Measure first, optimize bottlenecks, and never optimize what should have been deleted.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Orchestration",
    slug: "orchestration",
    shortMeaning: "Coordinating diverse distributed workflows toward unified, resilient execution.",
    personalNote: "Like a conductor: timing, telemetry, and error recovery matter more than volume.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Systems & Strategy"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Reliability",
    slug: "reliability",
    shortMeaning: "The measure of consistent operation according to specification across unpredictable conditions.",
    personalNote: "Clever code is a vanity; reliable code is a virtue.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Scalability",
    slug: "scalability",
    shortMeaning: "The capacity of a design to accommodate growing workloads without fundamental redesign.",
    personalNote: "Premature scaling ruins simplicity, but deliberate headroom protects tomorrow.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Ambition & Execution"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Simplicity",
    slug: "simplicity",
    shortMeaning: "The elimination of everything extraneous until only the essential and coherent remains.",
    personalNote: "Simplicity is not the starting point; it is the hard-won achievement after wrestling complexity.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Systems Thinking",
    slug: "systems-thinking",
    shortMeaning: "Analyzing problems through interconnected feedback loops, dependencies, and emergent behaviors.",
    personalNote: "Look beyond the isolated element to the invisible web of incentives and delays that governs it.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Systems & Strategy"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Trade-offs",
    slug: "trade-offs",
    shortMeaning: "The unavoidable balance where gaining one advantage requires conceding another.",
    personalNote: "There are no free solutions in systems, only conscious balances you choose to embrace.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Systems & Strategy"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Maintainability",
    slug: "maintainability",
    shortMeaning: "The ease with which software can be diagnosed, adapted, and sustained by future engineers.",
    personalNote: "Write every interface as if the person who inherits it six months from now is a tired future version of yourself.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Resilience",
    slug: "resilience",
    shortMeaning: "The capacity to withstand shocks, adapt to disruption, and recover equilibrium gracefully.",
    personalNote: "Failure is guaranteed in complex networks and human life; failing gracefully is engineering.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical", "Growth & Mastery", "Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Precision",
    slug: "precision",
    shortMeaning: "Exactness and meticulous care in specification, measurement, and execution.",
    personalNote: "Carelessness compound errors; precision eliminates whole classes of downstream doubt.",
    category: "Engineering & Technical",
    categories: ["Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },

  // --- B. Intelligence and Intellectual Curiosity ---
  {
    word: "Curiosity",
    slug: "curiosity",
    shortMeaning: "The relentless desire to understand how the world operates below its surface appearance.",
    personalNote: "Curiosity is the fuel of all original synthesis. The moment curiosity stops, calcification begins.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Creativity & Paradox"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Epistemology",
    slug: "epistemology",
    shortMeaning: "The philosophical investigation of knowledge, its methods, validity, and legitimate scope.",
    personalNote: "Always interrogate how you know what you claim to know. Most certainty is borrowed.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Philosophy & Existence"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "First Principles",
    slug: "first-principles",
    shortMeaning: "Breaking reality down to fundamental bedrock truths and reasoning upwards from there.",
    personalNote: "Do not reason by weak analogy when you can reconstruct the foundation with your own hands.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Systems & Strategy"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Insight",
    slug: "insight",
    shortMeaning: "The sudden, deep apprehension of an underlying truth connecting seemingly unrelated facts.",
    personalNote: "Insight arrives when mental clutter falls away and the hidden geometry of a problem reveals itself.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Inquiry",
    slug: "inquiry",
    shortMeaning: "A structured, honest quest for truth through rigorous questioning and evidence.",
    personalNote: "A sharp question opens more frontiers than a premature answer.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Intuition",
    slug: "intuition",
    shortMeaning: "Subconscious pattern recognition built through deep immersion and empirical feedback.",
    personalNote: "Intuition is not magic; it is thousands of forgotten lessons compiled into an instinct.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Logic",
    slug: "logic",
    shortMeaning: "The formal principles of valid inference, consistent deduction, and disciplined reasoning.",
    personalNote: "Logic is the scaffolding that protects intuition from wishful thinking.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Metacognition",
    slug: "metacognition",
    shortMeaning: "Awareness and critical analysis of one's own thought processes and biases.",
    personalNote: "Observe the thinker while thinking. It is the only defense against your own blind spots.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Philosophy & Existence"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Nuance",
    slug: "nuance",
    shortMeaning: "Subtle distinctions in meaning, character, and tone that black-and-white thinking misses.",
    personalNote: "Wisdom lives in the gradients. Loud certainty almost always erases nuance.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Objectivity",
    slug: "objectivity",
    shortMeaning: "Judgment guided by empirical reality, impartial criteria, and detached observation.",
    personalNote: "True objectivity is rare, but the disciplined pursuit of it keeps us humble.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Perspective",
    slug: "perspective",
    shortMeaning: "A distinct angle of observation that frames how context and significance are perceived.",
    personalNote: "Change the vantage point, and what seemed like an immovable obstacle becomes a doorway.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Creativity & Paradox"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Rationality",
    slug: "rationality",
    shortMeaning: "Aligning one's beliefs with evidence and actions with desired real-world outcomes.",
    personalNote: "Rationality is not cold emotionlessness; it is caring enough about the truth to check the facts.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Reasoning",
    slug: "reasoning",
    shortMeaning: "The coherent construction of arguments and conclusions through structured thought.",
    personalNote: "Sharpening your reasoning is the highest leverage skill an engineer can cultivate.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Reflection",
    slug: "reflection",
    shortMeaning: "Turning inward to examine experiences, dissect errors, and extract enduring lessons.",
    personalNote: "Unreflected experience is just time passing. Reflection converts experience into asset.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Skepticism",
    slug: "skepticism",
    shortMeaning: "Withholding assent until sufficient empirical evidence and logical soundness are demonstrated.",
    personalNote: "Healthy skepticism is not cynicism; it is the immune system of the inquiring mind.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Synthesis",
    slug: "synthesis",
    shortMeaning: "Combining distinct elements, domains, or philosophies into a unified, novel understanding.",
    personalNote: "The future belongs to those who bridge disparate disciplines and synthesize new clarity.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Creativity & Paradox"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Wisdom",
    slug: "wisdom",
    shortMeaning: "The mature integration of knowledge, ethical discernment, and lived experience.",
    personalNote: "Knowledge is knowing what can be done; wisdom is knowing what should be done.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Clarity",
    slug: "clarity",
    shortMeaning: "Freedom from ambiguity, cognitive fog, or unnecessary ornamental complication.",
    personalNote: "Clarity of thought is reflected in clarity of prose, code, and purpose.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity", "Engineering & Technical"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Discernment",
    slug: "discernment",
    shortMeaning: "The capacity to perceive fine differences and recognize genuine quality amidst noise.",
    personalNote: "In an age of endless information abundance, discernment is the ultimate filter.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Understanding",
    slug: "understanding",
    shortMeaning: "Grasping the causal relationships, deeper context, and human significance of things.",
    personalNote: "Memorization is cheap; true understanding changes how you navigate reality.",
    category: "Intelligence & Curiosity",
    categories: ["Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },

  // --- C. Growth and Personal Development ---
  {
    word: "Becoming",
    slug: "becoming",
    shortMeaning: "The ongoing, active process of continual self-transformation and unfolding potential.",
    personalNote: "You are never a finished product. Every season is a deliberate rehearsal for who you are becoming.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Discipline",
    slug: "discipline",
    shortMeaning: "The quiet ability to choose what matters long-term over what feels comfortable right now.",
    personalNote: "Motivation is capricious; discipline is an engine that runs in all weather.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Character & Values"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Evolution",
    slug: "evolution",
    shortMeaning: "Gradual adaptation, refinement, and branching development through feedback from environment.",
    personalNote: "Evolve or decay. Nature allows no static equilibrium.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Growth",
    slug: "growth",
    shortMeaning: "The deliberate expansion of capability, understanding, and emotional maturity.",
    personalNote: "Real growth happens at the frontier where your current skills feel slightly inadequate.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Mastery",
    slug: "mastery",
    shortMeaning: "Exemplary proficiency forged through years of disciplined obsession, feedback, and study.",
    personalNote: "Mastery is not an endpoint you reach, but an attitude of relentless devotion to the craft.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Ambition & Execution"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Potential",
    slug: "potential",
    shortMeaning: "The latent capabilities resting within a person or system waiting to be unlocked.",
    personalNote: "Unrealized potential is tragedy; realized potential demands daily courage.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Progress",
    slug: "progress",
    shortMeaning: "Incremental forward movement toward a meaningful, well-articulated standard.",
    personalNote: "Do not disparage small daily strides; compounding turns whispers into avalanches.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Reinvention",
    slug: "reinvention",
    shortMeaning: "The shedding of outdated paradigms and identities to birth a more capable version.",
    personalNote: "Willingness to look foolish as a beginner again is the secret to lifelong reinvention.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Self-Awareness",
    slug: "self-awareness",
    shortMeaning: "Conscious, honest knowledge of one's own character, triggers, motives, and boundaries.",
    personalNote: "You cannot govern a system you cannot accurately observe, including yourself.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Character & Values"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Self-Mastery",
    slug: "self-mastery",
    shortMeaning: "Command over one's own impulses, attention, energy, and inner dialogue.",
    personalNote: "Conquering external empires is trivial compared to governing your own mind.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Transformation",
    slug: "transformation",
    shortMeaning: "A fundamental shift in form, perspective, and core operating architecture.",
    personalNote: "True transformation leaves you looking back at past versions with both compassion and distance.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Adaptability",
    slug: "adaptability",
    shortMeaning: "The agility to thrive amidst shifting conditions and unexpected constraints.",
    personalNote: "Rigid trees snap in the storm; the flexible bamboo survives and expands.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Philosophy & Existence"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Patience",
    slug: "patience",
    shortMeaning: "Calm endurance and trust in slow, compounding processes across long horizons.",
    personalNote: "Impatience will ruin what urgency tries to rush. Great works demand unhurried hands.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Character & Values"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Practice",
    slug: "practice",
    shortMeaning: "The continuous, habitual execution of an art to hone reflex, clarity, and mastery.",
    personalNote: "You do not rise to your hopes in crisis; you fall to the level of your daily practice.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Persistence",
    slug: "persistence",
    shortMeaning: "Steadfast continuity of effort despite obstacles, delays, fatigue, or doubt.",
    personalNote: "Almost every breakthrough looks like foolish stubbornness until the moment it succeeds.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Ambition & Execution"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Deliberate Practice",
    slug: "deliberate-practice",
    shortMeaning: "Targeted, cognitively demanding practice aimed at dissecting and conquering weaknesses.",
    personalNote: "Mindless repetition reinforces bad habits; deliberate critique engineers mastery.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Excellence",
    slug: "excellence",
    shortMeaning: "An enduring commitment to surpassing standard expectations in craftsmanship and spirit.",
    personalNote: "Excellence is not an occasional act of brilliance, but an uncompromising baseline.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Character & Values"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Continuous Improvement",
    slug: "continuous-improvement",
    shortMeaning: "The philosophical practice of small, daily, perpetual refinements (Kaizen).",
    personalNote: "One percent better every day is the most dependable path to extraordinary outcomes.",
    category: "Growth & Mastery",
    categories: ["Growth & Mastery", "Systems & Strategy"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },

  // --- D. Character and Human Values ---
  {
    word: "Integrity",
    slug: "integrity",
    shortMeaning: "Unwavering consistency between core values, words, and actions when no one is watching.",
    personalNote: "Integrity is structural wholeness. A hairline crack in character eventually breaches the hull.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Empathy",
    slug: "empathy",
    shortMeaning: "The capacity to deeply inhabit another's internal experience without judgment.",
    personalNote: "Empathy is the prerequisite for designing software and organizations that actually care for people.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Humility",
    slug: "humility",
    shortMeaning: "Accurate assessment of oneself without inflation, coupled with openness to learn from anyone.",
    personalNote: "The expert who remains a perpetual student is virtually impossible to outlearn.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Compassion",
    slug: "compassion",
    shortMeaning: "Active tenderness toward suffering paired with a sincere desire to relieve it.",
    personalNote: "Intelligence without compassion produces cold machinery.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Courage",
    slug: "courage",
    shortMeaning: "The willingness to act decisively and speak truth in the presence of fear and uncertainty.",
    personalNote: "Courage is not the absence of terror; it is the judgment that principle matters more.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Accountability",
    slug: "accountability",
    shortMeaning: "Full ownership of consequences, choices, and commitments without deflection or excuses.",
    personalNote: "Own your failures in public, share your victories in private.",
    category: "Character & Values",
    categories: ["Character & Values", "Ambition & Execution"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Authenticity",
    slug: "authenticity",
    shortMeaning: "Living in alignment with your true beliefs rather than performing a role for external approval.",
    personalNote: "It takes tremendous energy to sustain a facade. Authenticity is cognitive lightness.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Benevolence",
    slug: "benevolence",
    shortMeaning: "An active disposition toward goodwill, generosity, and uplifting others.",
    personalNote: "Cultivate goodwill as a default stance toward the world until proven otherwise.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 1,
    fontSize: "sm",
    animationStyle: "drift-gentle"
  },
  {
    word: "Dignity",
    slug: "dignity",
    shortMeaning: "Inherent worth, self-respect, and graceful composure under adversity.",
    personalNote: "Circumstances can strip away comfort, but your dignity remains your sovereign domain.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Honesty",
    slug: "honesty",
    shortMeaning: "Unvarnished adherence to truth in speech, action, and internal monologue.",
    personalNote: "The easiest person to deceive is yourself. Honesty starts inward.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Kindness",
    slug: "kindness",
    shortMeaning: "Intentional gentleness and generosity of spirit, especially when it costs something.",
    personalNote: "Cleverness is a gift; kindness is a conscious choice renewed every morning.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Responsibility",
    slug: "responsibility",
    shortMeaning: "The duty to answer for obligations, outcomes, and the stewardship of one's power.",
    personalNote: "With agency comes duty. The heavier the responsibility you willingly shoulder, the more meaningful life becomes.",
    category: "Character & Values",
    categories: ["Character & Values", "Ambition & Execution"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Temperance",
    slug: "temperance",
    shortMeaning: "Voluntary self-restraint, moderation, and proportion across all appetites and passions.",
    personalNote: "Freedom without boundaries is chaos. Temperance preserves sovereignty over oneself.",
    category: "Character & Values",
    categories: ["Character & Values", "Philosophy & Existence"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Respect",
    slug: "respect",
    shortMeaning: "Honoring the fundamental autonomy, boundaries, and worth of other beings.",
    personalNote: "Treat the server and the CEO with the exact same baseline of human reverence.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Character",
    slug: "character",
    shortMeaning: "The sum of moral habits and ethical responses forged through repeated choices.",
    personalNote: "Talent gets you in the room; character determines what you build and who trusts you.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Emotional Intelligence",
    slug: "emotional-intelligence",
    shortMeaning: "The ability to perceive, evaluate, regulate, and express emotions constructively.",
    personalNote: "A brilliant mind hijacked by unexamined emotion is like a Ferrari with no steering wheel.",
    category: "Character & Values",
    categories: ["Character & Values", "Growth & Mastery"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Grace",
    slug: "grace",
    shortMeaning: "Unearned favor, quiet poise under pressure, and elegance in relating to others.",
    personalNote: "Give others the benefit of grace; you will need it yourself more than you realize.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Fairness",
    slug: "fairness",
    shortMeaning: "Impartial, just treatment that respects principles over personal favoritism.",
    personalNote: "Fairness builds environments where merit, trust, and truth can flourish without cynicism.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Trust",
    slug: "trust",
    shortMeaning: "Confidence in the integrity, capability, and character of another person or system.",
    personalNote: "Trust takes years to build, seconds to break, and is the highest speed lubricant in human coordination.",
    category: "Character & Values",
    categories: ["Character & Values"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },

  // --- E. Ambition and Execution ---
  {
    word: "Ambition",
    slug: "ambition",
    shortMeaning: "An ardent, sustained drive to achieve high and transformative aims in the world.",
    personalNote: "Healthy ambition is not hunger for status; it is hunger to manifest your highest capabilities in service of great work.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Agency",
    slug: "agency",
    shortMeaning: "The capacity and confidence to act independently, shape circumstances, and bend reality.",
    personalNote: "High agency people do not wait for permission or ideal conditions; they start building.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Ascent",
    slug: "ascent",
    shortMeaning: "The upward climb toward higher altitude, vision, and accomplishment through steep terrain.",
    personalNote: "The climb demands respect for every foothold. Celebrate the altitude while looking up.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Audacity",
    slug: "audacity",
    shortMeaning: "Bold willingness to take daring risks and imagine possibilities outside conventional consensus.",
    personalNote: "Every frontier was settled by someone willing to be thought unreasonable.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution", "Creativity & Paradox"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Craftsmanship",
    slug: "craftsmanship",
    shortMeaning: "Devoted pride in producing work of exceptional quality, finish, and enduring elegance.",
    personalNote: "The back of the cabinet that no one sees should be finished as meticulously as the front.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution", "Engineering & Technical"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Execution",
    slug: "execution",
    shortMeaning: "The relentless discipline of translating vision and strategy into concrete reality.",
    personalNote: "Ideas are merely multipliers; execution is the base integer that gives them value.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Leverage",
    slug: "leverage",
    shortMeaning: "Amplifying impact by applying effort at strategic fulcrums like code, capital, or knowledge.",
    personalNote: "Give me a lever long enough and code reproducible enough, and we can move whole industries.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution", "Systems & Strategy"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Momentum",
    slug: "momentum",
    shortMeaning: "The kinetic force of accumulated progress that makes future progress progressively easier.",
    personalNote: "Starting from zero takes immense friction. Once momentum arrives, guard it at all costs.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-gentle"
  },
  {
    word: "Ownership",
    slug: "ownership",
    shortMeaning: "Treating the mission, outcome, and every downstream detail as entirely your responsibility.",
    personalNote: "When you adopt radical ownership, blaming external circumstances becomes obsolete.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Opportunity",
    slug: "opportunity",
    shortMeaning: "A fertile confluence of timing, readiness, and possibility.",
    personalNote: "Luck is random; readiness to seize opportunity when lightning strikes is engineered.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Purpose",
    slug: "purpose",
    shortMeaning: "The guiding North Star that infuses discipline, labor, and existence with enduring meaning.",
    personalNote: "A person with a clear 'why' can endure almost any 'how'.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution", "Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "ROI",
    slug: "roi",
    shortMeaning: "Return on Investment: the proportional yield of value gained relative to resources expended.",
    personalNote: "Apply ROI not just to money, but to your attention, emotional reserves, and finite hours.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 1,
    fontSize: "sm",
    animationStyle: "drift-gentle"
  },
  {
    word: "Strategy",
    slug: "strategy",
    shortMeaning: "The deliberate choice of where to focus scarce resources to achieve decisive advantages.",
    personalNote: "Strategy is mostly about deciding what you will emphatically refuse to do.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution", "Systems & Strategy"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Vision",
    slug: "vision",
    shortMeaning: "A compelling, lucid projection of a future state that does not yet exist.",
    personalNote: "Hold the long-term vision with firm resolve, but keep the immediate implementation flexible.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Initiative",
    slug: "initiative",
    shortMeaning: "The spontaneous, proactive drive to begin action before prompted or instructed.",
    personalNote: "The gap between those who wait and those who initiate is where history is made.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Compounding",
    slug: "compounding",
    shortMeaning: "The exponential acceleration of gains when returns are continuously reinvested.",
    personalNote: "Compounding applies to code, knowledge, reputation, and relationships. Never interrupt it unnecessarily.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution", "Systems & Strategy"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Focus",
    slug: "focus",
    shortMeaning: "Directing the full intensity of one's consciousness and energy toward a singular objective.",
    personalNote: "Focus is saying no to a hundred good opportunities so you can say yes to the singular great one.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Intentionality",
    slug: "intentionality",
    shortMeaning: "Acting with deliberate awareness and purpose rather than drifting on autopilot.",
    personalNote: "Design your day, your architecture, and your habits with intent, or default to someone else's.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Impact",
    slug: "impact",
    shortMeaning: "The tangible, enduring difference made in the lives of real human beings and systems.",
    personalNote: "Do not measure effort by sweat; measure it by the real-world delta created.",
    category: "Ambition & Execution",
    categories: ["Ambition & Execution"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },

  // --- F. Creativity and Unconventional Thinking ---
  {
    word: "Asymmetry",
    slug: "asymmetry",
    shortMeaning: "An imbalance where the upside of an action drastically outweighs the capped downside.",
    personalNote: "Look for asymmetric bets in learning, relationships, and projects: unlimited upside, tolerable failure.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox", "Systems & Strategy"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Emergence",
    slug: "emergence",
    shortMeaning: "Complex patterns and properties that arise spontaneously from simple localized interactions.",
    personalNote: "You cannot predict the beauty of flocking birds by dissecting an isolated feather.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox", "Systems & Strategy"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "float-subtle"
  },
  {
    word: "Exploration",
    slug: "exploration",
    shortMeaning: "Venturing into uncharted intellectual and creative territory without guaranteed results.",
    personalNote: "Exploration looks like play from the outside, but it is how new paradigms are discovered.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Imagination",
    slug: "imagination",
    shortMeaning: "The mental faculty that visualizes what has never been seen and synthesizes what does not yet exist.",
    personalNote: "Logic gets you from A to B; disciplined imagination creates new coordinates entirely.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Innovation",
    slug: "innovation",
    shortMeaning: "Introducing novel, valuable ideas and methods that fundamentally improve upon the past.",
    personalNote: "True innovation rarely feels like incremental compliance; it often looks slightly crazy at first.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-gentle"
  },
  {
    word: "Interdisciplinary",
    slug: "interdisciplinary",
    shortMeaning: "Crossing the artificial boundaries between specialized fields to find fresh synergy.",
    personalNote: "The richest discoveries hide in the intersections where different disciplines collide.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox", "Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Paradox",
    slug: "paradox",
    shortMeaning: "A proposition that appears self-contradictory yet expresses a profound deeper reality.",
    personalNote: "When you encounter a paradox, slow down. It usually signals a boundary of conventional models.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox", "Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Possibility",
    slug: "possibility",
    shortMeaning: "The open horizon of potential outcomes waiting to be materialized.",
    personalNote: "Treat constraints as creative parameters, not dead ends.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Serendipity",
    slug: "serendipity",
    shortMeaning: "Finding valuable or agreeable things not deliberately sought for by maintaining openness.",
    personalNote: "Increase your surface area for luck: publish your ideas, meet people, build openly.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Uncertainty",
    slug: "uncertainty",
    shortMeaning: "The state of incomplete knowledge where outcomes cannot be predicted with certainty.",
    personalNote: "Do not fear uncertainty; embrace it. Certainty is the enemy of discovery.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox", "Philosophy & Existence"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Unconventional",
    slug: "unconventional",
    shortMeaning: "Departing from traditional customs, consensus thinking, or established formulas.",
    personalNote: "Consensus thinking yields consensus returns. To stand out, cultivate healthy unorthodoxy.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Abundance",
    slug: "abundance",
    shortMeaning: "A mindset rooted in the awareness of vast opportunity, creation, and generosity.",
    personalNote: "Zero-sum thinkers quarrel over slices of the pie; positive-sum builders bake larger pies.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Creativity",
    slug: "creativity",
    shortMeaning: "The generation of novel, surprising, and valuable concepts or artifacts.",
    personalNote: "Creativity is intelligence having fun with constraints.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Experimentation",
    slug: "experimentation",
    shortMeaning: "Testing hypotheses through disciplined, iterative trials and feedback.",
    personalNote: "Lower the cost of trying things. High-frequency experimentation beats endless deliberation.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Originality",
    slug: "originality",
    shortMeaning: "Freshness of thought, authenticity of expression, and independence from clichés.",
    personalNote: "Originality is what remains when you stop aping what everyone else believes is expected.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Open-Mindedness",
    slug: "open-mindedness",
    shortMeaning: "The genuine receptivity to new ideas, counterarguments, and contradictory evidence.",
    personalNote: "Hold your strong convictions very loosely when reality presents fresh evidence.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox", "Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Wonder",
    slug: "wonder",
    shortMeaning: "A feeling of reverence, astonishment, and awe in the presence of the profound universe.",
    personalNote: "Never lose the child's awe at how extraordinary it is that anything exists at all.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox", "Philosophy & Existence"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Novelty",
    slug: "novelty",
    shortMeaning: "The quality of being new, striking, and previously unexperienced.",
    personalNote: "Seek novelty to refresh perspective, but evaluate it by enduring truth.",
    category: "Creativity & Paradox",
    categories: ["Creativity & Paradox"],
    importance: 1,
    fontSize: "sm",
    animationStyle: "drift-gentle"
  },

  // --- G. Philosophy and Deeper Realizations ---
  {
    word: "Amor Fati",
    slug: "amor-fati",
    shortMeaning: "The philosophical love of one's fate: embracing everything that happens as necessary and good.",
    personalNote: "Do not merely endure adversity. Love it as the very fuel of your becoming.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Antifragility",
    slug: "antifragility",
    shortMeaning: "The rare property of systems and souls that grow stronger and thrive from disorder and stress.",
    personalNote: "The resilient survives shocks; the antifragile feeds on volatility and climbs higher.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence", "Systems & Strategy"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Equanimity",
    slug: "equanimity",
    shortMeaning: "Mental calmness, composure, and evenness of temper, especially in difficult situations.",
    personalNote: "Be the stillness at the eye of the storm. Let outside chaos wash over without penetrating.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence", "Character & Values"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Impermanence",
    slug: "impermanence",
    shortMeaning: "The transient nature of all physical states, triumphs, heartaches, and forms.",
    personalNote: "Everything passes. Remembering this sweetens the good times and softens the brutal ones.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Memento Mori",
    slug: "memento-mori",
    shortMeaning: "Remember that you must die: the ancient contemplation of our inescapable mortality.",
    personalNote: "Death is the great clarifying lens. It instantly burns away trivial anxieties and clarifies what matters.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Negative Capability",
    slug: "negative-capability",
    shortMeaning: "The capacity of humans to exist in uncertainties, mysteries, and doubts without irritable reaching for fact.",
    personalNote: "Resist the urge to prematurely resolve ambiguity into false certainty. Sit with the unknown.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence", "Creativity & Paradox"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Optionality",
    slug: "optionality",
    shortMeaning: "Holding the right, but not the obligation, to take action as favorable conditions emerge.",
    personalNote: "Preserve options when uncertainty is high; take decisive concentrated bets when asymmetry is undeniable.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence", "Systems & Strategy"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Stoicism",
    slug: "stoicism",
    shortMeaning: "The Hellenistic philosophy emphasizing virtue, reason, and emotional sovereignty over external events.",
    personalNote: "Control what is within your volition; accept with dignity what lies outside it.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Time",
    slug: "time",
    shortMeaning: "The irreversible, precious continuum in which all existence and action unfold.",
    personalNote: "Time is our only truly non-renewable asset. Spend it on what echoes beyond your lifetime.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Transience",
    slug: "transience",
    shortMeaning: "The brief, passing character of moments, emotions, and worldly seasons.",
    personalNote: "Because it is transient, this fleeting moment is precious.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Meaning",
    slug: "meaning",
    shortMeaning: "The profound significance, coherence, and value we distill from our existence.",
    personalNote: "Meaning is not found sitting under a rock; it is forged through voluntary responsibility and care.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Presence",
    slug: "presence",
    shortMeaning: "Complete, undistracted absorption in the immediacy of the present moment.",
    personalNote: "Yesterday is memory; tomorrow is imagination. All life happens solely in the present breath.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Stillness",
    slug: "stillness",
    shortMeaning: "Inner quietude and mental calm amidst external velocity and noise.",
    personalNote: "In deep stillness, the sediment settles and the water of the mind turns crystal clear.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Freedom",
    slug: "freedom",
    shortMeaning: "Sovereignty of spirit, autonomy of thought, and capacity for self-determined action.",
    personalNote: "True freedom is not doing whatever impulse demands, but mastery over one's own desires.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Awareness",
    slug: "awareness",
    shortMeaning: "Lucid, conscious perception of reality, self, and the environment.",
    personalNote: "Awareness is the space in which all thoughts, sensations, and systems appear.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Mortality",
    slug: "mortality",
    shortMeaning: "The finite condition of biological life that gives urgency and sacred weight to existence.",
    personalNote: "Without finitude, choices would carry no weight and love would have no urgency.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Legacy",
    slug: "legacy",
    shortMeaning: "The enduring imprint of virtue, artifacts, and wisdom left behind for posterity.",
    personalNote: "Plant trees under whose shade you know you may never sit.",
    category: "Philosophy & Existence",
    categories: ["Philosophy & Existence", "Ambition & Execution"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },

  // --- H. Systems, Strategy, and Long-Term Thinking ---
  {
    word: "Asymptotics",
    slug: "asymptotics",
    shortMeaning: "The behavior of a function or system as its inputs approach limits or infinity.",
    personalNote: "Focus on asymptotic trajectories rather than current constants. Direction beats velocity.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Bottleneck",
    slug: "bottleneck",
    shortMeaning: "The singular constraint in a system that limits its overall throughput.",
    personalNote: "Any optimization done away from the true bottleneck is an illusion (Theory of Constraints).",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Engineering & Technical"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Feedback Loop",
    slug: "feedback-loop",
    shortMeaning: "A system structure where output is routed back as input, either reinforcing or balancing.",
    personalNote: "Shorten feedback loops relentlessly. Fast feedback is how teams and algorithms learn.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Engineering & Technical"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Flywheel",
    slug: "flywheel",
    shortMeaning: "A self-reinforcing loop where each victory makes subsequent iterations more powerful.",
    personalNote: "Push the heavy flywheel. At first it barely budges; then its own mass carries it forward.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Ambition & Execution"],
    importance: 3,
    fontSize: "lg",
    animationStyle: "drift-slow"
  },
  {
    word: "Incentives",
    slug: "incentives",
    shortMeaning: "The underlying reward and penalty structures that drive behavior across all human systems.",
    personalNote: "Never attribute to malice what can be explained by poorly aligned incentives.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Invariants",
    slug: "invariants",
    shortMeaning: "Fundamental conditions or properties that remain strictly true throughout transformations.",
    personalNote: "Anchor on what will NOT change in 10 years rather than chasing what changes every month.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Pareto Principle",
    slug: "pareto-principle",
    shortMeaning: "The power-law distribution where 80% of consequences arise from 20% of causes.",
    personalNote: "Find the vital 20% of levers that deliver the lion's share of outcome and ruthless focus there.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "float-subtle"
  },
  {
    word: "Probability",
    slug: "probability",
    shortMeaning: "The quantitative likelihood of events occurring under conditions of uncertainty.",
    personalNote: "Think in bets and probabilistic distributions rather than binary certainties.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Intelligence & Curiosity"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Second-Order Thinking",
    slug: "second-order-thinking",
    shortMeaning: "Anticipating the unintended consequences of the consequences: 'And then what?'",
    personalNote: "First-order thinking is easy and crowded. Second and third-order thinking is where edge lives.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Intelligence & Curiosity"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Signal",
    slug: "signal",
    shortMeaning: "The meaningful, valuable information carried amidst overwhelming ambient noise.",
    personalNote: "Filter aggressively. Ninety-nine percent of what clamors for attention is worthless noise.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "drift-gentle"
  },
  {
    word: "Time Horizon",
    slug: "time-horizon",
    shortMeaning: "The expanse of time across which decisions, strategies, and consequences are evaluated.",
    personalNote: "Lengthen your time horizon. Long horizons turn zero-sum games into positive-sum cooperation.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Ambition & Execution"],
    importance: 3,
    fontSize: "xl",
    animationStyle: "drift-slow"
  },
  {
    word: "Opportunity Cost",
    slug: "opportunity-cost",
    shortMeaning: "The loss of potential gains from other alternatives when one alternative is chosen.",
    personalNote: "Every 'yes' is an implicit 'no' to a thousand other possibilities. Count the hidden cost.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Expected Value",
    slug: "expected-value",
    shortMeaning: "The probability-weighted average of all possible values of a random variable.",
    personalNote: "Make choices based on expected value over time, not emotional aversion to short-term variance.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy"],
    importance: 2,
    fontSize: "md",
    animationStyle: "float-subtle"
  },
  {
    word: "Risk",
    slug: "risk",
    shortMeaning: "Exposure to adverse variance or ruin; what remains after you thought of everything.",
    personalNote: "Take bold calculated risks where failure is survivable, but protect with your life against total ruin.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-gentle"
  },
  {
    word: "Robustness",
    slug: "robustness",
    shortMeaning: "The ability of a system to maintain its functions across varied, stressful conditions.",
    personalNote: "A robust design does not require a perfect world to function smoothly.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Engineering & Technical"],
    importance: 2,
    fontSize: "md",
    animationStyle: "drift-slow"
  },
  {
    word: "Emergent Behavior",
    slug: "emergent-behavior",
    shortMeaning: "Unplanned, novel behaviors arising at the macro scale from simple micro rules.",
    personalNote: "Design the initial incentives and boundaries with care; the emergent culture will take care of itself.",
    category: "Systems & Strategy",
    categories: ["Systems & Strategy", "Creativity & Paradox"],
    importance: 2,
    fontSize: "lg",
    animationStyle: "float-subtle"
  }
];

async function seed() {
  await client.connect();
  try {
    console.log(`Starting to seed ${WORDS_COLLECTION.length} words into core_lexiconword...`);
    let inserted = 0;
    let skipped = 0;

    for (let i = 0; i < WORDS_COLLECTION.length; i++) {
      const item = WORDS_COLLECTION[i];
      const check = await client.query('SELECT id FROM core_lexiconword WHERE slug = $1', [item.slug]);

      if (check.rows.length === 0) {
        await client.query(
          `INSERT INTO core_lexiconword (
            word, slug, "shortMeaning", "personalNote", category, categories,
            importance, "fontSize", "animationStyle", "isPublished", "sortOrder"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, $10)`,
          [
            item.word,
            item.slug,
            item.shortMeaning,
            item.personalNote,
            item.category,
            item.categories,
            item.importance,
            item.fontSize,
            item.animationStyle,
            i
          ]
        );
        inserted++;
      } else {
        skipped++;
      }
    }

    console.log(`Seeding complete. Inserted: ${inserted}, Skipped (already customized/present): ${skipped}`);
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
