import { cloneElement, forwardRef, memo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useFocusManager } from '../hooks';
import { mapChildren, noop, pick } from '../utils';
import { Spinner } from './spinner';

const Tab = memo(props => {
	const { activateOnFocus, asSections, children, isActive, isDisabled, onActivate, focusNext, focusPrev,
		resetLastFocused, ...rest } = props;

	if (asSections) {
		delete rest['aria-controls'];
	}

	const handleKeyDown = useCallback(ev => {
		if (ev.target !== ev.currentTarget) {
			return;
		}

		if (ev.key === 'ArrowRight') {
			const focused = focusNext(ev);
			if (activateOnFocus) {
				onActivate(focused);
			}
		} else if (ev.key === 'ArrowLeft') {
			const focused = focusPrev(ev);
			if (activateOnFocus) {
				onActivate(focused);
			}
		}
	}, [activateOnFocus, focusNext, focusPrev, onActivate]);

	const handleClick = useCallback(ev => {
		ev.preventDefault();
		if (isDisabled) {
			return;
		}
		resetLastFocused();
		onActivate(ev.currentTarget);
	}, [resetLastFocused, isDisabled, onActivate]);

	return (
		<li
			className={cx({
				tab: true,
				active: isActive,
				disabled: isDisabled
			})}
		>
			<button
				{...pick(rest, p => p.startsWith('data-') || p.startsWith('aria-'))}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				role={asSections ? null : 'tab'}
				aria-selected={isActive}
				tabIndex={-2}
			>
				{children}
			</button>
		</li>
	);
});

Tab.displayName = 'Tab';

Tab.propTypes = {
	activateOnFocus: PropTypes.bool,
	asSections: PropTypes.bool,
	children: PropTypes.node,
	focusNext: PropTypes.func,
	focusPrev: PropTypes.func,
	isActive: PropTypes.bool,
	isDisabled: PropTypes.bool,
	onActivate: PropTypes.func.isRequired,
	resetLastFocused: PropTypes.func,
};


const Tabs = memo(({ asSections, children, justified, compact, activateOnFocus, ...rest }) => {
	const ref = useRef(null);
	const { focusNext, focusPrev, receiveFocus, receiveBlur, resetLastFocused } =
		useFocusManager(ref, '.tab.active > a');

	return (
		<nav>
			<ul
				className={cx('nav', 'tabs', { justified, compact, 'activate-on-focus': activateOnFocus })}
				onBlur={asSections ? noop : receiveBlur}
				onFocus={asSections ? noop : receiveFocus}
				ref={ref}
				role={asSections ? null : "tablist"}
				tabIndex={asSections ? -1 : 0}
				{...pick(rest, p => p.startsWith('aria-') || p.startsWith('data-'))}
			>
				{
					mapChildren(children, child =>
						child && child.type === Tab ?
							cloneElement(child, { activateOnFocus, asSections, focusNext, focusPrev, resetLastFocused }) :
							child
					)
				}
			</ul>
		</nav>
	);
});

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
	asSections: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	compact: PropTypes.bool,
	justified: PropTypes.bool,
	activateOnFocus: PropTypes.bool,
};

const TabPane = memo(forwardRef(({ children, isActive, isLoading, className, ...rest }, ref) => (
	<div ref={ref} className={cx(className, {
		'tab-pane': true,
		'active': isActive,
		'loading': isLoading
	})} {...rest}>
		{isLoading ? <Spinner /> : children}
	</div>
)));

TabPane.displayName = 'TabPane';

TabPane.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
	className: PropTypes.string,
	isActive: PropTypes.bool,
	isLoading: PropTypes.bool,
};


export {
	Tab,
	Tabs,
	TabPane
};
