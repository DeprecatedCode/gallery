# Coding

I started by writing simple text and text-based graphical games on a good old Texas Instruments TI-92+ graphing calculator. Once I realized that computers could do even more, I was hooked! Writing code is a true creative process, and there is endless possibility for improvement and learning. Every language offers it's own challenges and rewards. Why not start learning at [CodeCademy](http://www.codecademy.com/)?

## Code Snippets

### Daily Programmer 8/10/2012

Write a program that takes a musical chord name from input (like Gm7) and outputs the notes found in that chord (G A# D F).

    def chord(c):
        n = 'C C# D D# E F F# G G# A A# B'.split(' ')
        d, s, m, j = tuple([int(x in c) for x in '7#mj'])
        return [n[x] for x in [(n.index(c[0:1 + s].upper())+
        x) % 12 for x in [0, 4 - (m &~ j), 7, 10+j][0:d+3]]]