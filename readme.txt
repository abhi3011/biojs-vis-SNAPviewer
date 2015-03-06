____________SNAP VIEWER__________

A biojs componant to visualize the data from SNAP test, which predicts the effects of SNP(single-nucleotide polymorphism)


DESCRIPTION

The residues are shown as a circles with the single letter amino acid code written on them.
They(residues) can be of three colours 
blue   ->     no substitution
yellow ->     substitution but neutral
red    ->     non-neutral substitution

dragging and zooming features are proovided for enhanced user interaction.
the default data.json file includes the protien sequence copied from-> http://mendel.imp.ac.at/PhyloDome/fastas.html and the results are found from the SNAP website.The type of substitution used is V*L, which replaces all the V from L.The minimum reliability index is 0, and minimum expected accuracy is 50%.

HOW TO USE

Just enter your sequence in the blank.json file. For this
"name"    ->  enter the one letter residue name 
"what"    ->  enter "what" is substituted
               eg. V118L for V at 118th position to be substituted by L, for no substitution write NO SUBSTITUTION(Or what ever you prefer)
"type"    ->  what is the type of substitution
               leave blank for no substitution
               write "neutral" for neutral substitutions
               write "non-neutral" for non=neutral substitution

