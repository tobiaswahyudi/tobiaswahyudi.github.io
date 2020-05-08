---
date: 2020-03-20T21:11:34.220Z
path: "/projects/#vm"
slug: "vm"
tags: ["c++","oop"]
title: "vm"
position: ""
location: "University of Waterloo"
startDate: 2019-10-10
endDate: 2000-08-08
endDateString: "none"
img: './vm.png'
previewImg: './vm_preview.png'

excerpt: "vm is a clone of vim created for the CS246E final project. It was implemented in C++ using Object-Oriented Programming techniques. The project received a final mark of 98%."

priority: 0
backgroundHue: 212
---
#What is vm?
`vm` is a clone of `vim`, created for the final project of the CS246E course. It was implemented in C++ using the Object-Oriented Programming techniques and principles introduced throughout the course.

I took the course on its third offering, in the fall of 2019. Taught by Brad Lushman, this *"Object-Oriented Programming"* course actually touches on a wide landscape of topics such as design patterns, exception safety, and template metaprogramming.

For the final project, we were provided with a specification of a `vim` clone. I paired up with my friend [Nguyen Pham](https://github.com/natsukagami) on this assignment. We implemented `vim`'s text editing functionality: single-letter commands (`a`, `i`, etc), colon-commands (`:q`, `:r`, etc), multipliers(`4dw`), and macros.

The project received a final mark of 98%.


##Remarks about this project
- This course strongly emphasized testing your code. There were penalties for submissions that did not compile. Nguyen set up a GitHub test CI for our project early on and it was a massive lifesaver for us.
- We learned a bit about Doxygen because we reverse-engineering the UML from the C header files.
- Because both of us were previously web developers, we modeled our MVC design after Redux's unidirectional data flow.
- We were asked to use `ncurses` - a `C` library to interface with the terminal. It was really interesting. I learned a lot of things about it that I will probably never use again.