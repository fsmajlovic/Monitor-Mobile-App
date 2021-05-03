import React from 'react';
import renderer from 'react-test-renderer';

import { testZaJest } from '../../../screens/AccessControlScreen/AccessControlScreen';

describe('AccessControlScreen', () => {
    it('Primjer 1', () => {
        //const tree = renderer.create(<App />).toJSON();
        //expect(tree.children.length).toBe(1);
        var rezultat = testZaJest(2);
        expect(rezultat).toEqual(true);
    });
});

describe('AccessControlScreen', () => {
    it('Primjer 2', () => {
        var rezultat = testZaJest(3);
        expect(rezultat).toEqual(false);
    });
});
