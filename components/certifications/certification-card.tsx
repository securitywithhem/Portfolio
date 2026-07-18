import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Certificate } from "@/lib/types";

/**
 * One certification or achievement card. Server Component — everything is
 * renderable without client JS.
 *
 * Used by both Certifications and TryHackMe sections (same Card component,
 * passed in as-is without branching logic), so properties stay generic and
 * the issuer/date metadata handles both credential types identically.
 */
export function CertificationCard({ cert }: { cert: Certificate }) {
  const { title, issuer, date, credentialUrl } = cert;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <Card className="h-full py-4 sm:py-6">
      <CardHeader className="pb-3 sm:pb-4">
        <h3 className="text-base leading-snug font-semibold tracking-tight sm:text-lg">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          {issuer} • {formattedDate}
        </p>
      </CardHeader>

      {credentialUrl && (
        <CardContent className="pt-0">
          <Button asChild variant="ghost" size="sm">
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View credential for ${title} (opens in a new tab)`}
            >
              <ExternalLink aria-hidden className="size-3.5" />
              View credential
            </a>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
