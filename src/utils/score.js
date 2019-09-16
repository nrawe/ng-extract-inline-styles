class Options {
  constructor(initial = {}) {
    const defaults = {
      isInline: false
    };

    Object.assign(this, defaults, initial);
  }
}

// #region Utils

/**
 *
 * @param {string} input
 * @param {RegExp} search
 */
const count = (input, search) => (input.match(search) || []).length;

// #endregion

// #region Rules

/**
 * Returns a score for the number of selectors in the file.
 *
 * Each selector found is weighted as 1 point, as each is a custom piece of
 * styling that needs to be understood and which can potentially conflict with
 * the styling framework.
 *
 * @param {string} css
 */
const selectors = css => count(css, /\{/g);

/**
 * Returns a score for the number of properties in the file.
 *
 * Each property declaration in the inline styles of an HTML file is scored as
 * 1 point. Each of these properties have max specificity and as such are hard
 * to deal with in addition to being part of a selector.
 *
 * @param {string} css
 * @param {Options} options
 */
const inlineProps = (css, options) =>
  options.isInline ? count(css, /\:/g) : 0;

/**
 * Returns a score for the number of !important declarations.
 *
 * The use of this flag is a hack which breaks the cascade, which in turn is
 * going to make mitigating or working around them that much harder. As such,
 * this is weighted highly at 5 points.
 *
 * @param {string} css
 */
const important = css => count(css, /\!important/g) * 5;

/**
 * Returns a score for width related properties.
 *
 * Any occurrance of a width related property is worth 2 points as this is
 * working directly against the CSS Framework and needs to be handled carefully.
 * They have somewhat of a multiplier effect, in that changing the width in one
 * place will have a spooky-action-at-a-distance effect.
 *
 * @param {string} css
 */
const width = css => count(css, /(min\-|max\-)?width\:/g) * 2;

/**
 * Returns a score for height related properties.
 *
 * Any occurrance of a height related property is worth 2 points as this is
 * usually working against the CSS Framework and needs to be hanlded carefully.
 * As with width, changing a heigh often has a multiplier effect and
 * necessitates change elsewhere to compensate.
 *
 * @param {string} css
 */
const height = css => count(css, /(min\-|max\-)?height\:/g) * 2;

/**
 * Returns a score for margin related properties.
 *
 * Any occurrance of a margin related property is worth 1 point. This is often
 * used to fix positioning against the grid, and changing this can sometimes be
 * easy and sometimes be complicated and required the rethink of an entire
 * layout.
 *
 * @param {string} css
 */
const margin = css =>
  count(css, /margin(\-top|\-bottom|\-left|\-right)?\:/g) * 1;

/**
 * Returns a score for any float properties.
 *
 * Occurrances of floats are weighted at 2 points because they break the box
 * model and the use of this should largely be consigned to the grid framework.
 * Any change to these has the potential to have complicated ramifications to
 * a layout.
 *
 * @param {string} css
 */
const float = css => count(css, /float\:/g) * 2;

/**
 * Returns a score for any media queries.
 *
 * Each media query in the CSS is worth and addition 1 point, as it complicates
 * change.
 *
 * @param {string} css
 */
const media = css => count(css, /\@media/g);

/**
 * Returns a score for any position properties.
 *
 * Any occurrance of a property that fixes the position of an element is usually
 * a symptom of a major problem with the exception of tooltips, menus and
 * modals (which should all be handled through the framework anyway). As such,
 * these are weighted heavily at 5 points.
 *
 * @param {string} css
 */
const position = css =>
  count(css, /\s+(position|top|bottom|left|right)\:/g) * 5;

/**
 * Returns a list of all rules that should be run to score the file.
 *
 * The order of this list is not important.
 */
const rules = () => [
  selectors,
  media,
  float,
  height,
  width,
  margin,
  important,
  inlineProps,
  position
];

// #endregion

/**
 * Returns a score for the given file.
 *
 * This algorithm inspects the CSS file and applies rules against it to
 * approximate the complexity of changing the CSS.
 *
 * Each of the individual rules is documented to explain their weightings.
 *
 * The result will be a signed integer that approximates the change complexity.
 *
 * @param {string} css
 * @param {Options} options
 */
const score = (css, options) =>
  rules().reduce((carry, rule) => carry + rule(css, options), 0);

exports.score = score;
exports.Options = Options;
