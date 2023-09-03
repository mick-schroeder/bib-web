import { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Icon = memo(props => {
	const { className, color, height, label, role = 'img', type, viewBox, width } = props;
	const style = { color, ...props.style };
	const basename = type.split(/[\\/]/).pop();
	const symbol = props.symbol || basename;

	const svgAttr = {
		className: cx(['icon', `icon-${basename}`, className]),
		role,
		style
	};

	if(width) {
		svgAttr['width'] = parseInt(width, 10);
	}

	if(height) {
		svgAttr['height'] = parseInt(height, 10);
	}

	if(viewBox) {
		svgAttr['viewBox'] = viewBox;
	}

	if(label) {
		svgAttr['aria-label'] = label;
	}

	return (
		<svg { ...svgAttr } viewBox={ viewBox }>
			<use xlinkHref={ `/static/icons/${type}.svg#${symbol}`} />
		</svg>
	);
});

Icon.displayName = 'Icon';

Icon.propTypes = {
	className: PropTypes.string,
	color: PropTypes.string,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	label: PropTypes.string,
	role: PropTypes.string,
	style: PropTypes.object,
	symbol: PropTypes.string,
	type: PropTypes.string.isRequired,
	viewBox: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
