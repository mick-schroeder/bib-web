import { Fragment, memo } from 'react';

const Brand = () => (
	<Fragment>
		<h1 >
			<a className="tw-mb-4 tw-text-xl tw-font-extrabold tw-leading-none tw-tracking-tight tw-text-gray-900 md:tw-text-2xl lg:tw-text-3xl dark:tw-text-white"
			href="/">
			Generate Citation
			</a>
		</h1>
	</Fragment>
);

export default memo(Brand);
