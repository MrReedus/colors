const cols = document.querySelectorAll('.col');

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
        node.classList.toggle('fa-lock');
        node.classList.toggle('fa-lock-open');
    } else if (type === 'copy') {
        copyToClickBoard(event.target.textContent)
    }
})


document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandoomColors();
    }

})

function generateRandomColors() {
    const hexCodes = '0123456789ABCDF'
    let color = '';
    for (i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;
}

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text)

}


function setRandoomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const isLoked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if (isLoked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : generateRandomColors()
            : generateRandomColors();

        if (!isInitial) {
            colors.push(color)
        }


        text.textContent = color;
        col.style.background = color;

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    if (luminance > 0.5) {
        text.style.color = 'black'
    } else {
        text.style.color = 'white'
    }
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
        .map(col => {
            return col.toString().substring(1)
        })
        .join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return [];
}

setRandoomColors(true);




