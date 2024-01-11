#### Folder structure

- assets
- localization
  - lang-1.json
  - lang-2.json
- src
  - common
    - components
    - data
      - hooks
      - constants.ts
      - utils.ts
      - helpers
      - models
  - pages
    - CalendarPage
      - components
        - Calendar
          - ...calendarRelatedComponents
        - Events
          - ...eventRelatedComponents
      - data
  - redux
    - hooks.ts
    - reducers.ts
    - store.ts
  - routes
    - AppRoutes.tsx
    - client-routes.ts
    - api-routes.ts

#### Component folder structure

Component.tsx

- data
  - models
    - component.helper.ts
  - reducers
    - component.reducer.reducer.ts
    - component.reducer.actions.ts
    - component.reducer.initialState.ts
  - services
  - documentation.ts

#### Component file structure

constants
hooks
state
selectors
variables
methods
useEffect
conditional rendering
JSX
max 100 lines of code
DOCS

#### DOCS

Represents - what is this component / functionality
Holds - what children components / functions are included
Responsible for - what does this component / functionality do

JSDoc for service methods

#### Helpers

Methods that are not tied to react specific functionalities

#### Custom Hooks

Methods that are tied to react specific logic

#### Services

Files responsible for methods that call APIs and return a response

#### Namings

Components - ComponentName.tsx
Helpers - component-name.helper.ts
Service - component-name.service.ts
Hooks - useCustomHook.ts
Reducer Files - component-name.reducer.[actions / initialState / reducer].ts
Constant variables - CONSTANT_VARIABLE
Documentation - component-name.documentation.md
Action method - handleDoStuff
Static method - doStuff

#### Others

Always validate against parameters
Early returns
No warnings allowed
