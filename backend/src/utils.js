
class Utils {
    static framed = (tabo,sep="\'") => {
        let tab = [...tabo];
        for(let i=0,c=tab.length;i<c;i++) {
            tab[i] = String(`${sep}`).concat(tab[i],`${sep}`);
        }
        return tab;
    }
}
module.exports = Utils
