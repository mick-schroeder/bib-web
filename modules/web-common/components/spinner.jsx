import { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from './icon';

export const Spinner = memo(props => (
	<Icon {...props} role="progressbar" type="16/spin" width="16" height="16" />
));

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
	className: PropTypes.string,
}
