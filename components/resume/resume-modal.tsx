"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

/**
 * Resume selection modal. Triggered by Resume button in Hero section.
 * Allows user to choose between Software Developer or Cybersecurity/GRC resume.
 */
export function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <>
      {/* Resume Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="link-underline text-[0.9rem] font-medium"
      >
        Resume
      </button>

      {/* Modal Backdrop + Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-md rounded-lg bg-paper p-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="resume-dialog-title"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 rounded p-1 transition-colors hover:bg-ink-muted"
              aria-label="Close dialog"
            >
              <X size={20} className="text-ink" />
            </button>

            {/* Title */}
            <h2
              id="resume-dialog-title"
              className="type-plate mb-6 pr-8 text-ink"
            >
              Download Resume
            </h2>

            {/* Description */}
            <p className="type-body mb-8 text-ink-muted">
              Choose the resume that best fits the role you&apos;re applying
              for.
            </p>

            {/* Download Options */}
            <div className="flex flex-col gap-3">
              <a
                href="/resumes/resume-software-developer.pdf"
                download="Hem-Gabhawala-Resume-Software-Developer.pdf"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded bg-ink px-6 py-3 text-[0.9rem] font-medium text-paper transition-colors hover:bg-accent motion-reduce:transition-none"
              >
                <Download size={16} />
                Software Developer
              </a>

              <a
                href="/resumes/resume-cybersecurity-grc.pdf"
                download="Hem-Gabhawala-Resume-Cybersecurity-GRC.pdf"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded border border-ink bg-paper px-6 py-3 text-[0.9rem] font-medium text-ink transition-colors hover:bg-ink-muted motion-reduce:transition-none"
              >
                <Download size={16} />
                Cybersecurity / GRC
              </a>
            </div>

            {/* Close hint (optional) */}
            <p className="type-data mt-6 text-center text-ink-dim">
              Press Esc or click outside to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
