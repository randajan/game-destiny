import { nref, timestamps } from "@randajan/ram-db/async";

export default {
    "id": { isPrimary: true, init: _ => String.jet.rnd(6, 6) + Math.round(Number.jet.rnd(10, 100)) },
    "name": { },
    ...timestamps()
}
