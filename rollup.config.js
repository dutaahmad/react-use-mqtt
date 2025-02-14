import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',  // Output format as ES Module
      sourcemap: true,  // Generate sourcemaps for easier debugging
    },
  ],
  plugins: [
    nodeResolve(),  // Resolves third-party modules from node_modules
    commonjs(),  // Converts CommonJS modules to ES6
    typescript({
      tsconfig: './tsconfig.json',  // Use your existing tsconfig for consistency
    }),
  ],
  external: ['react', 'mqtt'],  // Treat React and MQTT as external dependencies
};
