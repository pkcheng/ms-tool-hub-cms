import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {table} from '@sanity/table'
import {codeInput} from '@sanity/code-input'
import {simplerColorInput} from 'sanity-plugin-simpler-color-input'
import {media} from 'sanity-plugin-media'
import {Logo} from './components/Logo'

export default defineConfig({
  name: 'default',
  title: 'MS Tool Hub',
  projectId: 'svu1pgli',
  dataset: 'production',
  icon: () => Logo,
  plugins: [
    structureTool(),
    visionTool(),
    table(),
    codeInput(),
    media(),
    simplerColorInput({
      defaultColorFormat: 'rgba',
      defaultColorList: [
        {label: 'Light', value: '#ffffff'},
        {label: 'Dark', value: '#333333'},
        {label: 'Red', value: '#ef4444'},
        {label: 'Green', value: '#22c55e'},
        {label: 'Custom...', value: 'custom'},
      ],
      enableSearch: true,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
