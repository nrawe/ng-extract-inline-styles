# Extract Angular Inline Styles

A small tool to extract the `style` and `[style]` declarations from the
templates in an Angular project to a set of high-specificity selectors.

**Note:** this tool is as is and not actively maintained.

## Usage

```bash
cd /path/to/my/angular-project
/path/to/ng-extract-inline-styles
```

## Example Output

```css
/**
 * /path/to/component1/component1.template.html
 */

.HOuhgX {
  margin: 0;
}

.bYoufg {
  display: none;
}

/**
 * /path/to/component2/component2.template.html
 */

.Queod {
  background-color: red;
  margin: 0;
  z-index: 100;
}
```

## License

MIT
