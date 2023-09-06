import { Fragment, memo } from 'react';

const Brand = () => (
	<Fragment>
		<div className="tw-mb-4">
<h2 className="tw-mb-0 tw-text-3xl tw-font-extrabold dark:tw-text-white">Automatically Suggest Citations<span className="tw-bg-blue-100 tw-text-blue-800 tw-text-2xl tw-font-semibold tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded dark:tw-bg-blue-200 dark:tw-text-blue-800 tw-ml-2">FREE</span></h2>
<p className="tw-mb-4 tw-text-normal tw-font-normal tw-text-gray-500 dark:tw-text-gray-400">Provide a source you would like to reference. We’ll transform it into a ready-to-use citation in any format. Auto-detect supports Website URLs, Identifiers like DOI, Pubmed IDs...{" "}
<a href="#" className="tw-inline-flex tw-items-center tw-text-lg tw-text-blue-600 dark:tw-text-blue-500 hover:tw-underline">
Learn more
<svg className="tw-w-3.5 tw-h-3.5 tw-ml-2 tw-float-right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</a></p>
</div>
	</Fragment>
);

export default memo(Brand);
