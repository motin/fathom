import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import copy from 'rollup-plugin-copy';

/**
 * Return typical rollup settings for a file of a given name.
 */
function mindlesslyFactoredOutSettings(name) {
    return {
        input: 'src/' + name + '.js',
        output: {
            file: 'addon/' + name + '.js',
            format: 'iife',
            name  // Convention: name the var the same thing.
        },
        plugins: [
            resolve({preferBuiltins: true}),
            commonjs({
                namedExports: {
                    'wu': ['forEach', 'map', 'flatten']
                }
            }),
            json(),
            globals(),
            builtins(),
            copy({
                'node_modules/simmerjs/dist/simmer.js': 'addon/simmer.js',
            }),
        ]
    }
}

export default [
    mindlesslyFactoredOutSettings('contentScript'),
    mindlesslyFactoredOutSettings('evaluate')
];
