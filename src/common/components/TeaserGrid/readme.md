# TeaserGrid factory

The TeaserGrid factory uses CSS grid to create teaser grids instead of calculating it with javascript. Here are a few things that you should know about this new implementation.

## 💠 Grid generator tool

The easiest way to create a new teaser grid config is to use this css grid generator tool:

[**Link to the CSS grid generator tool**](https://jiib.github.io/cssgridgenerator/?columns=24&rows=4)

It's based on sarah edo's grid generator tool but with a few ajustments to the css output, so that its easier to just copy and paste the generated code.

## 👨🏻‍💻 How to create a basic grid config

A grid config consists of the following parts:

- `index.tsx` Information about the slots that are placed in the config e.g. teaser type, ad slot
- `styles.legacy.css` css grid logic, alignments and different layouts on mobile/tablet/desktop viewports

There are some global grid configs that are available across all publications. They are located in the common directory.

If you want to create a config specifically for only one publication, you should should add it in the gridConfigs folder for that given publication and not in the common folder.

Note: All the global grid configs/layouts + the app specific ones are automatically available to you. You should see all available layouts in the autocomplete for the `layout` prop.

Basic folder stucture:

```bash
├ TeaserGrid
├── gridConfigs
├──── myGridConfig
│      ├── index.tsx
│      └── styles.legacy.css
├────constants.tsx # slot types and grid configs names
├────index.tsx # typings and mapping for grid configs
└── index.tsx # factory binding file
```

Make sure to update the constants file index.tsx file with the grid config mappings.

### Structure: `gridConfig/myGridConfig/index.tsx`

This file describes the data structure of the grid. In the `config` section you can choose if you want to use a `.Container` wrapper or not. In the `items` section you define the items of your grid. Most of the times this will be different teaser types (TeaserS, TeaserM, etc.), but it can also be ad slots or custom types.

Take a look at the `GridItem` component inside of the factory file. There you can see a switch case that renders different components based on their type. You can also use a custom type that only exists on a specific publication. Use the `getGridItem` function for that.

**Note**: You can no longer use different teaser types across all viewports. You are only allowed to use one teaser type for all viewports.

**Examples**: Take a look at exists grid configs for inspiration. Simple examples:

`src/common/components/TeaserGrid/gridConfigs/mixed`
`src/common/components/TeaserGrid/gridConfigs/teaserS4x4`

### Layout: `gridConfig/myGridConfig/styles.legacy.css`

Here define the layout of your grid config. Use the [CSS Generator Tool](https://jiib.github.io/cssgridgenerator/?columns=24&rows=4) for easy drag and drop layouting.

It's important that all css code that you copy from the grid generator tool is wrapped in a selector with the same name as your grid config. When adding media queries, you should only add one media query per breakpoint and nest everything else inside there. Stick to this basic example below:

**Basic example**:
Lets say our layout is called "exampleLayout" and it looks the same on all viewports except on everything that is larger than 1680px.

```scss
.exampleLayout {
  /* Mobile */
  .Grid0 {
    display: grid;
    grid-column-gap: 0;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: repeat(18, auto);

    .Item {
      margin-bottom: 30px;
    }
    .Item0 {
      grid-area: 1 / 1 / 2 / 25;
    }
    .Item1 {
      grid-area: 2 / 1 / 3 / 25;
    }
    .Item2 {
      grid-area: 3 / 1 / 4 / 25;
    }
    .Item3 {
      grid-area: 4 / 1 / 5 / 25;
    }
  }

  /* Tablet */
  @media (min-width: $smBreakpoint) {
    .Grid0 {
      display: grid;
      grid-column-gap: $gridGutterWidthSm;
      grid-template-columns: repeat(24, 1fr);
      grid-template-rows: repeat(18, auto);

      .Item {
        margin-bottom: $margin40;
      }
    }
  }

  /* Desktop */
  @media (min-width: $xlBreakpoint) {
    .Grid0 {
      grid-column-gap: $gridGutterWidthXl;

      .Item {
        margin-bottom: 50px;
      }
      .Item0 {
        grid-area: 1 / 4 / 2 / 10;
      }
      .Item1 {
        grid-area: 1 / 10 / 2 / 16;
      }
      .Item2 {
        grid-area: 1 / 16 / 2 / 22;
      }
      .Item3 {
        grid-area: 2 / 4 / 3 / 10;
      }
    }
  }
}
```

Here is an example how it looks like in the grid generator tool vs. how it looks like on SI:

![alt css grid generator](https://user-images.githubusercontent.com/25438442/121373237-325cd780-c93f-11eb-81c5-db6901d960f7.png)

![alt si home eq](https://user-images.githubusercontent.com/25438442/121373233-31c44100-c93f-11eb-96a8-258098381f5d.png)

## 😇 Nice to know

Here are a few "nice to know" facts about the TeaserGrid factory:

### Grid gaps

You have to be careful when using grid gaps. The `grid-column-gap` property is used to mimic the gutter values from our `grid.legacy.css`. For now you have to set these values manually, in the future we might add a helper class for this.

The `grid-row-gap` property should only be used if you know that all items in your grid configs are always filled up with data. If you have a dynamic page, such as a search results overview page that uses pagination and perhaps only half of all slots are filled with data, then you should use the `.Item` css class to preserve the spacing between rows. As the `grid-row-gap` will add spacing to all rows, even if there are no teasers displayed.

### The `repeat` function for grid-templates

If you copy css from the CSS grid generator tool, make sure to double check the values for `grid-template-columns` and `grid-template-rows` inside the `repeat` function.

The "width" unit, or the second param in the `repeat` function should always be `1fr` or one fraction for the columns and it should have the value `auto` for the rows.

Otherwise you might end up with some unwanted spacing issues if only half of your slots are filled up with data.

Example:

```css
{
  grid-template-columns: repeat(<cols>, 1fr);
  grid-template-rows: repeat(<rows>, auto);
}
```

### Ad slots

There a certain layouts that have an ad slots only on mobile. Here you have to make sure that you place the ad slots inside the grid on the mobile viewport. On the other viewports you can place the ad slot outside of the grid and just set it to `display: none;` in your media query.
