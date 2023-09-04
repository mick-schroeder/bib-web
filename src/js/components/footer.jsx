import { memo } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
const currentYear = new Date().getFullYear();

const Footer = (props) => {
	const { isReadOnly } = props;

	return (
		<footer>
		<div className="tw-block tw-text-sm tw-text-gray-500 sm:tw-text-center dark:tw-text-gray-400">
		<p>
					{" "}
					Mick Schroeder's Citation Generator™ © 2020-{currentYear}{" "}
					<a href="http://mickschroeder.com" className="font-semibold hover:underline">
						Mick Schroeder, LLC.
					</a>
					. All Rights Reserved.
				</p>
				<p>
					Based on ZoteroBib © 2018-{currentYear}{" "}
					<a href="http://digitalscholar.org/">
						Corporation for Digital Scholarship
					</a>
					.
				</p>
				<p>
					{" "}
					All emojis designed by{" "}
					<a href="https://openmoji.org/" rel="nofollow">
						OpenMoji
					</a>{" "}
					– the open-source emoji and icon project. License:{" "}
					<a
						href="https://creativecommons.org/licenses/by-sa/4.0/#"
						rel="nofollow"
					>
						CC BY-SA 4.0
					</a>
					.
				</p>
				<p>
					<a href="https://mickschroeder.com/privacy-policy">Terms of Use & Privacy Policy</a>
					</p>
				<p>
					This program is free software: you can redistribute it and/or modify
					it under the terms of the{" "}
					<a
						href="https://www.gnu.org/licenses/agpl-3.0.en.html"
						rel="external"
					>
						GNU Affero General Public License
					</a>{" "}
					as published by the{" "}
					<a href="https://www.fsf.org/" rel="external">
						Free Software Foundation
					</a>
					.
				</p>
				<p className="py-4 md:p-10 text-xs text-justify text-gray-500 dark:text-gray-400">
					This program is distributed in the hope that it will be useful, but
					without any warranty; without even the implied warranty of
					merchantability or fitness for a particular purpose. Some links may be
					sponsored or affiliate programs that earn commission. This site uses
					cookies and analytics trackers and is supported by advertising. These
					links are being provided as a convenience and for informational
					purposes only; they do not constitute an endorsement or an approval or
					opinions of that organization or individual. Not responsible for the
					accuracy, legality or content of the external site or for that of
					subsequent links. Contact the external site for answers to questions
					regarding their content.
				</p>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	isReadOnly: PropTypes.bool,
};

export default memo(Footer);
