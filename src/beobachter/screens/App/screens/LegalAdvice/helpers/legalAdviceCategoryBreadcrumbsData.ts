import { breadcrumbItems } from '../constants';
import { LegalAdviceCategory } from '../typings';

function prepareBreadcrumbItems(category: LegalAdviceCategory) {
  const categoryItems = JSON.parse(JSON.stringify(breadcrumbItems));
  const categoryBreadcrumb: any = [{ node: { label: category.title } }];
  let tempCategory = category.parent;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  while (tempCategory?.level > 0) {
    categoryBreadcrumb.push({
      node: {
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        label: tempCategory.title,
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        link: tempCategory.path,
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        id: tempCategory.level + 1,
      },
    });
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    tempCategory = tempCategory.parent;
  }
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  categoryBreadcrumb.reverse().forEach((item) => {
    categoryItems.edges.push(item);
  });

  return categoryItems;
}

export function legalAdviceCategoryBreadcrumbsData(data: any): any {
  if (data?.legalAdvice?.args?.query) {
    data.breadcrumbsData = {
      activeMenuTrail: breadcrumbItems,
      title: 'Suche',
    };
  } else {
    const category = data?.legalAdvice?.category;
    if (category?.level > 0) {
      data.breadcrumbsData = {
        activeMenuTrail: prepareBreadcrumbItems(category),
      };
    }
  }
}
