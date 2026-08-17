import { QueryResponse } from './typings';

const uniqueArray = (arrArg: Array<string>) =>
  arrArg.filter(
    (elem: string, pos: number, arr: Array<string>): boolean =>
      arr.indexOf(elem) === pos,
  );

const cleanData = (data: string[]): string[] => {
  return uniqueArray(data.filter((v) => !!v))
    .sort()
    .slice(0, 5);
};

export const fetchTerm = async (term: string): Promise<string[] | null> => {
  const query = `
    query {
      integration {
          jobsCH {
              autocompleteTerm(term: "${term}", limit: 10) {
                  terms {
                      name_display
                  }
              }
          }
      }
    }
 `;
  const resp = await postRequest(query);
  const result = resp?.data?.integration?.jobsCH?.autocompleteTerm?.terms;
  return result && result.length > 0
    ? cleanData(result.map((term) => term.name_display))
    : null;
};

export const fetchLocations = async (
  locations: string,
): Promise<string[] | null> => {
  const query = `
    query {
      integration {
          jobsCH {
              autocompleteLocation(location: "${locations}", limit: 10) {
                  query {
                      rows
                  }
                  result {
                      name {
                          de
                      }
                      short_name {
                          de
                      }
                      long_name {
                          de
                      }        
                  }
              }
          }
      }
    }
 `;
  const resp = await postRequest(query);
  const result = resp?.data?.integration?.jobsCH?.autocompleteLocation?.result;
  return result && result.length > 0
    ? cleanData(
        result.map(
          (location) =>
            location.name?.de ||
            location.short_name?.de ||
            location.long_name?.de ||
            '',
        ),
      )
    : null;
};

export const postRequest = async (
  query: string,
): Promise<QueryResponse | null> => {
  try {
    return await fetch(__RECOS_ENDPOINT__, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
      }),
    }).then(async (res) => await res.json());
  } catch (error) {
    return null;
  }
};
