import { memo } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import { Button } from "web-common/components";
import { citationStylesCount } from "../../../data/citation-styles-data.json";

const Features = ({ onGetStartedClick }) => (
	<section className="section-about ">
		<section className="features tw-px-4">
			<div className=" tw-mb-8 lg:tw-mb-8">
				<h2 className="tw-mb-4 tw-text-4xl tw-tracking-tight tw-font-extrabold tw-text-gray-900 dark:tw-text-white">
					Struggling with Citations? Discover a Simpler Way.
				</h2>
				<p className="tw-text-gray-500 sm:tw-text-xl dark:tw-text-gray-400">
					Unlock the power of Mick Schroeder's Citation Generator, where
					cutting-edge tech meets academic excellence.
				</p>
			</div>
			<div className="row tw-space-y-8 md:tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3 md:tw-gap-6 md:tw-space-y-0">
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/1F4D1.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Suggesting a Citation</h2>
						<p>
							Paste a URL in the text box and click Suggest Citation.
							Automatically pull in data from thousands of medical and
							scientific journals, newspapers, magazine articles, library
							catalogs, articles. You can also use an identifier such as an
							ISBN, DOI, PMID, or arXiv ID, or you can search by title.
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/1F310.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Example: Website URLs</h2>
						<p>
							Enter a website address (URL)
							<ul>
								<li>
									<a href="https://cite.mickschroeder.com/?q=https%3A%2F%2Fwww.nejm.org%2Fdoi%2Ffull%2F10.1056%2FNEJMoa1403108">
										https://nejm.org/...
									</a>
								</li>
								<li>
									<a href="https://cite.mickschroeder.com/?q=https%3A%2F%2Fwww.nytimes.com%2F2013%2F03%2F05%2Fscience%2Fchasing-the-higgs-boson-how-2-teams-of-rivals-at-CERN-searched-for-physics-most-elusive-particle.html">
										https://nytimes.com/...
									</a>
								</li>
							</ul>
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/1F4D8.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Example: Pubmed</h2>
						<p>
							Enter a PMID (PubMed ID) or URL
							<ul>
								<li>
									<a href="https://cite.mickschroeder.com/?q=30280635">
										30280635
									</a>
								</li>
								<li>
									<a href="https://cite.mickschroeder.com/?q=https%3A%2F%2Fpubmed.ncbi.nlm.nih.gov%2F30280635%2F">
										https://pubmed...gov/...
									</a>
								</li>
							</ul>
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/1F522.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Example: DOI</h2>
						<p>
							Provide a persistent "address" to many types of work, from journal
							articles to research data sets.
							<ul>
								<li>
									<a href="https://cite.mickschroeder.com/?q=10.1126%2Fscience.169.3946.635">
										10.1126/science.169.3946.635
									</a>
								</li>
								<li>
									<a href="https://cite.mickschroeder.com/?q=https%3A%2F%2Fdoi.org%2F10.1038/nature21360">
										https://doi.org/...
									</a>
								</li>
							</ul>
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/1F4DA.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Example: ISBN</h2>
						<p>
							International Standard Book Number is an unique numeric book
							identifier.
							<ul>
								<li>
									<a href="https://cite.mickschroeder.com/?q=0323040683">
										0323040683
									</a>
								</li>
								<li>
									<a href="https://cite.mickschroeder.com/?q=https%3A%2F%2Fwww.amazon.com%2Fs%3Fk%3D0702052302">
										https://amazon.com/...
									</a>
								</li>
							</ul>
						</p>
					</article>
				</section>
				{/*	<section className="column feature section-rounded">
									<article>
									<img
										src="/static/images/openmoji/1F3F7.svg"
										className="feature-icon"
										width="66"
										height="66"
										alt=""
									/>
									<h2 className="h4">Manual entry</h2>
									<p>
										
									</p>
								</article>
							</section>
							<section className="column feature section-rounded">
								<article>
									<img
										src="/static/images/openmoji/270F.svg"
										className="feature-icon"
										width="66"
										height="66"
										alt=""
									/>
									<h2 className="h4">Editing an item</h2>
									<p>
										You might need to add or change a few fields after adding an
										item. Click on a bibliography entry to make manual changes.
									</p>
								</article>
							</section>
							<section className="column feature section-rounded">
								<article>
									<img
										src="/static/images/openmoji/1F525.svg"
										className="feature-icon"
										width="66"
										height="66"
										alt=""
									/>
									<h2 className="h4">Deleting items</h2>
									<p>
										Click the <i>remove</i> icon next to a bibliography entry to delete it. To start a new
										bibliography, click <i>Delete All</i> to remove all entries.
									</p>
								</article>
							</section>
						 </div>
						<div className="column"> */}
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/E1C1.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Style selection</h2>
						<p>
							Format your bibliography using AMA, APA, MLA, Chicago / Turabian,
							or any of the 9,000+ other{" "}
							<a href="http://citationstyles.org/">
								Citation Style Language (CSL)
							</a>{" "}
							styles{" "}
							<a href="https://github.com/citation-style-language/styles">
								maintained
							</a>{" "}
							by CSL project members. For more information, check out{" "}
							<a href="http://citationstyles.org/" rel="nofollow">
								CitationStyles.org
							</a>{" "}
							and the{" "}
							<a href="https://github.com/citation-style-language/styles/wiki">
								repository wiki
							</a>
							.
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/E25B.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Copy In-Text Citation and Notes</h2>
						<p>
							Click the "Copy Note" icon for in-text citations and endnotes /
							footnotes.
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/1F4E4.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Export Bibliography</h2>
						<p>
							Export your bibliography into many formats. Copy a formatted
							bibliography to your clipboard, HTML (for websites) or Download
							.RTF (for word processors), .RIS, .BibTeX, or save to Zotero.
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/1F468-200D-1F4BB.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">On-device Autosave</h2>
						<p>
							Your bibliography automatically saves to your browser’s local
							storage.
							<br />
							<b>Warning:</b> Clear your browser cache or use incognito mode if
							working with sensitive research.
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/E045.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Open Source</h2>
						<p>
							Based on{" "}
							<a href="https://github.com/zotero/bib-web" rel="external">
								ZoteroBib
							</a>
							. This program is free software: you can redistribute it and/or
							modify it under the terms of the{" "}
							<a href="https://www.gnu.org/licenses/agpl.html" rel="external">
								GNU Affero General Public License
							</a>{" "}
							as published by the{" "}
							<a href="https://www.fsf.org/" rel="external">
								Free Software Foundation
							</a>
							.
							<ul>
								<li>
									<a
										href="https://github.com/mick-schroeder/schroeder-cite"
										rel="external"
									>
										Project on GitHub
									</a>
								</li>
								<li>
									<a href="https://github.com/zotero/bib-web" rel="external">
										ZoteroBib Project on GitHub
									</a>
								</li>
							</ul>
						</p>
					</article>
				</section>
				<section className="column feature section-rounded">
					<article>
						<img
							src="/static/images/openmoji/1F9E9.svg"
							className="feature-icon"
							width="66"
							height="66"
							alt=""
						/>
						<h2 className="h4">Browser Extensions</h2>
						<p>
							Automatically load the current page in your browser.
							<ul>
								<li>
									<a
										href="https://chrome.google.com/webstore/detail/mick-schroeders-citation/gocmebnobccjiigdnakfmlieghedgdhk"
										rel="external"
										target="_blank"
									>
										Google Chrome Web Store
									</a>
								</li>
							</ul>
						</p>
					</article>
				</section>
				{/* <section className="column feature section-rounded">
								<img
									src="/static/images/about/link.svg"
									className="feature-icon"
									width="66"
									height="66"
									alt=""
								/>
								<h2 className="h4">Link to this version</h2>
								<p>
									If you want to edit your bibliography on another device, share
									it with someone else, or switch to another bibliography, you
									can generate a link to a copy of the current version on
									zbib.org. Use the link to retrieve your bibliography later.
								</p>
							</section> */}
			</div>
		</section>

		<p className="support"></p>
	</section>
);

Features.propTypes = {
	onGetStartedClick: PropTypes.func.isRequired,
};

export default memo(Features);
