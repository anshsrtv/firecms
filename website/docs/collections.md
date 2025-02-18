---
id: collections
title: Collections
sidebar_label: Collections
---

Once you have defined at least one entity schema, you can include it in a
collection. You can find collection views as the first level of navigation in
the main menu, or as subcollections inside other collections, following the
Firestore data schema.

* `name` The plural name of the view. E.g. 'products'.

* `relativePath` Relative Firestore path of this view to its parent. If this
  view is in the root the path is equal to the absolute one. This path also
  determines the URL in FireCMS.

* `defaultSize` Default size of the rendered collection.

* `group` Optional field used to group top level navigation entries under a
  navigation view. If you set this value in a subcollection it has no effect.

* `description` Optional description of this view. You can use Markdown.

* `properties` Properties displayed in this collection. If this property is not
  set every property is displayed.

* `excludedProperties` Properties that should NOT get displayed in the
  collection view. All the other properties from the entity are displayed. It
  has no effect if the `properties` value is set.

* `filterableProperties` List of properties that include a filter widget.
  Defaults to none.

* `initialFilter` Initial filters applied to this collection. Consider that you
  can filter any property, but only those included in
  `filterableProperties` will include the corresponding filter widget. Defaults
  to none

* `initialSort` Default sort applied to this collection. It takes tuples in the
  shape `["property_name", "asc"]` or `["property_name", "desc"]`

* `extraActions` Builder for rendering additional components such as buttons in
  the collection toolbar. The builder takes an object with
  props `entityCollection`  and `selectedEntities` if any are set by the end
  user.

* `pagination` If enabled, content is loaded in batches. If `false` all entities
  in the collection are loaded. You can specify a number to specify the
  pagination size (50 by default)
  Defaults to `true`

* `additionalColumns` You can add additional columns to the collection view by
  implementing an additional column delegate.

* `textSearchDelegate` If a text search delegate is supplied, a search bar is
  displayed on top.

* `permissions` You can specify an object with boolean permissions with the
  shape `{edit:boolean; create:boolean; delete:boolean}` to indicate the actions
  the user can perform. You can also pass a `PermissionsBuilder` to customize
  the permissions based on user or entity.

* `inlineEditing` Can the elements in this collection be edited inline in the
  collection view. If this flag is set to false but `permissions.edit` is `true`
  , entities can still be edited in the side panel.

* `exportable` Should the data in this collection view include an export button.
  You can also set an `ExportConfig` configuration object to customize
  the export and add additional values.
  Defaults to `true`

* `subcollections` Following the Firestore document and collection schema, you
  can add subcollections to your entity in the same way you define the root
  collections.

* `onEntityDelete` Hook called after the entity gets deleted in Firestore.

### Additional columns

If you would like to include a column that does not map directly to a property,
you can use the `additionalColumns` field, providing a
`AdditionalColumnDelegate`, which includes an id, a title, and a builder that
receives the corresponding entity.

In the builder you can return any React Component.

If you would like to do some async computation, such as fetching a different
entity, you can use the utility component `AsyncPreviewComponent` to show a
loading indicator.

### Subcollections

Subcollections are collections of entities that are found under another entity.
For example, you can have a collection named "translations" under the entity
"Article". You just need to use the same format as for defining your collection
using the field `subcollections`.

Subcollections are easily accessible from the side view while editing an entity.

### Filters

Filtering support is currently limited to string, number and boolean values,
including enum types. If you want a property to be filterable, you can mark it
as such in the entity schema.

Any comments related to this feature are welcome.

### Permissions

You can define the `edit`, `create` and `delete` permissions at the collection
level, also depending on the logged-in user.

```tsx
buildCollection({
    relativePath: "products",
    schema: productSchema,
    name: "Products",
    permissions: ({ user }) => ({
        edit: true,
        create: true,
        delete: true
    })
});
```

### Text search

Firestore does not support native text search, so we need to rely on external
solutions. If you specify a `textSearchDelegate` to the collection view, you
will see a search bar on top. The delegate is in charge of returning the
matching ids, from the search string.

A delegate using AlgoliaSearch is included, where you need to specify your
credentials and index. For this to work you need to set up an AlgoliaSearch
account and manage the indexing of your documents. There is a full backend
example included in the code, which indexes documents with Cloud Functions.

You can also implement your own `TextSearchDelegate`, and would love to hear how
you come around this problem.

