import { PIANO_PLACEHOLDER_PARAGRAPH } from '../../../screens/App/components/Paragraphs/constants';
import {
  EmbedParagraph,
  PIANO_PLACEHOLDER_EMBED_ID,
  replaceEmbedWithPianoPlaceholder,
  resolveEmbedContainerAnchorId,
  SectionParagraph,
  TextParagraph,
} from '../replaceEmbedWithPianoPlaceholder';

describe('replaceEmbedWithPianoPlaceholder', () => {
  it('appends piano placeholder div to EmbedParagraph with valid data-rid-id', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: '<div class="riddle2-wrapper" data-rid-id="test123"></div>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: 'test123',
        embedCode: `<div class="riddle2-wrapper" data-rid-id="test123"></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('appends piano placeholder div to EmbedParagraph with data-video-id', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: '<div class="video-player" data-video-id="vid-42"></div>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: 'vid-42',
        embedCode: `<div class="video-player" data-video-id="vid-42"></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('appends piano placeholder div for iframe src with videoId query (any host)', () => {
    const playerSrc =
      'https://players.brightcove.net/2112711546001/EDxfN97jV_default/index.html?videoId=6388427946112';
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: `<iframe src="${playerSrc}" allowfullscreen></iframe>`,
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: '6388427946112',
        embedCode: `<iframe src="${playerSrc}" allowfullscreen></iframe><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('matches videoId on iframe src for a non-Brightcove URL', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode:
          '<iframe src="https://example.com/player?foo=1&videoId=42"></iframe>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: '42',
        embedCode: `<iframe src="https://example.com/player?foo=1&videoId=42"></iframe><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('prefers data-rid-id over iframe src videoId when both appear in embedCode', () => {
    const playerSrc =
      'https://players.brightcove.net/2112711546001/default/index.html?videoId=999';
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: `<div data-rid-id="rid-1"></div><iframe src="${playerSrc}"></iframe>`,
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: 'rid-1',
        embedCode: `<div data-rid-id="rid-1"></div><iframe src="${playerSrc}"></iframe><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('prefers data-video-id over iframe src videoId when both appear in embedCode', () => {
    const playerSrc =
      'https://players.brightcove.net/2112711546001/default/index.html?videoId=999';
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: `<div data-video-id="vid-attr"></div><iframe src="${playerSrc}"></iframe>`,
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: 'vid-attr',
        embedCode: `<div data-video-id="vid-attr"></div><iframe src="${playerSrc}"></iframe><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('uses HTML id attribute on embed when no stronger id pattern matches', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode:
          '<iframe src="https://example.com" id="player-embed-x"></iframe>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: 'player-embed-x',
        embedCode: `<iframe src="https://example.com" id="player-embed-x"></iframe><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('uses paragraph anchorId when embedCode has no data-rid-id or data-video-id', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        anchorId: 'embed-paragraph-uuid-1',
        embedCode: '<iframe src="https://example.com"></iframe>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        anchorId: 'embed-paragraph-uuid-1',
        pianoPlaceholderId: 'embed-paragraph-uuid-1',
        embedCode: `<iframe src="https://example.com"></iframe><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('prefers data-rid-id in embedCode over anchorId', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        id: 'embed-paragraph-uuid-1',
        embedCode: '<div data-rid-id="rid-from-embed"></div>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        id: 'embed-paragraph-uuid-1',
        pianoPlaceholderId: 'rid-from-embed',
        embedCode: `<div data-rid-id="rid-from-embed"></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('prefers data-video-id in embedCode over anchorId', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        id: 'embed-paragraph-uuid-1',
        embedCode: '<div data-video-id="vid-from-embed"></div>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        id: 'embed-paragraph-uuid-1',
        pianoPlaceholderId: 'vid-from-embed',
        embedCode: `<div data-video-id="vid-from-embed"></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('prefers data-rid-id over data-video-id when both are present', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: '<div data-rid-id="rid-1" data-video-id="vid-9"></div>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: 'rid-1',
        embedCode: `<div data-rid-id="rid-1" data-video-id="vid-9"></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('matches data-rid-id on a nested element inside embed HTML', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode:
          '<div class="outer"><span data-rid-id="inner-rid"></span></div>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: PIANO_PLACEHOLDER_PARAGRAPH,
        pianoPlaceholderId: 'inner-rid',
        embedCode: `<div class="outer"><span data-rid-id="inner-rid"></span></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ]);
  });

  it('does not replace EmbedParagraph without embed id match (patterns) or anchorId', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: '<div class="riddle2-wrapper"></div>',
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual(input);
  });

  it('does not replace non-EmbedParagraph types', () => {
    const input: TextParagraph[] = [
      { __typename: 'TextParagraph', text: 'Hello' },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual(input);
  });

  it('recursively appends placeholder div to EmbedParagraphs in SectionParagraphs', () => {
    const input: SectionParagraph[] = [
      {
        __typename: 'SectionParagraph',
        body: [
          {
            __typename: 'EmbedParagraph',
            embedCode: '<div data-rid-id="nestedId"></div>',
          },
          { __typename: 'TextParagraph', text: 'World' },
        ],
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: 'SectionParagraph',
        body: [
          {
            __typename: PIANO_PLACEHOLDER_PARAGRAPH,
            pianoPlaceholderId: 'nestedId',
            embedCode: `<div data-rid-id="nestedId"></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
          },
          { __typename: 'TextParagraph', text: 'World' },
        ],
      },
    ]);
  });

  it('recursively replaces EmbedParagraph with data-video-id inside SectionParagraph', () => {
    const input: SectionParagraph[] = [
      {
        __typename: 'SectionParagraph',
        body: [
          {
            __typename: 'EmbedParagraph',
            embedCode: '<div data-video-id="nested-video"></div>',
          },
        ],
      },
    ];
    const result = replaceEmbedWithPianoPlaceholder(input);
    expect(result).toEqual([
      {
        __typename: 'SectionParagraph',
        body: [
          {
            __typename: PIANO_PLACEHOLDER_PARAGRAPH,
            pianoPlaceholderId: 'nested-video',
            embedCode: `<div data-video-id="nested-video"></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
          },
        ],
      },
    ]);
  });

  it('handles empty array', () => {
    expect(replaceEmbedWithPianoPlaceholder([])).toEqual([]);
  });

  it('is idempotent when applied twice', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: '<div class="riddle2-wrapper" data-rid-id="dup-test"></div>',
      },
    ];
    const once = replaceEmbedWithPianoPlaceholder(input);
    const twice = replaceEmbedWithPianoPlaceholder(once);
    expect(twice).toEqual(once);
  });

  it('does not modify EmbedParagraph whose embedCode already includes the placeholder sentinel', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: `<div data-rid-id="x"></div><div id="${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ];
    expect(replaceEmbedWithPianoPlaceholder(input)).toEqual(input);
  });

  it('does not append a second placeholder when sentinel uses single quotes', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: `<div data-rid-id="x"></div><div id='${PIANO_PLACEHOLDER_EMBED_ID}'></div>`,
      },
    ];
    expect(replaceEmbedWithPianoPlaceholder(input)).toEqual(input);
  });

  it('does not append a second placeholder when sentinel id has extra whitespace', () => {
    const input: EmbedParagraph[] = [
      {
        __typename: 'EmbedParagraph',
        embedCode: `<div data-rid-id="x"></div><div id = "${PIANO_PLACEHOLDER_EMBED_ID}"></div>`,
      },
    ];
    expect(replaceEmbedWithPianoPlaceholder(input)).toEqual(input);
  });
});

describe('resolveEmbedContainerAnchorId', () => {
  it('prefers existing anchorId over pattern-derived ids', () => {
    expect(
      resolveEmbedContainerAnchorId({
        anchorId: 'cms-anchor',
        embedCode: '<div data-rid-id="rid-1"></div>',
        pianoPlaceholderId: 'rid-1',
      }),
    ).toBe('cms-anchor');
  });

  it('uses pattern-derived id when no anchorId is set', () => {
    expect(
      resolveEmbedContainerAnchorId({
        embedCode: '<div data-rid-id="rid-1"></div>',
        pianoPlaceholderId: 'rid-1',
      }),
    ).toBe('rid-1');
  });

  it('avoids duplicating an HTML id already present in embed markup', () => {
    expect(
      resolveEmbedContainerAnchorId({
        id: 'paragraph-uuid-1',
        embedCode: '<iframe id="player-embed-x"></iframe>',
        pianoPlaceholderId: 'player-embed-x',
      }),
    ).toBe('embed-paragraph-uuid-1');
  });

  it('falls back to paragraph id when embed has no resolvable target id', () => {
    expect(
      resolveEmbedContainerAnchorId({
        id: 'paragraph-uuid-2',
        embedCode: '<div class="generic-embed"></div>',
      }),
    ).toBe('paragraph-uuid-2');
  });
});
