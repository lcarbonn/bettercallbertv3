export const convertToCSV = (separator:string, cards:ICard[]) => {
    const comma = !separator ? ';' : separator
    let str = ''
    cards.forEach(card => {
            let line = ''
            line += card.id+ comma
            line += card.title+ comma
            line += card.idTheme+ comma
            line += card.src + comma
            line += card.link + comma
            str += line + '\r\n'
    });
    return str
}

export const exportCSVFile = (cards:ICard[]) => {
    const now = new Date()
    const fileTitle = "bettercallbert-"+now.toDateString()
    const comma = ';'
    const header = "Id" + comma + "Title" + comma +"Theme"+ comma + "Src" + comma + "Link"+ "\r\n"
    let csv = convertToCSV(comma, cards);
    csv = header + csv
    const exportedFileName = fileTitle + '.csv' || 'export.csv';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export const convertThemeToCSV = (separator:string, themes:ITheme[]) => {
    const comma = !separator ? ';' : separator
    let str = ''
    themes.forEach(theme => {
            let line = ''
            line += theme.id+ comma
            line += theme.color+ comma
            line += theme.order+ comma
            line += theme.title + comma
            str += line + '\r\n'
    });
    return str
}

export const exportThemeCSVFile = (themes:ITheme[]) => {
    const now = new Date()
    const fileTitle = "bettercallbert-theme-"+now.toDateString()
    const comma = ';'
    const header = "Id" + comma + "Color" + comma +"Order"+ comma + "title" + "\r\n"
    let csv = convertThemeToCSV(comma, themes);
    csv = header + csv
    const exportedFileName = fileTitle + '.csv' || 'export.csv';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
