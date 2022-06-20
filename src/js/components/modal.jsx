/* eslint-disable react/no-deprecated */
// @TODO: migrate to getDerivedStateFromProps()
'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const ReactModal = require('react-modal');

var initialPadding;

class Modal extends React.PureComponent {
	componentWillReceiveProps(props) {
		if(props.isOpen != this.props.isOpen && props.isOpen === true) {
			this.setScrollbar();
		}
		if(props.isOpen != this.props.isOpen && props.isOpen === false) {
			this.resetScrollbar();
		}
	}

	checkScrollbar() {
		const rect = document.body.getBoundingClientRect();
		return rect.left + rect.right < window.innerWidth;
	}

	getScrollbarWidth() {
		const scrollDiv = document.createElement('div');
		scrollDiv.className = 'modal-scrollbar-measure';
		document.body.appendChild(scrollDiv);
		const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);
		return scrollbarWidth;
	}

	setScrollbar() {
		const calculatedPadding = this.initialPadding + this.getScrollbarWidth();
		document.body.style.paddingRight = `${calculatedPadding}px`;
	}

	resetScrollbar() {
		document.body.style.paddingRight = `${this.initialPadding}px`;
	}

	handleModalOpen() {
		// remove maxHeight hack that prevents scroll on focus
		this.contentRef.style.maxHeight = null;
		this.contentRef.style.overflowY = null;
	}

	get initialPadding() {
		if(typeof initialPadding === 'undefined') {
			initialPadding = parseFloat(document.body.style.paddingRight);
			initialPadding = Number.isNaN(initialPadding) ? 0 : initialPadding;
		}
		return initialPadding;
	}

	render() {
		return <ReactModal
			role="dialog"
			// prevent scroll on focus by setting max height
			style={{ content: { maxHeight: 'calc(100% - 32px)', overflowY: 'hidden' } }}
			onAfterOpen={ this.handleModalOpen.bind(this) }
			contentRef={ contentRef => { this.contentRef = contentRef; } }
			parentSelector={ () => document.querySelector('.schroeder-bib-container') }
			appElement={ document.querySelector('.schroeder-cite-inner') }
			className="modal"
			overlayClassName="modal-backdrop"
			{ ...this.props }
		/>;
	}

	static propTypes = {
		isOpen: PropTypes.bool
	}
}

module.exports = Modal;
