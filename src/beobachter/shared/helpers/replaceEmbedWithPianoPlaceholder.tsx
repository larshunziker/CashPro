import {
  EMBED_PARAGRAPH,
  SECTION_PARAGRAPH,
  TEXT_PARAGRAPH,
} from '../../../shared/constants/paragraphs';
import { PIANO_PLACEHOLDER_PARAGRAPH } from '../../screens/App/components/Paragraphs/constants';

/** Appended to embed HTML so Piano can target the container. */
export const PIANO_PLACEHOLDER_EMBED_ID = 'piano-placeholder-embed';

/** First match wins; do not reorder without checking tests and embed markup. */
const EMBED_TARGET_ID_PATTERNS = [
  /data-rid-id=["']([^"']+)["']/u, // Riddle, etc.
  /data-video-id=["']([^"']+)["']/u, // Video players with data attribute
  /\bsrc=["'][^"']*[?&]videoId=(\d+)/iu, // e.g. Brightcove iframe src
  /\bid=["']([^"']+)["']/iu, // generic HTML id (lowest priority)
] as const;

/** Extracts the first embed target id from markup (`EMBED_TARGET_ID_PATTERNS` order). */
export function extractEmbedTargetIdFromCode(
  embedCode: string,
): string | undefined {
  for (const pattern of EMBED_TARGET_ID_PATTERNS) {
    const embedTargetId = pattern.exec(embedCode)?.[1];
    if (embedTargetId) {
      return embedTargetId;
    }
  }
  return undefined;
}

function embedCodeHasHtmlId(embedCode: string, htmlId: string): boolean {
  const escapedHtmlId = htmlId.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  return new RegExp(
    `(?:^|[^\\w-])id\\s*=\\s*["']${escapedHtmlId}["']`,
    'u',
  ).test(embedCode);
}

type EmbedContainerAnchorSource = ParagraphBase & {
  embedCode?: string | null;
  pianoPlaceholderId?: string | null;
};

/**
 * Resolves the paragraph container anchor id for embeds.
 * Prefers existing `anchorId`, then pattern-derived ids, without duplicating ids
 * already present as HTML `id` attributes inside the embed markup.
 */
export function resolveEmbedContainerAnchorId(
  paragraph: EmbedContainerAnchorSource,
): string {
  if (paragraph.anchorId) {
    return paragraph.anchorId;
  }

  const embedCode = paragraph.embedCode ?? '';
  const fromEmbed =
    paragraph.pianoPlaceholderId ?? extractEmbedTargetIdFromCode(embedCode);

  if (fromEmbed) {
    if (embedCodeHasHtmlId(embedCode, fromEmbed)) {
      return paragraph.id ? `embed-${paragraph.id}` : `embed-${fromEmbed}`;
    }
    return fromEmbed;
  }

  return paragraph.id ?? '';
}

export type ParagraphBase = {
  id?: string | null;
  anchorId?: string | null;
};

export type EmbedParagraph = ParagraphBase & {
  __typename?: typeof EMBED_PARAGRAPH;
  embedCode: string;
};

export type SectionParagraph = ParagraphBase & {
  __typename?: typeof SECTION_PARAGRAPH;
  body: Array<Paragraph | null | undefined>;
};

export type PianoPlaceholderParagraph = Omit<EmbedParagraph, '__typename'> & {
  __typename?: typeof PIANO_PLACEHOLDER_PARAGRAPH;
  pianoPlaceholderId: string;
};

export type TextParagraph = ParagraphBase & {
  __typename?: typeof TEXT_PARAGRAPH;
  text?: string;
};

export type Paragraph =
  | EmbedParagraph
  | SectionParagraph
  | PianoPlaceholderParagraph
  | TextParagraph;

function transformEmbedForPianoPlaceholder(
  embedParagraph: EmbedParagraph,
): Paragraph {
  const { embedCode, anchorId: anchorIdFallback } = embedParagraph;
  if (embedCodeHasHtmlId(embedCode, PIANO_PLACEHOLDER_EMBED_ID)) {
    return embedParagraph;
  }
  let pianoPlaceholderId = extractEmbedTargetIdFromCode(embedCode);
  if (!pianoPlaceholderId && anchorIdFallback) {
    pianoPlaceholderId = anchorIdFallback;
  }
  if (!pianoPlaceholderId) {
    return embedParagraph;
  }
  return {
    ...embedParagraph,
    __typename: PIANO_PLACEHOLDER_PARAGRAPH,
    pianoPlaceholderId,
    embedCode: `${embedCode}<div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
  };
}

/**
 * Recursively maps embed paragraphs to Piano placeholders when an id can be resolved
 * (`EMBED_TARGET_ID_PATTERNS` order, else `anchorId`). No-op if already transformed or sentinel
 * present in `embedCode`. Returns a new tree.
 */

export function replaceEmbedWithPianoPlaceholder(
  body: (Paragraph | null | undefined)[],
): Paragraph[] {
  if (!Array.isArray(body)) return [];
  return body
    .filter((p): p is Paragraph => !!p)
    .map((paragraph): Paragraph => {
      if (
        paragraph.__typename === SECTION_PARAGRAPH &&
        Array.isArray(paragraph.body)
      ) {
        return {
          ...paragraph,
          body: replaceEmbedWithPianoPlaceholder(paragraph.body),
        };
      }
      if (paragraph.__typename === PIANO_PLACEHOLDER_PARAGRAPH) {
        return paragraph;
      }
      if (paragraph.__typename === EMBED_PARAGRAPH) {
        return transformEmbedForPianoPlaceholder(paragraph);
      }
      return paragraph;
    });
}
