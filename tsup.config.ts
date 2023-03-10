import { defineConfig } from 'tsup'

export default defineConfig( {
	clean: true,
	dts: true,
	entry: [ 'src/main.ts', 'src/test.ts' ],
	format: [ 'cjs', 'esm' ],
	minify: false,
	sourcemap: true,
	splitting: true,
	treeshake: true,
} )