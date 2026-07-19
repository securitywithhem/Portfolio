import { Bug, Code2, Network, Server, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TechBadge } from "@/components/shared/tech-badge";
import type { SkillCategory } from "@/lib/types";

/**
 * One domain of competencies. Reuses the shadcn `Card` primitive rather
 * than the `.glass` utility — per DESIGN_SYSTEM.md, `.glass` is reserved
 * for floating surfaces (navbar, overlays), not general content cards, so
 * a "glass card" here would violate that rule rather than extend it.
 *
 * Category icon is decorative (`aria-hidden`) — the `h3` title is the only
 * signifier of what the category is, so there's no icon-only meaning gap.
 */

const CATEGORY_ICON: Record<string, React.ElementType> = {
  "penetration-testing": Bug,
  "network-security": Network,
  "programming-scripting": Code2,
  "security-operations": ShieldCheck,
  systems: Server,
};

export function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const Icon = CATEGORY_ICON[category.id] ?? ShieldCheck;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Icon aria-hidden className="size-4" />
        </span>
        <h3 className="text-lg leading-none font-semibold tracking-tight">
          {category.title}
        </h3>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-wrap gap-2">
          {category.items.map((item) => (
            <TechBadge key={item.name} label={item.name} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
