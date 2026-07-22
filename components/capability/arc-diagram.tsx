import { skillById, skillGroups } from "@/data/skills";
import type { Skill } from "@/lib/types";

/**
 * Capability arc — a schematic, not an infographic.
 *
 * The argument the drawing makes, read bottom-up:
 *   ENGINEERING + CLOUD  is the substrate everything stands on
 *   OFFENSIVE SECURITY   is the base he started from
 *   GRC  +  AI SECURITY  are the two directions that base feeds into
 *
 * Everything rendered here resolves out of `data/skills.ts` at module scope —
 * no skill name is written twice. Pure server component: no state, no client
 * hooks, deterministic markup.
 *
 * Two variants, switched with CSS only (no hydration, no measurement):
 *   ≥768px  the full two-dimensional flow SVG
 *   <768px  a stacked schematic in real HTML, so labels never scale below 12px
 */

/* ---------------------------------------------------------------- data ---- */

const groupById = new Map(skillGroups.map((group) => [group.id, group]));

interface ResolvedGroup {
  title: string;
  skills: Skill[];
}

function resolveGroup(groupId: string): ResolvedGroup | null {
  const group = groupById.get(groupId);
  if (!group) return null;

  const resolved: Skill[] = [];
  for (const id of group.skillIds) {
    const skill: Skill | undefined = skillById.get(id);
    if (!skill) continue;
    resolved.push(skill);
  }
  if (resolved.length === 0) return null;

  return { title: group.title, skills: resolved };
}

const offensive = resolveGroup("grp-offensive");
const grc = resolveGroup("grp-grc");
const ai = resolveGroup("grp-ai");
const cloud = resolveGroup("grp-cloud");
const engineering = resolveGroup("grp-engineering");
const tooling = resolveGroup("grp-tooling");

const TITLE_ID = "capability-arc-title";
const ARC_DESCRIPTION =
  "Capability arc: offensive security is the base, and it feeds upward into two directions — GRC and AI security. All three stand on a substrate of software engineering and cloud infrastructure.";

/* ------------------------------------------------------------ svg parts ---- */

const HAIRLINE = 1;
const LABEL_SIZE = 12;
const NAME_SIZE = 14;
const NOTE_SIZE = 12;
const STRETCH = "82%";

interface PanelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  group: ResolvedGroup;
  /** Draw the frame in the redline accent — reserved for the base node. */
  emphasis?: boolean;
  /** Offensive rows carry their proficiency note on a second line. */
  withNotes?: boolean;
}

function SvgPanel({
  x,
  y,
  width,
  height,
  group,
  emphasis = false,
  withNotes = false,
}: PanelProps) {
  const padX = 16;
  const step = withNotes ? 38 : 22;
  const firstBaseline = withNotes ? 56 : 54;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={2}
        fill="none"
        stroke={emphasis ? "var(--accent)" : "var(--ink-dim)"}
        strokeWidth={emphasis ? 1.25 : HAIRLINE}
      />
      <text
        x={x + padX}
        y={y + 22}
        fill="var(--ink-dim)"
        fontSize={LABEL_SIZE}
        fontWeight={500}
        fontStretch={STRETCH}
        letterSpacing="0.02em"
      >
        {group.title}
      </text>
      <line
        x1={x}
        y1={y + 32}
        x2={x + width}
        y2={y + 32}
        stroke="var(--ink-dim)"
        strokeWidth={HAIRLINE}
      />
      {group.skills.map((skill, index) => {
        const baseline = y + firstBaseline + index * step;
        return (
          <g key={skill.id}>
            <text
              x={x + padX}
              y={baseline}
              fill="var(--ink)"
              fontSize={NAME_SIZE}
              fontWeight={500}
              fontStretch={STRETCH}
            >
              {skill.name}
            </text>
            {withNotes && skill.proficiencyNote ? (
              <text
                x={x + padX}
                y={baseline + 16}
                fill="var(--ink-muted)"
                fontSize={NOTE_SIZE}
                fontWeight={500}
                fontStretch={STRETCH}
              >
                {skill.proficiencyNote}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

interface ColumnProps {
  x: number;
  y: number;
  group: ResolvedGroup;
  /** Wrap into two columns after this many rows. */
  rowsPerColumn: number;
  columnGap: number;
}

/** A titled column inside the substrate band (shares the band's header rule). */
function SvgSubstrateColumn({
  x,
  y,
  group,
  rowsPerColumn,
  columnGap,
}: ColumnProps) {
  return (
    <g>
      <text
        x={x}
        y={y + 22}
        fill="var(--ink-dim)"
        fontSize={LABEL_SIZE}
        fontWeight={500}
        fontStretch={STRETCH}
        letterSpacing="0.02em"
      >
        {group.title}
      </text>
      {group.skills.map((skill, index) => (
        <text
          key={skill.id}
          x={x + Math.floor(index / rowsPerColumn) * columnGap}
          y={y + 54 + (index % rowsPerColumn) * 22}
          fill="var(--ink)"
          fontSize={NAME_SIZE}
          fontWeight={500}
          fontStretch={STRETCH}
        >
          {skill.name}
        </text>
      ))}
    </g>
  );
}

/* --------------------------------------------------------- html (small) ---- */

const inkDimRule = { borderColor: "var(--ink-dim)" } as const;

function HtmlPanel({
  group,
  emphasis = false,
  withNotes = false,
}: {
  group: ResolvedGroup;
  emphasis?: boolean;
  withNotes?: boolean;
}) {
  return (
    <div
      className="rounded-[2px] border px-4 pt-3 pb-4"
      style={{
        borderColor: emphasis ? "var(--accent)" : "var(--ink-dim)",
        borderWidth: emphasis ? 1.25 : 1,
      }}
    >
      <p
        className="text-[12px] font-medium tracking-[0.02em]"
        style={{ color: "var(--ink-dim)", fontStretch: "82%" }}
      >
        {group.title}
      </p>
      <div className="mt-2 border-t pt-2" style={inkDimRule} />
      <ul className="space-y-1.5">
        {group.skills.map((skill) => (
          <li key={skill.id}>
            <span
              className="block text-[14px] leading-snug font-medium"
              style={{ color: "var(--ink)", fontStretch: "82%" }}
            >
              {skill.name}
            </span>
            {withNotes && skill.proficiencyNote ? (
              <span
                className="block text-[12px] leading-snug font-medium"
                style={{ color: "var(--ink-muted)", fontStretch: "82%" }}
              >
                {skill.proficiencyNote}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Vertical connector between stacked blocks. Decorative — labelled in text. */
function HtmlConnector({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) {
  const color = accent ? "var(--accent)" : "var(--ink-dim)";
  return (
    <div className="flex items-center gap-3 py-2 pl-4">
      <svg
        width="10"
        height="26"
        viewBox="0 0 10 26"
        aria-hidden="true"
        focusable="false"
      >
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="20"
          stroke={color}
          strokeWidth={accent ? 1.25 : 1}
        />
        {accent ? (
          <path d="M1,19 L5,25 L9,19 Z" fill={color} />
        ) : (
          <line x1="0" y1="24" x2="10" y2="24" stroke={color} strokeWidth={1} />
        )}
      </svg>
      <span
        className="text-[12px] font-medium tracking-[0.02em]"
        style={{ color, fontStretch: "82%" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ----------------------------------------------------------- component ---- */

export function CapabilityArcDiagram() {
  if (!offensive || !grc || !ai || !cloud || !engineering || !tooling) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* ≥768px — full two-dimensional flow */}
      <svg
        className="hidden h-auto w-full md:block"
        viewBox="0 0 700 758"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={TITLE_ID}
        fontFamily="var(--font-archivo)"
      >
        <title id={TITLE_ID}>{ARC_DESCRIPTION}</title>

        <defs>
          <marker
            id="capability-arc-head"
            markerUnits="userSpaceOnUse"
            markerWidth="7"
            markerHeight="7"
            refX="5.5"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--accent)" />
          </marker>
        </defs>

        {/* two directions he's heading */}
        <SvgPanel x={12} y={10} width={332} height={182} group={grc} />
        <SvgPanel x={356} y={10} width={332} height={182} group={ai} />

        {/* the flow: base forks up into both branches */}
        <g
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          strokeLinecap="square"
        >
          <path
            d="M350 272 V 234 H 178 V 196"
            markerEnd="url(#capability-arc-head)"
          />
          <path
            d="M350 272 V 234 H 522 V 196"
            markerEnd="url(#capability-arc-head)"
          />
        </g>
        <text
          x={360}
          y={262}
          fill="var(--accent)"
          fontSize={LABEL_SIZE}
          fontWeight={500}
          fontStretch={STRETCH}
          letterSpacing="0.04em"
        >
          feeds into
        </text>

        {/* the base */}
        <SvgPanel
          x={70}
          y={272}
          width={560}
          height={240}
          group={offensive}
          emphasis
          withNotes
        />

        {/* instrumentation, attached to the base */}
        <g>
          <rect
            x={70}
            y={524}
            width={560}
            height={58}
            rx={2}
            fill="none"
            stroke="var(--ink-dim)"
            strokeWidth={HAIRLINE}
          />
          <text
            x={86}
            y={544}
            fill="var(--ink-dim)"
            fontSize={LABEL_SIZE}
            fontWeight={500}
            fontStretch={STRETCH}
            letterSpacing="0.02em"
          >
            {tooling.title}
          </text>
          <text
            x={86}
            y={568}
            fill="var(--ink)"
            fontSize={NAME_SIZE}
            fontWeight={500}
            fontStretch={STRETCH}
          >
            {tooling.skills.map((skill, index) => (
              <tspan key={skill.id}>
                {index > 0 ? (
                  <tspan fill="var(--ink-dim)">{"  /  "}</tspan>
                ) : null}
                {skill.name}
              </tspan>
            ))}
          </text>
        </g>

        {/* support ticks + caption: everything above rests on the substrate */}
        <g stroke="var(--ink-dim)" strokeWidth={HAIRLINE}>
          <line x1={120} y1={610} x2={120} y2={590} />
          <line x1={580} y1={610} x2={580} y2={590} />
        </g>
        <text
          x={350}
          y={602}
          textAnchor="middle"
          fill="var(--ink-muted)"
          fontSize={LABEL_SIZE}
          fontWeight={500}
          fontStretch={STRETCH}
          letterSpacing="0.02em"
        >
          all three stand on
        </text>

        {/* the substrate */}
        <g>
          <rect
            x={12}
            y={610}
            width={676}
            height={138}
            rx={2}
            fill="none"
            stroke="var(--ink-dim)"
            strokeWidth={HAIRLINE}
          />
          <line
            x1={12}
            y1={642}
            x2={688}
            y2={642}
            stroke="var(--ink-dim)"
            strokeWidth={HAIRLINE}
          />
          <line
            x1={452}
            y1={610}
            x2={452}
            y2={748}
            stroke="var(--ink-dim)"
            strokeWidth={HAIRLINE}
          />
          <SvgSubstrateColumn
            x={28}
            y={610}
            group={engineering}
            rowsPerColumn={4}
            columnGap={218}
          />
          <SvgSubstrateColumn
            x={468}
            y={610}
            group={cloud}
            rowsPerColumn={3}
            columnGap={0}
          />
        </g>
      </svg>

      {/* <768px — same argument, stacked so nothing shrinks below 12px */}
      <div className="md:hidden">
        <p className="sr-only">{ARC_DESCRIPTION}</p>
        <HtmlPanel group={offensive} emphasis withNotes />
        <div className="pt-3">
          <HtmlPanel group={tooling} />
        </div>
        <HtmlConnector label="feeds into" accent />
        <HtmlPanel group={grc} />
        <div className="pt-3">
          <HtmlPanel group={ai} />
        </div>
        <HtmlConnector label="all three stand on" />
        <HtmlPanel group={engineering} />
        <div className="pt-3">
          <HtmlPanel group={cloud} />
        </div>
      </div>
    </div>
  );
}
