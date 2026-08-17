import React, { ReactElement } from 'react';
import Icon from '../Icon';
import styles from './styles.legacy.css';
import {
  ArticleAttachmentFactoryStyles,
  ArticleAttachmentProps,
  ArticleFactoryOptions,
  AttachmentProps,
} from './typings';

/* istanbul ignore file */

export type ArticleAttachmentPropsInner = ArticleAttachmentProps;

const defaultStyles: ArticleAttachmentFactoryStyles = {
  Wrapper: '',
  AttachmentHeading: '',
  AttachmentElement: '',
  AttachmentIcon: '',
  AttachmentText: '',
};

const ArticleAttachmentFactory = ({
  styles = defaultStyles,
  Icon,
}: ArticleFactoryOptions) => {
  const Attachment = ({
    attachment,
    attachmentBoxTitle,
  }: ArticleAttachmentPropsInner): ReactElement | null => {
    if (!attachment || !attachment.source) return null;

    return (
      <div className={styles.Wrapper}>
        {attachmentBoxTitle && (
          <h3 className={styles.AttachmentHeading}>{attachmentBoxTitle}</h3>
        )}
        <div className={styles.AttachmentElement}>
          <Icon
            addClass={styles.AttachmentIcon}
            type={getIconType(attachment)}
          />
          <a
            className={styles.AttachmentText}
            href={attachment.source}
            target="_blank"
          >
            {attachment.filename || attachment.source}
          </a>
        </div>
      </div>
    );
  };

  return Attachment;
};

function getIconType(attachment: AttachmentProps) {
  let fileType = attachment.mimeType;

  if (!fileType && typeof attachment.source === 'string') {
    fileType = attachment.source.split('.').pop();
  }

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  if (['application/pdf', 'pdf'].includes(fileType)) {
    return 'IconFilePdf';
  }

  if (
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    ['application/doc', 'application/docx', 'doc', 'docx'].includes(fileType)
  ) {
    return 'IconFileWord';
  }

  if (
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    ['application/xls', 'application/xlsx', 'xls', 'xlsx'].includes(fileType)
  ) {
    return 'IconFileExcel';
  }

  return 'IconFile';
}

const ArticleAttachment = ArticleAttachmentFactory({
  styles: {
    Wrapper: styles.Wrapper,
    AttachmentHeading: styles.AttachmentHeading,
    AttachmentElement: styles.AttachmentElement,
    AttachmentIcon: styles.AttachmentIcon,
    AttachmentText: styles.AttachmentText,
  },
  Icon,
});

export default ArticleAttachment;
