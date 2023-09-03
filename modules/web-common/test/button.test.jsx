import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { Button } from '../components';


describe('Button', () => {
    test('Shows a basic button', async () => {
        render(
            <Button>FooBar</Button>
        );
    })
});
