# core

## Overview / Schema

Every utility functions and database management tools are exported from `./src/index.ts`.

The `core` utility package is divided into the following main parts:

- Utility functions (not affecting any database)
- Database management (affect the database)
- _Schemas_ for the database (data structures)

The Utility functions relie on data fetched or computed from the database.
The database models are deeply intertwined/the same as the _schemas_ defined.

The _schemas_ are defined with the Prisma ORM.
