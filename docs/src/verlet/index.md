---
title: Verlet Rope Explorations
draft: false
---

As part of a new game I'm exploring some gory visuals. It's got to do with parallels of guts/parasites/technology, so I'm expecting to have lots of stringy visuals.

I also want to do it in Godot, which I've dabbled in but not really familiar yet. So here's an exploration in P5 from basics. Here's our end product.

<p5 flesh-stretch.js>

# Verlet Rope

I found [this excellent post](https://toqoz.fyi/game-rope.html), which covers basically all the theory I needed.  Verlet Rope is just a method of simulating rope-like physics using Verlet Positional Integration, which lets velocities be implicit based on the position deltas between the current frame and the previous frame (contrasted with Euler Integration which tracks `position` and `velocity`).

At each frame do an iterative constraining of each rope segment. It's convenient because we don't have to think about how the rope nodes impart forces or velocities to each other. Also Verlet Integration is numerically stable, which is useful for physics simulations. Not that important here but we'll touch on it in a bit.

Here's classic Verlet Rope in p5js.

<p5 classic-rope.js>

# Parameter Tuning

## Elasticity Coefficient `k`
Because we're using iterative constraining, each segment of the rope acts like a little spring. The constraint calculation is pretty simple and looks *right*, no magic numbers involved. The elastic coefficient of the springs is controlled by the number of iterations. With more iterations, the spring tries harder to conform to its static length.

<p5 rope-elasticity.js>
<slider coef>

## Absolute Inertia/Mass
Cool. What about mass? the rope looks really floppy right now. It looks light and floaty. I think if it's heavy I expect it settle faster and not get flung out as much. We know due to Galileo that adjusting the gravity isn't really it.

Seems like I just have to bump up the FPS. idk. not really sure. Have to go down to the physical math. I'm fine with compromising here for now. Let's continue tweaking everything else.

## Relative Mass

Ok so the overall mass of the rope idk how to tune. But we can adjust the relative masses! If a segment has two nodes of unequal masses, then equal force imparted results in unequal displacement. So we tweak the 0.5 into (myMass) / (myMass + otherMass)

Nice!
<p5 rope-elasticity.js>
<p5 rope-elasticity.js>

# Who says it must be a rope

Each segment is a little spring, so the entire rope is then like a spring system. There's no constraint anywhere that says the system needs to be arranged like a chain.

Here we can see the small chain in the middle imparts some pull to the longer chain.

# Rendering

Rendering the chain as a line was also just a default case. I wanted to portray some transfer of energy, or "nerves frying"? Here's some references and what I cooked up.

<p5 4chain.js>

# MEAT

Cool, but I wanted to simulate body horror. I wasn't referencing it when I was working, but I'm sure I was thinking of Carrion.

Here's some references.

And I figured it'd have to be a spring network, so I drew up a diagram to track where the connections are:

## Initial

And here's the first version of meat!

<p5 4chain.js>

## Contraction

I kept each segment the same length, but there's no constraint on it either. Here if you click, the target segment length decreases. The end result is muscle contracting.

<p5 4chain.js>

## "Shudder"

Here the contraction travels down the network, instead of all the muscles contracting together. It's great! It introduces some lateral motion which makes the tendrils swing more.