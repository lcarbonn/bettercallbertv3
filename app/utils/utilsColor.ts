/**
 * cause UPageCard doesn't manage dynamic class bg color ????
 * @param color 
 * @returns 
 */
export const getBgColor = (color:string|undefined) => {
    switch (color) {
      case "themeone":
        return "bg-themeone"
        break;
      case "themetwo":
        return "bg-themetwo"
        break;
      case "themethree":
        return "bg-themethree"
        break;
      case "themefour":
        return "bg-themefour"
        break;
      case "themefive":
        return "bg-themefive"
        break;
      case "themesix":
        return "bg-themesix"
        break;
    
      default:
        return "bg-primary"
        break;
    }
  }
