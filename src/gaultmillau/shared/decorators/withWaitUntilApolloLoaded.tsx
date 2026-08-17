/**
 * @file   only render component when loading === false
 * @author Steven Wolf <steven.wolf@ringieraxelspringer.ch>
 * @date   2017-03-23
 *
 */

/* istanbul ignore file */

/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/withWaitUntilApolloLoadedFactory'. '/Users/bhs */
import withWaitUntilApolloLoadedFactory from '../../../shared/decorators/withWaitUntilApolloLoadedFactory';
import selectLocationState from '../../../shared/selectors/locationStateSelector';

export default withWaitUntilApolloLoadedFactory({ selectLocationState });
