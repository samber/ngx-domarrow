# ngx-domarrow

This library brings [domarrow](https://github.com/schaumb/domarrow.js) to Angular 2+.

See [demo]().

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
<ngx-domarrow from="#image-1" to="#image-2" [tail]="true" color="red" text="Hello world" [onlyVisible]="true"></ngx-domarrow>

<ngx-domarrow from="#image-1" to="#image-2" [head]="true" [tail]="true" color="#0000FF" [onlyVisible]="true"></ngx-domarrow>
```

```

## Contribute

```bash
npm install
npm run build
npm run test
npm run lint
```

```
npm publish
```

## Credits

👏 Thanks to [Bela Schaum](https://github.com/schaumb) for building [domarrow](https://github.com/schaumb/domarrow.js).
