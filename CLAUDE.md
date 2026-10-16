# Project Architecture Rules

## Next.js App Router

This project uses the App Router.

## Feature Sliced Design

This project follows the Feature Sliced Design architecture.

### Folder Structure

- `public/` - Static pictures and icons to be embedded in app.
- `src/shared/` - Minimum level of modules that do not belong to any business logics.
- `src/entities/` - Modules that have business logics or are object in business.
- `src/features/` - Modules that represent behaviors or interactions that are vaild for users in business.
- `src/widgets/` - Modules that are combined with multiple entity-level moudles and feature-level ones, resulting in having unified objectives.

### Rules

1. Add client components as close to a leaf of the render tree as possible.
2. Split into route handlers if maximum expected post body exceeds 4 megabytes.
3. File names: kebab-case, types/interfaces: PascalCase, variables/functions: camelCase.
4. Use TypeScript strict mode, no any type.
5. Prefer switch-case to if-else when multiple branches are split on one primitive variable.
6. Strings in markups like JSX: double-quote, ones in elsewhere in JavaScript/TypeScript files: single-quote
7. Always use Block Statement for if-else.
8. Specify expected types in `<...>` if generic, especially `useState`.
9. Modules' level: widgets (highest) > features > entities > shared (lowest).
10. If you are implementing shared-level modules, do not import ones that are in the higher levels.
11. If you are implementing entity-level/feature-level/widget-level modules, do not import ones that are in the same or higher levels.
12. Always start with `is` for boolean variables.
