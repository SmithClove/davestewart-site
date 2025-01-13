# Dave Stewart

> Dave Stewart's personal website at https://davestewart.co.uk

## Frontmatter

The following frontmatter key/values can be used. 

### Post

General properties:

| Key           | Description                                                               |
|---------------|---------------------------------------------------------------------------|
| `title`       | The post title                                                            |
| `shortTitle`  | A short post title to show on index pages                                 |
| `description` | The post description                                                      |
| `date`        | The publish date in the form `yyyy-mm-dd` (set in the future to schedule) |
| `breadcrumb`  | Text to use for the navigation breadcrumb                                 |
| `tags`        | A list of tags to show and appear in Search                               |
| `github`      | Github repo in the form `user/repo`                                       |
| `visibility`  | Where and how to show the post (see table below)                          |
| `<any>`       | Any other data to be referenced in the page                               |

### Post visibility

How and where a post should show

| Value              | URL | List | Description                        |
|--------------------|:---:|:----:|------------------------------------|
| `public` (default) |  x  |  x   | Shows to all people                |
| `unlisted`         |  x  |      | Not listed but accessible by link  |
| `hidden`           |     |      | Only accessible in development     |

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

Page `status` is determined by `visibility` and `date` frontmatter properties:

| Value       | Props        | Page | List | Description                                                       |
|-------------|--------------|:----:|:----:|-------------------------------------------------------------------|
| `new`       | `date`       |  x   |  x   | Has a `date`, is published, and within 30 days of being published |
| `published` | `date`       |  x   |  x   | Hidden on production, visible in development                      |
| `scheduled` | `date`       |      |      | Has a `date`, but not yet published, so hidden on production      |
| `draft`     | `date`       |  -   |  -   | Hidden on production, visible in development                      |
| `unlisted`  | `visibility` |  x   |  -   | Page is public, but not listed on site in production              |
| `hidden`    | `visibility` |      |      | Hidden everywhere                                                 |
