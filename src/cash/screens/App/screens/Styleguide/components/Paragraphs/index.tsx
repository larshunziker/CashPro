/* istanbul ignore file */

// 🚨 AUTO-GENERATED FILE! DO NOT UPDATE MANUALLY - PARAGRAPHS 🚨
// ✅ use 'yarn styleguide --app cash' instead
// @ts-nocheck
import React, { ReactElement } from 'react';
import TextParagraph from '../../../../components/Paragraphs/components/TextParagraph';
import WebformParagraph from '../../../../components/Paragraphs/components/WebformParagraph';
import textParagraphMockData from '../../../../../../../common/components/Paragraphs/components/TextParagraph/__tests__/mockData.json';
import webformParagraphMockData from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/__tests__/mockData.json';

const StyleguildeParagraphs = (): ReactElement => {
  return (
    <>
      <h2 className="component-TextParagraph">TextParagraph</h2>
      <div className="component-TextParagraph">
        <TextParagraph {...textParagraphMockData} />
      </div>
      <h2 className="component-WebformParagraph">WebformParagraph</h2>
      <div className="component-WebformParagraph">
        <WebformParagraph {...webformParagraphMockData} />
      </div>
    </>
  );
};

export default StyleguildeParagraphs;
