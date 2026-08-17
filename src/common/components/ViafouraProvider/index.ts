import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { Auth0 } from '../Auth0Provider';

export function ViafouraProvider() {
  const location = useLocation();
  const screenReady = useSelector(locationStateSelector).screenReady;

  useEffect(() => {
    if (__VIAFOURA_DATE__) {
      global.vfQ = global.vfQ || [];
      global.vfQ.push(() => {
        global.vf.$subscribe('authentication', 'needed', async () => {
          global.vf.$publish('tray', 'close');
          Auth0.login();
        });
        global.vf.$subscribe('authentication', 'logout', () => {
          Auth0.logout();
        });

        // VIAFOURA EVENTS TRACKING
        // Comment submit
        global.vf.$subscribe('comment', 'created', () => {
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'submit_comment',
              comment_type: 'comment',
            },
          });
        });
        // Comment reply
        global.vf.$subscribe('comment-reply', 'posted', () => {
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'submit_comment',
              comment_type: 'comment_reply',
            },
          });
        });
        // Comment read
        global.vf.$subscribe('comments', 'read', () => {
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'show_comment_section',
            },
          });
        });
        // Comment engagement
        global.vf.$subscribe(
          'comments',
          'engage',
          (data: { commentCount?: number }) => {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'show_comment_section_with_comments',
                comment_section_visible_comments_count: data?.commentCount,
              },
            });
          },
        );
        // Comment sorted
        global.vf.$subscribe(
          'comments',
          'sorted',
          (sortOptionSelected: any) => {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'sort_comment_section',
                comment_section_sort_option: sortOptionSelected,
              },
            });
          },
        );
        // END VIAFOURA EVENTS TRACKING
      });
    }
  }, []);

  useEffect(() => {
    if (__VIAFOURA_DATE__ && screenReady) {
      if (global.vf?.context) {
        global.vf.context.reset();
      } else {
        global.vfQ.push(() => {
          global.vf?.context?.reset();
        });
      }
    }
  }, [location.pathname, screenReady]);

  return null;
}
