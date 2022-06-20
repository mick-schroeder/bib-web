import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from '../form/input';
import TextAreaInput from '../form/text-area';
import Select from '../form/select';
import { noop } from '../../utils';
import { pick } from '../../immutable';


const EditableContent = memo(({ display, input, inputComponent, options, title, placeholder = '',  value = '' }) => {
	const isSelect = inputComponent === Select || input && input.type == Select;
	const hasValue = !!(value || input && input.props.value);
	value = value || input && input.props.value;
	placeholder = placeholder || input && input.props.placeholder;

	const className = {
		'editable-content': true,
		'placeholder': !hasValue
	};

	const displayValue = useMemo(() => {
		if(!hasValue) {
			return placeholder;
		}

		if(display) {
			return display;
		}

		if(isSelect && options) {
			const displayValue = options.find(e => e.value == value);
			return displayValue ? displayValue.label : value;
		}

		return value;
	}, [display, hasValue, isSelect, placeholder, options, value]);

	return <div
		title={ title }
		className={ cx(className) }
	>
		{ displayValue }
	</div>;
});

EditableContent.displayName = 'EditableContent';

EditableContent.propTypes = {
	display: PropTypes.string,
	input: PropTypes.element,
	inputComponent: PropTypes.elementType,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
};


const Editable = props => {
	const { children, input, isBusy, isDisabled, inputComponent = Input, isSelect,
	isTextArea, tabIndex = 0, onClick = noop, onFocus = noop, ...rest } = props;

	const isActive = (props.isActive || isBusy) && !isDisabled;
	// input type auto-detection doesn't work if element is nested (which it can be, see
	// BoxFieldInput). This causes #440. TODO: drop auto-detection and always use explicit prop
	// to define textarea/select editables
	const className = {
		'editable': true,
		'editing': isActive,
		'textarea': inputComponent === TextAreaInput || (input && input.type === TextAreaInput) || isTextArea,
		'select': inputComponent === Select || (input && input.type === Select) || isSelect,
	};
	const hasChildren = typeof children !== 'undefined';
	const InputComponent = inputComponent;
	const InputElement = input;

	return (
		<div
			tabIndex={ isDisabled ? null : isActive ? null : tabIndex }
			onClick={ onClick }
			onFocus={ onFocus }
			className={ cx(className, { 'disabled': isDisabled }) }
			{ ...pick(rest, p => p.startsWith('data-')) }
		>
			{ isActive ?
				InputElement ? InputElement : <InputComponent
					className={ cx(className, "editable-control") }
					{ ...props }
			/> : <React.Fragment>
						{
						hasChildren ?
							children :
							<EditableContent { ...props } />
						}
				</React.Fragment>
			}
		</div>
	);
}

Editable.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	className: PropTypes.string,
	input: PropTypes.element,
	inputComponent: PropTypes.elementType,
	isActive: PropTypes.bool,
	isBusy: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isReadOnly: PropTypes.bool,
	isSelect: PropTypes.bool,
	isTextArea: PropTypes.bool,
	onClick: PropTypes.func,
	onFocus: PropTypes.func,
	tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default memo(Editable);
