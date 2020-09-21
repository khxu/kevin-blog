---
title: The XState Timer Example in 4 Different User Interfaces
date: "2020-09-20T04:27:03.234Z"
coverImage: "xstate.png"
description: XState state charts
---

"Write once, run everywhere." A mantra championed by hard-working and lazy engineers alike. XState is a library that's been on my radar for a while and I finally got around to giving it a whirl this past week. See below for some examples that I think illustrate the portability that XState enables.

## Finite State Machines, Statecharts, and XState
The [XState docs](https://xstate.js.org/docs/about/concepts.html) and its [(companion site on statecharts more generally)](https://statecharts.github.io) do a great job of explaining the advantages of using finite state machines to model a system (and how statecharts overcome some of the [drawbacks](https://statecharts.github.io/state-machine-state-explosion.html) of finite state machines), so I won't repeat those here. NASA seems to have had good experiences working with statecharts in their flight software for Curiosity, though, and they created a [nice slide deck](https://trs.jpl.nasa.gov/bitstream/handle/2014/43235/12-5232_A1b.pdf?sequence=1&isAllowed=y) of their lessons learned. A couple of highlights I took from that presentation:

- Statecharts facilitated extensibility/maintainability ("Accommodated late-breaking requirements changes" - p.21).
- Statecharts are most useful when there are multiple entry points to a system ("When to use a statechart: Branching, nesting, and looping. When NOT to use a statechart: When the statechart is a single chain" - p.22). Interestingly, XState offers a pattern for this [type of machine](https://xstate.js.org/docs/patterns/sequence.html), so I wonder if this is due to a limitation of the AutoCoder that JPL developed, or if it's just that the benefit of a statechart for a single-track sequence of events isn't high.

## Integration Costs
In any situation where code is reused, there's some time and effort required to integrate that code into a different system. In the case of XState, assuming you've followed their advice and avoided referencing the view layer from within the machine definition, all you need to do is wire up the UI to the various states/context variables of the machine. To illustrate this, I've drafted 4 different views that use the **same exact XState machine definition** (adapted from the [Timer tutorial](https://xstate.js.org/docs/tutorials/7guis/timer.html)).

## React (JS, not TS) Timer
XState's tutorial code implements the Timer machine in TypeScript. Below, I've adapted it to JavaScript, not as a knock against TypeScript, I'm just not as familiar with TS (which I hope to change over the coming months).

https://codesandbox.io/s/xstate-timer-react-td5tp

## No Framework, Vanilla JS Timer
For those of you who feel like frontend frameworks just add bloat and overcomplicate things.

Implementing this without a framework was interesting. Made me realize how much I've gotten used to React handling re-renders for me when props change.

https://codesandbox.io/s/xstate-timer-efjsp

## CLI Timer
For those of you who feel like a web GUIs just add bloat and overcomplicate things.

Click 'Run' to run the CLI. Type 'r' and press 'Enter' to reset the progress bar. Type a number and press 'Enter' to update the duration of the timer.

https://repl.it/@kevinxu2/CLI-Timer

## First Person Shooter Timer
For those of you who like to add bloat and overcomplicate things.

WASD to move. Click and drag to pan. Click the red sphere to reset the progress cuboid. Click the up/down cones to increment/decrement the duration of the timer.

https://codesandbox.io/s/xstate-timer-a-frame-qgsby

👏 Huge thanks to the contributors for creating a robust implementation of statecharts for JS.