# The Owl Path

A website for migrating owls.

## Setup

Run:

```
yarn update
```

If you haven't logged into Instagram yet, you will have to do so now (in the browser window that was opened), then close the browser and re-run the command.

## Update Content

To automatically update the site's content, run:

```
yarn deploy
```

## Writing a New Post

Run:

```
yarn cli post "my-title-slug"
```

Then, edit the new file generated in `_posts` and run `yarn deploy`.

The slug has no pratical meaning other than making the files in `_posts` easier to recognise.

## Serve Locally

Run:

```
yarn dev
```

Jekyll will show errors about duplicate directories (even though they are excluded), but you can safely ignore those.

Then browse http://localhost:4000/owlpath/
