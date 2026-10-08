# Next Theme — Reusable UI Foundation

A production-oriented Next.js + Tailwind CSS design system intended to be copied into many applications instead of being coupled to one product domain.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4 with CSS-first configuration
- Lucide React
- Class Variance Authority
- `clsx` + `tailwind-merge`
- React Hook Form + Zod
- pnpm

## Quick start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Production checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## Project structure

```text
src/
├── app/                         # Demo routes and App Router entry points
├── components/
│   ├── ui/                     # Reusable primitives and interaction components
│   ├── forms/                  # React Hook Form composition helpers
│   ├── layouts/                # Page/application shells
│   └── theme/                  # Theme runtime + playground controls
├── config/                     # Default product-independent theme configuration
├── hooks/                      # Thin reusable hooks
├── lib/                        # Small pure utilities
├── styles/                     # Global CSS and semantic theme tokens
└── types/                      # Shared theme types
```

## Design tokens

`src/styles/theme.css` is the source of truth for semantic colors, typography, spacing, radius, shadows, control heights, and density variables.

Components use semantic tokens such as:

```text
bg-background
text-foreground
bg-primary
text-primary-foreground
border-border
ring-ring
bg-card
text-card-foreground
```

To create another visual identity, change the token layer rather than rewriting component classes.

## Themes

Built-in color themes:

- Blue
- Violet
- Green
- Orange
- Rose
- Neutral

Built-in modes:

- Light
- Dark
- System

Theme state is persisted in `localStorage` and initialized before the page paints through `ThemeScript` to minimize a theme flash.

## UI density

Density is controlled centrally and modifies control heights, cards, table rows, navigation spacing, and section spacing.

```ts
compact
comfortable
spacious
```

## Component usage

```tsx
import { Button, Card, CardContent, Input } from "@/components/ui";

export function Example() {
  return (
    <Card variant="interactive">
      <CardContent className="grid gap-4">
        <Input label="Email" placeholder="you@example.com" />
        <Button variant="primary">Continue</Button>
      </CardContent>
    </Card>
  );
}
```

### Variants

Variants use CVA so the component API stays stable while styles stay centralized.

```tsx
<Button variant="outline" size="sm" />
<Card variant="elevated" />
```

### Toasts

Wrap the application with `ToastProvider` (already done in `src/app/layout.tsx`) and call the API from client-side interactions:

```tsx
import { toast } from "@/components/ui";

toast.success("Saved successfully");
toast.error("Something went wrong");
toast.info("New update available");
toast.warning("Review before publishing");
```

## Forms

The form layer intentionally separates validation from presentation.

```tsx
const schema = z.object({
  email: z.email(),
});

const methods = useForm<Values>({
  resolver: zodResolver(schema),
});

<Form methods={methods} onSubmit={onSubmit}>
  <FormField
    name="email"
    render={({ field, error }) => (
      <Input {...field} type="email" error={error} />
    )}
  />
</Form>
```

## Adding a new theme

1. Add the theme name to `src/types/theme.ts`.
2. Add light and dark semantic variable overrides in `src/styles/theme.css`.
3. Add a label in `src/config/theme.config.ts`.
4. Add the theme to the theme controls if you want it exposed in the playground.
5. Do not rewrite component styles.

## Adding a component

Keep a component product-independent. Prefer:

```text
semantic token → variant → component → page composition
```

Avoid:

```text
product rule → component → one-off page
```

Components should expose typed props, a `className` escape hatch, states where appropriate, and semantic markup.

## Reusing the foundation in another project

Copy the `src/components`, `src/config`, `src/hooks`, `src/lib`, `src/styles`, and `src/types` directories plus the required package dependencies. Keep the app routes separate from product code. The `app/components`, `app/dashboard`, `app/forms`, `app/layouts`, and `app/themes` routes in this repository are demos/reference material, not part of the product domain.

## Accessibility

The system favors native HTML controls when their behavior is already accessible (`select`, checkbox, radio) and uses ARIA/focus handling where custom behavior is required (dialog, dropdown, tabs, switch, tooltip). All interactive components expose visible focus states and keyboard paths.

## Tailwind v4 note

This project intentionally does not use a `tailwind.config.ts`. Tailwind CSS v4 supports CSS-first configuration, so the design tokens and theme mappings live in `src/styles/theme.css`.

## License

Use the project as a starting point for your own applications. Add your preferred license before publishing a distributed package.
# next-reusable-ui-theme
