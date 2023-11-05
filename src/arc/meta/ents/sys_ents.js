import jet from "@randajan/jet-core";
import { nref, timestamps } from "@randajan/ram-db/async";

const _options = {
  list:["ADD", "UPDATE", "REMOVE"],
  translator:[
    "READ_ONLY",
    "ADDS_ONLY",
    "UPDATES_ONLY",
    "ADDS_AND_UPDATES",
    "DELETES_ONLY",
    "ADDS_AND_DELETES",
    "UPDATES_AND_DELETES",
    "ALL_CHANGES"
  ],
  translate: function(o) { return this.translator[this.list.reduce((r, v, i) => o.includes(v) ? r | (1 << i) : r, 0)]; }
};

export default {
  "id": { isPrimary:true, init:_=>jet.uid() },
  "plural": { isLabel:true, },
  "singular": {},
  "img": {},
  "info": {},
  "options": { separator:"; " },
  ...timestamps(),
  "access":{ isVirtual:true, display:2, selector:"options", formula:v=>_options.translate(v) }
}