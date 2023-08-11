export const names = [
    {
        _id: "64b768f7029e1b7b7968fd18",
        name: "coffee",
        name_display: "Cà phê"
    },
    {
        _id: "64b76974029e1b7b7968fd1a",
        name: "frezee",
        name_display: "Frezee"
    },
    {
        _id: "64b7699c029e1b7b7968fd1b",
        name: "tea",
        name_display: "Trà"
    },
    {
        _id: "64b769c2029e1b7b7968fd1c",
        name: "cake",
        name_display: "Bánh ngọt"
    }
];

export const convertName = (_id) => {
    let length = names.length;
    for (let i = 0; i < length; i++) {
        if (names[i]._id === _id) {
            const str2 = names[i].name_display.slice(1).toLowerCase();
            return names[i].name_display.charAt(0) + str2;
        }
    }
    return 'null';
}