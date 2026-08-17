import crypto from 'crypto';

/**
 * Create a ETag based on content string
 * @param {*} content rendered content
 */
export default (content: string) => {
  const shasum = crypto.createHash('sha1');
  shasum.update(content);
  return shasum.digest('hex');
};
