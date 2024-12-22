# Ng-fast-toast

A **fast and lightweight Angular (18+) notification library** for adding stylish, customizable toast alerts to your app. Perfect for projects with **Tailwind** or simple setups, it offers easy control over appearance, position, and behavior.

_"Fast alerts, less hassle, and yes, it plays nicely with Tailwind!"_

> [!WARNING]
> **ng-fast-toast** is still in development. It does not have a release yet.

<div style="margin-top: 20px; margin-bottom: 20px;" href="https://ng-fast-toast.vercel.app/" align="center">
  <img alt="Snapshot funcionality ng-fast-toast" src="/docs/images/ng-fast-toast.png" height="auto" width="500" style="border-radius:50%">
</div>

You can try the [**Live Demo**](https://ng-fast-toast.vercel.app)

## ✨ Features

- 💡 **Easy to use**: Simple API to trigger notifications with various types and styles.
- 🎨 **Customizable**: Fully configurable notification styles.
- 📱 **Responsive**: Optimized for all screen sizes and devices, ensuring notifications look great on mobile, tablet, and desktop.

## 🕹️ Installation and Usage

1. **Install the library:**

```bash
npm i ng-fast-toast
```

2. **Configure Tailwind:**

- Add this to your `tailwind.config`:

```ts
content: [
  "./node_modules/ng-fast-toast/**/*.{html,ts,js,mjs}"
],
```

3. **Import the toast component `NgFastToastComponent`:**

```ts
import { Component } from "@angular/core";
import { NgFastToastComponent } from "ng-fast-toast";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NgFastToastComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
```

4. **Add the `<ng-fast-toast>` selector:**

```html
<ng-fast-toast></ng-fast-toast>
```

A log message `🍞 ng-fast-toast initialized correctly with default config.` is print in the browser console.

5. **Use the toast service:**

```ts
toast = inject(NgFastToastService);

ngOnInit() {
  this.toast.success({content: 'ng-fast-toast are ready!'});
}
```

Now you can showcase the `success` notification example 🚀.

## 📚 Documentation

You can find the full configuration and additional details in the [**complete documentation site**](/).

## 📝 License

- [GPL-3.0 license](https://github.com/atmgrupomaggioli/docshub/blob/main/LICENSE)
