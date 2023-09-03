import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { Tab, Tabs, TabPane } from '../components';


describe('Tabs', () => {
    test('Shows a basic tabset', async () => {
        render(
			<>
				<Tabs>
					<Tab onActivate={ () => {} } aria-controls="tab-1-content">Tab 1</Tab>
					<Tab onActivate={ () => {} } aria-controls="tab-2-content">Tab 2</Tab>
				</Tabs>
				<TabPane id="tab-1-content"> Content of Tab 1 </TabPane>
				<TabPane id="tab-2-content"> Content of Tab 2 </TabPane>
			</>
        );
    })
});
