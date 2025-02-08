const CHORD_LIST = [
  { voicing: "top3-major-root", chord: "Major", category: "3 Strings" },
  { voicing: "top3-major-1st", chord: "Major", category: "3 Strings" },
  { voicing: "top3-major-2nd", chord: "Major", category: "3 Strings" },
  { voicing: "3-5-major-2nd", chord: "Major", category: "3 Strings" },
  { voicing: "3-5-major-1st", chord: "Major", category: "3 Strings" },
  { voicing: "3-5-major-root", chord: "Major", category: "3 Strings" },
  { voicing: "Amajor-barre", chord: "Major", category: "Barre" },
  { voicing: "Emajor-barre", chord: "Major", category: "Barre" },
  { voicing: "Cmajor-barre", chord: "Major", category: "Barre" },
  { voicing: "top3-minor-2nd", chord: "Minor", category: "3 Strings" },
  { voicing: "top3-minor-1st", chord: "Minor", category: "3 Strings" },
  { voicing: "top3-minor-root", chord: "Minor", category: "3 Strings" },
  { voicing: "Aminor7-barre", chord: "Minor 7", category: "Barre" },
  { voicing: "rootless-minor7-root", chord: "Minor 7", category: "Rootless" },
  { voicing: "top4-sus4", chord: "Suspended", category: "4 Strings" },
  { voicing: "top3-69", chord: "6/9", category: "Rootless" },
];

const CONTAINER = document.getElementById("container");

const generateChordDiagram = (name) => {
  let div = document.createElement("div");
  div.setAttribute("class", "chord-diagram");
  let diagram = document.createElement("img");
  diagram.setAttribute("src", `./diagrams/${name}.svg`);
  div.append(diagram);
  let notation = document.createElement("img");
  notation.setAttribute("src", `./diagrams/notation/${name}-notation.svg`);
  div.append(notation);
  return div;
};

const createChordSections = (types) => {
  types.forEach((type) => {
    // Create main div for chord type
    let typeDiv = document.createElement("div");
    typeDiv.classList.add("chord-type");
    typeDiv.setAttribute("id", `${type}`);

    let typeTitle = document.createElement("h2");
    typeTitle.textContent = type;
    typeDiv.append(typeTitle);

    // Get unique categories for this type
    let categories = [
      ...new Set(
        CHORD_LIST.filter((chord) => chord.chord === type).map(
          (chord) => chord.category
        )
      ),
    ];

    categories.forEach((category) => {
      // Create category div
      let categoryDiv = document.createElement("div");
      categoryDiv.classList.add("chord-category");
      categoryDiv.setAttribute(
        "id",
        `${type}-${category.replace(/\s+/g, "-")}`
      );

      let categoryTitle = document.createElement("h3");
      categoryTitle.textContent = category;
      categoryDiv.append(categoryTitle);

      // Filter and append chord diagrams for this category
      CHORD_LIST.filter(
        (chord) => chord.chord === type && chord.category === category
      ).forEach((chord) => {
        let diagram = generateChordDiagram(chord.voicing);
        categoryDiv.append(diagram);
      });

      // Append category div to type div
      typeDiv.append(categoryDiv);
    });

    // Append type div to main container
    CONTAINER.append(typeDiv);
  });
};

const getChordTypes = () => {
  let chordTypes = [];
  CHORD_LIST.forEach((element) => {
    if (!chordTypes.includes(element.chord)) {
      chordTypes.push(element.chord);
      console.log(element.chord);
    }
  });
  console.log(chordTypes);
  return chordTypes;
};

const createTOC = () => {
    const tocContainer = document.getElementById('toc');
    const tocList = document.createElement('ul');

    // Get unique chord types
    const uniqueChords = [...new Set(CHORD_LIST.map(chord => chord.chord))];

    uniqueChords.forEach(chordType => {
        const tocItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = chordType;
        link.setAttribute('href', `#${chordType}`); // Link to div with the unique chord id
        tocItem.appendChild(link);
        tocList.appendChild(tocItem);
    });

    tocContainer.appendChild(tocList);
};

const start = () => {
    createTOC()
  let types = getChordTypes();
  createChordSections(types);
};

start();
