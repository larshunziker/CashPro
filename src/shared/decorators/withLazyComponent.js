//

import React, { Component } from 'react';

const withLazyComponent =
  (
    loadComponent,
    componentPropName = 'LazyComponent',
    errorPropName = 'lazyComponentError',
    LoadingComponent,
    ErrorComponent,
  ) =>
  (BaseComponent) =>
    class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          component: null,
          error: null,
          loading: true,
        };
      }

      componentDidMount() {
        loadComponent(this.props)
          .then((component) =>
            this.setState({
              component,
              error: null,
              loading: false,
            }),
          )
          .catch((error) =>
            this.setState({
              component: null,
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
          [componentPropName]: this.state.component,
        };

        if (this.state.error) {
          const ErrorComponentFinal = ErrorComponent || BaseComponent;
          return <ErrorComponentFinal {...this.props} {...dynamicProps} />;
        }

        if (this.state.component) {
          return <BaseComponent {...this.props} {...dynamicProps} />;
        }

        return null;
      }
    };

export default withLazyComponent;
