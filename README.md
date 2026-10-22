# Ancient Oracles

A standalone app of real ancient oracles: ask a question, throw the dice or knucklebones, and read the answer the
ancients would have read. Every oracle says what we know from the evidence and what is a modern guess.

Each oracle is a self-contained page, so it can also go into a themed school kit (Greece, Egypt, Rome).

## Oracles

| Oracle | From | Pieces | Status |
|---|---|---|---|
| **The Homer oracle** (*Homeromanteion*) | Greek text on papyrus, Roman Egypt, 3rd century AD | 1 die thrown 3 times: 216 lines of Homer | **playable**: `homer.html` (204 lines in Greek and English; 12 lost or scraps) |
| The knucklebone oracle of the marketplace | Greek cities of Roman Asia Minor (Kibyra, Kremna, Termessos, Adada), 2nd century AD | 5 knucklebones: 56 answers, each with a god | planned |
| The Egyptian 20-sided die | Ptolemaic and Roman Egypt | 1 icosahedron with gods' names or letters | planned |
| The lots of Fortuna at Praeneste | Rome's own oracle | lots drawn by a boy | planned |

## The Homer oracle data

`data/homer-oracle.json`: one entry per throw (`1-1-1` to `6-6-6`): the work (Iliad or Odyssey), book and line, the Greek,
and our English translation; `"lost": true` for the 8 unknown lines and 4 scraps; `"note"` where the identification is
uncertain or the papyrus has its own wording. The list follows Maltomini's 1995 edition, which corrects the older
numbering of the damaged first columns (42 entries moved, 19 restored).

## Sources (in the Workbench library, collection history/religion/oracles)

- F. G. Kenyon, *Greek Papyri in the British Museum*, vol. 1 (1893), papyrus CXXI (PGM VII): public domain.
- F. Maltomini, "P. Lond. 121 (= PGM VII), 1-221: Homeromanteion", *ZPE* 106 (1995) 107-122: the line list (facts, credited).
- Ş. Kileci, N. Tüner Önen, Ş. Özüdoğru, "A New Astragalos Oracle Text from Kibyra", *Gephyra* 31 (2026), 257-294:
  open access (CC BY-NC-SA 4.0); for the knucklebone oracle, credit the authors and keep it non-commercial.

## Assets

- Dice faces and knucklebone views: made by the owner (ChatGPT) for Roman Games.
- Dice sounds: Kenney, *Casino Audio* (kenney.nl), CC0. See `assets/sounds/KENNEY-LICENSE.txt`.

## Running it

Any static web server, for example `python -m http.server 5090`, then open http://localhost:5090/.
