/* eslint-disable react/no-deprecated */
// @TODO: migrate to getDerivedStateFromProps()
'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const KeyHandler = require('react-key-handler').default;
const { KEYDOWN } = require('react-key-handler');
const Spinner = require('zotero-web-library/src/js/component/ui/spinner');
const Button = require('zotero-web-library/src/js/component/ui/button');
const Icon = require('zotero-web-library/src/js/component/ui/icon');
const Input = require('zotero-web-library/src/js/component/form/input');
const cx = require('classnames');
const Modal = require('./modal');

var SearchWorker = require('webworkify')(require('../search-worker.js'));

class StyleInstaller extends React.Component {
	state = {
		isReady: false,
		isSearching: false,
		selectedIndex: null,
		filterInput: '',
		filter: '',
		items: [],
	}

	handleWorkerMessage = (event) => {
		const [messageKind, payload] = event.data;
		switch(messageKind) {
			case 'READY':
				this.setState({
					isReady: true
				});
			break;
			case 'FILTER_COMPLETE':
				this.setState({
					isSearching: false,
					items: payload
				});
			break;
		}
	}

	componentDidMount() {
		SearchWorker.addEventListener('message', this.handleWorkerMessage);
	}

	componentWillUnmount() {
		SearchWorker.removeEventListener('message', this.handleWorkerMessage);
		if(this.timeout) {
			clearTimeout(this.timeout);
			delete this.timeout;
		}
	}

	componentWillReceiveProps({ isStylesDataLoading, stylesData }) {
		if(!isStylesDataLoading && this.props.isStylesDataLoading != isStylesDataLoading) {
			SearchWorker.postMessage(['LOAD', stylesData]);
		}
	}

	componentDidUpdate(_, { isSearching }) {
		if(this.state.isSearching && this.state.isSearching !== isSearching) {
			const filter = this.state.filterInput.toLowerCase();
			SearchWorker.postMessage(['FILTER', filter]);
		}
	}

	handleFilterChange(newValue) {
		if(this.timeout) {
			clearTimeout(this.timeout);
		}
		this.setState({
			filterInput: newValue
		});

		if(newValue.length > 2) {
			this.timeout = setTimeout(() => {
				this.setState({
					isSearching: true,
					selectedIndex: null
				});
			}, 250);
		}
	}

	handleEscapeKey(ev) {
		this.handleCancel();
		ev.preventDefault();
	}

	handleArrowDownKey(ev) {
		this.setState({
			selectedIndex: this.state.selectedIndex === null ? 0 : Math.min(this.state.selectedIndex + 1, this.state.items.length)
		});
		ev.preventDefault();
	}

	handleArrowUpKey(ev) {
		this.setState({
			selectedIndex: Math.max(this.state.selectedIndex - 1, 0)
		});
		ev.preventDefault();
	}

	handleEnterKey(ev) {
		this.handleInstall(this.state.items[this.state.selectedIndex], ev);
		ev.preventDefault();
	}

	handleInputKeydown(ev) {
		switch(ev.key) {
			case 'Escape': this.handleEscapeKey(ev); break;
			case 'ArrowDown': this.handleArrowDownKey(ev); break;
			case 'ArrowUp': this.handleArrowUpKey(ev); break;
			case 'Enter': this.handleEnterKey(ev); break;
		}
	}

	handleInstall(style, ev) {
		ev.stopPropagation();
		this.props.onStyleInstallerSelect(style);
		this.handleCancel();
	}

	handleDelete(style, ev) {
		ev.stopPropagation();
		this.props.onStyleInstallerDelete(style);
	}

	handleCancel() {
		clearTimeout(this.timeout);
		delete this.timeout;
		this.setState({
			filterInput: '',
			filter: ''
		});
		this.props.onStyleInstallerCancel();
	}

	get keyHandlers() {
		return (
			<React.Fragment>
				<KeyHandler
					keyEventName={ KEYDOWN }
					keyValue="Escape"
					onKeyHandle={ this.handleEscapeKey.bind(this) }
				/>
				<KeyHandler
					keyEventName={ KEYDOWN }
					keyValue="ArrowDown"
					onKeyHandle={ this.handleArrowDownKey.bind(this) }
				/>
				<KeyHandler
					keyEventName={ KEYDOWN }
					keyValue="ArrowUp"
					onKeyHandle={ this.handleArrowUpKey.bind(this) }
				/>
				<KeyHandler
					keyEventName={ KEYDOWN }
					keyValue="Enter"
					onKeyHandle={ this.handleEnterKey.bind(this) }
				/>
			</React.Fragment>
		);
	}

	get className() {
		return {
			'style-installer': true,
			'modal': true,
			'modal-lg': true,
			'loading': !this.state.isReady
		};
	}

	renderStyleItem(style) {
		const styleData = this.props.citationStyles.find(cs => cs.name === style.name);
		const isInstalled = typeof styleData !== 'undefined';
		const isCore = isInstalled && styleData.isCore || false;
		const isActive = style.name === this.props.citationStyle;
		const isSelected = this.state.items[this.state.selectedIndex] ? this.state.items[this.state.selectedIndex].name === style.name : false;
		return (
			<li
				className={ cx('style', { selected: isSelected }) }
				key={ style.name }
			>
				<div className="style-title">
					{ style.title }
				</div>
				{
					isActive ? (
						<Button className="btn btn-sm btn-outline-light" disabled>
							Active
						</Button>
					) : isCore ? (
						<Button className="btn btn-sm btn-outline-light" disabled>
							Default
						</Button>
					) : isInstalled ? (
						<Button
							className="btn btn-sm btn-outline-primary"
							onClick={ this.handleDelete.bind(this, style) }>
							Remove
						</Button>
					) : (
						<Button
							className="btn btn-sm btn-outline-secondary"
							onClick={ this.handleInstall.bind(this, style) }>
							Add
						</Button>
					)
				}
			</li>
		);
	}

	renderModalContent() {
		return(
			<div className="modal-content" tabIndex={ -1 }>
				<div className="modal-header">
					<h4 className="modal-title text-truncate">
						Add a Citation Style
					</h4>
					<Button
						className="close"
						onClick={ this.handleCancel.bind(this) }
					>
						<Icon type={ '24/remove' } width="24" height="24" />
					</Button>
				</div>
				<div className="modal-body">
					<Input
						autoFocus
						className="form-control form-control-lg"
						onChange={ this.handleFilterChange.bind(this) }
						onKeyDown={ this.handleInputKeydown.bind(this) }
						placeholder="Enter three or more characters to search"
						type="text"
						value={ this.state.filterInput }
						isBusy={ this.state.isSearching }
					/>
						<ul className="style-list">
							{
								this.state.filterInput.length > 2 ?
								this.state.items.map(this.renderStyleItem.bind(this)) :
									this.props.citationStyles.map(this.renderStyleItem.bind(this))
							}
						</ul>
					<div className="modal-bottom-message">
						<p>Over 9,800 citation styles are available. <a href="https://www.zotero.org/styles" target="_blank">Browse Style Repository</a></p>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<Modal
				isOpen={ this.props.isInstallingStyle }
				contentLabel="Citation Style Picker"
				className={ cx(this.className) }
				onRequestClose={ this.handleCancel.bind(this) }
			>
				{ this.state.isReady ? this.renderModalContent() : <Spinner /> }
				{ this.props.isInstallingStyle && this.keyHandlers }
			</Modal>
		);
	}

	static propTypes = {
		citationStyle: PropTypes.string,
		citationStyles: PropTypes.array,
		isInstallingStyle: PropTypes.bool,
		isStylesDataLoading: PropTypes.bool,
		onStyleInstallerCancel: PropTypes.func.isRequired,
		onStyleInstallerDelete: PropTypes.func.isRequired,
		onStyleInstallerInstall: PropTypes.func.isRequired,
		onStyleInstallerSelect: PropTypes.func.isRequired,
		stylesData: PropTypes.array,
	}
}


module.exports = StyleInstaller;
