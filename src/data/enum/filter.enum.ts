export enum FilterData {
    HAND_TOOLS = 'Hand Tools',
    HAMMER = 'Hammer', 
    HAND_SAW = 'Hand Saw', 
    WRECH = 'Wrench', 
    SCREWDRIVRER = 'Screwdriver', 
    PLIERS = 'Pliers', 
    CHISELS = 'Chisels', 
    MEASURES = 'Measures',
    POWER_TOOLS = 'Power Tools',
    GRINDER = 'Grinder', 
    SANDER = 'Sander', 
    SAW = 'Saw', 
    DRILL = 'Drill',
    OTHER = 'Other',
    TOOL_BELTS = 'Tool Belts', 
    STORAGE_SOLUTIONS = 'Storage Solutions', 
    WORKBENCH = 'Workbench', 
    SAFETY_GEAR = 'Safety Gear', 
    FASTENERS = 'Fasteners',
    FORGEFLEX_TOOLS = 'ForgeFlex Tools',
    MIGHTYCRAFT_HARDWARE = 'MightyCraft Hardware',
    ECO_FRIENDLY = 'Show only eco-friendly products'

}

export const FilterDataMap = {
    [FilterData.HAND_TOOLS]: [FilterData.HAMMER, FilterData.HAND_SAW, FilterData.WRECH, FilterData.SCREWDRIVRER, FilterData.PLIERS, FilterData.CHISELS, FilterData.MEASURES],
    [FilterData.POWER_TOOLS]: [FilterData.GRINDER, FilterData.SANDER, FilterData.SAW, FilterData.DRILL],
    [FilterData.OTHER]: [FilterData.TOOL_BELTS, FilterData.STORAGE_SOLUTIONS, FilterData.WORKBENCH, FilterData.SAFETY_GEAR, FilterData.FASTENERS]
};