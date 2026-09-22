# ADDA: End-to-end Differentiable Data Assimilation

Talk material for the **GeoSciML Discussion Group**, 24 September 2026.

A 20–25 min presentation of the paper [*ADDA: a Modular Framework for
Representing, Simulating and Assimilating Dynamics with End-to-end
Differentiability*](https://arxiv.org/abs/2608.23297) (Frion et al., 2026)
and of the codebase behind it, [`m-dml/adda`](https://github.com/m-dml/adda).

Two goals:

1. present **ADDA as a toolbox** for data assimilation (states, observation
   operators, dynamics, 4D-Var, EnKF/EnKS, JAX bridge, notebook gallery);
2. describe how **state and parameter estimation** is formalized in a
   *Bayesian* setting, and its connection to **variational** methods
   (MAP / 4D-Var, adjoint vs automatic differentiation).

The deck is built with [open-slide](https://github.com/1weiho/open-slide),
a slide framework built for agents.

## View the deck

```bash
cd deck
pnpm install
pnpm dev
```

Then open the URL printed by the dev server.

## License / attribution

Paper figures (C) 2026 the ADDA authors, arXiv:2608.23297, reused under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
GeoSciML logo (C) its authors.
