import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.tsx',
      fileName: 'graphiql-plugin-collection',
      name: 'GraphiQLPluginCollection',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['@graphiql/react', 'graphql', 'react', 'react-dom'],
      output: {
        globals: {
          '@graphiql/react': 'GraphiQL.React',
          graphql: 'GraphiQL.GraphQL',
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    commonjsOptions: {
      esmExternals: true,
      requireReturnsDefault: 'auto',
    },
  },
});
