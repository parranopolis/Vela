import { GoogleGenAI } from '@google/genai'

export async function POST(request: Request) {
    const { base64 } = await request.json()
    
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '')
    const interaction =  await ai.interactions.create({
        model: 'gemini-3.5-flash-lite',
        input: [
            {
                type: 'text',
                text: 'Extract all handwritten information from this image. Return only these fields as JSON: coOwners (return an array with 3 position ["","",""], in each position set each initials, the owners part is located in the first row) firstName, lastName, notes (include all the information after "Purchase Information" section only), address, city, state, zipCode, phoneNumber, email, birthdate, anniversary, significantOtherName, significantOtherBirthdate, ringSize. For any field not found in the image, return an empty string. Return only valid JSON, no markdown.',
            },
            {
                type: 'image',
                data: cleanBase64,
                mime_type: 'image/jpeg'
            }
        ],
    })  
    
    return Response.json({data: interaction.output_text})
}