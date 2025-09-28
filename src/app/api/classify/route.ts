
import { NextRequest,NextResponse } from "next/server";


const wasteMapping = {
    recyclable: [
        'bottle', 'plastic bag', 'can', 'tin can', 'aluminum can', 'cardboard', 'paper', 'newspaper',
        'magazine', 'glass', 'jar', 'container', 'box', 'carton', 'metal', 'steel', 'iron',
        'book', 'envelope', 'wrapper', 'packaging'
    ],
    compostable: [
        'banana', 'apple', 'orange', 'fruit', 'vegetable', 'carrot', 'potato', 'tomato',
        'lettuce', 'cabbage', 'broccoli', 'corn', 'onion', 'garlic', 'bread', 'cake',
        'cookie', 'food', 'plant', 'flower', 'leaf', 'wood', 'stick', 'branch'
    ],
    hazardous: [
        'battery', 'phone', 'computer', 'electronic', 'bulb', 'fluorescent', 'chemical',
        'paint', 'oil', 'medicine', 'pill', 'syringe', 'needle'
    ]
};

function classifyWaste(classifications: Array<{label: string, score: number}>) {
    const results = [];
    
    for (const classification of classifications) {
        const label = classification.label.toLowerCase();
        let wasteType = 'general_waste'; // default
        const confidence = classification.score;
        
    
        for (const [category, keywords] of Object.entries(wasteMapping)) {
            for (const keyword of keywords) {
                if (label.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(label)) {
                    wasteType = category;
                    break;
                }
            }
            if (wasteType !== 'general_waste') break;
        }
        
        results.push({
            detected_object: classification.label,
            waste_category: wasteType,
            confidence: confidence,
            disposal_advice: getDisposalAdvice(wasteType)
        });
    }
    
    return results;
}

function getDisposalAdvice(wasteType: string) {
    switch (wasteType) {
        case 'recyclable':
            return 'Clean the item and place in recycling bin. Check local recycling guidelines.';
        case 'compostable':
            return 'Add to compost bin or organic waste collection. Remove any non-organic parts.';
        case 'hazardous':
            return 'Take to special hazardous waste collection point. Do not put in regular trash.';
        default:
            return 'Dispose in general waste bin. Consider if any parts can be recycled separately.';
    }
}

export async function POST(request: NextRequest) {
    try{
        if (!process.env.HUGGINGFACE_API_TOKEN) {
            console.error("HUGGINGFACE_API_TOKEN not found in environment variables");
            return NextResponse.json({ error: "API configuration error" }, { status: 500 });
        }

        
        const formData = await request.formData();
        const image = formData.get("file") as File;

        if (!image) {

            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const arrayBuffer = await image.arrayBuffer();
      
        const response = await fetch("https://api-inference.huggingface.co/models/microsoft/resnet-50", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
                "Content-Type": "application/octet-stream",
            },
            body: arrayBuffer,
        });

        if (!response.ok) {
            const errorText = await response.text();
         
        
            if (response.status === 503) {
                return NextResponse.json({ 
                    error: "Model is currently loading", 
                    details: "The model is starting up. Please try again in a few moments.",
                    retryAfter: 20
                }, { status: 503 });
            }
            
            if (response.status === 401) {
                return NextResponse.json({ 
                    error: "Authentication failed", 
                    details: "Invalid API token"
                }, { status: 401 });
            }
            
            return NextResponse.json({ 
                error: "Model inference failed", 
                details: errorText,
                status: response.status 
            }, { status: 500 });
        }

        const result = await response.json();

        const wasteClassification = classifyWaste(result);
        
        return NextResponse.json({
            waste_analysis: wasteClassification
        });
    }
    catch(err){
        console.error("API route error:", err);
        return NextResponse.json({ error: "Error processing the image", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}