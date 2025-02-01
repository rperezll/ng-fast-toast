# Ng-fast-toast

A **fast** and **lightweight** library for **Angular 18+** that makes handling alerts and notifications effortless. Styled with Tailwind but built for production with a **fully agnostic approach using Shadow DOM**.

_"Fast alerts, no hassle and powered by Shadow DOM!"_

> [!WARNING]
> **ng-fast-toast** is still in development. It does not have a release yet.

You can try the [**Live Demo**](https://ng-fast-toast.vercel.app)

## ✨ Features

- 💡 **Easy to use**: Simple API to trigger notifications with various types and styles.
- 🎨 **Customizable**: Fully configurable notification styles.
- 📱 **Agnostic**: A library with encapsulated styles, designed to work seamlessly across a wide range of Angular project configurations.
- 🥰 **Minimal**: Only requires dependencies from Angular Core, ensuring a lightweight and hassle-free integration.

## 🕹️ Installation and Usage

1. **Install the library:**

```bash
npm i ng-fast-toast@latest
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

You can find the full configuration and additional details in the [**complete documentation site**](https://ng-fast-toast.rperezll.dev/).

> [!WARNING]
> The **documentation site** is still under construction.

## 📝 License

Copyright © 2025 rperezll (https://github.com/rperezll)

- This project is licensed under the **GPL-3.0 License**.
- See the [**LICENSE file**](https://github.com/atmgrupomaggioli/docshub/blob/main/LICENSE) for more information.
