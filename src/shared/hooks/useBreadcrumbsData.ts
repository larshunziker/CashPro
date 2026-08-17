import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { resetHeaderBreadcrumbsData, setHeaderData } from '../actions/header';
import { BreadcrumbsItems } from '../../common/components/Breadcrumbs/typings';

export type useBreadcrumbDataProps = {
  label?: string;
  link?: string;
  preferredUri?: string;
  title?: string;
  activeMenuTrail?: BreadcrumbsItems;
};

export function useBreadcrumbsData(props: useBreadcrumbDataProps) {
  const dispatch = useDispatch();

  const breadcrumbItems = useMemo(() => {
    let tempBreadcrumbItems = props?.activeMenuTrail;
    if (!tempBreadcrumbItems && props?.label) {
      tempBreadcrumbItems = {
        edges: [{ node: { link: props.link, label: props.label } }],
      };
    }
    if (tempBreadcrumbItems) {
      if (props.title) {
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        tempBreadcrumbItems.edges.push({
          node: { link: null, label: props.title },
        });
      }
      tempBreadcrumbItems.timestamp = new Date().getTime();
    }
    return tempBreadcrumbItems;
  }, [props]);

  dispatch(
    setHeaderData({
      breadcrumbsData: breadcrumbItems,
    }),
  );
  useEffect(() => {
    return () => {
      dispatch(
        resetHeaderBreadcrumbsData({ breadcrumbsData: breadcrumbItems }),
      );
    };
  }, [dispatch, breadcrumbItems]);
}
