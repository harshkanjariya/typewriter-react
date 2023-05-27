import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export default {
    input: "src/index.tsx",
    output: {
        name: 'typewriter',
        file: 'dist/bundle.js',
        format: 'umd',
        sourcemap: 'inline' // Specify inline sourcemap
    },
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        postcss({
            extensions: ['.css', '.scss']
        })
    ]
};