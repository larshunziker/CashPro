//

import React, { Component } from 'react';

const withAsyncData =
  (
    loadData,
    dataPropName = 'asyncData',
    errorPropName = 'asyncDataError',
    LoadingComponent,
    ErrorComponent,
  ) =>
  (BaseComponent) =>
    class extends Component {
      constructor() {
        super();
        this.state = {
          data: null,
          error: null,
          loading: true,
        };
      }

      componentDidMount() {
        loadData(this.props)
          .then((data) =>
            this.setState({
              data,
              error: null,
              loading: false,
            }),
          )
          .catch((error) =>
            this.setState({
              data: null,
              error,
              loading: false,
            }),
          );
      }

      render() {
        if (this.state.loading) {
          const LoadingComponentFinal = ErrorComponent || BaseComponent;
          return <LoadingComponentFinal {...this.props} />;
        }

        const dynamicProps = {
          [errorPropName]: this.state.error,
          [dataPropName]: this.state.data,
        };

        if (this.state.error) {
          const ErrorComponentFinal = ErrorComponent || BaseComponent;
          return <ErrorComponentFinal {...this.props} {...dynamicProps} />;
        }

        if (this.state.data) {
          return <BaseComponent {...this.props} {...dynamicProps} />;
        }

        return null;
      }
    };

export default withAsyncData;
