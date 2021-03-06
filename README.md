# Useful React.js Code Snippets

## Why React?

- Useful if there is a need for maintaining UI state

## Alternatives to React

1. Angular (framework)
2. Vue (framework)

## Two Types of Applications

1. SPA (Single Page Application)
   - Only ONE HTML page, content is re-rendered on client
   - In React.js, only contains one render() call (hereby called the 'root' component)
2. MPA (Multi Page Application)
   - Multiple HTML pages, content rendered on server
   - In React.js, one render() call per 'widget' on page or pages (components are isolated from each other)

## Tips & Tricks

- Usually need to import 'react' and 'react-dom'
- Babel used to transform react.js code (jsx) --> js
- Use the spread operator `...` to make copies of arrays in order to avoid mutating original array (Make application state as predictable as possible)
  - eg, `[...stateHook.someArray]` returns copy of --> (given: `[stateHook, setStateHook] = useState({ someArray: [{id: 1, name: "a"}, {id: 2, name: "b"}, ...] })`)

### Basics

- Build workflow (local)
  - why?
    - Alternate to using codepen.io or any
    - best for optimizing code (eg, webpack, babel)
    - using latest js features (ES6+)
    - productivity!!!
  - how?
    - via dependency management tool (npm, yarn)
    - bundler (webpack!)
      - bundle files
      - apply build steps
    - compiler (ES6+)
      - babel
      - presets
      - webpack config
    - development server (local)
      - need webserver to simulate http protocol (shouldn't use file:// protocol)
    - zero config react project?
      - likely create-react-app
- Understanding an app written using reactjs
  - Think of it as a tree of components
- Understanding JSX
  - Using render(), must return one root DOM element
    - Can wrap multiple components in a single parent component
    - Behavior changes in React 16.x
  - React.createElement('HTML element (eg, div)', null, children_components)
    - To add child components, need to nest React.createElement()
  - JSX !== HTML
    - eg, className (jsx) vs class (html)
- Standards when naming components
  - Should begin with capital letters (eg, ❌ <person> ✅ <Person>)
- Benefits of functional components vs class components?
  - Functional
    - pure;
    - presentational;
    - "dumb";
    - "stateless"
  - Class
    - "smart"
    - "stateful"
    - "container" component
- Why use components at all?
  - RE-USABILITY
  - Composable
  - Readability
- Working with dynamic content
  - Need to wrap js functions in `{}`
    - eg, `{ Math.random() }`
  - Functional components: Can pass data through `props`
    - For class components: access through `this.props`
- Children Property
  - Accessed through `props.children` (functional)
    - Class: `this.props.children`
  - `children` is reserved keyword to access children properties
    - eg, `<Person ...some_props>CHILDREN PROPERTY HERE</Person>`
- Using state in class components
  - Special property called `state` in class components
  - Upon any update of the `state` property, the component is re-rendered
- Adding event listener
  - Use `onClick`
    - Only pass method reference/object, do not include () since it will immediately invoke the function on page load or component render
      - eg, ✅ `<SomeComponent onClick={this.state.someMethod} />`
      - eg, ❌ `<SomeComponent onClick={this.state.someMethod()} />`
  - Other supported events
    - includes `onCopy`, `onCut`, `onPaste` ...
    - https://reactjs.org/docs/events.html#supported-events
    - Even includes composition, keyboard events
      - `onCompositionEnd`, `onKeyDown` ...
  - Managing state
    - Use `this.setState({ ... })`
    - DO NOT MUTATE STATE DIRECTLY
      - eg `this.state.something = "state changed?"`
      - produces warning
    - In React 16.x and up: can now update state using hooks!
      - \*\*Hooks work in functional components as well\*\*
      - reference: https://reactjs.org/docs/hooks-overview.html
  - Hooks (React 16.x+ only!)
    - `useState`
      - Can be used in functional components
      - Returns two objects: the initial state, and a function to update the state
      - CAVEAT: `useState()` does not replace values, but rather overwrites, need to make sure the state is consistent
        - Can get around this by using multiple `useState()` methods to update only portions of the state that needs to be updated
  - Stateless vs Stateful components
    - React team recommends using stateless components over stateful components
    - Stateless components should act as slaves to stateful components
      - Stateful components have the logic to modify and manage the state and update where necessary
    - An application with MANY stateful components is considered an anti-pattern and is very difficult to manage and debug (possible difficult to test as well)
  - Method references b/w components
    - Can pass method references to child components
      - Create property, pass method reference
      - eg, `<Person click={someFunctionInParent} />`; in child component --> `<p onClick={props.click} ...</p>`
    - Two ways to pass method references w/ args
      - Through `{ () => someFunction("argumentHere") }`; -- May result in performance loss due to how anonymous functions work in js
      - `{ someFunction.bind(this, "argumentHere") }` -- May be more readable, efficient?
  - Two way binding
    - Given an input with `value` set
      - Must include
        1. Provide `onChange` Handler

### Debugging

- just use chrome/safari dev tools
- breakpoints are your friend as well as sourceMaps (thanks webpack!)
- react developer tools (extension in chrome)
- New in React 16.x (Error Boundaries)
  - Similar to try/catch blocks, should only used with problematic code
  - do not wrap entire application in an error boundary

### Styling Components

- Styling
  - Two methods to styling
    1. Create global \*.css file (Injection handled by Webpack!)
       - Must import into \*.js file which the style will be used
       - eg, `import './someStyling.css'` in `Person.js`
    2. Inline styling
       - Use `style={someStyle}` on component
       - Write JS object with necessary styling
       - !!! Styling scoped to component !!!
       - CAVEAT -- limitations exist, cannot leverage full power of CSS or other CSS pre-processor
       - cannot leverage pseudo selectors (hover)
  - Dynamic inline styling
    - Can add dynamic styling by defining inline style, then change different properties. On re-render of component (or any state changes), style of component(s) will be updated
  - Dynamic class styling
    - Same as inline styling, need to define classes in _.css file first then reference them in the _.js file
  - Can overcome limits of inline styling by using an optional third party package
    - Can use psuedo selectors, media queries ...
    - Radium (as of today (5/27/19), does not work with React Hooks so use Styled Components)
    - Styled components
  - Scoped CSS files (using webpack & css modules)
    - if using create react app, must eject first!
    - modify webpack configuration files (css modules)

### More About Components (Deep Dive)

- Project structure
  - Should create components where necessary
    - Person components encapsulated in a Persons component
  - /src/assets directory
    - contains all images
  - containers directory
    - App.js/App.css
    - files/components here manage state
- class vs functional components
  - class:
    - access to state
      - via this.state.XY & this.props.XY
    - access to lifecycle hooks
  - functional:
    - access to state (useState() hook)
      - props.XY
    - no access to lifecycle hooks (???, changed in react 16.x with hooks? such as useEffect() ??? -- need to explore)
- Component Lifecycle
  - DOES NOT EQUAL REACT HOOKS IN REACT 16.x
  - Creation -- usually begins with ...
    - `constructor(props)`
      - should not cause any side effects (eg, analytics, http requests)
      - sets up initial state (DO NOT USE setState() hook)
    - Then ...
      - `getDerivedStateFromProps(props, state)`
        - State is synchronized
        - DO NOT CAUSE SIFE EFFECTS HERE!
        - Has to include `static` keyword
      - Then ...
        - `render()`
          - Prepares and structures JSX code
          - do not introduce any blocking components
        - Then ...
          - Render child components
            - Once render is finished ...
              - `componentDidMount()` executes (possibly some other lifecycle methods/hooks)
                - CAN CAUSE SIDEFFECTS HERE
                - do not update state here, can cause cyclic rendering and other performance issues
  - Update -- usually begins with ...
    - `getDerivedStateFromProps(props, state)`
      - Updating state from outside changes
      - Very rarely needed to use this, state can be managed elsewhere (useState() hook?)
        - Then ...
          - `shouldComponentUpdate(nextProps, nextState)`
            - Allow cancel of updating process
            - Can optimize performance here
            - Very easy to break component tree
            - DO NOT CAUSE SIDE EFFECTS
              - Then ...
                - `render()`
                  - Prepare and structure jsx code
                  - Upate child component props
                    - Then ...
                      - `getSnapshotBeforeUpdate(prevProps, prevState)`
                        - returns snapshot object to freely configure
                        - used for last minute DOM operations
                        - controlling focus, scrolling position, cursor location?
                          - Then ...
                            - `componentDidUpdate()`
                              - Can cause sideeffects here [with http, analytics]
                              - Avoid infinite loops (like updating state)
    - useEffect() hook
      - Potentially replaces componenetDidUpdate and componenetWillUpdate
      - Tricky to use since it combines both of the aforementioned lifecycle hooks
      - Can control by passing in secong argument to `useEffect(func, [])`
        - array contains properties to watch for changes
        - will run by default for 1 time, but subsequent renders (without changes to variables defined in []) will not execute useEffect!
    - Clean up work methods
      - Can use `componentWillUnmount()`
      - In useEffect(), in the first argument you can return a function which will run BEFORE the main useEffect but AFTER the first render cycle
    - Optimizing rendering
      - `shouldComponentUpdate()`
      - Can see what is re-rendered in chrome
        - Chrome Tools > dot menu > More tools > Rendering > Paint flashing
      - To optimize function components, wrap in `React.memo(...)` when exporting
        - only re-renders these components if the props have changed
      - If required to check ALL props to determine if re-render is needed ...
        - In class components, could extend a `PureComponent`, do not implement `shouldComponentUpdate()`
    - React and updating DOM
      - Use of virtual vs actual DOM
      - Updating or re-rendering actual DOM is a slow operation!
    - Returning more than one element from a `render()`
      - Wrap elements in `<div>`
      - Can wrap jsx elements in an array `[]`
        - Need to assign `key` value to each element
      - Use a wrapping component (higher order component) that does not render any HTML
        - Functional component that returns `props.children`
      - In react 16.x, there are `<React.Fragment>`
    - Higher order components
      - Convention: prefix with `With`
      - In hocs, can add error handling, custom styling ..
    - Passing Unknown Props
      - In higher order component, use `{...props}` when passing wrapped component
    - Optimal way to update state when depending on old state
      - `setState()` can accept a callback function with 2 arguments (previous, props)
        - eg `setState((prev, props) => { return { someVariable: prev.someVariable + 1 }}`
    - PropTypes (enforcing type requirements for components)
      - Improve way with receiving props
      - `import PropTypes from 'prop-types'`
    - Using Refs
      - classes: Can use React.createRef() in constructor, use ref keyword in component and reference the element in the componentDidMount() lifecycle hook (see Person.js)
      - classes: In referenced component, use the `ref` keyword and use an anonymous function to create an element in the class referring to the component element `<Component ref={(el) => this.compRef = el}>`
        - Then use the componentDidMount() method and call the desired function(s) to apply
      - functional components: Create ref with `useRef(<some_initial_state)`, add ref keyword to component, then call `someRef.current.someFunction` in a `useEffect()` hook
    - Understanding prop chaining problems
      - Passing props down multiple levels and only forwarding to components that need it
      - Makes components less reusable
      - CAN USE CONTEXT API TO AVOID PROP CHAINING!
        - Allows for passing of state to the component(s) that need it
        - `React.createContext(anyValueHere)`
        - Create new file and export variable with React.createContext({someVariable: "iniState"})
          - eg, `const Context = React.createContext({blah: "hello"}); export default Context;`
          - Object is optional, however helps with code completion in vscode
        - In components you want to access these variables, wrap in `<Context.Provider value={{blah: someStringOrOtherVariableOrFunction}}>`
        - In components where these variables will be referenced, wrap component in `<Context.Consumer>`
          - between these tags: `{ (context) => <p>context.blah</p> }`
          - The consumer function executes this function
        - In React 16.x, allows the use of context api outside of render function and in functional components as well
          - classes: declare `static contextType = ContextComponentYouCreated` in class
            - to access, use `this.context.variableWithinContextComponentYouCreated`
            - much simpler syntax! easier to read!
          - functional: use `useContext` hook!

### HTTP Requests

### Routing

### Forms & Validation

### Redux

### Authentication

### Testing

### Deployment

### Miscellaneous

### References

- https://reactjs.org/docs/hooks-effect.html
- https://reactjs.org/docs/state-and-lifecycle.html
- https://reactjs.org/docs/typechecking-with-proptypes.html
- https://reactjs.org/docs/higher-order-components.html
- https://reactjs.org/docs/refs-and-the-dom.html
