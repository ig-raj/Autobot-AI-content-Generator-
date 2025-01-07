import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(
    req: Request
){
    try{
        const { userId } = auth();
        const body =await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }
        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }
        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        const response = await replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            {
              input: {
               
                prompt,
               
                num_outputs: 5,
                
              }
            }
          );

        return NextResponse.json(response);
    } catch (error) {
        console.log("[Image_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
    
}