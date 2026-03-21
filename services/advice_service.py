def get_advice(crop, n, p, k):
    crop = crop.lower()
    advice = "Ensure regular watering and monitor for pests."
    
    if crop == 'rice':
        if n < 80:
            advice = "Apply urea fertilizer (~50kg/ha) as Nitrogen levels are low for Rice."
        else:
            advice = "Maintain current nutrient levels; ensure adequate standing water."
    elif crop == 'wheat':
        if n < 50:
            advice = "Top dress with Nitrogen fertilizer to boost tillering."
        else:
            advice = "Nutrient levels look optimal for Wheat."
    elif crop == 'cotton':
        if p < 40 or k < 40:
            advice = "Apply NPK mixture to support boll formation."
    elif crop in ['apple', 'orange', 'mango', 'banana']:
        advice = "Monitor soil moisture regularly and apply organic compost to boost fruit yield."
    
    # Generic advice if NPK is very low
    if n < 20 and p < 20 and k < 20:
        advice = "Soil is severely depleted. High requirement of mixed NPK fertilizers and organic manure."
        
    return advice
