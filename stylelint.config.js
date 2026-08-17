module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-declaration-use-variable',
    'stylelint-order',
    'stylelint-prettier',
  ],
  rules: {
    'media-query-no-invalid': null,
    'prettier/prettier': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment', 'inside-block'],
        ignoreAtRules: ['import'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['mixin', 'for', 'define-mixin'] },
    ],
    'at-rule-no-vendor-prefix': true,
    'color-hex-case': 'lower',
    'color-named': 'never',
    'declaration-empty-line-before': [
      'never',
      {
        ignore: [
          'after-comment',
          'after-declaration',
          'inside-single-line-block',
        ],
      },
    ],
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': 'always',
    indentation: 2,
    'media-feature-range-notation': null,
    'media-feature-name-no-vendor-prefix': true,
    'no-empty-source': true,
    'no-invalid-double-slash-comments': true,
    'no-missing-end-of-source-newline': true,
    'no-descending-specificity': null,
    'order/properties-order': [
      ['mixin', 'composes'],
      {
        unspecified: 'bottomAlphabetical',
      },
    ],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    'property-no-vendor-prefix': true,
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: [/column/, /grid/, /flex/],
      },
    ],
    'selector-max-compound-selectors': 4,
    'selector-no-vendor-prefix': true,
    'selector-class-pattern':
      '^([a-z]|[A-Z0-9])([a-zA-Z0-9]|-[a-z0-9]|_[a-z0-9])+$',
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    'sh-waqar/declaration-use-variable': [['/color/', 'font-family']],
    'string-quotes': 'single',
    'value-no-vendor-prefix': true,
    'declaration-property-value-disallowed-list': {
      border: ['/thin/', '/medium/', '/thick/'],
    },
    'declaration-block-no-duplicate-properties': [
      true,
      { ignoreProperties: ['composes'] },
    ],
    'value-keyword-case': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [/^.+/],
      },
    ],
  },
};
