import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from './ui/button';
import Confirmation from './confirmation';

const DeleteAllButton = props => {
	const { bibliographyCount, onDeleteCitations } = props;
	const [isConfirmingDeleteAll, setIsConfirmingDeleteAll] = useState(false);
	const intl = useIntl();

	const handleDeleteAll = useCallback(() => {
		setIsConfirmingDeleteAll(true);
	}, []);

	const handleConfirmDeleteAll = useCallback(() => {
		setIsConfirmingDeleteAll(false);
		onDeleteCitations();
	}, [onDeleteCitations]);

	const handleCancelDeleteAll = useCallback(() => {
		setIsConfirmingDeleteAll(false);
	}, []);


	return (
		<React.Fragment>
			<Button
				key="delete-all-button"
				className="btn-sm btn-outline-primary"
				onClick={ handleDeleteAll }
			>
				<FormattedMessage id="zbib.bibliography.deleteAll" defaultMessage="Delete All" />
			</Button>
			<Confirmation
				key="delete-all-confirmation"
				isOpen={ isConfirmingDeleteAll }
				onConfirm={ handleConfirmDeleteAll }
				onCancel={ handleCancelDeleteAll }
				title={ intl.formatMessage({ id: "zbib.confirmDeleteAll.title", defaultMessage: "Clear Bibliography?" }) }
				confirmLabel={ intl.formatMessage({ id: "zbib.confirmDeleteAll.confirm", defaultMessage: "Delete" }) }
			>
				<p>
					<span>
						<FormattedMessage
							id="zbib.confirmDeleteAll.prompt"
							defaultMessage="{bibliographyCount, plural,
								one {# entry}
								other {# entries}
							} will be deleted."
							values={ { bibliographyCount } }
						/>
					</span>
				</p>
			</Confirmation>
		</React.Fragment>
	);
};

DeleteAllButton.propTypes = {
	bibliographyCount: PropTypes.number.isRequired,
	onDeleteCitations: PropTypes.func.isRequired,
}

export default memo(DeleteAllButton);
