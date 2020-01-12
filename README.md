# ngx-domarrow

This library brings [domarrow](https://github.com/schaumb/domarrow.js) to Angular 2+.

See [demo](https://samber.github.io/ngx-domarrow).

## Install

```bash
npm install ngx-domarrow
```

## Usage

1. Add declaration to your app.module.ts

```ts
import { NgxDomarrowModule } from 'ngx-domarrow';

@NgModule({
  imports: [
    ....,
    NgxDomarrowModule
  ],
  ...
})
```

2. Add it to your template.

```html
<ngx-domarrow from="#image-1" to="#image-2" [tail]="true" [onlyVisible]="true"
        color="red" text="Hello world"></ngx-domarrow>

<ngx-domarrow from="#image-1" to="#image-2" [head]="true" [tail]="true"
        color="#0000FF"></ngx-domarrow>
```

## Contribute

```bash
npm install
npm run build
npm run test
npm run lint
```

## Publish

Update package version into `lib/package.json`

```
npm run build
cd dist/ngx-domarrow/
npm publish
```

## Credits

👏 Thanks to [Bela Schaum](https://github.com/schaumb) for building [domarrow](https://github.com/schaumb/domarrow.js).
