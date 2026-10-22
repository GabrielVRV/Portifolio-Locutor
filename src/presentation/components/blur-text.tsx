"use client";

import { type ElementType, Fragment, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";

interface BlurTextProps {
  readonly text: string;
  /** Reveal word by word or letter by letter. */
  readonly by?: "words" | "letters";
  /** Milliseconds between segments. */
  readonly stagger?: number;
  /** Milliseconds before the first segment. */
  readonly delay?: number;
  readonly as?: ElementType;
  readonly id?: string;
  /** Hide from assistive technology, when the parent already provides the text. */
  readonly decorative?: boolean;
  readonly className?: string;
}

/**
 * Reveals text segment by segment, from blurred to sharp, once it scrolls into
 * view. Screen readers get the plain text; the animated copy is decorative.
 * Static under `prefers-reduced-motion` (see `.blur-text` in globals.css).
 */
export function BlurText({
  text,
  by = "words",
  stagger = 60,
  delay = 0,
  as: Tag = "p",
  id,
  decorative = false,
  className,
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const words = splitIntoWords(text, by);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn("blur-text", className)}
      data-visible={visible}
      aria-hidden={decorative || undefined}
    >
      {!decorative && <span className="sr-only">{text}</span>}
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            {wordIndex > 0 && " "}
            {/* Words never break apart, even when animated letter by letter. */}
            <span className="inline-block whitespace-nowrap">
              {word.map(({ segment, order }) => (
                <span
                  key={order}
                  className="blur-text-segment inline-block whitespace-pre"
                  style={{ transitionDelay: `${delay + order * stagger}ms` }}
                >
                  {segment}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

interface Segment {
  readonly segment: string;
  /** Position in the reveal sequence. */
  readonly order: number;
}

function splitIntoWords(text: string, by: "words" | "letters"): Segment[][] {
  let order = 0;
  return text.split(" ").map((word) =>
    (by === "letters" ? Array.from(word) : [word]).map((segment) => ({
      segment,
      order: order++,
    })),
  );
}
