import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for accessibility and SEO.',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          {title: 'SharePoint', value: 'sharepoint'},
          {title: 'Power Automate', value: 'powerautomate'},
          {title: 'Power Apps', value: 'powerapps'},
          {title: 'Copilot Studio', value: 'copilotstudio'},
        ],
        layout: 'list',
      },
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
              {
                type: 'textColor',
              },
            ],
          },
        },
        {
          type: 'image',
        },
        {type: 'table'},
        {
          type: 'code',
        },
      ],
    }),
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.custom((tags: string[]) => {
          if (!tags) return true

          const lowerCaseTags = tags.map((tag) => tag.toLowerCase())

          const uniqueTags = new Set(lowerCaseTags)
          if (uniqueTags.size !== lowerCaseTags.length) {
            return 'Tags must be unique (case-insensitive).'
          }

          return true
        }),
    },
    defineField({
      title: 'Related Posts',
      name: 'relatedPosts',
      type: 'array',
      validation: (Rule) => Rule.max(3).unique(),
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
          options: {
            disableNew: true,
            filter: ({document}) => {
              console.log(document)
              const normalizedId = document._id.replace(/^drafts\./, '')
              return {
                filter: `_id != "${normalizedId}" && _id != "drafts.${normalizedId}"`,
                params: {
                  id: normalizedId,
                },
              }
            },
          },
        },
      ],
    }),
  ],
})
