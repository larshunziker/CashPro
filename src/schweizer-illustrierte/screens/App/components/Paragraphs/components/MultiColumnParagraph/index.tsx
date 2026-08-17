import multiColumnParagraphFactory from '../../../../../../../common/components/Paragraphs/components/MultiColumnParagraph/factory';
import Paragraphs from '../../../Paragraphs';
// @ts-ignore
import grid from '@grid.legacy.css';
// @ts-ignore
import sections from '@sections.legacy.css';
import { GetGridColsByProps } from '../../../../../../../common/components/Paragraphs/components/MultiColumnParagraph/typings';

const getGridColsByProps: GetGridColsByProps = ({ multiColumnParagraph }) => {
  return multiColumnParagraph?.style &&
    multiColumnParagraph.style.indexOf('three') !== -1
    ? grid.ColSm8
    : grid.ColSm12;
};

const MultiColumnParagraph = multiColumnParagraphFactory({
  styles: {
    Container: sections.Section,
    Row: grid.Row,
  },
  paragraphsRenderer: () => Paragraphs,
  getGridColsByProps,
});

export default MultiColumnParagraph;
