# The Owl Path

A website for migrating owls.

## Deploying

The website content will automatically be updated when deploying via:

```
yarn deploy
```

The gallery images are assumed to live at `~/Resilio Sync/Owl Path`, but the path can be overwritten using the `GALLERY_PATH` environment variable (no trailing slash!).

## Developing

To run the site in dev mode, run either:

```
yarn dev
```

or

```
yarn now dev
```

## Writing a New Post

Simply add a new markdown file in the `posts` folder. Linked assets will automatically be rewritten.
