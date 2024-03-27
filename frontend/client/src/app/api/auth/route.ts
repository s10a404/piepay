import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse, NextRequest} from "next/server";
import {body} from "@/styles/app.css";

export async function GET(req: NextRequest) {
    const token = await req.cookies.get('accessToken');
    const value = token?.value;

    const t = JSON.stringify(token);

    if (typeof token?.value === 'string') {
        return NextResponse.json({ data: token}, { status: 200 });
    } else {
        return NextResponse.json({ status: 400 });
    }
}