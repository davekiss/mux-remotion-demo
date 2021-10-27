# mux-remotion-demo

Make sure to set your Mux access token and secret key!

Copy the `.env.example` file to a new file called `.env` and add your keys there.

You'll also need to install ffmpeg to render your video locally. You can do that on MacOS with homebrew by running `brew install ffmpeg`. This will take a few minutes to download and install, so now is a good time to go check your mail or do a few laps around the block.

This demo uses `date-fns` to help easily calculate timeframes for which we'd like to pull stats from.

### Notes

- `Composition` elements defined in `Video.tsx` will be added to the media library in the app sidebar.
- Setting a `durationInFrames` prop on the `Sequence` component in the `Timeline` specifies how long the component should display for.

## Commands

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Server render demo**

```console
npm run server
```

See [docs for server-side rendering](https://www.remotion.dev/docs/ssr) here.

**Upgrade Remotion**

```console
npm run upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help [on our Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Notice that for some entities a company license is needed. Read [the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
