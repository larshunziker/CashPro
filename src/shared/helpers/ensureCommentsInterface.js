/**
 * @file   ensure comments interface helper function
 * @author Andrea Reber <andrea.reber@ringieraxelspringer.ch>
 * @date   2019-05-19
 *
 */

const ensureCommentsInterface = (nodes) => {
  if (!nodes || typeof nodes !== 'object' || nodes.length < 1) {
    return nodes;
  }

  // ensure that all required fields are present
  return nodes.map((item) => ({
    body: item.node && item.node.body ? item.node.body : '',
    commentReplies:
      item.node && item.node.commentReplies ? item.node.commentReplies : null,
    createDate: item.node && item.node.createDate ? item.node.createDate : '',
    id: item.node && item.node.id ? item.node.id : '',
    name: (item.node && item.node?.displayName) || item.node?.name || '',
  }));
};

export default ensureCommentsInterface;
