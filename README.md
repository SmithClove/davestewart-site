# Dave Stewart

> Dave Stewart's personal website at https://davestewart.co.uk

## Frontmatter

The following frontmatter key/values can be used. 

### Post

| Key           | Description                                                               |
|---------------|---------------------------------------------------------------------------|
| `title`       | The post title                                                            |
| `shortTitle`  | A short post title to show on index pages                                 |
| `description` | The post description                                                      |
| `date`        | The publish date in the form `yyyy-mm-dd` (set in the future to schedule) |
| `breadcrumb`  | Text to use for the navigation breadcrumb                                 |
| `tags`        | A list of tags to show and appear in Search                               |
| `github`      | Github repo in the form `user/repo`                                       |
| `preview`     | Set to `true` to skip from thumbnail lists, but accessible by URL         |
| `hidden`      | Set to `true` to show in development but not production                   |
| `<any>`       | Any other data to be referenced in the page                               |

### Post media

| Key               | Description                                      |
|-------------------|--------------------------------------------------|
| `media`           | Top level key for media                          |
| `media.thumbnail` | File path to thumbnail image                     |
| `media.opengraph` | File path to social preview image                |
| `media.featured`  | File path to featured post image                 |
| `media.gallery`   | List of gallery file paths (replaces `featured`) |
| `media.<any>`     | Any other data to be referenced in the page      |

Optionally, the `gallery` node can hold more information:

| Key                  | Description                |
|----------------------|----------------------------|
| `media.gallery`      | List of gallery file paths |
| `media.gallery.src`  | Optional image file path   |
| `media.gallery.text` | Optional caption text      |
| `media.gallery.href` | Optional link to image     |

### Index

| Key           | Description                                                                |
|---------------|----------------------------------------------------------------------------|
| `layout`      | The layout for the index thumbnails, choose from`folder`, `tree`           |
| `order`       | The order of this folder in the parent list                                |
| `toc`         | An optional table of content to show, and which levels, for example, `2,3` |

## Status

Page Status is determined by `hidden`, `preview` and `date` frontmatter properties:

| Value       | Description                                                      |
|-------------|------------------------------------------------------------------|
| `new`       | Has a date, is published, and within 30 days of being published  |
| `scheduled` | Has a date, but not yet published, so hidden on production       |
| `preview`   | No date, but visible on production                               |
| `draft`     | Hidden on production, visible in development                     |
| `hidden`    | Hidden everywhere                                                |
