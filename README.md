# Bootstrap Tooltip Extra Positions
Extend Bootstrap 3 Tooltip plugin by adding 4 extra positions: top-left, top-right, bottom-left, bottom-right.

## Usage

#### HTML
Use the following values for the `data-placement` attribute: 
* `top-l` - for top-left placement
* `top-r` - for top-right placement
* `bottom-l` - for bottom-left placement
* `bottom-r` - for bottom-right placement

Example:
```html
<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top-l" title="Tooltip on top-left">Tooltip on top-left</button>
```

#### Javascript
Incude the script after Bootstrap's main javascript file:
```html
<script src="bootstrap.js"></script>
<script src="bootstrap-tooltip-extra-positions.js"></script>
```

#### CSS
Include `bootstrap-tooltip-extra-position.css` in your project or use the `.scss` file:
```html
<link rel="stylesheet" href="bootstrap-tooltip-extra-position.css" media="all" />
```
SASS:
```sass
@import "bootstrap-tooltip-extra-position";
```

## Demo
[Codepen](http://codepen.io/andreivictor/pen/evXOgJ)
