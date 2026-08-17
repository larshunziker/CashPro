import React from 'react';
import PianoTemplateParagraphCommon from '../../../../../../../common/components/Paragraphs/components/PianoTemplateParagraph';
import AboOverview from './components/AboOverview';
import { ABO_DATA } from './components/AboOverview/constants';

/* @ts-ignore TODO: TS7031 ->  Binding element 'pianoTemplateParagraph' implicitly has an 'any' type. */
const PianoTemplateParagraph = ({ pianoTemplateParagraph }) => {
  const { id, templateId } = pianoTemplateParagraph;

  if (templateId === 'OTJELO1N4V4Q' || templateId === 'OT9CCUAIW770') {
    return <AboOverview {...ABO_DATA} id={id} />;
  }

  return (
    <PianoTemplateParagraphCommon
      pianoTemplateParagraph={pianoTemplateParagraph}
    />
  );
};

export default PianoTemplateParagraph;
