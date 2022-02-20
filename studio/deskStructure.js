import S from '@sanity/desk-tool/structure-builder'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) => !['site-config'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
