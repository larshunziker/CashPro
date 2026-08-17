import { APP_NAME_ALERT_PUBLICATION_MAPPING } from '../../../shared/actions/alertList';
import { PutRequestBody } from './typings';

type Options = {
  webformId: string;
  uniqueTimestamp: string;
  fieldName: string;
};
class FileUploaderApi {
  static getPutUrl = async (name: string, options: Options) => {
    // host where we point to
    const host = __CLIENT__
      ? String(window.__GRAPHQL_HOST__)
      : String(process.env.__GRAPHQL_HOST__);

    const result =
      /https:\/\/(graphql|api).(?<env>dev|stage|migration|gql|performance|update|dcx-integration)?/gm.exec(
        host,
      );
    const environment = result?.groups?.env;
    const path = `webform/${environment || 'prod'}/${__APP_NAME__}/${
      options.webformId
    }/${options.uniqueTimestamp}/${options.fieldName}`;
    const buffer = Buffer.from(path);
    const encryptedPath = buffer.toString('hex');
    const response = await fetch(
      `${__WEBFORM_FILES_SERVICE_ENDPOINT__}/${
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
        APP_NAME_ALERT_PUBLICATION_MAPPING[__APP_NAME__]
      }/upload/${encryptedPath}/${encodeURI(name)}`,
    );
    const res = await response.json();
    return res.url;
  };

  static putFile = async (putUrl: string, body: PutRequestBody) => {
    return fetch(putUrl, body);
  };

  // NOT used now but if we want to use it, we need to change the path to the files on aws
  static deleteFile = async (name: string) => {
    return fetch(
      `${__WEBFORM_FILES_SERVICE_ENDPOINT__}/SI/delete/776562666f726d2f656e762f7075626c69636174696f6e2f776562666f726d49442f756e6971756549445f776562666f726d5f74696d657374616d705f72616e642f6669656c645f6d616368696e655f6e616d65/${encodeURI(
        name,
      )}`,
      {
        method: 'DELETE',
      },
    );
  };
}

export default FileUploaderApi;
