import { Fragment, memo, useId } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'web-common/components';
import { formatBib, formatFallback } from '../cite';
import { generateFilename } from '../filename';

import { FormattedMessage } from 'react-intl';

const Review = ({ isTranslating, itemUnderReview, onReviewEdit, onReviewDelete,onReviewCopy, onReviewCopyFilename, onReviewDismiss, styleHasBibliography }) => {
	const { bibliographyItems, bibliographyMeta } = itemUnderReview || {};
	const id = useId();
	const html = itemUnderReview ?
		styleHasBibliography ? formatBib(bibliographyItems, bibliographyMeta) : formatFallback(bibliographyItems) :
		'';
	const filename = generateFilename(bibliographyItems, bibliographyMeta);

	return (
        <section
			aria-labelledby={ id }
			className="section section-review review"
		>
			{ isTranslating ? (
					<h2 id={ id }>
						<FormattedMessage id="zbib.review.newItem" defaultMessage="Generating…" />
					</h2>
			) : (
			<Fragment>
				<h2 className="sr-only" id={ id }>
					<FormattedMessage id="zbib.review.newItem" defaultMessage="Generating…" />
				</h2>
				<div className="container">
					<div dangerouslySetInnerHTML={ { __html: html } } />

					<div class="tw-mb-6">
    
<label for="message" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Filename</label>
<textarea id="message" rows="4" class="tw-block tw-p-2.5 tw-w-full tw-text-sm tw-text-gray-900 tw-bg-gray-50 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-ring-blue-500 focus:tw-border-blue-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500">{filename}</textarea>
</div>

					<div className="actions">
						<Button
							className="btn-outline-secondary btn-min-width"
							onClick={ onReviewDismiss }
						>
							<FormattedMessage id="zbib.general.close" defaultMessage="Close" />
						</Button>
						<Button
							className="btn-outline-secondary btn-min-width"
							onClick={ onReviewDelete }
						>
							<FormattedMessage id="zbib.general.delete" defaultMessage="Delete" />
						</Button>
						<Button
							className="btn-secondary btn-min-width"
							onClick={ onReviewEdit }
						>
							<FormattedMessage id="zbib.general.edit" defaultMessage="Edit" />
						</Button>

					</div>
					<div className='actions'>
					<Button
					className="btn btn-min-width"
					onClick={ onReviewCopy }
				>
					<FormattedMessage id="zbib.general.copy" defaultMessage="Copy Citation to Clipboard" />
				</Button>
				<Button
					className="btn btn-min-width"
					onClick={ onReviewCopyFilename }
				>
					<FormattedMessage id="zbib.general.copyFilename" defaultMessage="Copy Filename to Clipboard" />
				</Button>
					</div>
				</div>
			</Fragment>
			)}
		</section>
    );
}

Review.propTypes = {
	isTranslating: PropTypes.bool,
	itemUnderReview: PropTypes.object,
	onReviewDelete: PropTypes.func.isRequired,
	onReviewCopy: PropTypes.func.isRequired,
	onReviewCopyFilename: PropTypes.func.isRequired,
	onReviewDismiss: PropTypes.func.isRequired,
	onReviewEdit: PropTypes.func.isRequired,
	styleHasBibliography: PropTypes.bool,
}

export default memo(Review);
