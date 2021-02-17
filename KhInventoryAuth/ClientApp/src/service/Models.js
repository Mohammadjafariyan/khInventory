
export const MyGlobal={
    IsDebugEnvirement:false
}

export function numberWithCommas(x) {
    var parts = x.toString().split(",");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return parts.join(",");
    }