/* eslint-disable react/no-deprecated */
// @TODO: migrate to getDerivedStateFromProps()
'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const cx = require('classnames');
const KeyHandler = require('react-key-handler').default;
const { KEYDOWN } = require('react-key-handler');
const { withRouter } = require('react-router-dom');
const Icon = require('zotero-web-library/src/js/component/ui/icon');
const Button = require('zotero-web-library/src/js/component/ui/button');
const { noop } = require('zotero-web-library/src/js/utils');

class Message extends React.Component {
	componentWillReceiveProps(nextProps) {
		if('location' in nextProps &&
			nextProps.location.pathname !== this.props.location.pathname) {
			this.props.onDismiss();
		}
	}

	handleDismiss() {
		this.props.onDismiss();
	}

	handleAction(event) {
		this.props.onAction(event);
	}

	get className() {
		return {
			message: true,
			[this.props.kind]: true
		};
	}

	renderButton() {
		return (
			this.props.href ? (
				<a
				className={ `btn btn-sm btn-outline-inverse-${this.props.kind}` }
				href={ this.props.href }
				>
					{ this.props.action }
				</a>
			): (
				<Button
					className={ `btn-sm btn-outline-inverse-${this.props.kind}` }
					onClick={ this.handleAction.bind(this) }
				>
					{ this.props.action }
				</Button>
			)

		);
	}

	render() {
		return this.props.message ? (
			<div className={ cx(this.className) }>
				<p className="text">
					{ this.props.message }
					{ this.props.action ? this.renderButton() : null }
				</p>
				<button
					className="btn btn-icon close"
					onClick={ this.handleDismiss.bind(this) }
				>
					<Icon type={ '24/remove' } width="24" height="24" />
				</button>
				<KeyHandler
					keyEventName={ KEYDOWN }
					keyValue="Escape"
					onKeyHandle={ this.handleDismiss.bind(this) }
				/>
			</div>
		) : null;
	}

	static defaultProps = {
		onAction: noop
	}

	static propTypes = {
		action: PropTypes.string,
		href: PropTypes.string,
		kind: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
		location: PropTypes.object,
		message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		onAction: PropTypes.func,
		onDismiss: PropTypes.func.isRequired,
	}
}

module.exports = withRouter(Message);
